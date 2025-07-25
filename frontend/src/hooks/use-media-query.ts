import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false; // Valor por defecto para SSR
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Configurar listener
    media.addEventListener('change', listener);

    // Asegurar estado inicial
    setMatches(media.matches);

    // Limpiar
    return () => media.removeEventListener('change', listener);
  }, [query]); // SOLO depende de query

  return matches;
}
