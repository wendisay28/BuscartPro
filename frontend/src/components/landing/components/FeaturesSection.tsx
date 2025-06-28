import { useEffect, useRef } from 'react';
import { Search, CalendarDays, Megaphone, Images, MapPin, Shield } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    { icon: Search, title: "Buscar Artistas", description: "Filtra por tipo, ciudad, precio o categoría." },
    { icon: CalendarDays, title: "Comparar Perfiles", description: "Compara disponibilidad, precios y reputación." },
    { icon: Megaphone, title: "Ofertas en Tiempo Real", description: "Publica tu oferta y recibe respuestas inmediatas." },
    { icon: Images, title: "Portafolios Completos", description: "Ve fotos, videos y valoraciones reales." },
    { icon: MapPin, title: "Descubrir Eventos", description: "Encuentra eventos y sitios culturales cercanos." },
    { icon: Shield, title: "Pagos Seguros", description: "Paga de forma segura y califica tu experiencia." },
  ];

  useEffect(() => {
    // Progressive card reveal with scroll hijacking effect
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      // Set initial state for all cards - make them invisible
      window.gsap.set('.feature-card', {
        y: 150,
        opacity: 0,
        scale: 0.8,
        rotationX: 45
      });

      // Set initial state for title
      window.gsap.set('.section-title', {
        y: 50,
        opacity: 0
      });

      const cards = window.gsap.utils.toArray('.feature-card');
      
      // Create a timeline for the entire section with pinning
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * 2.5}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: 'howItWorks'
        }
      });

      // Title and first card animate together - very fast entrance
      tl.to('.section-title', {
        duration: 0.5,
        y: 0,
        opacity: 1,
        ease: 'power3.out'
      })
      .to(cards[0], {
        duration: 0.8,
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        ease: 'back.out(1.7)',
        transformOrigin: 'center bottom'
      }, 0.2);

      // Remaining cards animate one by one - rapid succession
      for (let i = 1; i < cards.length; i++) {
        tl.to(cards[i], {
          duration: 0.6,
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          ease: 'back.out(1.7)',
          transformOrigin: 'center bottom'
        }, i * 0.4 + 0.6);
      }

      // Brief pause then release
      tl.to({}, { duration: 0.5 });
    }
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative min-h-screen py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
      
      {/* Morphing Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="morphing-blob absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-600/20 to-transparent"></div>
        <div className="morphing-blob absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-pink-600/20 to-transparent" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="section-title text-center mb-20">
          <h2 className="font-orbitron text-5xl md:text-7xl font-bold gradient-text mb-8">
            Cómo Funciona
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Todo lo que necesitas para encontrar y contratar artistas
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card group">
                <div className="relative bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-purple-600/30 hover:border-purple-600 transition-all duration-500 transform-style-3d hover:scale-105">
                  {/* Icon with gradient background */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-orbitron font-bold gradient-text mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
