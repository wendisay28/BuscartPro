import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificar el tamaño inicial
    checkMobile();
    
    // Escuchar cambios en el tamaño de la ventana
    window.addEventListener('resize', checkMobile);
    
    // Limpiar el event listener al desmontar
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
