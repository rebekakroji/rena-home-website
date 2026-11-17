import { useLanguage } from '../i18n/LanguageContext';
import Reveal from './Reveal';
import Img from './Img';
import { ArrowRight, Sparkle } from './Icons';

// Homepage promotion for the AI design studio (#/dizajno), placed right after the hero.
export default function DesignPromo() {
  const { t, getCollection } = useLanguage();
  const p = t.promo;
  // Wooden wall unit with an illuminated display cabinet and an oval dining table (projekt3.jpeg).
  const visual = getCollection('projekte').images[2];
  const last = p.title.length - 1;

  return (
    <section id="krijo" className="promo" aria-labelledby="promo-title">
      <div className="container">
        <Reveal className="promo__card">
          <div className="promo__media">
            <Img image={visual} className="promo__img" sizes="(min-width: 961px) 42vw, 100vw" />
          </div>

          <div className="promo__body">
            <p className="promo__badge">
              <Sparkle width={14} height={14} aria-hidden="true" />
              {p.badge}
            </p>
            <h2 id="promo-title" className="promo__title">
              {p.title.map((line, i) => (
                <span key={i} className="promo__line">
                  {i === last ? <em>{line}</em> : line}
                </span>
              ))}
            </h2>
            <p className="promo__text">{p.text}</p>
            <a href="#/dizajno" className="btn btn--dark promo__cta">
              {p.cta} <ArrowRight width={18} height={18} />
            </a>
            <p className="promo__note">{p.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
