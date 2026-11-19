// Build-time renderer used by scripts/prerender.mjs: renders the homepage in one language to HTML and
// provides that language's page metadata. Must render the same tree as src/main.jsx (without the stylesheet).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { LANGUAGES, DEFAULT_LANG, translations } from './i18n/translations';
import { OG_LOCALE, langPath, langUrl } from './i18n/languageUrls';

export const languages = LANGUAGES.map((l) => l.code);
export const defaultLang = DEFAULT_LANG;

export function render(lang) {
  return renderToString(
    <StrictMode>
      <LanguageProvider initialLang={lang}>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}

// Everything the <head> of a language page needs.
export function pageMeta(lang) {
  const m = translations[lang].meta;
  return {
    lang,
    path: langPath(lang),
    url: langUrl(lang),
    title: m.title,
    description: m.description,
    imageAlt: m.imageAlt,
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlternates: languages.filter((code) => code !== lang).map((code) => OG_LOCALE[code]),
    alternates: [...languages.map((code) => ({ hreflang: code, href: langUrl(code) })), { hreflang: 'x-default', href: langUrl(DEFAULT_LANG) }],
  };
}
