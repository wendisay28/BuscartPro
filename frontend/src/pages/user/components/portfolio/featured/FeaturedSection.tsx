import { Service, Product, Photo } from '../../../data/portfolio.mock';
import { Plus } from 'lucide-react';

type FeaturedItem = Service | Product | Photo;

interface FeaturedSectionProps {
  items: FeaturedItem[];
  onAddContent: () => void;
}

export const FeaturedSection = ({ onAddContent }: FeaturedSectionProps) => {
  // Aquí podrías implementar la lógica para mostrar diferentes tipos de contenido destacado
  
  return (
    <div className="space-y-4 p-2">
      <div className="flex justify-end px-2">
        <button 
          onClick={onAddContent}
          className="flex items-center bg-[#e74f05] hover:bg-[#d14704] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:shadow-md hover:shadow-[#e74f05]/30 hover:-translate-y-0.5"
        >
          <Plus className="w-4 h-4 mr-1" />
          Agregar Destacado
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Aquí iría la lógica para renderizar los elementos destacados */}
        <div className="text-center py-8 text-gray-500">
          <p>No hay elementos destacados aún</p>
        </div>
      </div>
    </div>
  );
};
