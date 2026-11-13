import { useEffect, useRef, useState } from 'react';
import { useHashRoute } from './hooks/useHashRoute';
import { navLinks } from './data/site';
import { useLanguage } from './i18n/LanguageContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Collections from './components/Collections';
import Projects from './components/Projects';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CollectionPage from './components/CollectionPage';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const route = useHashRoute();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('kryefaqja');
  const prevPage = useRef(route.page);

  // Scroll handling between the homepage sections and collection pages.
  useEffect(() => {
    const cameFromOtherPage = prevPage.current !== route.page;
    prevPage.current = route.page;

    if (route.page === 'collection') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (!route.section) {
      if (cameFromOtherPage) window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const el = document.getElementById(route.section);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: cameFromOtherPage ? 'instant' : 'smooth' }));
    }
  }, [route]);

  // Homepage title follows the active language (collection pages set their own).
  useEffect(() => {
    if (route.page !== 'collection') document.title = t.meta.title;
  }, [route.page, t]);

  // Highlight the nav item for the section currently in view.
  useEffect(() => {
    if (route.page !== 'home') {
      setActiveSection('koleksionet');
      return;
    }
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [route.page]);

  return (
    <>
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault();
        document.getElementById('main')?.focus();
      }}>
        {t.skipLink}
      </a>
      <Header activeSection={activeSection} solid={route.page === 'collection'} />
      <main id="main" tabIndex={-1}>
        {route.page === 'collection' ? (
          <CollectionPage key={route.slug} slug={route.slug} />
        ) : (
          <>
            <Hero />
            <About />
            <Collections />
            <Projects />
            <WhyUs />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
