import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mouseX + 'px';
        cursorRef.current.style.top = mouseY + 'px';
      }
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    animateCursor();

    // Scroll progress
    const scrollProgress = document.querySelector('.scroll-progress') as HTMLElement;
    const handleScroll = () => {
      if (scrollProgress) {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
