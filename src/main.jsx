import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { LanguageProvider, readStoredLang } from './i18n/LanguageContext';
import { DEFAULT_LANG } from './i18n/translations';
import { readRoute } from './hooks/useHashRoute';
import './styles/global.css';

const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);

// The production index.html already contains the Albanian homepage, rendered at build time
// (scripts/prerender.mjs) so that search engines and AI crawlers can read it without JavaScript.
// React takes over that HTML ("hydrates" it) when the visitor sees exactly that page. With another
// saved language or a #/ page (collection, design studio) the page is rendered fresh, as before.
const container = document.getElementById('root');
const prerendered = container.hasChildNodes();

if (prerendered && readStoredLang() === DEFAULT_LANG && readRoute().page === 'home') {
  hydrateRoot(container, app);
} else {
  if (prerendered) container.textContent = '';
  createRoot(container).render(app);
}
