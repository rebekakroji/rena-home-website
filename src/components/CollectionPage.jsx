import { useEffect } from 'react';
import { coverOf } from '../data/collections';
import { useLanguage } from '../i18n/LanguageContext';
import Gallery from './Gallery';
import Img from './Img';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import { ArrowLeft, ArrowRight } from './Icons';

export default function CollectionPage({ slug }) {
  const { t, collections, getCollection, projectGalleries } = useLanguage();
  const subProjects = projectGalleries.filter((g) => g.parent === slug);
  const p = t.collectionPage;
  const collection = getCollection(slug);
  const index = collections.findIndex((c) => c.slug === slug);

  useEffect(() => {
    document.title = collection ? `${collection.name} — RENA HOME` : p.docTitleMissing;
  }, [collection, p]);

  if (!collection) {
    return (
      <section className="cpage cpage--missing container">
        <h1 className="h2">{p.missing}</h1>
        <a href="#koleksionet" className="btn btn--dark">
          <ArrowLeft width={18} height={18} /> {p.back}
        </a>
      </section>
    );
  }

  const prev = collections[(index - 1 + collections.length) % collections.length];
  const next = collections[(index + 1) % collections.length];

  return (
    <article className="cpage" aria-labelledby="cpage-title">
      <header className="cpage__head container">
        <nav className="cpage__crumbs" aria-label={p.crumbsAria}>
          <a href="#koleksionet" className="cpage__back">
            <span className="cpage__back-icon">
              <ArrowLeft width={18} height={18} />
            </span>
            {p.back}
          </a>
          <span className="cpage__crumb-trail" aria-hidden="true">
            {p.crumbRoot} <span>/</span> {collection.name}
          </span>
        </nav>

        <div className="cpage__intro">
          <p className="cpage__num anim-up" style={{ '--d': '60ms' }}>
            {p.number} {String(index + 1).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}
          </p>
          <h1 id="cpage-title" className="cpage__title">
            <span className="hero__line">
              <span className="anim-line" style={{ '--d': '120ms' }}>
                {collection.name}
              </span>
            </span>
          </h1>
          <div className="cpage__meta anim-up" style={{ '--d': '300ms' }}>
            <p className="cpage__tagline">{collection.tagline}</p>
            <p className="cpage__desc">{collection.description}</p>
            <p className="cpage__count">
              {subProjects.length > 0
                ? p.projectsCount(subProjects.length)
                : t.card.photos(collection.images.length)}
            </p>
          </div>
        </div>
      </header>

      {subProjects.length > 0 ? (
        // Collections made of several projects show one identical card per project.
        <ul className="container cpage__projects" aria-label={p.projectsAria}>
          {subProjects.map((project, i) => (
            <Reveal as="li" key={project.slug} className="cpage__project" delay={i * 110}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <div className="container cpage__gallery">
          <Gallery images={collection.images} title={collection.name} />
        </div>
      )}

      <nav className="cpage__pager container" aria-label={p.pagerAria}>
        {[
          { c: prev, label: p.prev, dir: 'prev' },
          { c: next, label: p.next, dir: 'next' },
        ].map(({ c, label, dir }) => (
          <a key={dir} href={`#/koleksioni/${c.slug}`} className={`pager pager--${dir}`}>
            <span className="pager__media">
              <Img image={coverOf(c)} sizes="50vw" />
            </span>
            <span className="pager__text">
              <span className="pager__label">
                {dir === 'prev' && <ArrowLeft width={16} height={16} />}
                {label}
                {dir === 'next' && <ArrowRight width={16} height={16} />}
              </span>
              <span className="pager__name">{c.name}</span>
            </span>
          </a>
        ))}
      </nav>
    </article>
  );
}
