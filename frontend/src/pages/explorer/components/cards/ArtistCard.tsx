import { Artist } from '../../types';
import {
  MapPin,
  Calendar,
  Clock,
  Palette,
  Camera,
  Code,
  Music,
  Film,
  Brush,
  Zap,
  Info,
  CalendarCheck,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreVertical,
  Star
} from 'lucide-react';
import { useState } from 'react';

interface ArtistCardProps {
  artist: Artist;
}

// Función para limitar la profesión a dos palabras
const formatProfession = (profession: string): string => {
  const words = profession.split(' ').filter(word => word.trim() !== '');
  // Tomar solo las primeras dos palabras y unirlas con espacio
  return words.slice(0, 2).join(' ');
};

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = artist.images || [];
  const [isRated, setIsRated] = useState(false);

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const toggleRating = () => {
    setIsRated(!isRated);
  };

  const handleAction = (action: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(action);
  };

  return (
    <div className="relative w-full h-[calc(100vh-180px)] mx-auto md:h-[75vh]">
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
                <span className="truncate">{artist.city || 'Ubicación no disponible'}</span>
                {artist.distance && ` • ${artist.distance}km`}
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
                  <div className="flex items-center">
                    <span className="text-[#bb00aa] font-medium">
                      ${artist.price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-xs text-gray-400 ml-1">/hora</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-300">Precio a convenir</span>
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

      {/* Botones de acción flotantes - Solo en móvil */}
      <div className="md:hidden absolute right-2 top-[calc(50%-45px)] transform -translate-y-1/2 flex flex-col gap-3 z-10 items-end">
        <div className="flex flex-col items-center">
          <button 
            onClick={handleAction('Me gusta')}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
          <span className="text-white text-base font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center mt-0.5">1.2K</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={handleAction('Comentarios')}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
          </button>
          <span className="text-white text-base font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center mt-0.5">24</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={handleAction('Guardar')}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={handleAction('Compartir')}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={handleAction('Más opciones')}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <MoreVertical className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>

      {/* Botones de acción - Solo en escritorio */}
      <div className="hidden md:flex absolute top-[50%] right-0 transform translate-x-16 -translate-y-1/2 flex-col gap-3 z-10">
        <button 
          onClick={handleAction('Me gusta')}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>
        <button 
          onClick={handleAction('Comentarios')}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
        <button 
          onClick={handleAction('Guardar')}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Bookmark className="w-5 h-5" />
        </button>
        <button 
          onClick={handleAction('Compartir')}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          onClick={handleAction('Más opciones')}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};