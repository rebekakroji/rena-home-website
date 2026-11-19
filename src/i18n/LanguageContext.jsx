import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, translations } from './translations';
import { OG_LOCALE, langFromPath, langPath, langUrl } from './languageUrls';
import { collections, projectGalleries } from '../data/collections';

const HTML_LANG = { sq: 'sq', en: 'en', it: 'it' };

// Language of the current URL (/, /en/, /it/). At build time the prerenderer passes it explicitly.
const langFromLocation = () => (typeof window === 'undefined' ? DEFAULT_LANG : langFromPath(window.location.pathname));

// Merges the language-neutral collection data (images, sizes) with the
// translated names, taglines, descriptions and image descriptions.
const localize = (items, texts) =>
  items.map((item) => {
    const { alts, ...text } = texts[item.slug];
    return {
      ...item,
      ...text,
      images: item.images.map((image) => ({ ...image, alt: alts[image.file] ?? '' })),
    };
  });

const setMeta = (selector, attr, value) => document.querySelector(selector)?.setAttribute(attr, value);

const LanguageContext = createContext(null);

export function LanguageProvider({ children, initialLang }) {
  const [lang, setLangState] = useState(() => initialLang ?? langFromLocation());

  // Switching language moves to that language's URL (/, /en/, /it/), keeping the current #section or
  // #/page, without reloading. Back/forward restore the language from the URL (popstate below).
  const setLang = useCallback((next) => {
    if (!translations[next]) return;
    setLangState(next);
    const target = langPath(next) + window.location.hash;
    if (window.location.pathname + window.location.hash !== target) window.history.pushState(null, '', target);
  }, []);

  useEffect(() => {
    const onPopState = () => setLangState(langFromLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const value = useMemo(() => {
    const t = translations[lang];
    const localized = localize(collections, t.collections);
    const projects = projectGalleries.map((g) => {
      if (!g.imagesFrom) return localize([g], t.projectGalleries)[0];
      const { alts, ...text } = t.projectGalleries[g.slug];
      return { ...g, ...text, images: localized.find((c) => c.slug === g.imagesFrom).images };
    });
    return {
      lang,
      setLang,
      t,
      collections: localized,
      getCollection: (slug) => localized.find((c) => c.slug === slug),
      projectGalleries: projects,
    };
  }, [lang, setLang]);

  // Keep the document language and the page metadata in sync with the language shown
  // (the prerendered pages already contain the same values; this covers in-page language switches).
  useEffect(() => {
    const m = value.t.meta;
    document.documentElement.lang = HTML_LANG[lang];
    setMeta('meta[name="description"]', 'content', m.description);
    setMeta('link[rel="canonical"]', 'href', langUrl(lang));
    setMeta('meta[property="og:url"]', 'content', langUrl(lang));
    setMeta('meta[property="og:title"]', 'content', m.title);
    setMeta('meta[property="og:description"]', 'content', m.description);
    setMeta('meta[property="og:image:alt"]', 'content', m.imageAlt);
    setMeta('meta[property="og:locale"]', 'content', OG_LOCALE[lang]);
    const others = Object.keys(OG_LOCALE).filter((code) => code !== lang);
    document.querySelectorAll('meta[property="og:locale:alternate"]').forEach((el, i) => others[i] && el.setAttribute('content', OG_LOCALE[others[i]]));
    setMeta('meta[name="twitter:title"]', 'content', m.title);
    setMeta('meta[name="twitter:description"]', 'content', m.description);
    setMeta('meta[name="twitter:image:alt"]', 'content', m.imageAlt);
  }, [lang, value.t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
