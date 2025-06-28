// Animation utility functions for BuscArt

export const createParticleFloat = (element: HTMLElement, options = {}) => {
    const defaultOptions = {
      duration: 4,
      delay: 0,
      translateY: [-20, 20],
      translateX: [-10, 10],
      scale: [0.9, 1.1],
      opacity: [0.7, 1],
      ease: 'power2.inOut'
    };
  
    const config = { ...defaultOptions, ...options };
  
    if (typeof window !== 'undefined' && window.gsap) {
      return window.gsap.to(element, {
        duration: config.duration,
        delay: config.delay,
        y: `random(${config.translateY[0]}, ${config.translateY[1]})`,
        x: `random(${config.translateX[0]}, ${config.translateX[1]})`,
        scale: `random(${config.scale[0]}, ${config.scale[1]})`,
        opacity: `random(${config.opacity[0]}, ${config.opacity[1]})`,
        ease: config.ease,
        repeat: -1,
        yoyo: true
      });
    }
  };
  
  export const createHologramEffect = (element: HTMLElement, options = {}) => {
    const defaultOptions = {
      duration: 3,
      colors: ['#8A2BE2', '#FF1493', '#DA70D6', '#FF69B4'],
      ease: 'power2.inOut'
    };
  
    const config = { ...defaultOptions, ...options };
  
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ repeat: -1 });
      
      config.colors.forEach((color, index) => {
        tl.to(element, {
          duration: config.duration / config.colors.length,
          filter: `hue-rotate(${index * 90}deg) brightness(${1 + index * 0.1})`,
          textShadow: `0 0 ${10 + index * 5}px ${color}`,
          opacity: 0.8 + (index * 0.05),
          ease: config.ease
        });
      });
  
      return tl;
    }
  };
  
  export const createMorphingBlob = (element: HTMLElement, options = {}) => {
    const defaultOptions = {
      duration: 8,
      borderRadius: [
        '30% 70% 70% 30% / 30% 30% 70% 70%',
        '58% 42% 75% 25% / 76% 46% 54% 24%',
        '50% 50% 33% 67% / 55% 27% 73% 45%',
        '33% 67% 58% 42% / 63% 68% 32% 37%'
      ],
      ease: 'power2.inOut'
    };
  
    const config = { ...defaultOptions, ...options };
  
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline({ repeat: -1 });
      
      config.borderRadius.forEach((radius, index) => {
        tl.to(element, {
          duration: config.duration / config.borderRadius.length,
          borderRadius: radius,
          ease: config.ease
        });
      });
  
      return tl;
    }
  };
  
  export const createScrollProgressBar = () => {
    if (typeof window === 'undefined') return;
  
    const progressBar = document.querySelector('.scroll-progress') as HTMLElement;
    if (!progressBar) return;
  
    const updateProgress = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    };
  
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  
    return () => window.removeEventListener('scroll', updateProgress);
  };
  
  export const createCounterAnimation = (element: HTMLElement, targetValue: number, options = {}) => {
    const defaultOptions = {
      duration: 2,
      ease: 'power2.out',
      prefix: '',
      suffix: '',
      separator: ','
    };
  
    const config = { ...defaultOptions, ...options };
  
    if (typeof window !== 'undefined' && window.gsap) {
      const obj = { value: 0 };
      
      return window.gsap.to(obj, {
        duration: config.duration,
        value: targetValue,
        ease: config.ease,
        onUpdate: () => {
          const formattedValue = Math.floor(obj.value).toLocaleString();
          element.textContent = `${config.prefix}${formattedValue}${config.suffix}`;
        }
      });
    }
  };
  
  export const createLaserSweepEffect = (button: HTMLElement) => {
    if (typeof window === 'undefined' || !window.gsap) return;
  
    const handleMouseEnter = () => {
      const laser = document.createElement('div');
      laser.style.position = 'absolute';
      laser.style.top = '0';
      laser.style.left = '-100%';
      laser.style.width = '100%';
      laser.style.height = '100%';
      laser.style.background = 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)';
      laser.style.pointerEvents = 'none';
      laser.style.zIndex = '10';
      
      button.appendChild(laser);
      
      window.gsap.to(laser, {
        duration: 0.7,
        left: '100%',
        ease: 'power2.inOut',
        onComplete: () => {
          button.removeChild(laser);
        }
      });
    };
  
    button.addEventListener('mouseenter', handleMouseEnter);
    
    return () => button.removeEventListener('mouseenter', handleMouseEnter);
  };
  
  export const create3DCardEffect = (card: HTMLElement, options = {}) => {
    const defaultOptions = {
      maxRotation: 15,
      perspective: 1000,
      scale: 1.05
    };
  
    const config = { ...defaultOptions, ...options };
  
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
  
      const rotateX = deltaY * config.maxRotation;
      const rotateY = deltaX * config.maxRotation;
  
      if (typeof window !== 'undefined' && window.gsap) {
        window.gsap.to(card, {
          duration: 0.3,
          rotationX: -rotateX,
          rotationY: rotateY,
          scale: config.scale,
          transformPerspective: config.perspective,
          ease: 'power2.out'
        });
      }
    };
  
    const handleMouseLeave = () => {
      if (typeof window !== 'undefined' && window.gsap) {
        window.gsap.to(card, {
          duration: 0.3,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          ease: 'power2.out'
        });
      }
    };
  
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  };
  