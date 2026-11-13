import { LANGUAGES } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';

// Minimal "AL | EN" toggle. Switching re-renders the page in place — no reload.
export default function LanguageSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className={`lang ${className}`} role="group" aria-label={t.header.language}>
      {LANGUAGES.map(({ code, label }, i) => (
        <span key={code} className="lang__item">
          {i > 0 && (
            <span className="lang__sep" aria-hidden="true">
              |
            </span>
          )}
          <button
            type="button"
            className={`lang__btn ${lang === code ? 'is-active' : ''}`}
            aria-pressed={lang === code}
            aria-label={`${label} — ${t.header.languageNames[code]}`}
            title={t.header.languageNames[code]}
            lang={code}
            onClick={() => setLang(code)}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
