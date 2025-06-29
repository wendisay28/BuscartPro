import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Zap, Check } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  profession: string;
  price: string;
  location: string;
  image: string;
}

const HowItWorksSection = () => (
  <div className="lg:w-1/2 px-6 lg:px-12">
    <div className="mb-10">
      <h2 className="text-4xl font-bold text-white mb-4">
        Encuentra el talento perfecto para tu evento y ocasión
      </h2>
      <p className="text-lg text-gray-300 mb-8">
        Conectamos organizadores con los mejores artistas y profesionales del entretenimiento
      </p>
    </div>
    
    <div className="space-y-8">
      {/* Paso 1 */}
      <div className="group relative pl-4 border-l-2 border-pink-500">
        <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
          <Search className="text-pink-500 mr-3 w-5 h-5" />
          Busca
        </h3>
        <p className="text-gray-300 pl-8">
          Explora entre cientos de artistas y profesionales calificados. Filtra por categoría, ubicación y presupuesto.
        </p>
      </div>
      
      {/* Paso 2 */}
      <div className="group relative pl-4 border-l-2 border-purple-500">
        <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
          <Filter className="text-purple-500 mr-3 w-5 h-5" />
          Compara
        </h3>
        <ul className="space-y-2 pl-8">
          <li className="flex items-start">
            <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-300">Revisa portafolios y reseñas</span>
          </li>
          <li className="flex items-start">
            <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-300">Compara presupuestos</span>
          </li>
          <li className="flex items-start">
            <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
            <span className="text-gray-300">Guarda tus favoritos</span>
          </li>
        </ul>
      </div>
      
      {/* Paso 3 */}
      <div className="group relative pl-4 border-l-2 border-blue-500">
        <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
          <Zap className="text-blue-500 mr-3 w-5 h-5" />
          Contrata con confianza
        </h3>
        <p className="text-gray-300 pl-8">
          Realiza pagos seguros a través de nuestra plataforma. Tu dinero está protegido hasta que el servicio sea completado.
        </p>
      </div>
    </div>
    
    <div className="mt-10">
      <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
        Comenzar a explorar
      </button>
    </div>
  </div>
);

const featuredArtists: Artist[] = [
  {
    id: '1',
    name: 'María González',
    profession: 'Cantante de boleros',
    price: 'Desde $1,200,000',
    location: 'Bogotá, Colombia',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80'
  },
  {
    id: '2',
    name: 'Carlos Martínez',
    profession: 'Músico profesional',
    price: 'Desde $800,000',
    location: 'Medellín, Colombia',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '3',
    name: 'Laura Torres',
    profession: 'Bailarina profesional',
    price: 'Desde $1,000,000',
    location: 'Cali, Colombia',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: '4',
    name: 'Javier Ramírez',
    profession: 'DJ profesional',
    price: 'Desde $1,500,000',
    location: 'Barranquilla, Colombia',
    image: 'https://images.unsplash.com/photo-1514525252781-ee673c0d6e7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }
];

export default function ArtistsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === featuredArtists.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredArtists.length - 1 : prevIndex - 1
    );
  };

  const getCardPosition = (index: number) => {
    const positions = ['left', 'center', 'right'];
    const relativeIndex = (index - currentIndex + featuredArtists.length) % featuredArtists.length;
    return positions[relativeIndex] || 'hidden';
  };

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Sección de Cómo Funciona */}
          <HowItWorksSection />
          
          {/* Carrusel de Artistas */}
          <div className="lg:w-1/2 relative overflow-hidden mt-12 lg:mt-0">
            {/* 3D Carousel */}
            <div className="carousel-container relative">
              <div className="flex items-center justify-center min-h-[550px] lg:min-h-[700px] overflow-hidden">
                <div className="relative w-full max-w-6xl">
                  {featuredArtists.map((artist, index) => {
                    const position = getCardPosition(index);
                    let transformStyle = '';
                    let zIndex = 1;
                    let opacity = 0.7;
                    const scale = position === 'center' ? 1.05 : 
                                  position === 'left' || position === 'right' ? 0.9 : 0.7;
                    
                    if (position === 'center') {
                      transformStyle = `translateX(0) scale(${scale}) translateZ(0)`;
                      zIndex = 10;
                      opacity = 1;
                    } else if (position === 'left') {
                      transformStyle = `translateX(-120px) scale(${scale}) rotateY(15deg) translateZ(-60px)`;
                      zIndex = 5;
                      opacity = 0.8;
                    } else if (position === 'right') {
                      transformStyle = 'translateX(100px) scale(0.9) rotateY(-15deg) translateZ(-50px)';
                      zIndex = 5;
                      opacity = 0.8;
                    } else {
                      transformStyle = 'translateX(0) scale(0.7) rotateY(25deg) translateZ(-100px)';
                      zIndex = 1;
                      opacity = 0.5;
                    }
                    
                    return (
                      <div
                        key={artist.id}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                        style={{
                          transform: `translate(-50%, -50%) ${transformStyle}`,
                          zIndex: zIndex,
                          opacity: opacity
                        }}
                      >
                        <div className={`bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden w-72 h-[28rem] flex flex-col ${
                          position === 'center' ? 'border-2 border-pink-500 shadow-xl shadow-pink-500/30' : 'border border-gray-700'
                        }`}>
                          <div className="relative h-72">
                            <img 
                              src={artist.image}
                              alt={artist.name}
                              className="w-full h-full object-cover" 
                              onError={(e) => {
                                console.error('Error loading image:', artist.image);
                                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNDAwIDUwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWIxZSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii0yIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM4YzhlOGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIxNCI+Q2FyZ2FuZG8gY29udGVuaWRvIGRlIG11ZXN0cmEgZGVsIGFydGlzdGE8L3RleHQ+Cjwvc3ZnPg==';
                                e.currentTarget.alt = 'Imagen no disponible';
                              }}
                            />
                            {position === 'center' && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            )}
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-gray-900 to-black">
                            <div>
                              <h3 className="font-bold text-white mb-1">{artist.name}</h3>
                              <p className="text-sm text-gray-300 mb-2">{artist.profession}</p>
                              <p className="text-sm text-pink-500 font-semibold">{artist.price}</p>
                            </div>
                            <p className="text-xs text-gray-400">{artist.location}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={prevCard}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Artista anterior"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={nextCard}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-pink-500/20 hover:bg-pink-500/40 backdrop-blur-sm rounded-full p-4 transition-all duration-300 hover:scale-110 z-20"
                  aria-label="Siguiente artista"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}