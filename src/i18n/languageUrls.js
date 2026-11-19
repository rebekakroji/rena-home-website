// Language ↔ URL mapping. The page language comes from the URL path:
//   /     → Albanian (default)   /en/ → English   /it/ → Italian
// Hash navigation (#koleksionet, #/koleksioni/<slug>, #/dizajno) works the same under every language path.
import { DEFAULT_LANG, translations } from './translations';

const BASE = import.meta.env.BASE_URL; // "/" (see vite.config.js)

export const SITE_URL = 'https://mobilerirena.com';

// Path of a language's homepage, e.g. "/" or "/en/".
export const langPath = (lang) => (lang === DEFAULT_LANG ? BASE : `${BASE}${lang}/`);

// Absolute URL of a language's homepage (canonical / hreflang / Open Graph).
export const langUrl = (lang) => `${SITE_URL}${langPath(lang)}`;

// Language for a URL path: "/en/", "/en" and "/en/index.html" → "en"; anything else → Albanian.
export const langFromPath = (pathname = '/') => {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, '');
  const first = rest.split('/')[0];
  return first !== DEFAULT_LANG && translations[first] ? first : DEFAULT_LANG;
};

// Open Graph locale per language.
export const OG_LOCALE = { sq: 'sq_AL', en: 'en_GB', it: 'it_IT' };
