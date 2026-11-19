// Verifies the production build in dist/ before it is deployed:
//  - the three language pages exist: / (sq), /en/ and /it/;
//  - every local file referenced by a page (src, href, poster — including the prerendered content) exists,
//    and uses the root-absolute form ("/…") so it resolves from every language folder;
//  - each page has exactly one title, description and canonical (its own URL), the 4 reciprocal hreflang links,
//    and the matching <html lang>.
// Skipped when a different base is set on purpose via VITE_BASE.

import { access, readFile } from 'node:fs/promises';

if (process.env.VITE_BASE && process.env.VITE_BASE !== '/') {
  console.log(`check-dist: skipped (VITE_BASE=${process.env.VITE_BASE})`);
  process.exit(0);
}

const SITE = 'https://mobilerirena.com';
const pages = [
  { file: 'dist/index.html', lang: 'sq', url: `${SITE}/` },
  { file: 'dist/en/index.html', lang: 'en', url: `${SITE}/en/` },
  { file: 'dist/it/index.html', lang: 'it', url: `${SITE}/it/` },
];
const hreflang = { sq: `${SITE}/`, en: `${SITE}/en/`, it: `${SITE}/it/`, 'x-default': `${SITE}/` };

const problems = [];
const exists = async (p) => access(p).then(() => true, () => false);
const count = (html, re) => (html.match(re) || []).length;

for (const page of pages) {
  if (!(await exists(page.file))) {
    problems.push(`${page.file}: missing`);
    continue;
  }
  const html = await readFile(page.file, 'utf8');
  const name = page.file.replace('dist/', '');

  // Local references (skip external URLs, mail/phone links, data URIs and in-page #anchors).
  const refs = [...html.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of new Set(refs)) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    if (!ref.startsWith('/')) {
      problems.push(`${name}: relative path "${ref}" (breaks under /en/ and /it/)`);
      continue;
    }
    const path = decodeURI(ref.split(/[?#]/)[0]);
    if (!(await exists(`dist${path}`))) problems.push(`${name}: file missing in dist/: "${ref}"`);
  }

  // Metadata: one of each, pointing at this page.
  if (!html.includes(`<html lang="${page.lang}">`)) problems.push(`${name}: <html lang="${page.lang}"> missing`);
  if (count(html, /<title>/g) !== 1) problems.push(`${name}: expected 1 <title>`);
  if (count(html, /<meta name="description"/g) !== 1) problems.push(`${name}: expected 1 meta description`);
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)].map((m) => m[1]);
  if (canonicals.length !== 1 || canonicals[0] !== page.url) problems.push(`${name}: canonical ${JSON.stringify(canonicals)} (expected ${page.url})`);
  const og = [...html.matchAll(/<meta property="og:url" content="([^"]+)"/g)].map((m) => m[1]);
  if (og.length !== 1 || og[0] !== page.url) problems.push(`${name}: og:url ${JSON.stringify(og)} (expected ${page.url})`);
  const alts = Object.fromEntries([...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  if (count(html, /hreflang=/g) !== 4 || JSON.stringify(alts) !== JSON.stringify(hreflang)) problems.push(`${name}: hreflang ${JSON.stringify(alts)}`);
  if (!html.includes('<div id="root"><')) problems.push(`${name}: prerendered content missing`);
}

for (const f of ['dist/sitemap.xml', 'dist/robots.txt', 'dist/favicon.ico', 'dist/apple-touch-icon.png', 'dist/og-image.jpg']) {
  if (!(await exists(f))) problems.push(`${f}: missing`);
}

if (problems.length) {
  console.error('check-dist: FAILED\n' + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log(`check-dist: OK (${pages.length} language pages, all referenced files present, metadata and hreflang correct)`);
