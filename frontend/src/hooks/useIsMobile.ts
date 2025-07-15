import { useEffect, useState } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Verificar si estamos en el navegador antes de acceder a window
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    // Verificar nuevamente por si acaso
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificación inicial
    checkMobile();

    // Agregar event listener para cambios de tamaño
    window.addEventListener('resize', checkMobile);

    // Limpiar event listener al desmontar
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};
