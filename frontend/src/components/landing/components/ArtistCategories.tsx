import { useState, useEffect, useRef } from "react";
import { artistsByCategory } from "../shared/artists-data";
import { Music, Footprints, Drama, Palette, Camera, Laptop, MoreHorizontal } from "lucide-react";
import { useGSAP } from "../hooks/useGSAP";
import { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

const categories = [
  { key: 'musicos', label: 'Músicos', icon: Music },
  { key: 'dancers', label: 'Bailarines', icon: Footprints },
  { key: 'actors', label: 'Actores', icon: Drama },
  { key: 'visual', label: 'Arte Visual', icon: Palette },
  { key: 'photo', label: 'Fotografía', icon: Camera },
  { key: 'digital', label: 'Arte Digital', icon: Laptop },
  { key: 'others', label: 'Otros', icon: MoreHorizontal }
];

export default function ArtistCategories() {
  const [activeCategory, setActiveCategory] = useState('musicos');
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToCardsRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  // Usar el hook useGSAP
  const { gsap, ScrollTrigger } = useGSAP();

  useEffect(() => {
    // Verificar que estamos en el navegador y que GSAP está disponible
    if (typeof window === 'undefined' || !gsap || !ScrollTrigger || !sectionRef.current) return;

    // Crear la línea de tiempo para las animaciones
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
        // Limpiar cuando se desmonte
        onRefresh: (self: any) => self.progress === 0 && self.animation?.progress?.(0)
      }
    });

    // Animación de entrada del banner
    if (bannerRef.current) {
      tl.from(bannerRef.current, {
        duration: 1.2,
        y: 60,
        opacity: 0,
        scale: 0.95,
        ease: 'power3.out'
      });
    }

    // Animación de entrada de las pestañas
    if (tabsRef.current) {
      tl.from(tabsRef.current, {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: 'power3.out'
      }, '-=0.6')
      // Cards staggered entrance
      .from('.artist-card', {
        duration: 0.8,
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        ease: 'power3.out'
      }, '-=0.4');
    }
  }, []);

  useEffect(() => {
    // Smooth fade-in for cards when category changes
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.fromTo('.artist-card', {
        opacity: 0,
        y: 20
      }, {
        duration: 0.5,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'power2.out'
      });
    }

    // Cards entrance
    if (cardsRef.current.length > 0 && gsap) {
      gsap.from(cardsRef.current, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Limpiar las animaciones cuando el componente se desmonte
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: ScrollTriggerType) => trigger.kill());
      }
    };
  }, [activeCategory, gsap, ScrollTrigger]);

  const getCurrentArtists = () => {
    return activeCategory ? (artistsByCategory[activeCategory as keyof typeof artistsByCategory] || artistsByCategory.musicos) : [];
  };

  const handleCategoryChange = (categoryKey: string) => {
    if (categoryKey === activeCategory) return;
    
    if (typeof window !== 'undefined' && window.gsap) {
      // Simple fade out and change category
      window.gsap.to('.artist-card', {
        duration: 0.2,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          setActiveCategory(categoryKey);
        }
      });
    } else {
      setActiveCategory(categoryKey);
    }
  };

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Animated Purple Banner */}
        <div ref={bannerRef} className="mb-12">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 p-8 md:p-12 rounded-3xl border border-purple-500/30 backdrop-blur-sm overflow-hidden relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="relative z-10 max-w-4xl">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <h2 className="text-sm font-semibold text-white">Descubre Talentos con las Habilidades que Necesitas</h2>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-orbitron font-bold mb-6 text-white leading-tight">
                Explora Artistas por <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">Categoría</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-purple-100 leading-relaxed max-w-3xl">
                Encuentra los artistas más populares como músicos profesionales, bailarines extraordinarios, 
                actores versátiles, creadores digitales innovadores y mucho más.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 px-8 py-4 rounded-full text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/25">
                  Ver Todos los Artistas
                </button>
                <button className="border-2 border-pink-400 text-pink-300 hover:bg-pink-400 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105">
                  Explorar Categorías
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Category Filter Tabs */}
        <div ref={tabsRef} className="mb-12">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`px-6 py-3 text-sm font-medium rounded-full border-2 whitespace-nowrap transition-all duration-500 flex items-center gap-3 hover:scale-105 ${
                    activeCategory === category.key 
                      ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white border-transparent shadow-lg shadow-pink-500/25" 
                      : "bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-purple-500/50 hover:bg-gray-700/50"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Artist Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {getCurrentArtists().map((artist, i) => (
            <div key={`${activeCategory}-${i}`} ref={addToCardsRef} className="artist-card group cursor-pointer">
              <div className="space-y-3">
                {/* Animated card container */}
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 p-1 transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-purple-500/25">
                  <div className="bg-black rounded-xl overflow-hidden relative h-full">
                    <img 
                      src={artist.image} 
                      alt={artist.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                    
                    {/* Animated overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Glowing border effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Artist info with animation */}
                <div className="text-center space-y-1 transform transition-all duration-500 group-hover:translate-y-[-2px]">
                  <div className="font-bold text-white text-lg group-hover:text-pink-300 transition-colors duration-300">
                    {artist.name}
                  </div>
                  <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {artist.profession}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}