import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE: any;
  }
}

export const useThreeJS = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.THREE && !isInitialized.current) {
      isInitialized.current = true;
    }
  }, []);

  return {
    THREE: typeof window !== 'undefined' ? window.THREE : null,
    isReady: isInitialized.current
  };
};
