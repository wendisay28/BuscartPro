import { useState } from 'react';
import { EventItem } from '../../types';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  MapPin, 
  Info, 
  CalendarCheck, 
  Star,
  Share2,
  Music, 
  Film, 
  Camera, 
  Code, 
  Palette, 
  Zap, 
  Coffee, 
  Wifi
} from 'lucide-react';

// Función para obtener el ícono según el tag
const getTagIcon = (tag: string) => {
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('concierto') || tagLower.includes('música') || tagLower.includes('musica')) {
    return <Music className="w-3 h-3" />;
  } else if (tagLower.includes('cine') || tagLower.includes('película') || tagLower.includes('pelicula')) {
    return <Film className="w-3 h-3" />;
  } else if (tagLower.includes('foto') || tagLower.includes('fotografía') || tagLower.includes('fotografia')) {
    return <Camera className="w-3 h-3" />;
  } else if (tagLower.includes('tecnología') || tagLower.includes('tecnologia') || tagLower.includes('digital')) {
    return <Code className="w-3 h-3" />;
  } else if (tagLower.includes('arte') || tagLower.includes('exposición') || tagLower.includes('exposicion')) {
    return <Palette className="w-3 h-3" />;
  } else if (tagLower.includes('café') || tagLower.includes('cafe')) {
    return <Coffee className="w-3 h-3" />;
  } else if (tagLower.includes('wifi') || tagLower.includes('internet')) {
    return <Wifi className="w-3 h-3" />;
  } else {
    return <Zap className="w-3 h-3" />;
  }
};

interface EventCardProps {
  data: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const images = data.images || [];

  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  const toggleRating = () => {
    setIsRated(!isRated);
  };

  return (
    <div className="relative w-full h-[calc(100vh-180px)] mx-auto md:h-[75vh]">
      <div className="relative flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.01]">
        {/* Sección de imagen - 65% */}
        <div className="relative h-[65%] w-full overflow-hidden">
          {images.length > 0 ? (
            <img
              src={images[currentImageIndex]}
              alt={`${data.name} - Imagen ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-opacity duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMWYyYTM1Ii8+PHRleHQgeD0iNTAlIiB5PSI1JSIgZm9udC1mFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgYWxpZ25tZW50LWJhc2VsaW5lPSJtaWRkbGUiIGZpbGw9IiNmZmYiPlNpbiBpbWFnZW4gZGUgcHJldmlzdGE8L3RleHQ+PC9zdmc+`;
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

          {/* Botones de acción en esquina superior derecha */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleRating();
              }}
              className={`p-2 rounded-full ${isRated ? 'bg-yellow-500/90 text-yellow-100' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800/90'}`}
              aria-label={isRated ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Star className={`w-4 h-4 ${isRated ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Acción para compartir
              }}
              className="p-2 rounded-full bg-gray-900/80 text-gray-300 hover:bg-gray-800/90"
              aria-label="Compartir"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contenido de la tarjeta - 35% */}
        <div className="flex flex-col h-[35%] overflow-hidden">
          <div className="p-4 pb-2">
            <h3 className="font-semibold text-lg text-white line-clamp-1">{data.name}</h3>
            
            {/* Fecha, hora y ubicación */}
            <div className="flex items-center mt-1.5 text-sm text-gray-300">
              <div className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span>{data.date || 'Fecha no disponible'}</span>
                <Clock className="w-3.5 h-3.5 mx-1.5 flex-shrink-0" />
                <span>{data.time || 'Hora no disponible'}</span>
              </div>
              <span className="flex items-center text-gray-400 ml-3 text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {data.city || 'Ubicación no disponible'}
                  {data.distance && ` • ${data.distance}`}
                </span>
              </span>
            </div>
          </div>

          <div className="px-4 pb-3 flex-1 overflow-y-auto">
            {data.description && (
              <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                {data.description.length > 90 ? `${data.description.substring(0, 90)}...` : data.description}
              </p>
            )}

            {/* Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {data.tags.slice(0, 3).map((tag, index) => (
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
              <div className="flex items-center gap-2">
                {data.price !== undefined && data.price !== null && (
                  <div className="flex items-center bg-gray-800/80 rounded-full px-3 py-1">
                    {data.price > 0 ? (
                      <>
                        <Ticket className="w-3.5 h-3.5 mr-1.5 text-[#bb00aa]" />
                        <span className="text-sm text-white font-medium">$</span>
                        <span className="text-sm text-white">
                          {data.price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                        </span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-3.5 h-3.5 mr-1.5 text-[#bb00aa]" />
                        <span className="text-sm text-white">Entrada libre</span>
                      </>
                    )}
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
                >
                  <Info className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-[#bb00aa] text-white flex items-center justify-center hover:bg-[#bb00aa]/90 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Acción para reservar
                  }}
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