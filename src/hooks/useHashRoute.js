import { useEffect, useState } from 'react';

// Minimal hash router: "#/koleksioni/<slug>" opens a collection page, "#/dizajno" opens
// DESIGN WITH RENA HOME, any other hash is treated as a section anchor on the homepage.
// At build time (prerendering, no `window`) the homepage is rendered.
export const readRoute = () => {
  if (typeof window === 'undefined') return { page: 'home', slug: null, section: null };
  const hash = decodeURIComponent(window.location.hash.slice(1));
  if (/^\/dizajno\/?$/.test(hash)) return { page: 'design', slug: null, section: null };
  const match = hash.match(/^\/koleksioni\/([\w-]+)/);
  if (match) return { page: 'collection', slug: match[1], section: null };
  return { page: 'home', slug: null, section: hash || null };
};

export function useHashRoute() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const onChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
