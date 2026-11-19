// Build-time renderer used by scripts/prerender.mjs: renders the Albanian homepage to HTML.
// Must render the same tree as src/main.jsx (without the stylesheet import).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { LanguageProvider } from './i18n/LanguageContext';

export function render() {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>
  );
}
