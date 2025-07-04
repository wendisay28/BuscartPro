import { useState } from 'react';
import { X, Filter } from 'lucide-react';

type FilterType = 'artists' | 'events' | 'venues' | 'gallery';

type FilterProps = {
  isOpen: boolean;
  onClose: () => void;
  filterType: FilterType;
};

export const FiltersPanel = ({ isOpen, onClose, filterType }: FilterProps) => {
  const [isExpanded, setIsExpanded] = useState({
    category: false,
    price: false,
    rating: false,
    distance: false,
    availability: false,
  });

  const toggleSection = (section: keyof typeof isExpanded) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderArtistFilters = () => (
    <>
      <div className="mb-4">
        <button 
          className="w-full text-left font-medium flex justify-between items-center"
          onClick={() => toggleSection('category')}
        >
          Categoría
          <span>{isExpanded.category ? '−' : '+'}</span>
        </button>
        {isExpanded.category && (
          <div className="mt-2 space-y-2 pl-4">
            {['Músico', 'Pintor', 'Escultor', 'Fotógrafo', 'Actor'].map(cat => (
              <div key={cat} className="flex items-center">
                <input type="checkbox" id={`cat-${cat}`} className="mr-2" />
                <label htmlFor={`cat-${cat}`} className="text-sm">{cat}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <button 
          className="w-full text-left font-medium flex justify-between items-center"
          onClick={() => toggleSection('price')}
        >
          Rango de precios
          <span>{isExpanded.price ? '−' : '+'}</span>
        </button>
        {isExpanded.price && (
          <div className="mt-2 pl-4">
            <input type="range" min="0" max="1000" className="w-full" />
            <div className="flex justify-between text-xs mt-1">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const renderEventFilters = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Tipo de evento</h4>
        {['Concierto', 'Exposición', 'Taller', 'Conferencia', 'Otro'].map(type => (
          <div key={type} className="flex items-center mb-2">
            <input type="checkbox" id={`event-${type}`} className="mr-2" />
            <label htmlFor={`event-${type}`} className="text-sm">{type}</label>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Fecha</h4>
        <input type="date" className="w-full p-2 border rounded-lg" />
      </div>
    </div>
  );

  const renderVenueFilters = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Tipo de lugar</h4>
        {['Galería', 'Teatro', 'Café', 'Al aire libre', 'Otro'].map(type => (
          <div key={type} className="flex items-center mb-2">
            <input type="checkbox" id={`venue-${type}`} className="mr-2" />
            <label htmlFor={`venue-${type}`} className="text-sm">{type}</label>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Distancia máxima</h4>
        <input type="range" min="1" max="50" className="w-full" />
        <div className="flex justify-between text-xs mt-1">
          <span>1 km</span>
          <span>50+ km</span>
        </div>
      </div>
    </div>
  );

  const renderGalleryFilters = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium mb-2">Tipo de arte</h4>
        {['Pintura', 'Fotografía', 'Escultura', 'Digital', 'Mixta'].map(type => (
          <div key={type} className="flex items-center mb-2">
            <input type="checkbox" id={`art-${type}`} className="mr-2" />
            <label htmlFor={`art-${type}`} className="text-sm">{type}</label>
          </div>
        ))}
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Precio</h4>
        <div className="flex gap-2">
          <input type="number" placeholder="Mín" className="w-1/2 p-2 border rounded-lg" />
          <input type="number" placeholder="Máx" className="w-1/2 p-2 border rounded-lg" />
        </div>
      </div>
    </div>
  );

  const renderFilters = () => {
    switch (filterType) {
      case 'artists':
        return renderArtistFilters();
      case 'events':
        return renderEventFilters();
      case 'venues':
        return renderVenueFilters();
      case 'gallery':
        return renderGalleryFilters();
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex">
      <div className="bg-white shadow-xl rounded-l-3xl p-6 w-72 h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Filtros</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {renderFilters()}
          
          <div className="pt-4 border-t">
            <button className="w-full bg-[#bb00aa] text-white py-2 rounded-full font-medium">
              Aplicar filtros
            </button>
            <button className="w-full mt-2 text-[#bb00aa] py-2 rounded-full font-medium border border-[#bb00aa]">
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
      
      {/* Botón flotante para abrir/cerrar */}
      <button 
        onClick={onClose}
        className="self-center -ml-4 bg-white p-3 rounded-full shadow-lg flex items-center justify-center"
      >
        <Filter size={20} />
      </button>
    </div>
  );
};
