import { useState } from 'react';
import { VenueItem } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Wifi, 
  Coffee, 
  Palette, 
  Info, 
  MessageCircle, 
  MapPin, 
  CalendarCheck,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreVertical,
  Music,
  Film,
  Camera,
  Code,
  Zap
} from 'lucide-react';

// Función para obtener el ícono según el tag
const getTagIcon = (tag: string) => {
  const tagLower = tag.toLowerCase();
  
  if (tagLower.includes('café') || tagLower.includes('cafe') || tagLower.includes('restaurante')) {
    return <Coffee className="w-3 h-3" />;
  } else if (tagLower.includes('wifi') || tagLower.includes('internet')) {
    return <Wifi className="w-3 h-3" />;
  } else if (tagLower.includes('arte') || tagLower.includes('galería') || tagLower.includes('galeria')) {
    return <Palette className="w-3 h-3" />;
  } else if (tagLower.includes('ubicación') || tagLower.includes('ubicacion') || tagLower.includes('lugar')) {
    return <MapPin className="w-3 h-3" />;
  } else if (tagLower.includes('música') || tagLower.includes('musica') || tagLower.includes('concierto')) {
    return <Music className="w-3 h-3" />;
  } else if (tagLower.includes('cine') || tagLower.includes('película') || tagLower.includes('pelicula')) {
    return <Film className="w-3 h-3" />;
  } else if (tagLower.includes('foto') || tagLower.includes('fotografía') || tagLower.includes('fotografia')) {
    return <Camera className="w-3 h-3" />;
  } else if (tagLower.includes('tecnología') || tagLower.includes('tecnologia') || tagLower.includes('digital')) {
    return <Code className="w-3 h-3" />;
  } else if (tagLower.includes('fecha') || tagLower.includes('día') || tagLower.includes('dia')) {
    return <Calendar className="w-3 h-3" />;
  } else if (tagLower.includes('hora') || tagLower.includes('horario') || tagLower.includes('tiempo')) {
    return <Clock className="w-3 h-3" />;
  } else {
    return <Zap className="w-3 h-3" />;
  }
};

interface VenueCardProps {
  data: VenueItem;
}

export const VenueCard: React.FC<VenueCardProps> = ({ data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = data.images || [];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Solo manejar el clic si se hace clic en la imagen, no en los botones u otros elementos
    const target = e.target as HTMLElement;
    if (target.closest('.image-container') && !target.closest('.navigation-button')) {
      const rect = target.getBoundingClientRect();
      const clickX = e.clientX - rect.left; // Posición X del clic relativa a la imagen
      const width = rect.width;
      
      if (images.length <= 1) return;
      
      // Si el clic está en el lado izquierdo (25% de la imagen), ir a la imagen anterior
      // Si está en el derecho (75% de la imagen), ir a la siguiente
      if (clickX < width * 0.4) {
        setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
      } else if (clickX > width * 0.6) {
        setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
      }
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-180px)] mx-auto md:h-[75vh]">
      {/* Contenedor de la tarjeta */}
      <div 
        className="flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl cursor-pointer"
        onClick={handleCardClick}
      >
        {/* Sección superior - Imagen */}
        <div className="relative overflow-hidden h-[65%] md:h-[70%]">
          <div className="absolute inset-0 w-full h-full bg-gray-900 image-container cursor-pointer">
            {images.length > 0 ? (
              <div className="w-full h-full relative">
                <img
                  src={images[currentImageIndex]}
                  alt={`${data.name} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Usar un SVG en línea como imagen de reemplazo
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzODAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgMzgwIDQwMCI+PHJlY3Qgd2lkdGg9IjM4MCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMwQTFBMzUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjY2NjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500">No hay imágenes</span>
              </div>
            )}
          </div>
          
          {/* Controles de navegación de imágenes - Ocultos en móviles */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10 navigation-button"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10 navigation-button"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
          
          {/* Indicador de imágenes */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Sección de contenido */}
        <div className="flex-1 p-4 pb-2 flex flex-col h-[35%] md:h-[30%] overflow-y-auto">
          <div className="h-full flex flex-col justify-between">
            {/* Encabezado */}
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="hidden md:flex items-baseline gap-3">
                  <h2 className="text-xl font-bold text-white">{data.name}</h2>
                </div>
                <div className="md:hidden">
                  <h2 className="text-xl font-bold text-white">{data.name}</h2>
                </div>
              </div>
              <div className="text-[#bb00aa] text-xl font-bold whitespace-nowrap">
                ${data.price?.toLocaleString()}/h
              </div>
            </div>
            
            {/* Etiquetas */}
            {data.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {data.tags.slice(0, 3).map((tag, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 px-2 py-0.5 bg-[#bb00aa26] text-[#bb00aa] text-xs rounded-full flex items-center gap-1"
                  >
                    {getTagIcon(tag)}
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Horario */}
            <div className="flex gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-400" />
                <span>Lun-Sáb</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                <span>9 AM - 6 PM</span>
              </div>
            </div>
            
            {/* Descripción */}
            <div className="flex-1">
              <p className="text-base text-gray-300 leading-snug mt-2">
                {data.description && data.description.length > 90
                  ? `${data.description.substring(0, 90)}...`
                  : data.description || 'Un espacio donde el aroma del café se mezcla con exposiciones de arte, talleres creativos y charlas culturales. Perfecto para una tarde inspiradora.'}
              </p>
            </div>
            
            {/* Pie de tarjeta */}
            <div className="relative mt-1">
              <div className="absolute -top-2 left-0 w-full h-2 bg-gradient-to-b from-transparent to-[#0F172A]/80"></div>
              <div className="h-px w-full bg-[#1A2C4A] mb-1"></div>
              <div className="flex justify-between items-center">
                {/* Información adicional */}
                <div className="flex items-center gap-4 text-[#CCCCCC] text-sm">
                  <div className="flex items-center whitespace-nowrap">
                    <MessageCircle className="w-4 h-4 mr-1.5 text-white flex-shrink-0" />
                    <span>{data.reviews || '24'} reseñas</span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <MapPin className="w-4 h-4 mr-1.5 text-white flex-shrink-0" />
                    <span>{data.city || 'Bogotá'} • 2.7km</span>
                  </div>
                </div>
                
                {/* Botones */}
                <div className="flex gap-2">
                  <button 
                    className="w-8 h-8 rounded-full border border-[#bb00aa] text-white flex items-center justify-center hover:bg-[#FF7A00]/20 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Acción para ver más información
                    }}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-8 h-8 rounded-full bg-[#bb00aa] text-white flex items-center justify-center hover:bg-[#FF7A00]/90 transition-colors"
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

      {/* Botones de acción flotantes - Solo en móvil */}
      <div className="md:hidden absolute right-2 top-[calc(50%-60px)] transform -translate-y-1/2 flex flex-col gap-3 z-10 items-end">
        <div className="flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Me gusta');
            }}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5 fill-current" />
          </button>
                    <span className="text-white text-lg font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center mt-0.5">1.2K</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Comentarios');
            }}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <MessageSquare className="w-5 h-5 fill-current" />
          </button>
                    <span className="text-white text-lg font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] text-center mt-0.5">24</span>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Guardar');
            }}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Bookmark className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Compartir');
            }}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <Share2 className="w-5 h-5 fill-current" />
          </button>
        </div>
        
        <div className="flex flex-col items-center">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('Más opciones');
            }}
            className="w-10 h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-pink-400 transition-all duration-200 transform hover:scale-110 shadow-lg shadow-black/30 backdrop-blur-sm"
          >
            <MoreVertical className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
      
      {/* Botones de acción - Solo en escritorio */}
      <div className="hidden md:flex absolute top-[45%] right-0 transform translate-x-16 -translate-y-1/2 flex-col gap-3 z-10">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Me gusta');
          }}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Heart className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Comentarios');
          }}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Guardar');
          }}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Bookmark className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Compartir');
          }}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            console.log('Más opciones');
          }}
          className="action-button w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};