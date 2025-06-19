import { Artist } from '../../types';
import {
  MapPin,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Palette,
  Camera,
  Code,
  Music,
  Film,
  Brush,
  Zap,
  MessageCircle,
  Info,
  CalendarCheck,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreVertical
} from 'lucide-react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = artist.images || [];
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Solo manejar el clic si se hace clic en la tarjeta, no en los botones
    if (!(e.target as HTMLElement).closest('.action-button')) {
      console.log('Clic en la tarjeta de artista');
      // Aquí puedes agregar la lógica de navegación o lo que necesites
    }
  };

  return (
    <div className="relative w-[380px] h-[calc(75vh-1cm)] mx-auto">
      <div 
        className="flex flex-col w-full h-full bg-[#0A1A35] rounded-[20px] overflow-hidden shadow-xl"
        onClick={handleCardClick}
      >
      {/* Sección superior - Imagen (65% de la altura) */}
      <div className="relative overflow-hidden" style={{ height: '65%' }}>
        <div className="absolute inset-0 w-full h-full bg-[#0A1A35]">
          {images.length > 0 ? (
            <div className="w-full h-full relative">
              <img
                src={images[currentImageIndex]}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/380x400/0A1A35/CCCCCC?text=Imagen+no+disponible';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500">No hay imágenes</span>
            </div>
          )}
        </div>
        
        {/* Controles de navegación de imágenes */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10"
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
                className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        )}
        


      </div>
      
      {/* Sección inferior - Contenido (35% de la altura) */}
      <div className="flex flex-col bg-[#0A1A35] overflow-hidden" style={{ height: '35%' }}>
        <div className="p-4 h-full flex flex-col">
          {/* Contenedor para las filas 1 y 2 con margen reducido */}
          <div className="-mt-1">
            {/* Fila 1: Encabezado con nombre, profesión y precio */}
            <div className="flex justify-between items-start mb-1">
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-1">
                  <h3 className="text-[15px] font-bold text-white truncate">{artist.name}</h3>
                  <span className="text-[#CCCCCC] text-[9px]">•</span>
                  <span className="bg-gray-700/50 text-[9px] text-white px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    {artist.profession}
                  </span>
                </div>
              </div>
              {artist.price && (
                <div className="flex-shrink-0 text-[#FF7A00] font-bold text-[13px] ml-2 whitespace-nowrap">
                  ${artist.price.toLocaleString()}/h
                </div>
              )}
            </div>
            
            {/* Fila 2: Categorías / Etiquetas */}
            {artist.tags?.length > 0 && (
              <div className="flex items-center gap-1.5">
                {artist.tags.slice(0, 3).map((tag, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 px-1.5 py-0.5 bg-[#FF7A0026] text-[#FF7A00] text-[9px] rounded-full flex items-center gap-1 whitespace-nowrap"
                  >
                    {getTagIcon(tag)}
                    <span className="truncate" style={{ maxWidth: '60px' }}>{tag}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Fila 3: Horario */}
          <div className="flex gap-3 mt-1 text-[#CCCCCC] text-[11px]">
            <div className="flex items-center whitespace-nowrap">
              <Calendar className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>Lun-Sáb</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Clock className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>6 AM - 4 PM</span>
            </div>
          </div>
          
          {/* Fila 4: Descripción */}
          <div className="flex-1 flex flex-col justify-start mt-2">
            <p className="text-[#CCCCCC] text-[11px] leading-tight line-clamp-3">
              {artist.description || 'Artista apasionado por crear experiencias únicas a través de su trabajo.'}
            </p>
          </div>
          
          {/* Línea divisora */}
          <div className="border-t border-[#1A2C4A] mt-2"></div>
          
          {/* Fila 5: Información adicional y botones */}
          <div className="mt-auto pt-2 border-t border-[#1A2C4A]">
            <div className="flex justify-between items-center">
              {/* Información adicional */}
              <div className="flex items-center gap-3 text-[#CCCCCC] text-[11px]">
                <div className="flex items-center whitespace-nowrap">
                  <MessageCircle className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                  <span>30 reseñas</span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <MapPin className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                  <span>Bogotá • 4.9km</span>
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex gap-2">
                <button 
                  className="w-8 h-8 rounded-full border border-[#FF7A00] text-white flex items-center justify-center hover:bg-[#FF7A00]/20 transition-colors"
                  title="Ver portafolio"
                >
                  <Info className="w-4 h-4" />
                </button>
                <button 
                  className="w-8 h-8 rounded-full bg-[#FF7A00] text-white flex items-center justify-center hover:bg-[#FF7A00]/90 transition-colors"
                  title="Contactar"
                >
                  <CalendarCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
      </div>
      </div>
      </div>

      {/* Botones de acción flotantes */}
      <div className="absolute top-[45%] right-0 transform translate-x-16 -translate-y-1/2 flex flex-col gap-3 z-10">
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