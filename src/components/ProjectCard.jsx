import { useState } from 'react';
import { coverOf } from '../data/collections';
import { useLanguage } from '../i18n/LanguageContext';
import Img from './Img';
import Lightbox from './Lightbox';
import { ArrowRight } from './Icons';

// A completed project shown as a card in the existing collection-card style.
// Clicking it opens the full-screen gallery with all of the project's photos.
export default function ProjectCard({ project }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);
  const cover = coverOf(project);
  const count = project.images.length;

  return (
    <>
      <button
        type="button"
        className="ccard ccard--project"
        onClick={() => setActive(0)}
        aria-label={project.open(project.name, count)}
      >
        <span className="ccard__media">
          <Img image={cover} sizes="(min-width: 641px) 50vw, 100vw" className="ccard__img" />
          <span className="ccard__veil" aria-hidden="true" />
        </span>
        <span className="ccard__body">
          <span className="ccard__num">{String(project.number).padStart(2, '0')}</span>
          <span className="ccard__text">
            <span className="ccard__title">{project.name}</span>
            <span className="ccard__tagline">{project.tagline}</span>
          </span>
          <span className="ccard__cta">
            <span className="ccard__cta-label">{project.cta}</span>
            <span className="ccard__cta-icon">
              <ArrowRight width={18} height={18} />
            </span>
          </span>
        </span>
        <span className="ccard__count">{t.card.photos(count)}</span>
      </button>

      <Lightbox
        images={project.images}
        index={active}
        onChange={setActive}
        onClose={() => setActive(null)}
        title={project.name}
      />
    </>
  );
}
