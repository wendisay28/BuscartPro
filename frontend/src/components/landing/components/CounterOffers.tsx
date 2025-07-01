import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap } from 'lucide-react';

// Mapeo de colores a clases de Tailwind
const colorMap = {
  purple: {
    bg: 'from-purple-600 to-purple-700',
    text: 'text-purple-600',
    border: 'border-purple-500/30'
  },
  pink: {
    bg: 'from-pink-600 to-pink-700',
    text: 'text-pink-600',
    border: 'border-pink-500/30'
  },
  'purple-700': {
    bg: 'from-purple-700 to-purple-800',
    text: 'text-purple-700',
    border: 'border-purple-600/30'
  }
};

interface Client {
  name: string;
  avatar: string;
  company: string;
  rating: number;
  projects: number;
}

interface Offer {
  title: string;
  description: string;
  price: number;
  timer: number;
  suit: string;
  color: keyof typeof colorMap;
  client: Client;
}

export default function CounterOffers() {
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<HTMLDivElement[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);

  const addToTimerRefs = (el: HTMLDivElement) => {
    if (el && !timersRef.current.includes(el)) {
      timersRef.current.push(el);
    }
  };

  useEffect(() => {
    // Registrar plugins de GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Timer Countdown
    const startTimers = () => {
      const timers: NodeJS.Timeout[] = [];
      
      timersRef.current.forEach(timer => {
        if (!timer) return;
        
        let timeLeft = parseInt(timer.getAttribute('data-timer') || '0');
        
        const countdown = setInterval(() => {
          const hours = Math.floor(timeLeft / 3600);
          const minutes = Math.floor((timeLeft % 3600) / 60);
          const seconds = timeLeft % 60;
          
          timer.textContent = 
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');
          
          if (timeLeft <= 0) {
            clearInterval(countdown);
            timer.textContent = 'EXPIRADO';
            timer.classList.add('text-red-500');
          }
          timeLeft--;
        }, 1000);
        
        timers.push(countdown);
      });
      
      return timers;
    };

    const timers = startTimers();

    // Configuración inicial de animaciones
    gsap.set('.counter-title', { y: 50, opacity: 0 });
    gsap.set('.flip-card', { y: 100, opacity: 0 });
    
    // Configurar el timeline de animación
    const cards = gsap.utils.toArray('.flip-card');
    
    // Configuración inicial de las caras de las tarjetas
    cards.forEach((card: any) => {
      const front = card.querySelector('.card-front');
      const back = card.querySelector('.card-back');
      
      gsap.set(front, { 
        rotationY: 180,
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      });
      
      gsap.set(back, { 
        rotationY: 0,
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      });
    });

    // Crear timeline con scroll pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${window.innerHeight * 2}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: 'counterOffers',
        onEnter: () => {
          if (!isAnimating.current) {
            tl.play();
            isAnimating.current = true;
          }
        },
        onEnterBack: () => {
          if (!isAnimating.current) {
            tl.play().reverse();
            isAnimating.current = true;
          }
        },
        onLeave: () => {
          isAnimating.current = false;
        },
        onLeaveBack: () => {
          isAnimating.current = false;
        }
      }
    });

    // Animación de entrada del título
    tl.to('.counter-title', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power3.out'
    }, 0);

    // Animación de entrada de las tarjetas
    cards.forEach((card: any, i: number) => {
      tl.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      }, i * 0.15 + 0.1);

      // Animación de volteo
      const front = card.querySelector('.card-front');
      const back = card.querySelector('.card-back');
      
      tl.to(back, {
        rotationY: 180,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          card.classList.add('flipped');
        }
      }, i * 0.3 + 0.8);
      
      tl.to(front, {
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.inOut'
      }, i * 0.3 + 0.8);
    });

    // Pausa al final
    tl.to({}, { duration: 0.5 });
    
    // Pausar la animación inicialmente
    tl.pause();
    animationRef.current = tl;

    // Limpieza
    return () => {
      timers.forEach(timer => clearInterval(timer));
      ScrollTrigger.getById('counterOffers')?.kill();
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Función para manejar el clic en las tarjetas
  const handleCardClick = (e: React.MouseEvent) => {
    const card = (e.currentTarget as HTMLElement).closest('.flip-card');
    if (!card) return;
    
    const front = card.querySelector('.card-front');
    const back = card.querySelector('.card-back');
    
    if (card.classList.contains('flipped')) {
      gsap.to(front, { rotationY: 180, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(back, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' });
      card.classList.remove('flipped');
    } else {
      gsap.to(front, { rotationY: 0, duration: 0.6, ease: 'power2.inOut' });
      gsap.to(back, { rotationY: 180, duration: 0.6, ease: 'power2.inOut' });
      card.classList.add('flipped');
    }
  };

  const offers: Offer[] = [
    {
      title: "Mural Corporativo",
      description: "Empresa tecnológica busca artista para lobby",
      price: 3500,
      timer: 3600,
      suit: "",
      color: "purple",
      client: {
        name: "TechCorp Solutions",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        company: "Empresa Tecnológica",
        rating: 4.8,
        projects: 23
      }
    },
    {
      title: "Performance Wedding",
      description: "Pareja busca espectáculo único para boda",
      price: 2800,
      timer: 7200,
      suit: "",
      color: "pink",
      client: {
        name: "Sofia & Miguel",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b766?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        company: "Evento Privado",
        rating: 5.0,
        projects: 1
      }
    },
    {
      title: "Instalación Digital",
      description: "Museo requiere experiencia interactiva",
      price: 5200,
      timer: 1800,
      suit: "",
      color: "purple-700",
      client: {
        name: "Museo de Arte Moderno",
        avatar: "https://images.unsplash.com/photo-1511798616182-aab3698ac53e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150",
        company: "Institución Cultural",
        rating: 4.9,
        projects: 47
      }
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 bg-black z-0">
      {/* Efecto de humo */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-600/10 to-transparent animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-full h-32 bg-gradient-to-t from-purple-600/10 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="counter-title text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Contraofertas Activas
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Conoce a los clientes detrás de cada oportunidad
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {offers.map((offer, index) => {
            const colors = colorMap[offer.color];
            
            return (
              <div 
                key={index} 
                className="flip-card h-64 md:h-72 relative cursor-pointer mb-8 md:mb-0" 
                style={{ perspective: '1000px' }}
                onClick={handleCardClick}
              >
                {/* Parte delantera - Detalles de la oferta */}
                <div 
                  className="card-front absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-purple-500/30"
                  style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center text-xl font-bold text-white relative z-10`}>
                        <Zap className="w-6 h-6" fill="currentColor" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full opacity-60 blur-[6px] -z-0"></div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">Expira en</div>
                      <div 
                        ref={addToTimerRefs}
                        className={`font-mono text-lg ${colors.text} font-bold`}
                        data-timer={offer.timer}
                      >
                        01:00:00
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">{offer.title}</h3>
                  <p className="text-gray-400 mb-6">{offer.description}</p>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600">
                        ${offer.price.toLocaleString()}
                      </span>
                      <button className={`bg-gradient-to-r ${colors.bg} hover:opacity-90 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 transform hover:scale-[1.03]`}>
                        Ofertar
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      Haz clic para ver más
                    </div>
                  </div>
                </div>

                {/* Parte trasera - Perfil del cliente */}
                <div 
                  className="card-back absolute inset-0 bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl border border-pink-500/30"
                  style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
                >
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-2 border-pink-500">
                      <img 
                        src={offer.client.avatar} 
                        alt={offer.client.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-1">{offer.client.name}</h3>
                    <p className="text-gray-400 text-sm">{offer.client.company}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Rating:</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-white font-semibold">{offer.client.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Proyectos:</span>
                      <span className="text-white font-semibold">{offer.client.projects}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-[1.02]">
                      Ver Oferta
                    </button>
                    <button 
                      className="w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        const card = (e.currentTarget as HTMLElement).closest('.flip-card');
                        if (card) {
                          card.dispatchEvent(new Event('click'));
                        }
                      }}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
