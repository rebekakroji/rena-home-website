// Generates the browser / Google Search favicons from the official logo (public/images/logo/rena-logo.jpeg):
//
//   npm i --no-save sharp        (one-time; not a project dependency — the build does not need it)
//   node scripts/make-favicons.mjs
//
// Favicons are shown at 16–32 px, where the logo's "RENA HOME" lettering cannot be read, so they use only the red
// "RN" mark: it is cut out of the logo (it stands alone on the logo's pure-black background, above the lettering),
// centred on black and scaled to 82% of the height. Outputs:
//   public/favicon.ico       16, 32 and 48 px (PNG-compressed ICO entries)
//   public/favicon-192.png   192 × 192 (a multiple of 48 px, as Google recommends)
// The full logo stays in use where it is shown large: the Organization logo in the structured data and
// public/apple-touch-icon.png.

import { writeFile } from 'node:fs/promises';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('make-favicons: "sharp" is not installed. Run: npm i --no-save sharp');
  process.exit(1);
}

const LOGO = 'public/images/logo/rena-logo.jpeg';
const FILL = 0.82; // height of the mark relative to the icon
const MASTER = 1024;

// 1. Find the RN mark: the first block of rows containing any non-black pixel (the lettering comes later,
//    separated by a band of pure black rows).
const { data, info } = await sharp(LOGO).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const ink = (x, y) => {
  const i = (y * W + x) * 3;
  return Math.max(data[i], data[i + 1], data[i + 2]) > 60;
};
const rowHasInk = (y) => {
  for (let x = 0; x < W; x++) if (ink(x, y)) return true;
  return false;
};
let top = 0;
while (top < H && !rowHasInk(top)) top++;
let bottom = top;
while (bottom < H && rowHasInk(bottom)) bottom++;
bottom--;
let left = W;
let right = 0;
for (let y = top; y <= bottom; y++)
  for (let x = 0; x < W; x++)
    if (ink(x, y)) {
      left = Math.min(left, x);
      right = Math.max(right, x);
    }
const box = { left, top, width: right - left + 1, height: bottom - top + 1 };

// 2. Master icon: the mark centred on black.
const markH = Math.round(MASTER * FILL);
const mark = await sharp(LOGO).extract(box).resize({ height: markH }).png().toBuffer();
const { width: markW } = await sharp(mark).metadata();
const master = await sharp({ create: { width: MASTER, height: MASTER, channels: 3, background: '#000000' } })
  .composite([{ input: mark, left: Math.round((MASTER - markW) / 2), top: Math.round((MASTER - markH) / 2) }])
  .png()
  .toBuffer();

const png = async (size) => sharp(master).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

// 3. favicon-192.png
const p192 = await png(192);
await writeFile('public/favicon-192.png', p192);

// 4. favicon.ico with 16, 32 and 48 px PNG entries.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0);
  e.writeUInt8(s, 1);
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(images[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return e;
});
const ico = Buffer.concat([header, ...entries, ...images]);
await writeFile('public/favicon.ico', ico);

console.log(`make-favicons: RN mark at x ${box.left}–${right}, y ${box.top}–${bottom} of the ${W}×${H} logo`);
console.log(`  public/favicon-192.png  ${p192.length} bytes`);
console.log(`  public/favicon.ico      ${ico.length} bytes (${sizes.join(', ')} px)`);
