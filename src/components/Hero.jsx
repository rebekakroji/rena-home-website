import { site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import Img from './Img';
import { ArrowRight } from './Icons';

export default function Hero() {
  const { t, getCollection } = useLanguage();
  const h = t.hero;
  const projects = getCollection('projekte');
  const living = getCollection('sallone');

  return (
    <section id="kryefaqja" className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        <div className="hero__text">
          <p className="hero__eyebrow anim-up" style={{ '--d': '100ms' }}>
            {h.eyebrow} <span aria-hidden="true">·</span> {h.since(site.since)}
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">
              <span className="anim-line" style={{ '--d': '200ms' }}>{h.line1}</span>
            </span>
            <span className="hero__line">
              <span className="anim-line" style={{ '--d': '320ms' }}>
                {h.line2.before}<em>{h.line2.em}</em>
              </span>
            </span>
          </h1>
          <p className="hero__lead anim-up" style={{ '--d': '520ms' }}>
            {h.lead}
          </p>
          <div className="hero__actions anim-up" style={{ '--d': '660ms' }}>
            <a href="#koleksionet" className="btn btn--dark">
              {h.ctaCollections} <ArrowRight width={18} height={18} />
            </a>
            <a href="#projektet" className="btn btn--ghost">
              {h.ctaProjects}
            </a>
          </div>
        </div>

        <dl className="hero__meta anim-up" style={{ '--d': '820ms' }}>
          <div>
            <dt>{h.metaSince}</dt>
            <dd>{site.since}</dd>
          </div>
          <div>
            <dt>{h.metaLocation}</dt>
            <dd>{site.address}</dd>
          </div>
          <div>
            <dt>{h.metaHours}</dt>
            <dd>{t.site.hours}</dd>
          </div>
        </dl>
      </div>

      <div className="hero__media">
        <div className="hero__frame">
          <Img image={projects.images[1]} eager className="hero__img" sizes="(min-width: 961px) 55vw, 100vw" />
        </div>
        <figure className="hero__inset">
          <Img image={living.images[0]} eager className="hero__inset-img" />
          <figcaption>{h.insetCaption}</figcaption>
        </figure>
      </div>

      <a href="#rreth-nesh" className="hero__scroll" aria-label={h.scrollAria}>
        <span className="hero__scroll-line" aria-hidden="true" />
        <span>{h.scroll}</span>
      </a>
    </section>
  );
}
