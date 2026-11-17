import { useCallback, useEffect, useState } from 'react';

// Autoplay only when it costs the visitor nothing they asked to avoid:
// no autoplay with "reduce motion" or the browser's data-saver mode (the poster is shown instead).
export const autoplayAllowed = () => {
  if (typeof window === 'undefined') return false;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const saveData = navigator.connection?.saveData === true;
  return !reduceMotion && !saveData;
};

/**
 * Muted, looping background-style video that
 *  - only loads when needed (`lazy`: the source is attached when the video approaches the viewport),
 *  - plays while at least a quarter of it is visible and pauses when scrolled away (saves battery/CPU),
 *  - can be paused / played and unmuted by the visitor.
 */
export function useAutoplayVideo(ref, { lazy = false, rootMargin = '400px 0px' } = {}) {
  const [autoplay] = useState(autoplayAllowed);
  const [load, setLoad] = useState(!lazy);
  const [inView, setInView] = useState(false);
  const [userPaused, setUserPaused] = useState(() => !autoplayAllowed());
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Lazy loading: attach the source shortly before the video scrolls into view.
  useEffect(() => {
    const el = ref.current;
    if (load || !el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load, ref, rootMargin]);

  // Visibility: play only while (partly) on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  // Keep the element's state in sync with what is shown on the buttons.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    el.addEventListener('playing', on);
    el.addEventListener('pause', off);
    el.addEventListener('ended', off);
    return () => {
      el.removeEventListener('playing', on);
      el.removeEventListener('pause', off);
      el.removeEventListener('ended', off);
    };
  }, [ref]);

  useEffect(() => {
    if (ref.current) ref.current.muted = muted;
  }, [muted, ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !load) return;
    if (inView && !userPaused) {
      el.muted = muted;
      el.play().catch(() => setPlaying(false)); // autoplay refused (e.g. low-power mode): poster stays
    } else {
      el.pause();
    }
    // `muted` is applied by its own effect; it must not restart playback here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, userPaused, load, ref]);

  const togglePlay = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      setUserPaused(true);
      el.pause();
    } else {
      setLoad(true);
      setUserPaused(false);
      if (el.currentSrc) el.play().catch(() => {}); // start inside the click (needed on iOS)
    }
  }, [playing, ref]);

  const toggleMute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const next = !muted;
    el.muted = next;
    setMuted(next);
    if (!next) {
      // Turning the sound on also starts the video.
      setLoad(true);
      setUserPaused(false);
      if (el.currentSrc) el.play().catch(() => {});
    }
  }, [muted, ref]);

  return { autoplay, load, playing, muted, togglePlay, toggleMute };
}
