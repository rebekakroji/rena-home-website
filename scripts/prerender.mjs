// Build-time prerendering: writes the rendered Albanian homepage into dist/index.html, so the page content
// (headings, text, business details) is in the HTML for search engines and AI crawlers that do not run
// JavaScript. In the browser React hydrates this HTML (see src/main.jsx); nothing changes for visitors.
//
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.

import { readFile, writeFile, rm } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const htmlPath = 'dist/index.html';
const serverEntry = resolve('dist-ssr/entry-server.js');

const html = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (html.split(marker).length !== 2) {
  console.error(`prerender: expected exactly one ${marker} in ${htmlPath}`);
  process.exit(1);
}

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();
if (!appHtml || !appHtml.includes('id="kryefaqja"')) {
  console.error('prerender: rendered HTML does not contain the homepage');
  process.exit(1);
}

await writeFile(htmlPath, html.replace(marker, `<div id="root">${appHtml}</div>`));
await rm('dist-ssr', { recursive: true, force: true });

const words = appHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
console.log(`prerender: homepage written to ${htmlPath} (${Math.round(appHtml.length / 1024)} KB of HTML, ~${words} words)`);
