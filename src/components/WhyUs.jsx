import { useLanguage } from '../i18n/LanguageContext';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import Img from './Img';

const numerals = ['I', 'II', 'III', 'IV'];

export default function WhyUs() {
  const { t, getCollection } = useLanguage();
  const w = t.whyUs;
  const projects = getCollection('projekte');

  return (
    <section className="why section" aria-labelledby="why-title">
      <div className="container why__grid">
        <Reveal className="why__media">
          <Img image={projects.images[3]} sizes="(min-width: 961px) 40vw, 100vw" />
        </Reveal>

        <div className="why__content">
          <Reveal>
            <Eyebrow index="04">{w.eyebrow}</Eyebrow>
            <h2 id="why-title" className="h2">
              {w.title.before}<em>{w.title.em}</em>{w.title.after}
            </h2>
          </Reveal>

          <ol className="why__list">
            {w.reasons.map((r, i) => (
              <Reveal as="li" key={i} className="why__item" delay={i * 90}>
                <span className="why__num" aria-hidden="true">
                  {numerals[i]}
                </span>
                <div>
                  <h3 className="why__title">{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
