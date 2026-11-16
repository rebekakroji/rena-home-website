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

## DESIGN WITH RENA HOME (`#/dizajno`)

Room → photo → style, colour, material and preferences → generated design, with **Request a quote** via WhatsApp
(the message lists the selections in the visitor's language).

### How AI generation works

```
Browser (GitHub Pages)                         Cloudflare Worker (/cloudflare-worker)           Workers AI
photo resized to ≤ 512×512 JPEG,  ── POST ──▶  validates origin, rate limit, file type/size,  ──▶  @cf/black-forest-labs/
metadata (GPS) stripped           multipart    image dimensions and option ids; builds the        flux-2-klein-4b
+ options { room, style, … }                   English prompt; calls env.AI.run (binding)
                                  ◀── JSON ──  { imageBase64, mimeType }
```

- **No API token exists anywhere.** The Worker uses the Workers AI **binding** (`[ai]` in `wrangler.toml`), which is
  authorised inside Cloudflare. The website only knows the Worker's public URL (`VITE_DESIGN_API_URL`).
- Until `VITE_DESIGN_API_URL` is set, the page shows "AI coming soon", sends nothing and the photo never leaves the browser.
- The photo stays in the browser until the visitor clicks **Generate my design**; the privacy notes on the page say so
  in all three languages. Neither the Worker nor RENA HOME stores photos (no database, no storage).
- The prompt is assembled server-side from fixed English phrases; only option ids are accepted, so visitors cannot send
  free text to the model.

### Cost and free quota

- Workers AI includes **10,000 neurons per day free** (Free and Paid plans, reset 00:00 UTC). On the **Free plan**,
  requests beyond that fail (the page shows its error message) and **nothing is billed**.
- FLUX.2 [klein] 4B: 5.37 neurons per 512×512 input tile + 26.05 neurons per 512×512 output tile. One design
  (≤ 512 px input, 1024×768 output) ≈ **84–110 neurons** → roughly **90–115 free designs per day**; on the Paid plan
  about **$0.001 per design** beyond the free allocation ($0.011 per 1,000 neurons).
- Check current prices: <https://developers.cloudflare.com/workers-ai/platform/pricing/>

### Deploy the Worker (one time)

Requires a Cloudflare account (the Free plan is enough) and Node.js 20+.

```bash
cd cloudflare-worker
npm test                     # unit tests with a mocked AI binding — free, no Cloudflare calls
npx wrangler@4 login         # opens the browser to authorise Wrangler on your Cloudflare account
npx wrangler@4 deploy        # prints the URL, e.g. https://rena-home-design-api.<account>.workers.dev
```

> `npx wrangler dev` runs the Worker locally but **calls the real Workers AI** (uses neurons). Use `npm test` for free checks.

Then connect the website:

1. GitHub → repository → **Settings → Secrets and variables → Actions → Variables → New repository variable**:
   `VITE_DESIGN_API_URL` = the Worker URL. (A *variable*, not a secret: it is public by design.)
2. Re-run **Actions → Deploy to GitHub Pages** (or push to `main`).
3. Local development: put the same URL in `.env.local` (see `.env.example`) and run `npm run dev`.

### Configuration (`cloudflare-worker/wrangler.toml`)

| Setting | Purpose |
| --- | --- |
| `ALLOWED_ORIGINS` | Exact origins allowed to call the API (CORS + origin check). Currently GitHub Pages and `localhost:5173/4173`. **Add the RENA HOME domain** (with and without `www`) when it is purchased, then `npx wrangler@4 deploy` again. |
| `[[ratelimits]]` `RATE_LIMITER` | 5 designs per 60 s per visitor IP. Approximate and counted per Cloudflare location. |
| `[ai]` `AI` | Workers AI binding — no token. |

Abuse protection: origin allow-list, per-IP rate limit, request/file size limits (2 MB), real image type and
dimension checks (≤ 512×512), strict option validation. The origin check stops other websites, not scripts; the
rate limit and the Free plan's hard daily cap bound the cost. If stronger protection is ever needed, add Cloudflare
Turnstile to the Generate button.

### Changing options

Rooms, styles, colours, materials and preferences are listed in `src/data/designOptions.js` (labels in
`translations.js` under `designStudio`) **and** in `cloudflare-worker/src/prompt.js` (English prompt phrases).
Keep both lists in sync — the Worker rejects unknown ids.

## Where to edit content

| What                                                   | File                             |
| ------------------------------------------------------ | -------------------------------- |
| All text, in both languages                            | `src/i18n/translations.js`       |
| Address, phone numbers, email, Instagram, WhatsApp     | `src/data/site.js`               |
| Collections, projects, photos and cover images         | `src/data/collections.js`        |
| Photos                                                 | `public/images/<collection>/`    |

Photo descriptions (shown as captions in the full-screen gallery) are in `translations.js`,
keyed by file name. When adding a photo, add its description in both `sq` and `en`.
