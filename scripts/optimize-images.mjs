// Generates optimized WebP versions of the website images. Run locally after adding or changing photos:
//
//   npm i --no-save sharp        (one-time; not a project dependency — the build does not need it)
//   node scripts/optimize-images.mjs
//
// For every JPEG/PNG in public/images/<folder>/ (except the logo) it writes, without touching the originals:
//   public/images/optimized/<folder>/<name>-<width>.webp   at 480, 800 and 1200 px wide (only widths smaller than
//                                                           the original) and at the original width
// and records the available widths in src/data/imageVariants.json, which src/data/collections.js uses to build
// srcset. The logo gets small fixed sizes (it is shown at 44–64 px): WebP at 96/192 px and a 192 px JPEG fallback.
// Existing outputs that are newer than their source are skipped, so re-running only processes new or changed photos.

import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('optimize-images: "sharp" is not installed. Run: npm i --no-save sharp');
  process.exit(1);
}

const SRC = 'public/images';
const OUT = 'public/images/optimized';
const WIDTHS = [480, 800, 1200];
const MIN_STEP = 60; // skip a responsive width that is within 60 px of the original width
const WEBP = { quality: 80, effort: 6, smartSubsample: true };

const kb = (n) => `${Math.round(n / 1024)} KB`;
const upToDate = async (out, srcMtime) => {
  try {
    return (await stat(out)).mtimeMs >= srcMtime;
  } catch {
    return false;
  }
};

const manifest = {};
let inBytes = 0;
let fullBytes = 0;
let allBytes = 0;
let written = 0;

for (const folder of (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name).sort()) {
  if (folder === 'optimized' || folder === 'logo') continue;
  for (const file of (await readdir(join(SRC, folder))).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort()) {
    const src = join(SRC, folder, file);
    const { mtimeMs, size } = await stat(src);
    const meta = await sharp(src).metadata();
    const width = meta.autoOrient?.width ?? meta.width;
    const widths = [...WIDTHS.filter((w) => w <= width - MIN_STEP), width];
    await mkdir(join(OUT, folder), { recursive: true });
    for (const w of widths) {
      const out = join(OUT, folder, `${parse(file).name}-${w}.webp`);
      if (!(await upToDate(out, mtimeMs))) {
        await sharp(src).rotate().resize({ width: w, withoutEnlargement: true }).keepIccProfile().webp(WEBP).toFile(out);
        written++;
      }
      const bytes = (await stat(out)).size;
      allBytes += bytes;
      if (w === width) fullBytes += bytes;
    }
    inBytes += size;
    manifest[`${folder}/${file}`] = widths;
  }
}

// Logo: shown at 44–64 CSS px, so 96 px (1×–2×) and 192 px (up to 3×) are enough.
const logo = join(SRC, 'logo', 'rena-logo.jpeg');
await mkdir(join(OUT, 'logo'), { recursive: true });
const logoOut = [
  ['rena-logo-96.webp', (s) => s.resize(96).webp({ quality: 85, effort: 6 })],
  ['rena-logo-192.webp', (s) => s.resize(192).webp({ quality: 85, effort: 6 })],
  ['rena-logo-192.jpg', (s) => s.resize(192).jpeg({ quality: 85, mozjpeg: true })],
];
const { mtimeMs: logoMtime, size: logoSize } = await stat(logo);
for (const [name, fn] of logoOut) {
  const out = join(OUT, 'logo', name);
  if (!(await upToDate(out, logoMtime))) {
    await fn(sharp(logo).rotate()).toFile(out);
    written++;
  }
}
const logoSizes = await Promise.all(logoOut.map(async ([name]) => `${name} ${kb((await stat(join(OUT, 'logo', name))).size)}`));

await writeFile('src/data/imageVariants.json', JSON.stringify(manifest, null, 2) + '\n');

console.log(`optimize-images: ${Object.keys(manifest).length} photos, ${written} files written`);
console.log(`  originals (JPEG):            ${kb(inBytes)}`);
console.log(`  WebP at original width:      ${kb(fullBytes)}  (${Math.round((1 - fullBytes / inBytes) * 100)}% smaller)`);
console.log(`  all WebP sizes on disk:      ${kb(allBytes)}`);
console.log(`  logo: original ${kb(logoSize)} → ${logoSizes.join(', ')}`);
