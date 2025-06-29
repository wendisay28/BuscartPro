import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { artistsByCategory } from "../shared/artists-data";
import { eventsData, Event } from "../shared/events-data";
import { Music, Footprints, Drama, Palette, Camera, Laptop, MoreHorizontal, Loader2 } from "lucide-react";

// Componente de imagen optimizada
const OptimizedImage = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = ""
}: { 
  src: string; 
  alt: string; 
  className?: string;
  containerClassName?: string;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [error, setError] = useState(false);

  // Cargar la imagen de fondo de baja calidad primero
  const lowResSrc = useMemo(() => {
    if (!src) return '';
    try {
      const url = new URL(src);
      // Añadir parámetros de optimización para Pexels
      if (url.hostname.includes('pexels.com')) {
        url.searchParams.set('auto', 'compress');
        url.searchParams.set('cs', 'tinysrgb');
        url.searchParams.set('fit', 'crop');
        url.searchParams.set('w', '300');
        url.searchParams.set('h', '300');
        url.searchParams.set('q', '70');
      }
      return url.toString();
    } catch {
      return src;
    }
  }, [src]);

  // Cargar la imagen en alta resolución
  useEffect(() => {
    if (!src) return;

    setIsLoading(true);
    setError(false);
    
    const img = new window.Image();
    
    img.src = lowResSrc;
    img.onload = () => {
      setImgSrc(img.src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setError(true);
      setIsLoading(false);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, lowResSrc]);

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
        </div>
      )}
      {error ? (
        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <span className="text-xs text-gray-500">Error al cargar</span>
        </div>
      ) : (
        <img
          src={imgSrc || lowResSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } ${className}`}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

const artistCategories = [
  { key: "musicos", label: "Músicos", icon: Music },
  { key: "dancers", label: "Bailarines", icon: Footprints },
  { key: "actors", label: "Actores", icon: Drama },
  { key: "visual", label: "Arte Visual", icon: Palette },
  { key: "photo", label: "Fotografía", icon: Camera },
  { key: "digital", label: "Arte Digital", icon: Laptop },
  { key: "others", label: "Otros", icon: MoreHorizontal }
];

const eventCategories = [
  { key: "concierto", label: "Conciertos", icon: Music },
  { key: "teatro", label: "Obras de Teatro", icon: Drama },
  { key: "festival", label: "Festivales", icon: Music },
  { key: "cine", label: "Cine", icon: Camera },
  { key: "exposicion", label: "Exposiciones", icon: Palette },
  { key: "taller", label: "Talleres", icon: MoreHorizontal },
  { key: "otro", label: "Otros", icon: MoreHorizontal }
];

interface ArtistCategoriesProps {
  onViewArtists: () => void;
}

export default function ArtistCategories({ onViewArtists }: ArtistCategoriesProps) {
  const [mode, setMode] = useState<"artists" | "events">("artists");
  const [activeCategory, setActiveCategory] = useState("musicos");
  const [activeEventCategory, setActiveEventCategory] = useState<string>("concierto");
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const addToCardsRef = useCallback((el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && window.ScrollTrigger) {
      const tl = window.gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Banner entrance
      tl.from(bannerRef.current, {
        duration: 1.2,
        y: 60,
        opacity: 0,
        scale: 0.95,
        ease: "power3.out"
      })
      // Tabs entrance
      .from(tabsRef.current, {
        duration: 1,
        y: 40,
        opacity: 0,
        ease: "power3.out"
      }, "-=0.6")
      // Cards staggered entrance
      .from(".artist-card, .event-card", {
        duration: 0.8,
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.4");
    }
  }, [mode]);

  const getCurrentArtists = useCallback(() => {
    return artistsByCategory[activeCategory as keyof typeof artistsByCategory] || [];
  }, [activeCategory]);

  const getFilteredEvents = useCallback((): Event[] => {
    return eventsData.filter(event => event.type === activeEventCategory);
  }, [activeEventCategory]);

  const handleCategoryChange = useCallback((categoryKey: string) => {
    if (mode === "artists") {
      setActiveCategory(categoryKey);
    } else {
      setActiveEventCategory(categoryKey);
    }
  }, [mode]);

  const renderArtistCards = () => {
    const artists = useMemo(() => getCurrentArtists().slice(0, 6), [activeCategory]);
    
    return (
      <>
        <div ref={tabsRef} className="mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {artistCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeCategory === category.key
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {artists.map((artist, index) => (
            <div key={`${artist.name}-${index}`} className="flex flex-col">
              <div 
                ref={addToCardsRef}
                className="artist-card group relative bg-gray-900/50 rounded-lg overflow-hidden border-2 border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/70 h-full"
              >
                <div className="aspect-square">
                  <OptimizedImage
                    src={artist.image}
                    alt={artist.name}
                    className="group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="p-2">
                  <div className="font-medium text-white line-clamp-1">{artist.name}</div>
                  <div className="text-xs text-purple-300 font-light line-clamp-1">
                    {artist.profession}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  // Precargar imágenes de la categoría actual de eventos
  useEffect(() => {
    if (mode === 'events') {
      const events = getFilteredEvents();
      if (typeof window !== 'undefined') {
        events.forEach(event => {
          if (event.image) {
            const img = new window.Image();
            img.src = event.image;
          }
        });
      }
    }
  }, [activeEventCategory, mode]);

  const renderEventCards = () => {
    const events = useMemo(() => getFilteredEvents(), [activeEventCategory]);
    
    return (
      <>
        <div ref={tabsRef} className="mb-8">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
            {eventCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    activeEventCategory === category.key
                      ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col">
              <div 
                ref={addToCardsRef}
                className="event-card group relative bg-gray-900/50 rounded-lg overflow-hidden border-2 border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:border-pink-500/70 h-full"
              >
                <div className="aspect-square">
                  <OptimizedImage
                    src={event.image}
                    alt={event.title}
                    className="group-hover:scale-105 transition-transform duration-500"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="p-2 flex-1 flex flex-col">
                  <div className="font-medium text-white line-clamp-2 text-sm">{event.title}</div>
                  <div className="text-xs text-purple-300 font-light line-clamp-1 mt-1">
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/40 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-600/10 rounded-full blur-xl animate-pulse"></div>
        <div 
          className="absolute bottom-20 right-10 w-40 h-40 bg-pink-600/10 rounded-full blur-xl animate-pulse" 
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Compact Banner */}
        <div ref={bannerRef} className="mb-10">
          <div className="bg-purple-700 p-6 md:p-8 rounded-2xl border border-purple-500/30 backdrop-blur-sm overflow-hidden relative h-64 md:h-80">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center h-full">
              <div className="md:w-[70%] h-full flex flex-col justify-center pr-4">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full mb-3">
                  <h2 className="text-xs font-semibold text-white">
                    Descubre Talentos
                  </h2>
                </div>
                <h1 
                  className="text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-3 md:mb-4 text-white leading-tight"
                  dangerouslySetInnerHTML={{
                    __html: 'Explora por <span class="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">Categoría</span>'
                  }}
                />
                <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 text-purple-100 leading-relaxed max-w-3xl">
                  Explora músicos, bailarines, actores, creadores digitales y más, mientras te conectas con eventos cercanos como conciertos, obras de teatro, cine independiente y festivales que celebran la creatividad en todas sus formas.
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <button 
                    onClick={() => {
                      setMode("artists");
                      onViewArtists();
                    }}
                    className={`px-6 md:px-8 py-1.5 md:py-2 text-xs md:text-sm rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                      mode === "artists"
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:shadow-lg hover:shadow-pink-500/20"
                        : "border-2 border-pink-400 text-pink-300 hover:bg-pink-400/10 hover:text-white"
                    }`}
                  >
                    Ver Artistas
                  </button>
                  <button 
                    onClick={() => setMode("events")}
                    className={`px-6 md:px-8 py-1.5 md:py-2 text-xs md:text-sm rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                      mode === "events"
                        ? "bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white hover:shadow-lg hover:shadow-pink-500/20"
                        : "border-2 border-pink-400 text-pink-300 hover:bg-pink-400/10 hover:text-white"
                    }`}
                  >
                    Ver Eventos
                  </button>
                </div>
              </div>
              <div className="hidden md:block absolute right-0 h-full w-[30%] pr-4">
                <div className="relative h-full flex items-end">
                  <img 
                    src="/images/categories/categoria1.png"
                    alt="Categorías de artistas"
                    className="h-[140%] w-auto object-contain object-bottom"
                    style={{
                      filter: 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
                      transform: 'translateX(0) translateY(40px)'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {mode === "artists" ? renderArtistCards() : renderEventCards()}
      </div>
    </section>
  );
}