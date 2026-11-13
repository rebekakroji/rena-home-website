import { useEffect, useState } from 'react';

// Minimal hash router: "#/koleksioni/<slug>" opens a collection page,
// any other hash is treated as a section anchor on the homepage.
const parse = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const match = hash.match(/^\/koleksioni\/([\w-]+)/);
  if (match) return { page: 'collection', slug: match[1], section: null };
  return { page: 'home', slug: null, section: hash || null };
};

export function useHashRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}
