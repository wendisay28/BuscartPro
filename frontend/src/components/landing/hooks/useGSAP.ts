import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export const useGSAP = () => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger && !isInitialized.current) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      isInitialized.current = true;
    }
  }, []);

  return {
    gsap: typeof window !== 'undefined' ? window.gsap : null,
    ScrollTrigger: typeof window !== 'undefined' ? window.ScrollTrigger : null,
    isReady: isInitialized.current
  };
};
