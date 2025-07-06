import { GalleryItem } from '../../types';
import { Star, Share2, Palette, Book, Image as ImageIcon, MapPin, Info, CalendarCheck, Coffee, Wifi, Music, Film, Camera, Code, Ticket } from 'lucide-react';
import { useState } from 'react';

interface GalleryCardProps {
  item: GalleryItem;
}

export const GalleryCard = ({ item }: GalleryCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRated, setIsRated] = useState(false);

  const nextImage = () => {
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === item.images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (item.images && item.images.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? item.images!.length - 1 : prevIndex - 1
      );
    }
  };

  const toggleRating = () => {
    setIsRated(!isRated);
  };

  // Función para obtener el ícono según el tag
  const getTagIcon = (tag: string) => {
    if (!tag) return <Palette className="w-3 h-3" />;
    
    const tagLower = tag.trim().toLowerCase();
    
    // Categorías generales
    if (['arte', 'artístico', 'artistico', 'creativo', 'colombia', 'colombiano', 'artesanal'].some(k => tagLower.includes(k))) {
      return <Palette className="w-3 h-3" />;
    }
    
    // Técnicas de pintura
    if (['óleo', 'oleo', 'acuarela', 'acrílico', 'acrilico', 'carboncillo', 'pastel'].some(k => tagLower.includes(k))) {
      return <Palette className="w-3 h-3" />;
    }
    
    // Temas
    if (['paisaje', 'naturaleza', 'montaña', 'campo', 'bosque', 'selva', 'playa', 'mar', 'río', 'rio', 'cielo'].some(k => tagLower.includes(k))) {
      return <ImageIcon className="w-3 h-3" />;
    }
    
    // Estilos artísticos
    if (['abstracto', 'surrealista', 'impresionista', 'expresionista', 'moderno', 'contemporáneo', 'contemporaneo'].some(k => tagLower.includes(k))) {
      return <Palette className="w-3 h-3" />;
    }
    
    // Materiales
    if (['lienzo', 'tela', 'papel', 'cartón', 'carton', 'madera', 'técnica mixta', 'tecnica mixta'].some(k => tagLower.includes(k))) {
      return <Palette className="w-3 h-3" />;
    }
    
    // Íconos existentes
    if (['café', 'cafe', 'restaurante'].some(k => tagLower.includes(k))) {
      return <Coffee className="w-3 h-3" />;
    }
    if (['wifi', 'internet'].some(k => tagLower.includes(k))) {
      return <Wifi className="w-3 h-3" />;
    }
    if (['música', 'musica', 'concierto'].some(k => tagLower.includes(k))) {
      return <Music className="w-3 h-3" />;
    }
    if (['cine', 'película', 'pelicula'].some(k => tagLower.includes(k))) {
      return <Film className="w-3 h-3" />;
    }
    if (['foto', 'fotografía', 'fotografia'].some(k => tagLower.includes(k))) {
      return <Camera className="w-3 h-3" />;
    }
    if (['tecnología', 'tecnologia', 'programación', 'programacion'].some(k => tagLower.includes(k))) {
      return <Code className="w-3 h-3" />;
    }
    if (['entrada', 'ticket', 'boleto'].some(k => tagLower.includes(k))) {
      return <Ticket className="w-3 h-3" />;
    }
    if (['libro', 'lectura'].some(k => tagLower.includes(k))) {
      return <Book className="w-3 h-3" />;
    }
    
    // Por defecto
    return <Palette className="w-3 h-3" />;
  };

  // Función para obtener el ícono según el tipo de obra
  const getArtworkIcon = () => {
    switch (item.category) {
      case 'pintura':
        return <Palette className="w-4 h-4" />;
      case 'escultura':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>;
      case 'libro':
        return <Book className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-180px)] mx-auto md:h-[75vh]">
      <div className="flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl">
        {/* Sección de imagen - 65% */}
        <div className="relative overflow-hidden h-[65%] w-full">
          {item.images && item.images.length > 0 && (
            <img
              src={item.images[currentImageIndex]}
              alt={item.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          )}
          
          {/* Navegación de imágenes */}
          {item.images && item.images.length > 1 && (
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
                {currentImageIndex + 1} / {item.images.length}
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

          {/* Badge de categoría */}
          <div className="absolute top-3 left-3 bg-gray-900/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            {getArtworkIcon()}
            <span className="capitalize">{item.category}</span>
          </div>

          {/* Botones de acción en esquina superior derecha */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleRating();
              }}
              className={`p-2 rounded-full ${isRated ? 'bg-yellow-500/90 text-yellow-100' : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800/90'}`}
              aria-label={isRated ? 'Quitar calificación' : 'Calificar'}
            >
              <Star className={`w-4 h-4 ${isRated ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Lógica para compartir
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
            <div className="flex items-center">
              <h3 className="font-semibold text-lg text-white line-clamp-1">{item.name}</h3>
              {item.verified && (
                <span className="text-blue-400 ml-1.5 flex-shrink-0" title="Verificado">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </span>
              )}
            </div>

            <div className="flex items-center mt-1.5 text-sm text-gray-300">
              {item.artist && (
                <span className="flex items-center max-w-[70%] overflow-hidden">
                  <span className="w-4 h-4 rounded-full bg-gray-700 mr-2 overflow-hidden flex-shrink-0">
                    {item.artist.avatar && (
                      <img src={item.artist.avatar} alt={item.artist.name} className="w-full h-full object-cover" />
                    )}
                  </span>
                  <span className="truncate text-sm">{item.artist.name}</span>
                </span>
              )}
              <span className="flex items-center text-gray-400 ml-3 text-xs">
                <MapPin className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                <span className="truncate">
                  {item.city || 'Ubicación no disponible'}
                  {item.distance && ` • ${item.distance}`}
                </span>
              </span>
            </div>
          </div>

          <div className="px-4 pb-3 flex-1 overflow-y-auto">
            {item.description && (
              <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                {item.description.length > 90 ? `${item.description.substring(0, 90)}...` : item.description}
              </p>
            )}

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag, index) => (
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

          <div className="border-t border-gray-700/50 px-4 py-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                {item.price !== undefined && item.price !== null && (
                  <div className="flex items-center bg-gray-800/80 rounded-full px-3 py-1">
                    <span className="text-sm text-[#bb00aa] font-medium">$</span>
                    <span className="text-sm text-gray-300">
                      {item.price === 0 ? 'Entrada libre' : item.price.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                    </span>
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
