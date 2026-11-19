// Base path of the deployed site ("./" by default, see vite.config.js). Prefix every
// file from public/ with it so images work on the GitHub Pages URL and on a custom domain.
// Vite turns the relative base into "/" for the build-time (SSR) render; use the same "./" there so the
// prerendered HTML and the browser render produce identical paths (and the check in check-dist passes).
export const BASE = import.meta.env.SSR && !process.env.VITE_BASE ? './' : import.meta.env.BASE_URL;

// Only verified business information, as provided by the business.
// Translatable text (opening hours, navigation labels) lives in src/i18n/translations.js.

// WhatsApp chat link in the official wa.me format: international number, digits only.
// An optional message pre-fills the chat.
export const whatsappUrl = (tel, text) =>
  `https://wa.me/${tel.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const site = {
  name: 'RENA HOME',
  since: 1993,
  address: 'Tirane - Fushe Kruje km 14 Nikel',
  // `display` is shown to visitors; `tel` is the dialable form used in tel: links.
  phones: [
    { display: '+355 68 200 0776', tel: '+355682000776' },
    { display: '+355 68 803 8291', tel: '+355688038291' },
    { display: '+355 69 452 8877', tel: '+355694528877' },
  ],
  email: 'mobilerirena1993@gmail.com',
  instagramHandle: '@mobileri_rena',
  instagramUrl: 'https://www.instagram.com/mobileri_rena/',
  instagramDmUrl: 'https://ig.me/m/mobileri_rena',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('RENA HOME, Tirane - Fushe Kruje km 14, Nikel'),
  logo: `${BASE}images/logo/rena-logo.jpeg`,
};

// Videos in public/videos/ (H.264, 576×1024 portrait, "faststart" so playback begins while loading).
// Posters are the frames shown before the video plays.
export const videos = {
  // Showroom walk-through, no audio track. Homepage hero.
  hero: { src: `${BASE}videos/hero-renahome.mp4`, poster: `${BASE}videos/hero-renahome-poster.jpg` },
  // Workshop: CNC machining and carved oak panels, with sound. "The art of woodworking" section.
  craft: { src: `${BASE}videos/production-renahome.mp4`, poster: `${BASE}videos/production-renahome-poster.jpg` },
};

// Section ids double as URL anchors, so they stay the same in every language.
// Labels come from `t.nav[id]`. Links with `href` open a separate page instead of a homepage section.
export const navLinks = [
  { id: 'kryefaqja' },
  { id: 'koleksionet' },
  { id: 'projektet' },
  { id: 'dizajno', href: '#/dizajno' },
  { id: 'rreth-nesh' },
  { id: 'kontakt' },
];

export const navHref = (link) => link.href || `#${link.id}`;
