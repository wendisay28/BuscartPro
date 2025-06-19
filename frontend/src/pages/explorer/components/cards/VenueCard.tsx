import { useState } from 'react';
import { VenueItem } from '../../types';
import { ChevronLeft, ChevronRight, Calendar, Clock, Wifi, Coffee, Palette, Info, MessageCircle, MapPin, CalendarCheck } from 'lucide-react';

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

  return (
    <div className="flex flex-col w-[380px] h-[calc(75vh-1cm)] bg-[#0A1A35] rounded-[20px] overflow-hidden mx-auto shadow-xl">
      {/* Sección superior - Imagen (65% de la altura) */}
      <div className="relative" style={{ height: '65%' }}>
        {images.length > 0 ? (
          <img 
            src={images[currentImageIndex]} 
            alt={`${data.name} - Imagen ${currentImageIndex + 1}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center">
            <span className="text-gray-500">No hay imágenes</span>
          </div>
        )}
        
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
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
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
            {/* Fila 1 - Nombre y precio */}
            <div className="flex justify-between items-start">
              <h3 className="text-white font-bold text-[15px] truncate">{data.name}</h3>
              <div className="text-[#FF7A00] text-[13px] font-bold whitespace-nowrap">
                ${data.price?.toLocaleString()}/h
              </div>
            </div>
            
            {/* Fila 2 - Etiquetas */}
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              <span className="px-1.5 py-0.5 bg-[#FF7A0026] text-[#FF7A00] text-[9px] rounded-full flex items-center gap-1">
                <Coffee className="w-3 h-3" />
                Café cultural
              </span>
              <span className="px-1.5 py-0.5 bg-[#FF7A0026] text-[#FF7A00] text-[9px] rounded-full flex items-center gap-1">
                <Palette className="w-3 h-3" />
                Arte local
              </span>
              <span className="px-1.5 py-0.5 bg-[#FF7A0026] text-[#FF7A00] text-[9px] rounded-full flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                WiFi
              </span>
            </div>
          </div>
          
          {/* Fila 4 - Horario */}
          <div className="flex gap-3 mt-1.5 text-[#CCCCCC] text-[11px]">
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>Lun-Sáb</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1 text-white flex-shrink-0" />
              <span>9 AM - 6 PM</span>
            </div>
          </div>
          
          {/* Fila 5 - Descripción */}
          <p className="text-[#CCCCCC] text-[11px] leading-tight line-clamp-3 mt-1.5">
            {data.description || 'Un espacio donde el aroma del café se mezcla con exposiciones de arte, talleres creativos y charlas culturales. Perfecto para una tarde inspiradora.'}
          </p>
          
          {/* Fila 6 - Acciones */}
          <div className="mt-auto pt-1.5 flex justify-between items-center border-t border-[#1A2C4A]">
            <div className="flex items-center gap-3 text-[#CCCCCC] text-[11px]">
              <div className="flex items-center whitespace-nowrap">
                <MessageCircle className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                <span>{data.reviews || '24'} reseñas</span>
              </div>
              <div className="flex items-center whitespace-nowrap">
                <MapPin className="w-3 h-3 mr-1 text-white flex-shrink-0" />
                <span>{data.city || 'Bogotá'} • 2.7km</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full border border-[#FF7A00] text-white flex items-center justify-center hover:bg-[#FF7A00]/20 transition-colors">
                <Info className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full bg-[#FF7A00] text-white flex items-center justify-center hover:bg-[#FF7A00]/90 transition-colors">
                <CalendarCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
