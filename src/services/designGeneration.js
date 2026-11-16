// Integration point for AI image generation ("DESIGN WITH RENA HOME").
//
// The website is static and never contains credentials. Generation runs in a separate Cloudflare
// Worker (folder /cloudflare-worker) that calls Workers AI through its binding — no API token at all.
// Only the Worker's public URL is set at build time:
//
//   VITE_DESIGN_API_URL=https://rena-home-design-api.<account>.workers.dev
//
// Until that variable is set, generateDesign() returns { status: 'unavailable' } and the page shows
// an honest "coming soon" message — no request is made and the photo never leaves the browser.
//
// Endpoint contract (implemented in cloudflare-worker/src/index.js):
//   POST <VITE_DESIGN_API_URL>   multipart/form-data
//     image    the room photo, resized here to max 512×512 (JPEG)
//     options  JSON: { room, style, color, material, preferences: string[], lang }
//   200 → JSON { imageBase64, mimeType }   (an { imageUrl } response is also accepted)
//   4xx/5xx → JSON { error }

const ENDPOINT = (import.meta.env.VITE_DESIGN_API_URL || '').trim();

// FLUX.2 [klein] accepts reference images up to 512×512; larger photos are scaled down here.
const MAX_SIDE = 512;
const JPEG_QUALITY = 0.9;

export const isDesignGenerationEnabled = () => ENDPOINT !== '';

const abortIfNeeded = (signal) => {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
};

// Decodes the photo, honouring the EXIF orientation of phone pictures.
async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch {
      /* fall back to an <img> element below */
    }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * Scales the photo down to fit 512×512 (keeping its aspect ratio) and re-encodes it as JPEG.
 * Re-encoding through a canvas also strips all metadata (EXIF, GPS location) before upload.
 */
export async function prepareImage(file, { signal } = {}) {
  const source = await decode(file);
  abortIfNeeded(signal);
  const srcW = source.width || source.naturalWidth;
  const srcH = source.height || source.naturalHeight;
  const scale = Math.min(1, MAX_SIDE / Math.max(srcW, srcH));
  const width = Math.max(1, Math.round(srcW * scale));
  const height = Math.max(1, Math.round(srcH * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff'; // transparent PNG areas become white instead of black
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(source, 0, 0, width, height);
  source.close?.();

  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not prepare the image.'))), 'image/jpeg', JPEG_QUALITY)
  );
  abortIfNeeded(signal);
  return { blob, width, height };
}

export async function generateDesign({ image, room, style, color, material, preferences, lang }, { signal } = {}) {
  if (!ENDPOINT) return { status: 'unavailable' };

  const prepared = await prepareImage(image, { signal });
  const body = new FormData();
  body.append('image', prepared.blob, 'room.jpg');
  body.append('options', JSON.stringify({ room, style, color, material, preferences, lang }));

  const res = await fetch(ENDPOINT, { method: 'POST', body, signal });
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      message = (await res.json()).error || message;
    } catch {
      /* non-JSON error body */
    }
    throw new Error(message);
  }

  const data = await res.json();
  if (data.imageBase64) {
    const mimeType = data.mimeType || 'image/png';
    return { status: 'done', imageUrl: `data:${mimeType};base64,${data.imageBase64}`, mimeType };
  }
  if (data.imageUrl) return { status: 'done', imageUrl: data.imageUrl, mimeType: data.mimeType || null };
  throw new Error('The design service returned no image.');
}
