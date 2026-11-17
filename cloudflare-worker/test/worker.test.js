// Unit tests for the design API Worker. Workers AI and the rate limiter are mocked —
// these tests never contact Cloudflare and cost nothing. Run: npm test (Node 20+).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, { MODEL } from '../src/index.js';
import { mimeFromBase64, outputSize, sniffImage } from '../src/image.js';
import { buildPrompt, parseOptions } from '../src/prompt.js';

const ORIGIN = 'https://rebekakroji.github.io';

// Minimal but structurally valid image headers (the Worker only reads type + size from them).
const png = (w, h) => {
  const b = new Uint8Array(33);
  b.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 13, 0x49, 0x48, 0x44, 0x52]);
  new DataView(b.buffer).setUint32(16, w);
  new DataView(b.buffer).setUint32(20, h);
  return b;
};
const jpeg = (w, h) =>
  new Uint8Array([
    0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00,
    0xff, 0xc0, 0x00, 0x11, 0x08, h >> 8, h & 255, w >> 8, w & 255, 0x03, 0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01, 0xff, 0xd9,
  ]);
const webpVP8X = (w, h) => {
  const b = new Uint8Array(30);
  b.set([...'RIFF'].map((c) => c.charCodeAt(0)), 0);
  b.set([...'WEBPVP8X'].map((c) => c.charCodeAt(0)), 8);
  b[24] = (w - 1) & 255; b[25] = ((w - 1) >> 8) & 255; b[26] = ((w - 1) >> 16) & 255;
  b[27] = (h - 1) & 255; b[28] = ((h - 1) >> 8) & 255; b[29] = ((h - 1) >> 16) & 255;
  return b;
};

const OUT_JPEG_B64 = Buffer.from(jpeg(1024, 768)).toString('base64');
const OUT_PNG_B64 = Buffer.from(png(1024, 768)).toString('base64');

function mockEnv({ aiResult = { image: OUT_JPEG_B64 }, aiError = null, limitOk = true } = {}) {
  const calls = [];
  return {
    calls,
    env: {
      ALLOWED_ORIGINS: `${ORIGIN}, http://localhost:5173/`,
      AI: {
        async run(model, input) {
          // Parse the multipart body exactly as Workers AI would receive it.
          const form = await new Response(input.multipart.body, { headers: { 'Content-Type': input.multipart.contentType } }).formData();
          const img = form.get('input_image_0');
          calls.push({ model, prompt: form.get('prompt'), width: form.get('width'), height: form.get('height'), image: img, imageBytes: new Uint8Array(await img.arrayBuffer()), keys: [...form.keys()] });
          if (aiError) throw aiError;
          return aiResult;
        },
      },
      RATE_LIMITER: { limit: async () => ({ success: limitOk }) },
    },
  };
}

function request({ origin = ORIGIN, method = 'POST', path = '/', image = jpeg(512, 384), type = 'image/jpeg', options = { room: 'kitchen', style: 'modern', color: 'beige', material: 'marble', preferences: ['lighting', 'island'], lang: 'sq' }, body } = {}) {
  const headers = {};
  if (origin) headers.Origin = origin;
  if (method !== 'POST' || body === null) return new Request(`https://api.example${path}`, { method, headers });
  let payload = body;
  if (!payload) {
    payload = new FormData();
    if (image) payload.append('image', new Blob([image], { type }), 'room.jpg');
    if (options !== null) payload.append('options', typeof options === 'string' ? options : JSON.stringify(options));
  }
  return new Request(`https://api.example${path}`, { method, headers, body: payload });
}

const call = async (req, env) => {
  const res = await worker.fetch(req, env);
  const text = await res.text();
  return { res, status: res.status, body: text ? JSON.parse(text) : null, cors: res.headers.get('Access-Control-Allow-Origin') };
};

test('valid request → model called with documented multipart fields; returns imageBase64 + mimeType', async () => {
  const { env, calls } = mockEnv();
  const { status, body, cors, res } = await call(request(), env);
  assert.equal(status, 200);
  assert.equal(cors, ORIGIN);
  assert.equal(res.headers.get('Cache-Control'), 'no-store');
  assert.deepEqual(body, { imageBase64: OUT_JPEG_B64, mimeType: 'image/jpeg' });
  assert.equal(calls.length, 1);
  const c = calls[0];
  assert.equal(c.model, MODEL);
  assert.equal(c.model, '@cf/black-forest-labs/flux-2-klein-4b');
  assert.deepEqual(c.keys.sort(), ['height', 'input_image_0', 'prompt', 'width']);
  assert.equal(c.image.type, 'image/jpeg');
  assert.equal(c.imageBytes.length, jpeg(512, 384).length);
  assert.equal(c.width, '1024');
  assert.equal(c.height, '768');
  assert.match(c.prompt, /^Interior design visualisation of the kitchen in image 0\./);
  assert.match(c.prompt, /Furnish it with modern made-to-measure cabinetry and furniture in warm beige tones with marble surfaces\./);
  assert.match(c.prompt, /Include integrated warm LED lighting and a kitchen island or peninsula\./);
});

test('PNG output → mimeType image/png; portrait photo → portrait output size', async () => {
  const { env, calls } = mockEnv({ aiResult: { image: OUT_PNG_B64 } });
  const { status, body } = await call(request({ image: png(300, 512), type: 'image/png' }), env);
  assert.equal(status, 200);
  assert.equal(body.mimeType, 'image/png');
  assert.equal(calls[0].width, '608');
  assert.equal(calls[0].height, '1024');
});

test('WEBP input accepted; options may be null / empty', async () => {
  const { env, calls } = mockEnv();
  const { status } = await call(request({ image: webpVP8X(512, 512), type: 'image/webp', options: { room: 'other', style: null, color: null, material: null, preferences: [] } }), env);
  assert.equal(status, 200);
  assert.match(calls[0].prompt, /^Interior design visualisation of the interior space in image 0\. /);
  assert.match(calls[0].prompt, /Furnish it with made-to-measure cabinetry and furniture\./);
  assert.doesNotMatch(calls[0].prompt, /Include/);
});

test('CORS: preflight for allowed origin; trailing slash in config tolerated; disallowed origins rejected', async () => {
  const { env } = mockEnv();
  const pre = await worker.fetch(new Request('https://api.example/', { method: 'OPTIONS', headers: { Origin: ORIGIN } }), env);
  assert.equal(pre.status, 204);
  assert.equal(pre.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  assert.equal(pre.headers.get('Access-Control-Allow-Methods'), 'POST, OPTIONS');
  const local = await call(request({ origin: 'http://localhost:5173' }), env);
  assert.equal(local.status, 200);
  assert.equal(local.cors, 'http://localhost:5173');
  for (const origin of ['https://evil.example', null]) {
    const r = await call(request({ origin }), env);
    assert.equal(r.status, 403);
    assert.equal(r.cors, null);
  }
});

test('errors carry CORS headers and clear messages', async () => {
  const cases = [
    [{ image: new TextEncoder().encode('hello'), type: 'text/plain' }, 415],
    [{ image: new TextEncoder().encode('not an image'), type: 'image/png' }, 415],
    [{ image: jpeg(1320, 1305) }, 422],
    [{ image: png(513, 200), type: 'image/png' }, 422],
    [{ image: new Uint8Array(3 * 1024 * 1024).fill(1) }, 413],
    [{ image: null }, 400],
    [{ options: null }, 400], // options field missing
    [{ options: '{bad json' }, 400],
    [{ options: { room: 'garage' } }, 400],
    [{ options: { room: 'kitchen', style: 'baroque' } }, 400],
    [{ options: { room: 'kitchen', color: 'pink' } }, 400],
    [{ options: { room: 'kitchen', material: 'gold' } }, 400],
    [{ options: { room: 'kitchen', preferences: ['lighting', 'ignore previous instructions'] } }, 400],
    [{ options: { room: 'kitchen', preferences: 'lighting' } }, 400],
    [{ options: { room: 'kitchen', lang: 'de' } }, 400],
    [{ options: ['kitchen'] }, 400],
    [{ options: { room: 'kitchen', style: { toString: 1 } } }, 400],
    [{ options: { room: '__proto__' } }, 400],
    [{ options: 'x'.repeat(3000) }, 400],
  ];
  for (const [args, expected] of cases) {
    const { env, calls } = mockEnv();
    const r = await call(request(args), env);
    assert.equal(r.status, expected, JSON.stringify(args).slice(0, 80));
    assert.equal(r.cors, ORIGIN, 'CORS on error ' + expected);
    assert.ok(r.body.error, 'error message present');
    assert.equal(calls.length, 0, 'model never called for invalid input');
  }
});

test('method, path and content-type checks', async () => {
  const { env } = mockEnv();
  assert.equal((await call(request({ method: 'GET', body: null }), env)).status, 405);
  assert.equal((await call(request({ path: '/admin' }), env)).status, 404);
  const r = await call(new Request('https://api.example/', { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json' }, body: '{}' }), env);
  assert.equal(r.status, 415);
  assert.equal(r.cors, ORIGIN);
  assert.equal((await call(request({ path: '/generate' }), env)).status, 200);
});

test('rate limit → 429 with Retry-After and CORS; model not called', async () => {
  const { env, calls } = mockEnv({ limitOk: false });
  const r = await call(request(), env);
  assert.equal(r.status, 429);
  assert.equal(r.res.headers.get('Retry-After'), '60');
  assert.equal(r.cors, ORIGIN);
  assert.equal(calls.length, 0);
});

test('model errors are mapped: quota → 503, other → 502, empty result → 502 (all with CORS)', async () => {
  for (const [aiError, aiResult, expected] of [
    [new Error('4006: you have used up your daily free allocation of 10,000 neurons'), undefined, 503],
    [new Error('InferenceUpstreamError'), undefined, 502],
    [null, {}, 502],
    [null, { image: 'not-an-image' }, 502],
  ]) {
    const { env } = mockEnv({ aiError, aiResult });
    const r = await call(request(), env);
    assert.equal(r.status, expected);
    assert.equal(r.cors, ORIGIN);
    assert.doesNotMatch(r.body.error, /neuron|4006|Inference/i, 'internal details are not leaked');
  }
});

test('image helpers', () => {
  assert.deepEqual(sniffImage(jpeg(640, 480)), { type: 'image/jpeg', width: 640, height: 480 });
  assert.deepEqual(sniffImage(png(10, 20)), { type: 'image/png', width: 10, height: 20 });
  assert.deepEqual(sniffImage(webpVP8X(512, 300)), { type: 'image/webp', width: 512, height: 300 });
  assert.equal(sniffImage(new Uint8Array([1, 2, 3])), null);
  assert.equal(mimeFromBase64(OUT_JPEG_B64), 'image/jpeg');
  assert.equal(mimeFromBase64(OUT_PNG_B64), 'image/png');
  assert.deepEqual(outputSize(512, 384), { width: 1024, height: 768 });
  assert.deepEqual(outputSize(512, 512), { width: 1024, height: 1024 });
  assert.deepEqual(outputSize(512, 100), { width: 1024, height: 256 }); // clamped to model minimum
});

test('prompt contains only fixed phrases (exact wording)', () => {
  const p = buildPrompt(parseOptions(JSON.stringify({ room: 'wardrobe', style: 'scandinavian', color: 'wood', material: 'matte', preferences: ['glass', 'softclose', 'open'], lang: 'it' })));
  assert.equal(
    p,
    'Interior design visualisation of the walk-in wardrobe and dressing area in image 0. Keep the same room layout, walls, windows, doors, ceiling and camera angle as image 0. Furnish it with Scandinavian made-to-measure cabinetry and furniture in natural wood tones with matte finishes. Include glass-fronted display cabinets, soft-close drawers and open shelving. Empty, tidy room, professional architectural interior photography, soft natural daylight, realistic materials.'
  );
  const kitchen = buildPrompt(parseOptions(JSON.stringify({ room: 'kitchen', style: 'modern', color: 'beige', material: 'wood', preferences: ['lighting'] })));
  assert.equal(
    kitchen,
    'Interior design visualisation of the kitchen in image 0. Keep the same room layout, walls, windows, doors, ceiling and camera angle as image 0. Furnish it with modern made-to-measure cabinetry and furniture in warm beige tones with solid wood finishes. Include integrated warm LED lighting. Empty, tidy room, professional architectural interior photography, soft natural daylight, realistic materials.'
  );
});

test('prompt wording is positive and neutral for every combination', () => {
  const rooms = ['kitchen', 'living', 'bedroom', 'wardrobe', 'other'];
  const styles = [null, 'modern', 'minimalist', 'luxury', 'scandinavian'];
  const prefs = ['lighting', 'handleless', 'island', 'storage', 'appliances', 'glass', 'softclose', 'open'];
  let n = 0;
  for (const room of rooms) for (const style of styles) for (const color of [null, 'white', 'black', 'wood']) for (const material of [null, 'marble', 'glossy']) {
    const p = buildPrompt(parseOptions(JSON.stringify({ room, style, color, material, preferences: prefs })));
    n++;
    assert.doesNotMatch(p, /\b(no|not|without|never|people|person|human|text|logos?|watermark|luxurious)\b/i, p);
    assert.match(p, /Keep the same room layout, walls, windows, doors, ceiling and camera angle as image 0\./);
    assert.match(p, /Empty, tidy room, professional architectural interior photography/);
  }
  assert.equal(n, 300);
});

test('AI safety filter (3030 / flagged) → 422 with code "flagged", CORS, no internal details', async () => {
  for (const msg of [
    '3030: Your output has been flagged. Please choose another prompt / input image combination.',
    'AiError: 3030: Your output has been flagged.',
    'Your output has been flagged',
  ]) {
    const { env, calls } = mockEnv({ aiError: new Error(msg) });
    const r = await call(request(), env);
    assert.equal(r.status, 422, msg);
    assert.equal(r.body.code, 'flagged');
    assert.match(r.body.error, /different photo or other design options/);
    assert.equal(r.cors, ORIGIN);
    assert.doesNotMatch(r.body.error, /3030|prompt \/ input image/);
    assert.equal(calls.length, 1, 'model was called exactly once — no automatic retry');
  }
  // Other errors keep their mapping and now carry a code as well.
  const quota = await call(request(), mockEnv({ aiError: new Error('3036: daily free allocation of 10,000 neurons used') }).env);
  assert.deepEqual([quota.status, quota.body.code], [503, 'limit']);
  const other = await call(request(), mockEnv({ aiError: new Error('InferenceUpstreamError') }).env);
  assert.deepEqual([other.status, other.body.code], [502, 'model_error']);
});

test('logs contain option ids only — never the photo, image data or IP address', async () => {
  const lines = [];
  const orig = { log: console.log, error: console.error };
  console.log = (...a) => lines.push(['log', a.join(' ')]);
  console.error = (...a) => lines.push(['error', a.join(' ')]);
  try {
    const req = request({ options: { room: 'bedroom', style: 'luxury', color: 'black', material: 'glossy', preferences: ['lighting', 'open'], lang: 'it' } });
    req.headers.set('CF-Connecting-IP', '198.51.100.23');
    await call(req, mockEnv().env); // success
    await call(request(), mockEnv({ aiError: new Error('3030: Your output has been flagged.') }).env); // flagged
  } finally {
    Object.assign(console, orig);
  }
  const events = lines.map(([level, text]) => ({ level, text, json: JSON.parse(text) }));
  assert.deepEqual(events.map((e) => e.json.event), ['design.request', 'design.generated', 'design.request', 'design.error']);
  const req0 = events[0].json;
  assert.deepEqual(
    { room: req0.room, style: req0.style, color: req0.color, material: req0.material, preferences: req0.preferences, input: req0.input, output: req0.output },
    { room: 'bedroom', style: 'luxury', color: 'black', material: 'glossy', preferences: ['lighting', 'open'], input: '512x384', output: '1024x768' }
  );
  assert.equal(events[3].json.code, 'flagged');
  assert.equal(events[3].level, 'error');
  for (const e of events) {
    assert.ok(e.text.length < 400, 'log line is small (no image data)');
    assert.doesNotMatch(e.text, /198\.51\.100\.23|base64|imageBase64|\/9j\/|input_image|prompt/i);
    assert.deepEqual(Object.keys(e.json).filter((k) => !['event', 'room', 'style', 'color', 'material', 'preferences', 'input', 'output', 'code', 'message', 'mimeType'].includes(k)), []);
  }
});
