import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAnimations() {
  // Registra el plugin de ScrollTrigger
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Configuración global de ScrollTrigger
    ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
    });
  }
}

export function animateCounter(element: HTMLElement, end: number, duration: number = 2) {
  const obj = { value: 0 };
  
  gsap.to(obj, {
    value: end,
    duration: duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent = Math.ceil(obj.value).toLocaleString();
    },
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
      once: true
    }
  });
}

export function setupScrollAnimations() {
  if (typeof window === 'undefined') return;

  // Animación para las secciones
  gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]').forEach(section => {
    gsap.from(section, {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  });
}
