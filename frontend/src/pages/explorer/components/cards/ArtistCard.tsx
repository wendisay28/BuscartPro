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
  
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.image-container') && !target.closest('.navigation-button')) {
      const rect = target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      
      if (images.length <= 1) return;
      
      if (clickX < width * 0.4) {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (clickX > width * 0.6) {
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const handleAction = (action: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(action);
  };

  return (
            <div className="relative w-full h-[calc(100vh-180px)] mx-auto md:h-[80vh]">
      {/* Tarjeta principal */}
      <div 
        className="flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl"
        onClick={handleCardClick}
      >
  

      {/* Sección de imagen */}
      <div className="relative overflow-hidden h-[70%] md:h-[70%]">
          <div className="absolute inset-0 w-full h-full bg-gray-900 image-container cursor-pointer">
            {images.length > 0 ? (
              <div className="w-full h-full relative">
                <img
                  src={images[currentImageIndex]}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
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
          
          {/* Controles de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10 navigation-button"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10 navigation-button"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              
              {/* Indicador de imágenes */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Sección de contenido */}
        <div className="flex-1 p-4 pb-2 flex flex-col h-[30%] md:h-[30%] overflow-y-auto">
          <div className="h-full flex flex-col justify-between">
            {/* Nombre, profesión y precio */}
            <div className="flex justify-between items-start mb-1">
              <div>
                {/* --- Vista de Escritorio: Nombre Profesión --- */}
                <div className="hidden md:flex items-baseline gap-3">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">{artist.name}</h2>
                  <p className="text-sm text-white bg-black/20 backdrop-blur-md rounded-full px-3 py-0.5">
                    {formatProfession(artist.profession)}
                  </p>
                </div>

                {/* --- Vista Móvil: Nombre y debajo Profesión --- */}
                <div className="md:hidden">
                  <h2 className="text-2xl font-bold text-white drop-shadow-lg">{artist.name}</h2>
                  <p className="text-md text-gray-300 -mt-1 bg-black/20 backdrop-blur-sm px-2 rounded-md inline-block">
                    {formatProfession(artist.profession)}
                  </p>
                </div>
              </div>
              
              {artist.price && (
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-xl font-bold text-[#bb00aa] drop-shadow-lg">
                    ${artist.price.toLocaleString()}<span className="text-xs text-gray-400 font-normal"> /hr</span>
                  </p>
                </div>
              )}
            </div>
            
            {/* Etiquetas */}
            {artist.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {artist.tags.slice(0, 3).map((tag, index) => (
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
                <span>10am-8pm</span>
              </div>
            </div>
            
            {/* Descripción */}
            <div className="flex-1">
                            <p className="text-base text-gray-300 leading-snug mt-2">
                {artist.description && artist.description.length > 90
                  ? `${artist.description.substring(0, 90)}...`
                  : artist.description || 'Artista apasionado por crear experiencias únicas a través de su trabajo.'}
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
                    <span>30 reseñas</span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <MapPin className="w-4 h-4 mr-1.5 text-white flex-shrink-0" />
                    <span>Bogotá • 4.9km</span>
                  </div>
                </div>
                
                {/* Botones de acción */}
                <div className="flex gap-2">
                  <button 
                    onClick={handleAction('Ver portafolio')}
                    className="w-8 h-8 rounded-full border border-[#bb00aa] text-white flex items-center justify-center hover:bg-[#bb00aa]]/20 transition-colors"
                    title="Ver portafolio"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleAction('Contactar')}
                    className="w-8 h-8 rounded-full bg-[#bb00aa] text-white flex items-center justify-center hover:bg-[#bb00aa]]/90 transition-colors"
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
