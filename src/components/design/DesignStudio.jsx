import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { coverOf } from '../../data/collections';
import { ROOMS } from '../../data/designOptions';
import { generateDesign, isDesignGenerationEnabled } from '../../services/designGeneration';
import Img from '../Img';
import DesignUpload from './DesignUpload';
import DesignOptions from './DesignOptions';
import DesignQuote from './DesignQuote';
import { ArrowLeft, ArrowRight, Check, Download, Sparkle } from '../Icons';

const STEPS = ['room', 'upload', 'customize', 'result'];
const AI_ENABLED = isDesignGenerationEnabled();
const EXTENSIONS = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const EMPTY_CHOICES = { style: null, color: null, material: null, preferences: [] };

// "DESIGN WITH RENA HOME": intro → room → photo → customize & preview → result.
// The room photo is kept in browser memory only. AI generation goes through
// src/services/designGeneration.js and stays switched off until an endpoint is configured.
export default function DesignStudio() {
  const { t, lang, getCollection } = useLanguage();
  const d = t.designStudio;
  const [step, setStep] = useState('intro');
  const [room, setRoom] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [choices, setChoices] = useState(EMPTY_CHOICES);
  const [generation, setGeneration] = useState({ status: 'idle', imageUrl: null });
  const topRef = useRef(null);
  const abortRef = useRef(null);
  const photoRef = useRef(photo);
  photoRef.current = photo;

  useEffect(() => {
    document.title = d.docTitle;
  }, [d]);

  // Free the in-memory photo and cancel any running request when leaving the page.
  useEffect(
    () => () => {
      if (photoRef.current) URL.revokeObjectURL(photoRef.current.url);
      abortRef.current?.abort();
    },
    []
  );

  // Any change to the inputs makes a previous result outdated.
  const resetGeneration = () => {
    abortRef.current?.abort();
    setGeneration({ status: 'idle', imageUrl: null });
  };

  const goTo = (next) => {
    setStep(next);
    requestAnimationFrame(() => {
      const top = topRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0 || top > 160) window.scrollTo({ top: window.scrollY + top - 96, behavior: 'smooth' });
    });
  };

  const selectPhoto = (next) => {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(next);
    resetGeneration();
  };
  const removePhoto = () => {
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto(null);
    resetGeneration();
  };
  const updateChoices = (next) => {
    setChoices(next);
    resetGeneration();
  };
  const restart = () => {
    removePhoto();
    setRoom(null);
    setChoices(EMPTY_CHOICES);
    goTo('room');
  };

  const reachable = {
    room: true,
    upload: Boolean(room),
    customize: Boolean(room && photo),
    result: generation.status !== 'idle',
  };

  const generate = async () => {
    if (!photo || !room || generation.status === 'loading') return;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setGeneration({ status: 'loading', imageUrl: null });
    try {
      const res = await generateDesign(
        { image: photo.file, room, style: choices.style, color: choices.color, material: choices.material, preferences: choices.preferences, lang },
        { signal: controller.signal }
      );
      setGeneration({ status: res.status, imageUrl: res.imageUrl || null, mimeType: res.mimeType || null });
    } catch (err) {
      if (err.name === 'AbortError') return;
      setGeneration({ status: 'error', imageUrl: null });
    }
    goTo('result');
  };

  // Human-readable selections in the current language (for the summary and the WhatsApp message).
  const c = d.customize;
  const labels = {
    room: room ? d.room.options[room] : d.notSelected,
    style: choices.style ? c.styles[choices.style] : d.notSelected,
    color: choices.color ? c.colors[choices.color] : d.notSelected,
    material: choices.material ? c.materials[choices.material] : d.notSelected,
    preferences: choices.preferences.length ? choices.preferences.map((p) => c.prefs[p]).join(', ') : d.none,
  };
  const summary = [
    [d.steps.room, labels.room],
    [c.style, labels.style],
    [c.color, labels.color],
    [c.material, labels.material],
    [c.preferences, labels.preferences],
  ];

  if (step === 'intro') {
    const visual = getCollection('kuzhina');
    return (
      <section className="ds ds-intro" aria-labelledby="ds-title">
        <div className="container ds-intro__grid">
          <div className="ds-intro__text">
            <p className="hero__eyebrow anim-up" style={{ '--d': '80ms' }}>
              {d.eyebrow}
            </p>
            <h1 id="ds-title" className="ds-intro__title">
              <span className="hero__line">
                <span className="anim-line" style={{ '--d': '160ms' }}>
                  {d.title}
                </span>
              </span>
            </h1>
            <p className="ds-intro__subtitle anim-up" style={{ '--d': '320ms' }}>
              {d.subtitle}
            </p>
            <p className="ds-intro__lead anim-up" style={{ '--d': '420ms' }}>
              {d.intro}
            </p>
            <ol className="ds-intro__points anim-up" style={{ '--d': '520ms' }}>
              {d.introPoints.map((point, i) => (
                <li key={i}>
                  <span className="ds-intro__num">{String(i + 1).padStart(2, '0')}</span>
                  {point}
                </li>
              ))}
            </ol>
            <div className="anim-up" style={{ '--d': '640ms' }}>
              <button type="button" className="btn btn--dark ds-intro__cta" onClick={() => goTo('room')}>
                {d.start} <ArrowRight width={18} height={18} />
              </button>
            </div>
          </div>
          <div className="ds-intro__media anim-up" style={{ '--d': '260ms' }}>
            <Img image={coverOf(visual)} eager sizes="(min-width: 1101px) 45vw, 100vw" />
            <span className="ds-intro__badge">
              <Sparkle width={16} height={16} /> {AI_ENABLED ? d.badgeLive : d.badge}
            </span>
          </div>
        </div>
      </section>
    );
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <section className="ds ds-studio" aria-labelledby="ds-studio-title" ref={topRef}>
      <div className="container">
        <header className="ds-studio__head">
          <div>
            <p className="ds-studio__kicker">{d.stepLabel(stepIndex + 1, STEPS.length)}</p>
            <h1 id="ds-studio-title" className="ds-studio__title">
              {d.title}
            </h1>
          </div>
          <ol className="ds-steps" aria-label={d.stepsAria}>
            {STEPS.map((s, i) => {
              const done = i < stepIndex && reachable[s];
              return (
                <li key={s}>
                  <button
                    type="button"
                    className={`ds-steps__btn ${s === step ? 'is-current' : ''} ${done ? 'is-done' : ''}`}
                    aria-current={s === step ? 'step' : undefined}
                    disabled={!reachable[s]}
                    onClick={() => goTo(s)}
                  >
                    <span className="ds-steps__num" aria-hidden="true">
                      {done ? <Check width={13} height={13} /> : i + 1}
                    </span>
                    <span className="ds-steps__label">{d.steps[s]}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </header>

        <div className="ds-studio__grid">
          {/* Visual workspace (left) */}
          <div className="ds-workspace" key={`w-${step}`}>
            {step === 'room' && (
              <div className="ds-rooms" role="radiogroup" aria-label={d.room.title}>
                {ROOMS.map(({ id, cover }) => (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={room === id}
                    className={`ds-room ${room === id ? 'is-on' : ''}`}
                    onClick={() => {
                      setRoom(id);
                      resetGeneration();
                    }}
                  >
                    <span className="ds-room__media">
                      <Img image={coverOf(getCollection(cover))} sizes="(min-width: 1101px) 22vw, 50vw" />
                    </span>
                    <span className="ds-room__label">
                      {d.room.options[id]}
                      <span className="ds-room__check" aria-hidden="true">
                        <Check width={14} height={14} />
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}

            {step === 'upload' && <DesignUpload photo={photo} onSelect={selectPhoto} onRemove={removePhoto} d={d} />}

            {step === 'customize' && photo && (
              <div className={`ds-canvas ${generation.status === 'loading' ? 'is-busy' : ''}`}>
                <img src={photo.url} alt={d.upload.previewAlt} className="ds-canvas__img" />
                <ul className="ds-canvas__tags" aria-hidden="true">
                  {[labels.room, choices.style && labels.style, choices.color && labels.color, choices.material && labels.material]
                    .filter(Boolean)
                    .map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                </ul>
                {generation.status === 'loading' && (
                  <div className="ds-canvas__busy" role="status">
                    <span className="ds-spinner" aria-hidden="true" /> {c.generating}
                  </div>
                )}
              </div>
            )}

            {step === 'result' && (
              <div className="ds-canvas ds-canvas--result">
                {generation.status === 'done' && generation.imageUrl ? (
                  <img src={generation.imageUrl} alt={d.result.generatedAlt} className="ds-canvas__img" />
                ) : (
                  <>
                    {photo && <img src={photo.url} alt={d.upload.previewAlt} className="ds-canvas__img is-dimmed" />}
                    <div className="ds-notice" role="status">
                      <span className="ds-notice__icon" aria-hidden="true">
                        <Sparkle width={22} height={22} />
                      </span>
                      <h2 className="ds-notice__title">{generation.status === 'error' ? d.result.errorTitle : d.result.pendingTitle}</h2>
                      <p>{generation.status === 'error' ? d.result.errorText : d.result.pendingText}</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Customization panel (right) */}
          <aside className="ds-panel" key={`p-${step}`} aria-labelledby="ds-panel-title">
            {step === 'room' && (
              <>
                <h2 id="ds-panel-title" className="ds-panel__title">{d.room.title}</h2>
                <p className="ds-panel__text">{d.room.text}</p>
                <div className="ds-panel__nav">
                  <button type="button" className="btn btn--dark" disabled={!room} onClick={() => goTo('upload')}>
                    {d.next} <ArrowRight width={18} height={18} />
                  </button>
                </div>
              </>
            )}

            {step === 'upload' && (
              <>
                <h2 id="ds-panel-title" className="ds-panel__title">{d.upload.title}</h2>
                <p className="ds-panel__text">{d.upload.text}</p>
                <p className="ds-panel__note">{AI_ENABLED ? d.upload.privacyAi : d.upload.privacy}</p>
                <div className="ds-panel__nav">
                  <button type="button" className="btn btn--ghost" onClick={() => goTo('room')}>
                    <ArrowLeft width={18} height={18} /> {d.back}
                  </button>
                  <button type="button" className="btn btn--dark" disabled={!photo} onClick={() => goTo('customize')}>
                    {d.next} <ArrowRight width={18} height={18} />
                  </button>
                </div>
              </>
            )}

            {step === 'customize' && (
              <>
                <h2 id="ds-panel-title" className="ds-panel__title">{c.title}</h2>
                <DesignOptions choices={choices} onChange={updateChoices} d={d} />
                <div className="ds-panel__generate">
                  <button type="button" className="btn btn--dark ds-generate" disabled={!photo || generation.status === 'loading'} onClick={generate}>
                    <Sparkle width={18} height={18} /> {generation.status === 'loading' ? c.generating : c.generate}
                  </button>
                  {AI_ENABLED && <p className="ds-panel__note ds-panel__note--center">{c.aiNotice}</p>}
                  <button type="button" className="ds-link-btn" onClick={() => goTo('upload')}>
                    <ArrowLeft width={16} height={16} /> {d.back}
                  </button>
                </div>
              </>
            )}

            {step === 'result' && (
              <>
                <h2 id="ds-panel-title" className="ds-panel__title">{d.result.title}</h2>
                <dl className="ds-summary">
                  {summary.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="ds-panel__actions">
                  <DesignQuote message={d.quoteMessage(labels)} d={d} />
                  {generation.status === 'done' && generation.imageUrl ? (
                    <a className="btn btn--ghost" href={generation.imageUrl} download={`rena-home-design.${EXTENSIONS[generation.mimeType] || 'png'}`}>
                      <Download width={18} height={18} /> {d.result.download}
                    </a>
                  ) : (
                    <>
                      <button type="button" className="btn btn--ghost" disabled aria-describedby="ds-download-hint">
                        <Download width={18} height={18} /> {d.result.download}
                      </button>
                      <p id="ds-download-hint" className="ds-panel__note">
                        {d.result.downloadHint}
                      </p>
                    </>
                  )}
                  {generation.status === 'error' && (
                    <button type="button" className="ds-link-btn" onClick={generate}>
                      <Sparkle width={16} height={16} /> {d.result.tryAgain}
                    </button>
                  )}
                </div>
                <div className="ds-panel__footer">
                  <button type="button" className="ds-link-btn" onClick={() => goTo('customize')}>
                    <ArrowLeft width={16} height={16} /> {d.result.edit}
                  </button>
                  <button type="button" className="ds-link-btn" onClick={restart}>
                    {d.restart}
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
