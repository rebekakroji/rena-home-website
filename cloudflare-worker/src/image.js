// Image helpers for the design API. Workers have no image decoder, so the real file type and the
// pixel size are read from the file header (magic bytes) instead of trusting the declared type.

const u16be = (b, i) => (b[i] << 8) | b[i + 1];
const u32be = (b, i) => ((b[i] << 24) | (b[i + 1] << 16) | (b[i + 2] << 8) | b[i + 3]) >>> 0;
const u16le = (b, i) => b[i] | (b[i + 1] << 8);
const u24le = (b, i) => b[i] | (b[i + 1] << 8) | (b[i + 2] << 16);
const ascii = (b, i, n) => String.fromCharCode(...b.subarray(i, i + n));

function pngSize(b) {
  if (b.length < 24 || b[0] !== 0x89 || ascii(b, 1, 3) !== 'PNG' || ascii(b, 12, 4) !== 'IHDR') return null;
  return { type: 'image/png', width: u32be(b, 16), height: u32be(b, 20) };
}

function jpegSize(b) {
  if (b.length < 4 || b[0] !== 0xff || b[1] !== 0xd8) return null;
  let i = 2;
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) return null;
    const marker = b[i + 1];
    if (marker === 0xff) { i += 1; continue; } // fill byte
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; } // no length
    const isSOF = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isSOF) return { type: 'image/jpeg', width: u16be(b, i + 7), height: u16be(b, i + 5) };
    i += 2 + u16be(b, i + 2);
  }
  return null;
}

function webpSize(b) {
  if (b.length < 30 || ascii(b, 0, 4) !== 'RIFF' || ascii(b, 8, 4) !== 'WEBP') return null;
  const chunk = ascii(b, 12, 4);
  if (chunk === 'VP8 ') return { type: 'image/webp', width: u16le(b, 26) & 0x3fff, height: u16le(b, 28) & 0x3fff };
  if (chunk === 'VP8L' && b[20] === 0x2f) {
    const bits = (b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24)) >>> 0;
    return { type: 'image/webp', width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') return { type: 'image/webp', width: u24le(b, 24) + 1, height: u24le(b, 27) + 1 };
  return null;
}

/** Returns { type, width, height } for a JPEG, PNG or WEBP file, or null if it is none of those. */
export function sniffImage(bytes) {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const info = jpegSize(b) || pngSize(b) || webpSize(b);
  return info && info.width > 0 && info.height > 0 ? info : null;
}

/** MIME type of a base64-encoded image, from its first bytes. */
export function mimeFromBase64(base64) {
  if (base64.startsWith('/9j/')) return 'image/jpeg';
  if (base64.startsWith('iVBORw0KGgo')) return 'image/png';
  if (base64.startsWith('UklGR')) return 'image/webp';
  return null;
}

/**
 * Output size for the generated design: same aspect ratio as the room photo, long side 1024 px,
 * both sides multiples of 16 and within the model's 256–1920 range.
 */
export function outputSize(width, height, longSide = 1024) {
  const round16 = (v) => Math.max(256, Math.min(1920, Math.round(v / 16) * 16));
  return width >= height
    ? { width: round16(longSide), height: round16((longSide * height) / width) }
    : { width: round16((longSide * width) / height), height: round16(longSide) };
}
