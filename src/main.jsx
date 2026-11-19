import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';
import { readRoute } from './hooks/useHashRoute';
import { langFromPath } from './i18n/languageUrls';
import './styles/global.css';

const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// The production pages /, /en/ and /it/ already contain their homepage in that language, rendered at
// build time (scripts/prerender.mjs) so search engines and AI crawlers can read it without JavaScript.
// React takes over that HTML ("hydrates" it) on the homepage when the page's prerendered language matches
// the URL (always true on GitHub Pages; a safeguard if a host ever served e.g. "/en" with the Albanian page).
// For a #/ page (collection, design studio) — or any mismatch — the page is rendered fresh.
const container = document.getElementById('root');
const prerendered = container.hasChildNodes();
const sameLanguage = document.documentElement.lang === langFromPath(window.location.pathname);

if (prerendered && sameLanguage && readRoute().page === 'home') {
  hydrateRoot(container, app);
} else {
  if (prerendered) container.textContent = '';
  createRoot(container).render(app);
}
