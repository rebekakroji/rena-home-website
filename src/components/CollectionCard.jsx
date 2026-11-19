import { coverOf } from '../data/collections';
import { useLanguage } from '../i18n/LanguageContext';
import Img from './Img';
import { ArrowRight } from './Icons';

// Displayed width of each card in the collections grid (global.css .collections__item--N), so the browser
// downloads a WebP size that matches: desktop 7/12, 5/12, 4/12 ×3 and full width; tablet full / half;
// phones full width.
const CARD_SIZES = [
  '(min-width: 961px) 58vw, 100vw',
  '(min-width: 961px) 42vw, (min-width: 641px) 50vw, 100vw',
  '(min-width: 961px) 34vw, (min-width: 641px) 50vw, 100vw',
  '(min-width: 961px) 34vw, (min-width: 641px) 50vw, 100vw',
  '(min-width: 961px) 34vw, (min-width: 641px) 50vw, 100vw',
  '100vw',
];

export default function CollectionCard({ collection, index, className = '' }) {
  const { t } = useLanguage();
  const cover = coverOf(collection);
  const count = collection.images.length;

  return (
    <a
      href={`#/koleksioni/${collection.slug}`}
      className={`ccard ${className}`}
      aria-label={t.card.aria(collection.name, count)}
    >
      <div className="ccard__media">
        <Img image={cover} sizes={CARD_SIZES[index] ?? '(min-width: 961px) 50vw, 100vw'} className="ccard__img" />
        <span className="ccard__veil" aria-hidden="true" />
      </div>
      <div className="ccard__body">
        <span className="ccard__num">{String(index + 1).padStart(2, '0')}</span>
        <div className="ccard__text">
          <h3 className="ccard__title">{collection.name}</h3>
          <p className="ccard__tagline">{collection.tagline}</p>
        </div>
        <span className="ccard__cta">
          <span className="ccard__cta-label">{t.card.explore}</span>
          <span className="ccard__cta-icon">
            <ArrowRight width={18} height={18} />
          </span>
        </span>
      </div>
      <span className="ccard__count">{t.card.photos(count)}</span>
    </a>
  );
}
