import { useLanguage } from '../i18n/LanguageContext';
import CollectionCard from './CollectionCard';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';

export default function Collections() {
  const { t, collections } = useLanguage();
  const s = t.collectionsSection;

  return (
    <section id="koleksionet" className="collections section" aria-labelledby="collections-title">
      <div className="container">
        <Reveal className="section-head">
          <Eyebrow index="02">{s.eyebrow}</Eyebrow>
          <div className="section-head__row">
            <h2 id="collections-title" className="h2">
              {s.title.before}<em>{s.title.em}</em>{s.title.after}
            </h2>
            <p className="section-head__text">{s.text}</p>
          </div>
        </Reveal>

        <div className="collections__grid">
          {collections.map((c, i) => (
            <Reveal key={c.slug} className={`collections__item collections__item--${i + 1}`} delay={(i % 3) * 110}>
              <CollectionCard collection={c} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
