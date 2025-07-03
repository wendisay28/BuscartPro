import { useState } from 'react';
import { EventItem } from '../../types';
import { 
  Ticket, 
  Music, 
  Headphones, 
  UserCheck, 
  Calendar, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Info, 
  CalendarCheck, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  MoreVertical
} from 'lucide-react';

interface EventCardProps {
  data: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ data }) => {
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
    // Solo manejar el clic si se hace clic en la tarjeta, no en los botones
    if (!(e.target as HTMLElement).closest('.action-button')) {
      console.log('Clic en la tarjeta de evento');
      // Aquí puedes agregar la lógica de navegación o lo que necesites
    }
  };

  return (
    <div className="relative w-[380px] h-[calc(75vh-1cm)] mx-auto">
      <div 
        className="flex flex-col w-full h-full bg-gray-900 rounded-[20px] overflow-hidden shadow-xl"
        onClick={handleCardClick}
      >
      {/* Sección superior - Imagen (65% de la altura) */}
      <div className="relative overflow-hidden" style={{ height: '65%' }}>
        <div className="absolute inset-0 w-full h-full bg-gray-900">
          {images.length > 0 ? (
            <div className="w-full h-full relative">
              <img
                src={images[currentImageIndex]}
                alt={`${data.name} - Imagen ${currentImageIndex + 1}`}
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
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors z-10"
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
      
      {/* Sección inferior - Contenido (35% de la altura) */}
      <div className="flex flex-col bg-gray-900 overflow-hidden" style={{ height: '35%' }}>
        <div className="p-4 h-full flex flex-col">
          {/* Contenedor para las filas 1 y 2 con margen reducido */}
          <div className="-mt-1">
            {/* Fila 1 - Encabezado con nombre y precio */}
            <div className="flex justify-between items-start">
              <h3 className="text-white font-bold text-[15px] truncate">{data.name}</h3>
              <div className="flex items-center text-[#bb00aa] text-[13px] font-bold">
                <Ticket className="w-3 h-3 mr-1 flex-shrink-0 text-[#bb00aa]" />
                <span>{data.type === 'free' ? 'Entrada libre' : `$${data.price?.toLocaleString()}`}</span>
              </div>
            </div>
            
            {/* Fila 2 - Etiquetas */}
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className="px-1.5 py-0.5 bg-[#bb00aa26] text-[#bb00aa] text-[9px] rounded-full flex items-center gap-1 whitespace-nowrap">
              <Music className="w-3 h-3 flex-shrink-0" />
              Música
            </span>
            <span className="px-1.5 py-0.5 bg-[#bb00aa26] text-[#bb00aa] text-[9px] rounded-full flex items-center gap-1 whitespace-nowrap">
              <Headphones className="w-3 h-3 flex-shrink-0" />
              Pop/Rock
            </span>
            <span className="px-1.5 py-0.5 bg-[#bb00aa26] text-[#bb00aa] text-[9px] rounded-full flex items-center gap-1 whitespace-nowrap">
              <UserCheck className="w-3 h-3 flex-shrink-0" />
              Presencial
            </span>
          </div>
          </div>
          
          {/* Fila 3 - Fecha y hora */}
          <div className="flex gap-3 mt-1.5 text-[#CCCCCC] text-[11px]">
            <div className="flex items-center whitespace-nowrap">
              <Calendar className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>28 de junio</span>
            </div>
            <div className="flex items-center whitespace-nowrap">
              <Clock className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>3 PM - 10 PM</span>
            </div>
          </div>
          
          {/* Fila 4 - Descripción */}
          <p className="text-[#CCCCCC] text-[11px] leading-tight line-clamp-3 mt-1.5">
            Un evento para toda la familia con música en vivo, arte callejero, presentaciones en tarima y experiencias interactivas. ¡No te lo pierdas!
          </p>
          
          {/* Fila 5 - Información adicional y botones */}
          <div className="mt-auto pt-2 border-t border-[#1A2C4A]">
            <div className="flex justify-between items-center">
              {/* Información adicional */}
              <div className="flex items-center gap-3 text-[#CCCCCC] text-[11px]">
                <div className="flex items-center whitespace-nowrap">
                  <MessageCircle className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                  <span>18 reseñas</span>
                </div>
                <div className="flex items-center whitespace-nowrap">
                  <MapPin className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                  <span>Bogotá • 2.7km</span>
                </div>
              </div>
              
              {/* Botones */}
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full border border-[#bb00aa] text-white flex items-center justify-center hover:bg-[#FF7A00]/20 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#bb00aa] text-white flex items-center justify-center hover:bg-[#FF7A00]/90 transition-colors">
                  <CalendarCheck className="w-4 h-4" />
                </button>
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
    </div>
  );
};