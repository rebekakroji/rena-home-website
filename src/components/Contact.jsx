import { cloneElement, useState } from 'react';
import { site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import { ArrowRight, ArrowUpRight, Clock, Instagram, Mail, Phone, Pin } from './Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{7,}$/;

// Returns translation keys (not text), so messages follow a language switch.
const validate = ({ name, contact, message }) => {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'nameRequired';
  if (!contact.trim()) errors.contact = 'contactRequired';
  else if (!EMAIL_RE.test(contact.trim()) && !PHONE_RE.test(contact.trim())) errors.contact = 'contactInvalid';
  if (message.trim().length < 10) errors.message = 'messageShort';
  return errors;
};

// The form prepares the message and hands it to Instagram Direct. Phone numbers
// (tel:) and the business email (mailto:) are listed alongside.
export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;
  const [values, setValues] = useState({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | ready
  const [copied, setCopied] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const composed = c.composed({
    message: values.message.trim(),
    name: values.name.trim(),
    contact: values.contact.trim(),
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
    } catch {
      setCopied(false);
    }
    setStatus('ready');
  };

  const reset = () => {
    setValues({ name: '', contact: '', message: '' });
    setStatus('idle');
    setCopied(false);
  };

  const errorText = (field) => (errors[field] ? c.errors[errors[field]] : undefined);

  return (
    <section id="kontakt" className="contact section" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <Reveal className="contact__info">
          <Eyebrow index="05">{c.eyebrow}</Eyebrow>
          <h2 id="contact-title" className="h2">
            {c.title.before}<em>{c.title.em}</em>{c.title.after}
          </h2>
          <p className="contact__lead">{c.lead}</p>

          <ul className="contact__list">
            <li>
              <Pin />
              <div>
                <span className="contact__label">{c.address}</span>
                <span>{site.address}</span>
              </div>
            </li>
            <li>
              <Phone />
              <div>
                <span className="contact__label">{c.phone}</span>
                {site.phones.map((ph) => (
                  <a key={ph.tel} href={`tel:${ph.tel}`} className="link">
                    {ph.display}
                  </a>
                ))}
              </div>
            </li>
            <li>
              <Mail />
              <div>
                <span className="contact__label">{c.email}</span>
                <a href={`mailto:${site.email}`} className="link contact__email">
                  {site.email.split('@')[0]}@<wbr />
                  {site.email.split('@')[1]}
                </a>
              </div>
            </li>
            <li>
              <Clock />
              <div>
                <span className="contact__label">{c.hours}</span>
                <span>{t.site.hours}</span>
              </div>
            </li>
            <li>
              <Instagram />
              <div>
                <span className="contact__label">{c.instagram}</span>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="link">
                  {site.instagramHandle}
                </a>
              </div>
            </li>
          </ul>

          <div className="contact__actions">
            <a href={site.instagramDmUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
              <Instagram width={18} height={18} /> {c.dm}
            </a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              {c.maps} <ArrowUpRight width={16} height={16} />
            </a>
          </div>
        </Reveal>

        <Reveal className="contact__form-wrap" delay={140}>
          {status === 'ready' ? (
            <div className="contact__done" role="status">
              <p className="contact__done-kicker">{c.thanks(values.name.trim().split(' ')[0])}</p>
              <h3 className="contact__done-title">{c.readyTitle}</h3>
              <p>{copied ? c.readyCopied(site.instagramHandle) : c.readyManual(site.instagramHandle)}</p>
              <pre className="contact__preview">{composed}</pre>
              <div className="contact__actions">
                <a href={site.instagramDmUrl} target="_blank" rel="noopener noreferrer" className="btn btn--dark">
                  {c.openInstagram} <ArrowUpRight width={16} height={16} />
                </a>
                <button type="button" className="btn btn--ghost" onClick={reset}>
                  {c.another}
                </button>
              </div>
            </div>
          ) : (
            <form className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
              <h3 id="form-title" className="form__title">
                {c.formTitle}
              </h3>
              <Field id="name" label={c.fields.name} error={errorText('name')}>
                <input id="f-name" name="name" type="text" autoComplete="name" value={values.name} onChange={update} />
              </Field>
              <Field id="contact" label={c.fields.contact} error={errorText('contact')}>
                <input id="f-contact" name="contact" type="text" autoComplete="email" inputMode="email" value={values.contact} onChange={update} />
              </Field>
              <Field id="message" label={c.fields.message} error={errorText('message')}>
                <textarea id="f-message" name="message" rows="5" value={values.message} onChange={update} />
              </Field>
              <button type="submit" className="btn btn--dark form__submit">
                {c.submit} <ArrowRight width={18} height={18} />
              </button>
              <p className="form__note">{c.note}</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }) {
  const child = cloneElement(children, {
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': error ? `e-${id}` : undefined,
    placeholder: ' ',
  });
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      {child}
      <label htmlFor={`f-${id}`}>{label}</label>
      <span className="field__line" aria-hidden="true" />
      {error && (
        <span id={`e-${id}`} className="field__error">
          {error}
        </span>
      )}
    </div>
  );
}
