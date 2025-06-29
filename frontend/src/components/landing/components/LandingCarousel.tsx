'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const destinations = [
  {
    title: 'Palacio de la Cultura',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/palaciodelacultura.jpg',
    description: 'Icono arquitectónico y centro cultural en el corazón de Medellín.'
  },
  {
    title: 'Jardín Botánico',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/jardinbotanico.jpg',
    description: 'Un oasis de biodiversidad en medio de la ciudad, hogar de miles de especies de flora.'
  },
  {
    title: 'Pueblito Paisa',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/pueblitopaisa.jpg',
    description: 'Réplica de un típico pueblo antioqueño con impresionantes vistas panorámicas de la ciudad.'
  },
  {
    title: 'Museo de Antioquia',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/museodeantioquia.jpg',
    description: 'Alberga una importante colección de arte, incluyendo obras de Fernando Botero.'
  },
  {
    title: 'Plaza Botero',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/plazaboteroantioquia.jpg',
    description: 'Famosa por sus 23 esculturas del maestro Fernando Botero.'
  },
  {
    title: 'Biblioteca Pública Piloto',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/BibliotecaPublicaPiloto.jpg',
    description: 'Centro cultural y biblioteca que promueve la lectura y la cultura en la ciudad.'
  },
  {
    title: 'Palacio de Bellas Artes',
    subtitle: 'Medellín · Colombia',
    image: '/images/Medellin/PalaciodeBellasArtes.jpeg',
    description: 'Joya arquitectónica que alberga importantes eventos culturales y artísticos.'
  }
];

export default function LandingCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % destinations.length);
  const prev = () => setIndex((prev) => (prev - 1 + destinations.length) % destinations.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Fondo con gradiente sutil */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(28, 0, 46, 0.9) 0%, rgba(76, 0, 94, 0.8) 100%)',
              backgroundSize: '30px 30px'
            }}
          />
          
          {/* Imagen principal */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${destinations[index].image})`,
              opacity: 0.8
            }}
          />
          
          {/* Overlay para mejorar contraste del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
          
          {/* Contenido del texto */}
          <div className="absolute left-16 bottom-40 z-10 flex flex-col justify-center w-1/2 max-w-2xl text-left">
            <div className="mb-8">
              <h2 className="text-7xl font-bold text-white leading-none mb-6">
                Explora lugares<br />y eventos cerca de ti
              </h2>
              <div className="flex items-center mb-4">
                <span className="h-1 w-12 bg-pink-500 mr-4"></span>
                <p className="text-pink-400 uppercase tracking-widest text-sm font-medium">
                  {destinations[index].subtitle}
                </p>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {destinations[index].title}
              </h1>
              {destinations[index].description && (
                <p className="text-lg text-gray-200 mb-8 max-w-lg">
                  {destinations[index].description}
                </p>
              )}
              <button className="group flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-4 text-sm rounded-full w-fit transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30">
                <span>EXPLORA</span>
                <svg 
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Tarjetas inferiores - CON COLORES NATURALES */}
      <div className="absolute bottom-0 right-0 z-10 py-8 w-1/2">
        <div className="w-full h-full pl-10">
          <div className="w-full overflow-hidden h-full">
            <div
              className="flex gap-6 w-max transition-transform duration-700"
              style={{ transform: `translateX(-${index * 280}px)` }}
            >
              {destinations.map((dest, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden"
                  style={{
                    width: '260px',
                    height: '420px',
                    borderRadius: '1rem',
                    transform: i === index ? 'scale(1.1)' : 'scale(0.95)',
                    opacity: i === index ? 1 : 0.7,
                    zIndex: i === index ? 20 : 1,
                    boxShadow: i === index ? '0 0 20px rgba(236, 72, 153, 0.8)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    border: '2px solid',
                    borderColor: i === index ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)',
                    transition: 'all 0.5s ease'
                  }}
                  onClick={() => setIndex(i)}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                    style={{ borderRadius: '0.9rem' }}
                  />
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-4"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                      borderRadius: '0 0 0.9rem 0.9rem'
                    }}
                  >
                    <p className="text-xs uppercase text-white/80">{dest.subtitle}</p>
                    <h3 className="text-sm font-bold text-white">{dest.title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicadores - Centrados */}
            <div className="mt-6 flex justify-center gap-2">
              {destinations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    i === index ? 'bg-pink-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Flechas de navegación */}
      <div className="absolute bottom-4 right-10 flex gap-4 z-20">
        <button onClick={prev} className="p-2 bg-white/20 rounded-full">
          <ChevronLeft />
        </button>
        <button onClick={next} className="p-2 bg-white/20 rounded-full">
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}