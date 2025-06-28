'use client';

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { featuredArtists } from "@/lib/artists-data";

export default function ArtistsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = featuredArtists.length;

  const updateCarousel = (index: number) => {
    setCurrentIndex(index);
  };

  const nextCard = () => {
    const newIndex = (currentIndex + 1) % totalCards;
    updateCarousel(newIndex);
  };

  const prevCard = () => {
    const newIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel(newIndex);
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(nextCard, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const getCardPosition = (index: number) => {
    if (index === currentIndex) return 'center';
    if (index === (currentIndex - 1 + totalCards) % totalCards) return 'left';
    if (index === (currentIndex + 1) % totalCards) return 'right';
    return 'far';
  };

  return (
    <div className="relative overflow-hidden w-full ml-4 lg:ml-8">

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

      {/* Enlace de texto */}
      <div className="text-center -mt-2">
        <a 
          href="/artistas" 
          className="text-sm text-pink-400 hover:text-pink-300 font-medium transition-colors duration-200 inline-flex items-center"
        >
          Ver todos los artistas
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}