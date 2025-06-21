import { Service } from '../../../data/portfolio.mock';
import { Plus, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => (
  <div key={service.id} className="group bg-[#141b2a] rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full hover:border-blue-500/50">
    <div className="flex flex-col h-[400px]">
      {/* Imagen con precio en esquina inferior derecha - 60% de altura */}
      <div className="relative h-[60%] overflow-hidden">
        <img 
          src={service.imageUrl || service.image} 
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (service.image && service.image !== service.imageUrl) {
              target.src = service.image;
            } else {
              target.src = 'https://placehold.co/400x400/1e293b/94a3b8?text=Imagen+no+disponible';
              target.classList.add('object-contain', 'p-4');
              target.classList.remove('object-cover');
            }
          }}
        />
        {/* Precio con fondo azul transparente */}
        <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-blue-500">
          <div className="relative">
            <span className="font-bold text-base tracking-wide relative z-10 drop-shadow-[0_2px_4px_rgba(30,64,175,0.5)]">
              ${service.price}
            </span>
            <span className="font-medium text-xs opacity-90 ml-0.5 relative z-10">
              COP
            </span>
            <div className="absolute inset-0 bg-blue-600/70 rounded-full blur-[2px] -z-0"></div>
          </div>
        </div>
      </div>
      
      {/* Contenido de la tarjeta - 40% de altura */}
      <div className="p-3 flex flex-col h-[40%] overflow-hidden">
        {/* Fila 1: Nombre del servicio con etiquetas */}
        <div className="flex flex-col space-y-1.5 mb-1.5">
          <h3 className="font-bold text-white text-[15px] leading-tight truncate">{service.title}</h3>
          
          {/* Etiquetas */}
          <div className="flex flex-wrap gap-1">
            {service.tags.slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="inline-flex items-center text-[10px] bg-blue-900/50 text-blue-200 px-2 py-0.5 rounded-full border border-blue-700/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Fila 2: Breve descripción */}
        <p className="text-[12px] text-gray-300 line-clamp-2 mb-2.5 leading-tight">
          {service.description}
        </p>
        
        {/* Fila 3: Datos con iconos */}
        <div className="flex items-center justify-between text-gray-400 mt-auto pt-1.5 border-t border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-[11px] font-medium text-white ml-0.5">{service.rating}</span>
              <span className="text-[10px] text-gray-400 ml-0.5">({service.reviews})</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[11px] text-gray-300 ml-1">{service.deliveryTime}</span>
            </div>
          </div>
          
          {/* Botón de Ver Detalles */}
          <button className="bg-[#e74f05] hover:bg-[#d14704] text-white text-xs font-medium py-1.5 px-4 rounded-lg transition-colors whitespace-nowrap hover:shadow-md hover:shadow-[#e74f05]/30">
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  </div>
);

interface ServicesSectionProps {
  services: Service[];
  onAddService: () => void;
}

export const ServicesSection = ({ services, onAddService }: ServicesSectionProps) => (
  <div className="space-y-4 p-2">
    <div className="flex justify-end px-2">
      <button 
        onClick={onAddService}
        className="flex items-center bg-[#e74f05] hover:bg-[#d14704] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:shadow-md hover:shadow-[#e74f05]/30 hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4 mr-1" />
        Agregar Servicio
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service: Service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  </div>
);
