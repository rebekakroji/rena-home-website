import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative base path: the same build works at the domain root (https://<domain>/) AND at the
  // GitHub Pages project URL (https://<user>.github.io/<repo>/). The site is a single index.html with
  // hash routes, so "./assets/..." and "./images/..." always resolve correctly.
  // Override with VITE_BASE only if an absolute base is ever required.
  base: process.env.VITE_BASE || './',
  plugins: [react()],
});
