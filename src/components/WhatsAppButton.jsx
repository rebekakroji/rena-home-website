import { useEffect, useRef, useState } from 'react';
import { site, whatsappUrl } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { Close, WhatsApp } from './Icons';

// Floating WhatsApp button (bottom-right). Opens a small menu with one chat
// link per business phone number. Closes on outside click, Escape, or after a choice.
export default function WhatsAppButton() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`wa ${open ? 'is-open' : ''}`}>
      <div id="wa-menu" className="wa__menu" aria-hidden={!open} inert={open ? undefined : ''}>
        <p className="wa__title">{t.whatsapp.label}</p>
        <ul className="wa__list">
          {site.phones.map((ph) => (
            <li key={ph.tel}>
              <a
                href={whatsappUrl(ph.tel)}
                target="_blank"
                rel="noopener noreferrer"
                className="wa__option"
                aria-label={t.whatsapp.chat(ph.display)}
                onClick={() => setOpen(false)}
              >
                <span className="wa__option-icon">
                  <WhatsApp width={16} height={16} />
                </span>
                <span className="wa__number">{ph.display}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        ref={toggleRef}
        type="button"
        className="wa__toggle"
        aria-expanded={open}
        aria-controls="wa-menu"
        aria-label={t.whatsapp.label}
        title={t.whatsapp.label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="wa__glyph wa__glyph--logo">
          <WhatsApp width={30} height={30} />
        </span>
        <span className="wa__glyph wa__glyph--close">
          <Close width={24} height={24} strokeWidth={1.75} />
        </span>
      </button>
    </div>
  );
}
