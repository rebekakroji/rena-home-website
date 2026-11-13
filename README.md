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

## Deploy

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages, or regular web hosting).

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Output directory | `dist`          |
| Node version     | 18 or newer     |

Pages use hash URLs (for example `/#/koleksioni/kuzhina`), so no redirect or rewrite rules are needed.

### When the domain is connected

1. Point the domain's DNS to the host and enable HTTPS (most hosts do this automatically).
2. In `index.html`, change `og:image` to the full address, e.g. `https://<domain>/images/projects/projekt2.jpeg`,
   so link previews on Facebook, WhatsApp and similar apps show the image.
3. Optionally add `<link rel="canonical" href="https://<domain>/" />` to `index.html`.

## Where to edit content

| What                                                   | File                             |
| ------------------------------------------------------ | -------------------------------- |
| All text, in both languages                            | `src/i18n/translations.js`       |
| Address, phone numbers, email, Instagram, WhatsApp     | `src/data/site.js`               |
| Collections, projects, photos and cover images         | `src/data/collections.js`        |
| Photos                                                 | `public/images/<collection>/`    |

Photo descriptions (shown as captions in the full-screen gallery) are in `translations.js`,
keyed by file name. When adding a photo, add its description in both `sq` and `en`.
