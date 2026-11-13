import { navLinks, site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';
import { Instagram } from './Icons';

export default function Footer() {
  const { t, collections } = useLanguage();
  const f = t.footer;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo tone="light" />
            <p>{f.brand(site.since)}</p>
            <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="footer__ig">
              <Instagram width={18} height={18} /> {site.instagramHandle}
            </a>
          </div>

          <nav className="footer__col" aria-label={f.navAria}>
            <h2 className="footer__heading">{f.navHeading}</h2>
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`}>{t.nav[l.id]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label={f.collectionsHeading}>
            <h2 className="footer__heading">{f.collectionsHeading}</h2>
            <ul>
              {collections.map((c) => (
                <li key={c.slug}>
                  <a href={`#/koleksioni/${c.slug}`}>{c.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__heading">{f.visitHeading}</h2>
            <address>
              <p>{site.name}</p>
              <p>{site.address}</p>
              <p>{t.site.hours}</p>
              {site.phones.map((ph) => (
                <p key={ph.tel}>
                  <a href={`tel:${ph.tel}`} aria-label={`${f.call} ${ph.display}`}>
                    {ph.display}
                  </a>
                </p>
              ))}
              <p>
                <a href={`mailto:${site.email}`} className="footer__email">
                  {site.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <p className="footer__word" aria-hidden="true">
          RENA HOME
        </p>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. {f.rights}
          </p>
          <a href="#kryefaqja" className="footer__top-link">
            {f.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
