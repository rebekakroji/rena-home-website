// RENA HOME — design API (Cloudflare Worker).
// Receives the room photo + options from the website, validates them, builds the prompt
// server-side and generates the design with Workers AI (FLUX.2 [klein] 4B) via the AI binding.
// No API token is used or stored: the binding authorises the call inside Cloudflare.
//
// Request:  POST /  multipart/form-data  { image: JPEG|PNG|WEBP ≤ 512×512, options: JSON }
// Response: 200 { imageBase64, mimeType }   ·   4xx/5xx { error, code? }   (CORS headers on every response)
//           code: "flagged" (422, AI safety filter declined the output) · "limit" (503) · "model_error" (502)

import { mimeFromBase64, outputSize, sniffImage } from './image.js';
import { OptionsError, buildPrompt, parseOptions } from './prompt.js';

export const MODEL = '@cf/black-forest-labs/flux-2-klein-4b';
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_INPUT_SIDE = 512; // model limit for reference images (the website resizes before sending)
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // a ≤512 px photo is typically 30–200 KB
const MAX_BODY_BYTES = MAX_UPLOAD_BYTES + 64 * 1024;

const allowedOrigins = (env) =>
  String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean);

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin');
  const headers = { Vary: 'Origin' };
  if (origin && allowedOrigins(env).includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
    headers['Access-Control-Max-Age'] = '86400';
  }
  return headers;
}

const json = (status, body, cors, extra = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...cors,
      ...extra,
    },
  });

async function handle(request, env) {
  const cors = corsHeaders(request, env);
  const originAllowed = Boolean(cors['Access-Control-Allow-Origin']);
  const { pathname } = new URL(request.url);

  if (pathname !== '/' && pathname !== '/generate') return json(404, { error: 'Not found.' }, cors);
  if (request.method === 'OPTIONS') return new Response(null, { status: originAllowed ? 204 : 403, headers: cors });
  if (request.method !== 'POST') return json(405, { error: 'Method not allowed.' }, cors, { Allow: 'POST, OPTIONS' });

  // Basic abuse protection: only the RENA HOME website (browsers send Origin) may call the API.
  if (!originAllowed) return json(403, { error: 'Origin not allowed.' }, cors);

  // Rate limit per visitor IP (approximate, per Cloudflare location — see README).
  if (env.RATE_LIMITER) {
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const { success } = await env.RATE_LIMITER.limit({ key: `design:${ip}` });
    if (!success) return json(429, { error: 'Too many requests. Please wait a minute and try again.' }, cors, { 'Retry-After': '60' });
  }

  if (!/^multipart\/form-data;/i.test(request.headers.get('Content-Type') || '')) {
    return json(415, { error: 'Expected multipart/form-data.' }, cors);
  }
  const declaredLength = Number(request.headers.get('Content-Length') || 0);
  if (declaredLength > MAX_BODY_BYTES) return json(413, { error: 'Upload too large.' }, cors);

  let form;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: 'Invalid form data.' }, cors);
  }

  const image = form.get('image');
  if (!image || typeof image === 'string') return json(400, { error: 'Missing image.' }, cors);
  if (image.size === 0) return json(400, { error: 'Empty image.' }, cors);
  if (image.size > MAX_UPLOAD_BYTES) return json(413, { error: 'Image too large.' }, cors);
  if (image.type && !ALLOWED_TYPES.includes(image.type)) return json(415, { error: 'Only JPEG, PNG or WEBP images are accepted.' }, cors);

  const bytes = new Uint8Array(await image.arrayBuffer());
  const info = sniffImage(bytes); // real type + size from the file itself
  if (!info) return json(415, { error: 'The file is not a valid JPEG, PNG or WEBP image.' }, cors);
  if (info.width > MAX_INPUT_SIDE || info.height > MAX_INPUT_SIDE) {
    return json(422, { error: `Image must be at most ${MAX_INPUT_SIDE}×${MAX_INPUT_SIDE} pixels.` }, cors);
  }

  let options;
  try {
    options = parseOptions(form.get('options'));
  } catch (err) {
    if (err instanceof OptionsError) return json(400, { error: err.message }, cors);
    throw err;
  }

  const size = outputSize(info.width, info.height);
  // Debug log: option ids and sizes only — never the photo, its bytes, the visitor's IP or the result.
  const logBase = {
    room: options.room,
    style: options.style,
    color: options.color,
    material: options.material,
    preferences: options.preferences,
    input: `${info.width}x${info.height}`,
    output: `${size.width}x${size.height}`,
  };
  console.log(JSON.stringify({ event: 'design.request', ...logBase }));

  const modelForm = new FormData();
  modelForm.append('prompt', buildPrompt(options));
  modelForm.append('input_image_0', new Blob([bytes], { type: info.type }), 'room');
  modelForm.append('width', String(size.width));
  modelForm.append('height', String(size.height));
  // Serialise the form to get the multipart body and its boundary (documented pattern for FLUX.2).
  const serialised = new Response(modelForm);

  let result;
  try {
    result = await env.AI.run(MODEL, {
      multipart: { body: serialised.body, contentType: serialised.headers.get('Content-Type') },
    });
  } catch (err) {
    const message = String(err?.message || err);
    // 3030: the provider's safety filter declined the generated image. The filter stays fully
    // enabled; the visitor is asked to try another photo or other options.
    const code = /\b3030\b|flagged/i.test(message)
      ? 'flagged'
      : /neuron|quota|limit|capacity|429|rate/i.test(message)
        ? 'limit'
        : 'model_error';
    console.error(JSON.stringify({ event: 'design.error', code, message: message.slice(0, 200), ...logBase }));
    if (code === 'flagged') {
      return json(422, { code, error: 'The generated image was declined by the AI safety filter. Please try a different photo or other design options.' }, cors);
    }
    return code === 'limit'
      ? json(503, { code, error: 'The design service has reached its limit for now. Please try again later.' }, cors, { 'Retry-After': '3600' })
      : json(502, { code, error: 'The design could not be generated. Please try again.' }, cors);
  }

  const imageBase64 = typeof result?.image === 'string' ? result.image : null;
  const mimeType = imageBase64 && mimeFromBase64(imageBase64);
  if (!imageBase64 || !mimeType) {
    console.error(JSON.stringify({ event: 'design.error', code: 'no_image', ...logBase }));
    return json(502, { code: 'model_error', error: 'The design service returned no image.' }, cors);
  }
  console.log(JSON.stringify({ event: 'design.generated', mimeType, ...logBase }));

  return json(200, { imageBase64, mimeType }, cors);
}

export default {
  async fetch(request, env) {
    try {
      return await handle(request, env);
    } catch (err) {
      console.error('Unexpected error:', err?.stack || err);
      return json(500, { error: 'Unexpected error.' }, corsHeaders(request, env));
    }
  },
};
