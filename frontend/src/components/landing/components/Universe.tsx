import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Shield, Zap, Users } from 'lucide-react';

// Registrar plugins de GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Universe() {
  const universeRef = useRef<HTMLElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  const addToCounterRefs = (el: HTMLDivElement) => {
    if (el && !countersRef.current.includes(el)) {
      countersRef.current.push(el);
    }
  };

  const addToSectionRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Estado para forzar la actualización después de la hidratación
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Inicializar animaciones después de que el componente se monte
    if (isMounted) {
      // Configurar ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
      
      // Animación de revelación de secciones
      const sections = sectionsRef.current.filter(Boolean);
      
      sections.forEach((section, i) => {
        if (!section) return;
        
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            once: true
          },
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          clearProps: 'transform,opacity'
        });
      });
      
      // Configurar observador para los contadores
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const count = parseInt(target.getAttribute('data-count') || '0', 10);
            const duration = 2; // segundos
            let current = 0;
            const increment = count / (60 * duration); // 60 FPS
            
            const updateCounter = () => {
              if (current < count) {
                current += increment;
                target.textContent = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
              } else {
                target.textContent = count.toLocaleString();
              }
            };
            
            updateCounter();
            counterObserver.unobserve(target);
          }
        });
      }, { threshold: 0.5 });
      
      // Observar todos los contadores
      const counters = countersRef.current.filter(Boolean);
      counters.forEach(counter => counter && counterObserver.observe(counter));
      
      // Limpieza
      return () => {
        gsap.killTweensOf('*');
        ScrollTrigger.getAll().forEach(st => st.kill());
        counters.forEach(counter => counter && counterObserver.unobserve(counter));
      };
    }
  }, [isMounted]);

  return (
    <section ref={universeRef} id="universe" className="relative py-32 overflow-hidden">
      {/* Elegant background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Progressive Section 1: Title */}
        <div ref={addToSectionRefs} className="text-center mb-12">
          <h2 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Nuestro Ecosistema
            </span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4"></div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed whitespace-nowrap">
            Una plataforma que conecta talento excepcional con oportunidades únicas
          </p>
        </div>

        {/* Progressive Section 2: Feature Grid */}
        <div ref={addToSectionRefs} className="w-full pt-8 pb-16 bg-black">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="flex flex-wrap justify-center -mx-8">
              <div className="w-full sm:w-1/2 lg:w-1/4 px-8 mb-16 text-center">
                <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 transform transition-transform hover:scale-105">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Sistema MI</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                  Nuestro algoritmo conecta proyectos con artistas basándose en estilo, experiencia y compatibilidad creativa.
                </p>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/4 px-8 mb-16 text-center">
                <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 transform transition-transform hover:scale-105">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Protección Total</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                  Garantizamos pagos seguros, contratos claros y protección de derechos de autor.
                </p>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/4 px-8 mb-16 text-center">
                <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 transform transition-transform hover:scale-105">
                  <Zap className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Proceso Ágil</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                  Optimizamos cada paso del proceso para máxima eficiencia y satisfacción.
                </p>
              </div>

              <div className="w-full sm:w-1/2 lg:w-1/4 px-8 mb-16 text-center">
                <div className="w-28 h-28 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 transform transition-transform hover:scale-105">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">Comunidad Elite</h3>
                <p className="text-gray-300 text-sm leading-relaxed max-w-[240px] mx-auto">
                  Únete a una red exclusiva de artistas y creadores innovadores.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Progressive Section 3: Stats */}
        <div ref={addToSectionRefs} className="mt-32 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-16">Impacto en Números</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <div 
                ref={addToCounterRefs}
                className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4" 
                data-count="1247"
              >
                0
              </div>
              <div className="text-gray-300 text-lg">Artistas Verificados</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20">
              <div 
                ref={addToCounterRefs}
                className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4" 
                data-count="892"
              >
                0
              </div>
              <div className="text-gray-300 text-lg">Proyectos Exitosos</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-400/20">
              <div 
                ref={addToCounterRefs}
                className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4" 
                data-count="156"
              >
                0
              </div>
              <div className="text-gray-300 text-lg">Ciudades Activas</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-2xl border border-pink-400/20">
              <div 
                ref={addToCounterRefs}
                className="text-4xl md:text-5xl font-orbitron font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4" 
                data-count="98"
              >
                0
              </div>
              <div className="text-gray-300 text-lg">% Satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
