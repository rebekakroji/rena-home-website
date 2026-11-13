import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollLock } from '../hooks/useScrollLock';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronLeft, ChevronRight, Close } from './Icons';

const pad = (n) => String(n).padStart(2, '0');

export default function Lightbox({ images, index, onClose, onChange, title }) {
  const { t } = useLanguage();
  const open = index !== null && index >= 0;
  const [direction, setDirection] = useState(0);
  const [closing, setClosing] = useState(false);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const touchRef = useRef(null);

  useScrollLock(open);

  const close = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 260);
  }, [onClose]);

  const go = useCallback(
    (step) => {
      if (!open) return;
      setDirection(step);
      onChange((index + step + images.length) % images.length);
    },
    [open, index, images.length, onChange]
  );

  // Focus management: remember the trigger, focus the dialog, restore on close.
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement;
    closeRef.current?.focus();
    return () => returnFocusRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, go]);

  // Preload neighbours so prev/next feels instant.
  useEffect(() => {
    if (!open) return;
    [1, -1].forEach((step) => {
      const n = images[(index + step + images.length) % images.length];
      const pre = new Image();
      pre.src = n.src;
    });
  }, [open, index, images]);

  if (!open) return null;
  const image = images[index];

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('lightbox__stage')) close();
  };

  const onTouchStart = (e) => {
    touchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    touchRef.current = null;
  };

  return (
    <div
      ref={dialogRef}
      className={`lightbox ${closing ? 'is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={title ? t.lightbox.aria(title) : t.lightbox.ariaDefault}
      onClick={onBackdrop}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="lightbox__bar">
        <p className="lightbox__count" aria-live="polite">
          <span>{pad(index + 1)}</span>
          <span className="lightbox__count-sep" aria-hidden="true" />
          <span>{pad(images.length)}</span>
        </p>
        {title && <p className="lightbox__title">{title}</p>}
        <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={close} aria-label={t.lightbox.close}>
          <Close width={22} height={22} />
        </button>
      </div>

      <div className="lightbox__stage">
        <figure
          key={image.src}
          className={`lightbox__figure ${direction > 0 ? 'from-right' : direction < 0 ? 'from-left' : ''}`}
        >
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} className="lightbox__img" />
          <figcaption className="lightbox__caption">{image.alt}</figcaption>
        </figure>
      </div>

      {images.length > 1 && (
        <>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label={t.lightbox.prev}>
            <ChevronLeft width={26} height={26} />
          </button>
          <button type="button" className="lightbox__btn lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label={t.lightbox.next}>
            <ChevronRight width={26} height={26} />
          </button>
        </>
      )}
    </div>
  );
}
