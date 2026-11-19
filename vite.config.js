import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Root base path: the site is served from the root of https://mobilerirena.com (the GitHub Pages
  // project URL redirects there). Absolute "/assets/…" and "/images/…" paths work from every language page
  // (/, /en/, /it/); relative "./" paths would break under /en/ and /it/.
  // Override with VITE_BASE only if the site is ever served from a sub-folder (it must end with "/").
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
  // Year of the build: the footer renders it first so the prerendered HTML and the browser match.
  define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
});
