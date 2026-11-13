import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Img from './Img';
import Lightbox from './Lightbox';
import Reveal from './Reveal';
import { Expand } from './Icons';

// Masonry gallery (CSS columns) with a full-screen lightbox.
export default function Gallery({ images, title }) {
  const { t } = useLanguage();
  const [active, setActive] = useState(null);

  return (
    <>
      <ul className="masonry" aria-label={t.gallery.listAria(title)}>
        {images.map((image, i) => (
          <Reveal as="li" key={image.src} className="masonry__item" delay={(i % 3) * 90}>
            <button
              type="button"
              className="masonry__btn"
              onClick={() => setActive(i)}
              aria-label={t.gallery.open(i + 1, images.length, image.alt)}
            >
              <Img image={image} sizes="(min-width: 1100px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <span className="masonry__hover" aria-hidden="true">
                <span className="masonry__num">{String(i + 1).padStart(2, '0')}</span>
                <Expand width={20} height={20} />
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox images={images} index={active} onChange={setActive} onClose={() => setActive(null)} title={title} />
    </>
  );
}
