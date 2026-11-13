import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, translations } from './translations';
import { collections, projectGalleries } from '../data/collections';

const STORAGE_KEY = 'rena-home-lang';
const HTML_LANG = { sq: 'sq', en: 'en' };

const readStoredLang = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && translations[stored] ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
};

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

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);

  const setLang = useCallback((next) => {
    if (!translations[next]) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode) — the choice still applies for this visit */
    }
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

  // Keep the document language and description in sync for screen readers and SEO.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t.meta.description);
  }, [lang, value.t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
