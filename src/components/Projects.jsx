import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Img from './Img';
import Lightbox from './Lightbox';
import { ArrowRight, Expand } from './Icons';

export default function Projects() {
  const { t, getCollection } = useLanguage();
  const p = t.projects;
  const projects = getCollection('projekte');
  const [active, setActive] = useState(null);

  return (
    <section id="projektet" className="projects section" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section-head">
          <Eyebrow index="03" light>
            {p.eyebrow}
          </Eyebrow>
          <div className="section-head__row">
            <h2 id="projects-title" className="h2">
              {p.title.before}<em>{p.title.em}</em>{p.title.after}
            </h2>
            <p className="section-head__text">{p.text}</p>
          </div>
        </Reveal>

        <ol className="projects__grid">
          {projects.images.map((image, i) => (
            <Reveal as="li" key={image.src} className={`project project--${i + 1}`} delay={(i % 2) * 140}>
              <button
                type="button"
                className="project__btn"
                onClick={() => setActive(i)}
                aria-label={p.viewFull(image.alt)}
              >
                <span className="project__media">
                  <Img image={image} sizes="(min-width: 961px) 45vw, 100vw" />
                  <span className="project__zoom" aria-hidden="true">
                    <Expand width={20} height={20} />
                  </span>
                </span>
                <span className="project__caption">
                  <span className="project__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="project__title">{p.captions[i]}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </ol>

        <Reveal className="projects__more">
          <a href="#/koleksioni/projekte" className="btn btn--light">
            {p.more} <ArrowRight width={18} height={18} />
          </a>
        </Reveal>
      </div>

      <Lightbox
        images={projects.images}
        index={active}
        onChange={setActive}
        onClose={() => setActive(null)}
        title={projects.name}
      />
    </section>
  );
}

