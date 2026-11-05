import { useEffect, useState } from 'react';

function getMatch(query) {
  return typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia(query).matches
    : false;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => getMatch(query));

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener?.('change', onChange);
    return () => mql.removeEventListener?.('change', onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
