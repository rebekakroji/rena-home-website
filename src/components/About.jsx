import { site } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Img from './Img';

export default function About() {
  const { t, getCollection } = useLanguage();
  const a = t.about;
  // Dining area with the oval travertine table and wooden chairs (projekt5.jpeg).
  const dining = getCollection('projekte').images[4];

  return (
    <section id="rreth-nesh" className="about section" aria-labelledby="about-title">
      <div className="container about__grid">
        <Reveal className="about__intro">
          <Eyebrow index="01">{a.eyebrow}</Eyebrow>
          <p className="about__since" aria-hidden="true">
            <span>{a.since}</span>
            {site.since}
          </p>
          <h2 id="about-title" className="h2">
            {a.title.before}<em>{a.title.em}</em>{a.title.after}
          </h2>
        </Reveal>

        <Reveal className="about__body" delay={120}>
          <p className="lead">{a.lead(site.since)}</p>
          <p>{a.body}</p>
          <ul className="pillars">
            {a.pillars.map((p, i) => (
              <li key={i} className="pillar">
                <h3 className="pillar__title">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="container about__media">
        <Reveal className="about__feature">
          <Img image={dining} sizes="(min-width: 1300px) 1040px, (min-width: 641px) 80vw, 100vw" />
        </Reveal>
      </div>
    </section>
  );
}
