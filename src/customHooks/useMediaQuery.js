import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const [match, setMatch] = useState(false);
  const pattern = `(max-width: ${query}px)`;
  const { matchMedia } = globalThis;

  useEffect(() => {
    setMatch(matchMedia(pattern).matches);

    const onResize = () => setMatch(matchMedia(pattern).matches);
    globalThis.addEventListener('resize', onResize);

    return () => globalThis.removeEventListener('resize', onResize);
  }, [match, matchMedia, pattern, query]);

  return match;
}
