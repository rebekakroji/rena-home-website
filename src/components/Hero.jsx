import { useRef } from 'react';
import { videos } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { useBackgroundVideo } from '../hooks/useBackgroundVideo';
import { ArrowDown } from './Icons';

// Full-screen cinematic hero: the showroom video is the background (muted, looping, inline, no controls,
// no play button — see useBackgroundVideo for the iPhone/Safari handling), with a soft dark overlay and
// centred typography. The header sits transparently on top (see Header).
// With "reduce motion" or data saver the poster (the video's first frame) is shown and nothing is downloaded.
export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const videoRef = useRef(null);
  const { enabled: autoplay } = useBackgroundVideo(videoRef);

  return (
    <section id="kryefaqja" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero__video"
          src={videos.hero.src}
          poster={videos.hero.poster}
          autoPlay={autoplay}
          muted
          loop
          playsInline
          preload={autoplay ? 'auto' : 'none'}
          controls={false}
          tabIndex={-1}
          disablePictureInPicture
          x-webkit-airplay="deny"
        />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="hero__content">
        <h1 id="hero-title" className="hero__brand">
          <span className="hero__line">
            <span className="anim-line" style={{ '--d': '150ms' }}>RENA HOME</span>
          </span>
        </h1>
        <p className="hero__tagline anim-up" style={{ '--d': '420ms' }} lang="en">
          {h.tagline}
        </p>
        <span className="hero__rule anim-up" style={{ '--d': '560ms' }} aria-hidden="true" />
        <p className="hero__lead anim-up" style={{ '--d': '640ms' }}>
          {h.lead}
        </p>
      </div>

      <a href="#krijo" className="hero__scroll" aria-label={h.scrollAria}>
        <ArrowDown width={22} height={22} strokeWidth={1.1} />
      </a>
    </section>
  );
}
