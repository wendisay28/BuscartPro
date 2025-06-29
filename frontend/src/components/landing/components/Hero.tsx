import { useEffect, useRef } from 'react';

interface HeroProps {
  onExploreEvents?: () => void;
}

export default function Hero({ onExploreEvents }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  const addToContentRefs = (el: HTMLDivElement) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Progressive content reveal animation
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const tl = window.gsap.timeline();
      
      // Stage 1: Title appears
      tl.from('.hero-stage-1', {
        duration: 1.5,
        y: 80,
        opacity: 0,
        ease: 'power3.out'
      })
      // Stage 2: Subtitle and description
      .from('.hero-stage-2', {
        duration: 1.2,
        y: 60,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
      }, '-=0.8')
      // Stage 3: Content cards
      .from('.hero-stage-3', {
        duration: 1,
        y: 40,
        opacity: 0,
        scale: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
      }, '-=0.6')
      // Stage 4: Call to action
      .from('.hero-stage-4', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.7
      }, '-=0.4');

      // Scroll-triggered animations for content sections
      window.gsap.utils.toArray('.content-section').forEach((section: HTMLElement, i: number) => {
        window.gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'bottom 60%',
            toggleActions: 'play none none reverse'
          },
          duration: 1.2,
          y: 60,
          opacity: 0,
          delay: i * 0.1,
          ease: 'power3.out'
        });
      });
    }
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/30"></div>
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(168, 85, 247, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-12">
        
        {/* Stage 1: Hero Title */}
        <div className="hero-stage-1 text-center mb-16">
          <h1 className="font-orbitron text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              BUSCART
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>

        {/* Stage 2: Subtitle and Description */}
        <div className="hero-stage-2 text-center mb-20">
          <h2 className="text-2xl md:text-4xl font-light text-white/90 mb-8 font-space">
            Plataforma Premium de Arte y Creatividad
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Conectamos artistas excepcionales con proyectos únicos. Una experiencia curada donde cada colaboración 
            se convierte en una obra maestra.
          </p>
        </div>

        {/* Stage 3: Feature Cards */}
        <div className="hero-stage-3 grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div ref={addToContentRefs} className="content-section group">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Artistas Verificados</h3>
              <p className="text-gray-300 leading-relaxed">
                Portfolio curado de artistas profesionales con experiencia comprobada en proyectos de alto nivel.
              </p>
            </div>
          </div>

          <div ref={addToContentRefs} className="content-section group">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Proceso Ágil</h3>
              <p className="text-gray-300 leading-relaxed">
                Desde la conceptualización hasta la entrega final, optimizamos cada paso para resultados excepcionales.
              </p>
            </div>
          </div>

          <div ref={addToContentRefs} className="content-section group">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 h-full">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Calidad Premium</h3>
              <p className="text-gray-300 leading-relaxed">
                Cada proyecto es una inversión en excelencia. Garantizamos estándares de calidad excepcionales.
              </p>
            </div>
          </div>
        </div>

        {/* Stage 4: Call to Action */}
        <div className="hero-stage-4 text-center">
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative bg-gradient-to-r from-purple-600 to-purple-700 px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
              <span className="relative z-10 flex items-center gap-3">
                <span>🎨</span>
                Soy Artista
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <button className="group relative bg-gradient-to-r from-pink-600 to-pink-700 px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25">
              <span className="relative z-10 flex items-center gap-3">
                <span>🔍</span>
                Busco Talento
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>

            {onExploreEvents && (
              <button 
                onClick={onExploreEvents}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-4 rounded-full text-lg font-semibold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <span>🎭</span>
                  Explorar Eventos
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Elegant scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-purple-400">
          <span className="text-sm font-light mb-2">Descubre más</span>
          <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center animate-pulse">
            <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
