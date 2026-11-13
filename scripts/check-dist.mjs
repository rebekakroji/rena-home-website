// Fails the build if dist/ contains paths that only work at one specific URL
// (root-absolute paths such as "/assets/..." or "/images/..."). With a relative base,
// the same build works on the GitHub Pages project URL and on a custom domain.
// Skipped when an absolute base is set on purpose via VITE_BASE.

import { readdir, readFile, access } from 'node:fs/promises';

if (process.env.VITE_BASE) {
  console.log(`check-dist: skipped (VITE_BASE=${process.env.VITE_BASE})`);
  process.exit(0);
}

const problems = [];

// 1) HTML: every src/href must be relative and point to a file that exists in dist/.
const pages = (await readdir('dist')).filter((f) => f.endsWith('.html'));
for (const page of pages) {
  const html = await readFile(`dist/${page}`, 'utf8');
  const refs = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|#)/.test(ref)) continue;
    if (ref.startsWith('/')) {
      problems.push(`${page}: root-absolute path "${ref}"`);
      continue;
    }
    try {
      await access(`dist/${decodeURI(ref)}`);
    } catch {
      problems.push(`${page}: file missing in dist/: "${ref}"`);
    }
  }
}

// 2) JavaScript: image paths must be built from BASE_URL, never hard-coded as "/images/...".
const scripts = (await readdir('dist/assets')).filter((f) => f.endsWith('.js'));
for (const file of scripts) {
  const js = await readFile(`dist/assets/${file}`, 'utf8');
  const hits = [...new Set(js.match(/["'`]\/images\/[^"'`]*/g) || [])];
  for (const hit of hits) problems.push(`assets/${file}: root-absolute image path ${hit.slice(1)}`);
}

if (problems.length) {
  console.error('check-dist: FAILED\n' + problems.map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log(`check-dist: OK (${pages.length} page, ${scripts.length} script, all paths relative and present)`);
