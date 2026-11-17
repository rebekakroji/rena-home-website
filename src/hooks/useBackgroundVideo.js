import { useLayoutEffect, useState } from 'react';
import { autoplayAllowed } from './useAutoplayVideo';

/**
 * Decorative background video (homepage hero): muted, inline, looping, never any controls.
 *
 * Why this exists — iPhone / mobile Safari:
 *  - Safari only autoplays a video that is *muted*; React sets `muted` as a property but never writes the
 *    attribute, so it is added here before playback starts (plus `playsinline` / `webkit-playsinline`).
 *  - When Safari still refuses autoplay (Low Power Mode, or after returning from the background) it pauses
 *    the video and draws its own ▶ "start playback" button. That button is hidden in CSS, the poster stays
 *    visible, and playback is retried on the visitor's first touch, click or key press — which Safari allows.
 *  - Safari can pause inline video on its own (tab switch, back/forward cache); playback resumes as soon as
 *    the page is visible again.
 * The video plays while any part of the hero is on screen and pauses when it is scrolled fully away.
 * With "reduce motion" or data saver nothing is played or downloaded: only the poster is shown.
 */
export function useBackgroundVideo(ref) {
  const [enabled] = useState(autoplayAllowed);

  useLayoutEffect(() => {
    const v = ref.current;
    if (!v) return undefined;

    // Attributes Safari checks before it allows inline autoplay.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('disableremoteplayback', ''); // no AirPlay / cast button
    v.removeAttribute('controls');
    if (!enabled) return undefined;

    let inView = true;
    let waitingForGesture = false;
    const gestures = ['touchend', 'pointerup', 'click', 'keydown'];

    const play = () => {
      if (!inView || document.hidden || !v.paused) return;
      v.muted = true; // never play with sound
      const attempt = v.play();
      if (attempt && attempt.catch) attempt.catch(waitForGesture);
    };
    const onGesture = () => {
      stopWaiting();
      play();
    };
    function waitForGesture() {
      if (waitingForGesture) return;
      waitingForGesture = true;
      gestures.forEach((e) => window.addEventListener(e, onGesture, { capture: true, passive: true }));
    }
    function stopWaiting() {
      if (!waitingForGesture) return;
      waitingForGesture = false;
      gestures.forEach((e) => window.removeEventListener(e, onGesture, { capture: true }));
    }

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) play();
      else v.pause();
    });
    io.observe(v);

    // Paused by the browser while it should be playing (not by us scrolling away): resume.
    const onPause = () => {
      if (inView && !document.hidden) window.setTimeout(play, 250);
    };
    // Safety net for the rare case where `loop` does not restart playback.
    const onEnded = () => {
      v.currentTime = 0;
      play();
    };
    const onVisibility = () => (document.hidden ? v.pause() : play());
    const onPageShow = () => play();

    v.addEventListener('pause', onPause);
    v.addEventListener('ended', onEnded);
    v.addEventListener('canplay', play);
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pageshow', onPageShow);
    play();

    return () => {
      io.disconnect();
      stopWaiting();
      v.removeEventListener('pause', onPause);
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('canplay', play);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, [enabled, ref]);

  return { enabled };
}
