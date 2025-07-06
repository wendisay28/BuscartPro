import { Artist } from '../../types';
import { Palette, Camera, Code, Music, Film, Brush, Zap, MapPin, Calendar, Clock, Info, CalendarCheck } from 'lucide-react';
import { useState } from 'react';

interface ArtistCardProps {
  artist: Artist;
}

// Función para obtener el ícono según el tag
const getTagIcon = (tag: string) => {
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('retrato') || tagLower.includes('retratos')) {
    return <Palette className="w-3 h-3" />;
  } else if (tagLower.includes('concept') || tagLower.includes('arte conceptual')) {
    return <Palette className="w-3 h-3" />;
  } else if (tagLower.includes('digital') || tagLower.includes('diseño')) {
    return <Code className="w-3 h-3" />;
  } else if (tagLower.includes('ilustracion') || tagLower.includes('ilustración')) {
    return <Brush className="w-3 h-3" />;
  } else if (tagLower.includes('foto') || tagLower.includes('fotografía')) {
    return <Camera className="w-3 h-3" />;
  } else if (tagLower.includes('tradicional')) {
    return <Brush className="w-3 h-3" />;
  } else if (tagLower.includes('3d') || tagLower.includes('3D')) {
    return <Code className="w-3 h-3" />;
  } else if (tagLower.includes('animacion') || tagLower.includes('animación')) {
    return <Film className="w-3 h-3" />;
  } else if (tagLower.includes('mural')) {
    return <Palette className="w-3 h-3" />;
  } else if (tagLower.includes('tatuaje')) {
    return <Zap className="w-3 h-3" />;
  } else if (tagLower.includes('música') || tagLower.includes('musica')) {
    return <Music className="w-3 h-3" />;
  } else {
    return <Zap className="w-3 h-3" />;
  }
};

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const images = artist.images || [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-md h-[calc(100vh-180px)] mx-auto md:h-[75vh]">
      {/* Tarjeta principal */}
      <div 
        className="flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.01]"
      >
        {/* Sección de imagen - 65% */}
        <div className="relative h-[65%] w-full overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={artist.name}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyYTM1Ii8+PHRleHQgeD0iNTAlIiB5PSI1JSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iI2ZmZiI+U2luIGltYWdlbiBkZSBwcmV2aXN0YTwvdGV4dD48L3N2Zz4=`;
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <Palette className="w-12 h-12 text-gray-600" />
            </div>
          )}

          {/* Navegación de imágenes */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full p-0.5 z-10 text-xs">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="w-6 h-6 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-all"
                aria-label="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <span className="text-white/80 px-1">
                {currentImageIndex + 1} / {images.length}
              </span>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="w-6 h-6 flex items-center justify-center text-white hover:bg-black/50 rounded-full transition-all"
                aria-label="Siguiente imagen"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Contenido de la tarjeta - 35% */}
        <div className="flex flex-col h-[35%] overflow-hidden">
          <div className="p-4 pb-2">
            <div className="flex items-baseline gap-2">
              <h3 className="font-semibold text-lg text-white line-clamp-1">
                {artist.name}
              </h3>
              <span className="text-xs text-[#bb00aa] font-medium">
                • {artist.profession || 'Artista'}
              </span>
            </div>
            
            {/* Fecha, hora y ubicación */}
            <div className="flex items-center mt-1.5 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span>15 Jul</span>
                <Clock className="w-3.5 h-3.5 mx-1.5 flex-shrink-0" />
                <span>7:00 PM</span>
              </div>
              <span className="flex items-center text-gray-400 ml-3 text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {artist.city || 'Ubicación no disponible'}
                  {artist.distance && ` • ${artist.distance}km`}
                </span>
              </span>
            </div>
          </div>

          <div className="px-4 pb-3 flex-1 overflow-y-auto">
            {/* Descripción */}
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              {artist.description || 'Artista apasionado por crear experiencias únicas a través de su trabajo.'}
            </p>

            {/* Etiquetas */}
            {artist.tags && artist.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {artist.tags.slice(0, 3).map((tag, index) => (
                  <div 
                    key={index}
                    className="text-xs bg-gray-800/80 text-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1"
                  >
                    {getTagIcon(tag)}
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pie de tarjeta con precio y botones */}
          <div className="border-t border-gray-700/50 px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {artist.price ? (
                  <div className="flex items-center bg-gray-800/80 rounded-full px-3 py-1">
                    <Palette className="w-3.5 h-3.5 mr-1.5 text-[#bb00aa]" />
                    <span className="text-sm text-white font-medium">$</span>
                    <span className="text-sm text-white">
                      {artist.price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center bg-gray-800/80 rounded-full px-3 py-1">
                    <Palette className="w-3.5 h-3.5 mr-1.5 text-[#bb00aa]" />
                    <span className="text-sm text-white">A convenir</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 rounded-full border border-[#bb00aa] text-white flex items-center justify-center hover:bg-[#bb00aa]/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Acción para ver más información
                  }}
                  aria-label="Ver más información"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-[#bb00aa] text-white flex items-center justify-center hover:bg-[#bb00aa]/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Acción para reservar
                  }}
                  aria-label="Reservar"
                >
                  <CalendarCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};