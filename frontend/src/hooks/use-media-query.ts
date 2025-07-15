import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Solo en el navegador
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Actualizar el estado inicial
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    // Listener para cambios en el tamaño de la pantalla
    const listener = () => setMatches(media.matches);
    
    // Agregar listener
    media.addEventListener('change', listener);
    
    // Limpiar listener al desmontar
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}
