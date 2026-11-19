// Build-time prerendering: writes the rendered homepage in each language into its own page —
//   dist/index.html (Albanian, /)   dist/en/index.html (English, /en/)   dist/it/index.html (Italian, /it/)
// — each with its own title, description, canonical, hreflang, Open Graph and Twitter metadata. The content is in
// the HTML for search engines and AI crawlers that do not run JavaScript; in the browser React hydrates it
// (src/main.jsx), so nothing changes for visitors.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.

import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const fail = (msg) => {
  console.error(`prerender: ${msg}`);
  process.exit(1);
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = await readFile('dist/index.html', 'utf8');
const ROOT = '<div id="root"></div>';
const META = /<!-- page-meta:start[\s\S]*?<!-- page-meta:end -->/;
if (template.split(ROOT).length !== 2) fail(`expected exactly one ${ROOT} in dist/index.html`);
if ((template.match(new RegExp(META.source, 'g')) || []).length !== 1) fail('expected exactly one page-meta block in dist/index.html');
if (!/<html lang="[a-z]+">/.test(template)) fail('expected <html lang="…"> in dist/index.html');

const { render, pageMeta, languages, defaultLang } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);

const metaBlock = (m) =>
  [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    ...m.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`),
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:image:alt" content="${esc(m.imageAlt)}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    ...m.ogLocaleAlternates.map((l) => `<meta property="og:locale:alternate" content="${l}" />`),
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image:alt" content="${esc(m.imageAlt)}" />`,
  ].join('\n    ');

for (const lang of languages) {
  const m = pageMeta(lang);
  const appHtml = render(lang);
  if (!appHtml.includes('id="kryefaqja"')) fail(`rendered ${lang} HTML does not contain the homepage`);

  const html = template
    .replace(/<html lang="[a-z]+">/, `<html lang="${lang}">`)
    .replace(META, metaBlock(m))
    .replace(ROOT, `<div id="root">${appHtml}</div>`);

  const file = lang === defaultLang ? 'dist/index.html' : `dist/${lang}/index.html`;
  if (lang !== defaultLang) await mkdir(`dist/${lang}`, { recursive: true });
  await writeFile(file, html);

  const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  console.log(`prerender: ${m.path.padEnd(5)} → ${file} (${lang}, ${Math.round(appHtml.length / 1024)} KB of HTML, ~${words} words)`);
}

await rm('dist-ssr', { recursive: true, force: true });
