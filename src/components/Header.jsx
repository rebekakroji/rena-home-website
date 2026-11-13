import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site';
import { useScrollLock } from '../hooks/useScrollLock';
import { useLanguage } from '../i18n/LanguageContext';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { Instagram } from './Icons';

export default function Header({ activeSection, solid }) {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  // Close the mobile menu when switching to a desktop layout.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 961px)');
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${scrolled || solid ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="header__inner container">
        <Logo onClick={closeMenu} />

        <nav className="header__nav" aria-label={t.header.mainNav}>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`header__link ${activeSection === link.id ? 'is-active' : ''}`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                >
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__end">
          <LanguageSwitcher />

          <a href="#kontakt" className="btn btn--small btn--dark header__cta">
            {t.header.cta}
          </a>

          <button
            type="button"
            className="header__toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="header__toggle-lines" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="mobile-menu" aria-hidden={!menuOpen} inert={menuOpen ? undefined : ''}>
        <nav aria-label={t.header.mobileNav}>
          <ol className="mobile-menu__list">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--i': i }}>
                <a href={`#${link.id}`} onClick={closeMenu}>
                  <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-menu__foot">
          <p>{site.address}</p>
          <p>{t.site.hours}</p>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" className="mobile-menu__ig">
            <Instagram width={18} height={18} /> {site.instagramHandle}
          </a>
        </div>
      </div>
    </header>
  );
}
