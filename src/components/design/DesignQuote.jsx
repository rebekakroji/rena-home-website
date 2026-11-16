import { useState } from 'react';
import { site, whatsappUrl } from '../../data/site';
import { ArrowRight, WhatsApp } from '../Icons';

// "Request a Quote": the customer picks one of the business WhatsApp numbers; the chat opens
// with their selections pre-filled. (WhatsApp links cannot attach the photo — the message says so.)
export default function DesignQuote({ message, d }) {
  const [open, setOpen] = useState(false);
  const r = d.result;

  return (
    <div className={`ds-quote ${open ? 'is-open' : ''}`}>
      <button type="button" className="btn btn--dark ds-quote__btn" aria-expanded={open} aria-controls="ds-quote-list" onClick={() => setOpen((v) => !v)}>
        <WhatsApp width={18} height={18} /> {r.quote}
      </button>
      <div id="ds-quote-list" className="ds-quote__panel" hidden={!open}>
        <p className="ds-quote__label">{r.quoteChoose}</p>
        <ul className="ds-quote__list">
          {site.phones.map((ph) => (
            <li key={ph.tel}>
              <a
                href={whatsappUrl(ph.tel, message)}
                target="_blank"
                rel="noopener noreferrer"
                className="ds-quote__option"
                onClick={() => setOpen(false)}
              >
                <span className="ds-quote__icon" aria-hidden="true">
                  <WhatsApp width={15} height={15} />
                </span>
                <span className="ds-quote__number">{ph.display}</span>
                <ArrowRight width={16} height={16} />
              </a>
            </li>
          ))}
        </ul>
        <p className="ds-quote__hint">{r.quoteHint}</p>
      </div>
    </div>
  );
}
