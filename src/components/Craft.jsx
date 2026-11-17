import { useRef } from 'react';
import { videos } from '../data/site';
import { useLanguage } from '../i18n/LanguageContext';
import { useAutoplayVideo } from '../hooks/useAutoplayVideo';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import { Pause, Play, SoundOff, SoundOn } from './Icons';

// "The art of woodworking": workshop video (CNC machining, carved oak) beside an editorial text.
// The video loads only when the section approaches the viewport and plays muted while visible.
export default function Craft() {
  const { t } = useLanguage();
  const c = t.craft;
  const videoRef = useRef(null);
  const { load, playing, muted, togglePlay, toggleMute } = useAutoplayVideo(videoRef, { lazy: true });

  return (
    <section id="punimi-i-drurit" className="craft section" aria-labelledby="craft-title">
      <div className="container craft__grid">
        <Reveal className="craft__media">
          <figure className="craft__figure">
            <div className="craft__frame">
              <video
                ref={videoRef}
                className="craft__video"
                src={load ? videos.craft.src : undefined}
                poster={videos.craft.poster}
                muted
                loop
                playsInline
                preload="none"
                aria-label={c.videoLabel}
              />
              <div className="craft__controls">
                <button
                  type="button"
                  className="craft__ctrl"
                  onClick={togglePlay}
                  aria-label={playing ? c.pause : c.play}
                  title={playing ? c.pause : c.play}
                >
                  {playing ? <Pause width={18} height={18} /> : <Play width={18} height={18} />}
                </button>
                <button
                  type="button"
                  className="craft__ctrl craft__ctrl--sound"
                  onClick={toggleMute}
                  aria-pressed={!muted}
                >
                  {muted ? <SoundOff width={18} height={18} /> : <SoundOn width={18} height={18} />}
                  <span>{muted ? c.soundOn : c.soundOff}</span>
                </button>
              </div>
            </div>
            <figcaption className="craft__caption">{c.caption}</figcaption>
          </figure>
        </Reveal>

        <Reveal className="craft__body" delay={120}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 id="craft-title" className="h2 craft__title">
            <span className="craft__line">{c.title[0]}</span> <em className="craft__line">{c.title[1]}</em>
          </h2>
          <span className="craft__rule" aria-hidden="true" />
          <p className="craft__text">{c.text}</p>
        </Reveal>
      </div>
    </section>
  );
}
