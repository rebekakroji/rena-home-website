# RENA HOME — website

Bilingual (Albanian / English) website for RENA HOME, furniture and interior design since 1993.
Built with React 18 and Vite 5. It is a fully static site: no server, database or API keys.

## Run locally

Requires Node.js 18 or newer.

```bash
npm install      # install dependencies
npm run dev      # local development server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Deploy (GitHub Pages)

Every push to `main` builds and deploys the site with GitHub Actions
(`.github/workflows/deploy.yml`, official `actions/upload-pages-artifact` and `actions/deploy-pages`).
It can also be started manually: **Actions → Deploy to GitHub Pages → Run workflow**.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

- The build uses a **relative base path** (`base: './'` in `vite.config.js`), so the same output works at
  `https://<user>.github.io/rena-home-website/` and at a custom domain. Files from `public/` are referenced in code
  through `BASE` (`src/data/site.js`), never as `/images/...`.
- `npm run build` runs `scripts/check-dist.mjs` afterwards and fails if any root-absolute or missing path ends up in `dist/`.
- Pages use hash URLs (for example `#/koleksioni/kuzhina`), so no 404 or redirect setup is needed.

### When the domain is connected

1. Add a file `public/CNAME` containing only the domain (for example `renahome.al`), commit and push.
2. In **Settings → Pages → Custom domain**, enter the same domain and enable **Enforce HTTPS** once the certificate is ready.
3. At the domain registrar, point DNS to GitHub Pages: for the root domain four `A` records
   (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153); for `www` a `CNAME` record to `<user>.github.io`.
4. In `index.html`, change `og:image` to the full address, e.g. `https://<domain>/images/projects/projekt2.jpeg`,
   so link previews on Facebook, WhatsApp and similar apps show the image. Optionally add
   `<link rel="canonical" href="https://<domain>/" />`.

No code or base-path change is needed for the domain.

## Where to edit content

| What                                                   | File                             |
| ------------------------------------------------------ | -------------------------------- |
| All text, in both languages                            | `src/i18n/translations.js`       |
| Address, phone numbers, email, Instagram, WhatsApp     | `src/data/site.js`               |
| Collections, projects, photos and cover images         | `src/data/collections.js`        |
| Photos                                                 | `public/images/<collection>/`    |

Photo descriptions (shown as captions in the full-screen gallery) are in `translations.js`,
keyed by file name. When adding a photo, add its description in both `sq` and `en`.
