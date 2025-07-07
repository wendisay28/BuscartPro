import {
  Sliders,
  MapPin,
  DollarSign,
  Tag,
  Calendar,
  ArrowUpDown,
  RefreshCw,
} from 'lucide-react';
import { useState } from 'react';

export type EventFilterProps = {
  isOpen: boolean;
  onToggle: () => void;
  distance: number;
  setDistance: (value: number) => void;
  price: number;
  setPrice: (value: number) => void;
  category: string;
  setCategory: (value: string) => void;
  subCategory: string;
  setSubCategory: (value: string) => void;
  format: string;
  setFormat: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onResetFilters: () => void;
};

const eventCategories = [
  { id: 'music', name: 'Música' },
  { id: 'performing_arts', name: 'Artes Escénicas' },
  { id: 'cinema', name: 'Cine' },
  { id: 'exhibitions', name: 'Exposiciones' },
  { id: 'workshops', name: 'Talleres / Conferencias' },
  { id: 'festivals', name: 'Festivales' },
  { id: 'fairs', name: 'Ferias / Mercados' },
  { id: 'tech', name: 'Tecnología' },
];

const subcategoriesByCategory: Record<string, string[]> = {
  music: ['Conciertos', 'Recitales', 'Tributos', 'Festivales Musicales'],
  performing_arts: ['Teatro', 'Danza', 'Circo / Performance', 'Stand Up / Impro'],
  cinema: ['Proyecciones', 'Estrenos', 'Cine Arte', 'Festivales de Cine'],
  exhibitions: ['Arte Visual', 'Fotografía', 'Diseño', 'Arte Urbano'],
  workshops: ['Talleres Creativos', 'Talleres Profesionales', 'Charlas / Conferencias', 'Seminarios / Cursos'],
  festivals: ['Música', 'Artes Escénicas', 'Cine', 'Cultura / Tradiciones'],
  fairs: ['Feria de Arte', 'Feria Gastronómica', 'Mercados Locales', 'Moda/Belleza', 'Literatura / Editorial'],
  tech: ['Hackathons', 'Lanzamientos de Apps', 'Muestras de Realidad Virtual'],
};

export const EventFiltersPanel = ({
  isOpen,
  onToggle,
  distance,
  setDistance,
  price,
  setPrice,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  format,
  setFormat,
  sortBy,
  setSortBy,
  onResetFilters,
}: EventFilterProps) => {
  const currentSubCategories = category ? subcategoriesByCategory[category] || [] : [];
  const formats = ['Presencial', 'Virtual', 'Híbrido'];
  const [priceType, setPriceType] = useState<string>(price === 0 ? 'gratis' : 'pago');

  const handlePriceTypeChange = (type: 'gratis' | 'pago') => {
    setPriceType(type);
    if (type === 'gratis') {
      setPrice(0);
    } else if (type === 'pago' && price === 0) {
      setPrice(50000);
    }
  };

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
      {/* Header */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50"
        onClick={onToggle}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <Sliders className="w-4 h-4" />
          {isOpen ? 'Filtro Avanzado' : 'Filtros'}
        </h2>
        <span className="text-xs text-gray-400">
          {isOpen ? 'Cerrar' : 'Abrir'}
        </span>
      </div>

      <div
        className={`transition-all duration-300 overflow-y-auto ${
          isOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4 text-sm text-gray-300">
          {/* Ordenar por */}
          <div>
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Ordenar por</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
            >
              <option value="popularity">Popularidad</option>
              <option value="price">Más económico</option>
              <option value="distance">Más cercano</option>
              <option value="date">Más reciente</option>
            </select>
          </div>

          {/* Categoría */}
          <div>
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Categoría</h3>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory('');
              }}
              className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Todas las categorías</option>
              {eventCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Subcategoría */}
          {currentSubCategories.length > 0 && (
            <div>
              <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Subcategoría</h3>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Todas las subcategorías</option>
                {currentSubCategories.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          )}

          {/* Formato */}
          <div>
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Formato</h3>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Cualquier formato</option>
              {formats.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Tipo de precio */}
          <div>
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Precio</h3>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => handlePriceTypeChange('gratis')}
                className={`flex-1 py-2 rounded ${
                  priceType === 'gratis'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                Gratis
              </button>
              <button
                onClick={() => handlePriceTypeChange('pago')}
                className={`flex-1 py-2 rounded ${
                  priceType === 'pago'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                Pago
              </button>
            </div>

            {priceType === 'pago' && (
              <div>
                <span className="text-xs text-gray-400 block mb-1">Hasta ${price.toLocaleString()} COP</span>
                <input
                  type="range"
                  min="0"
                  max="500000"
                  step="10000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Distancia */}
          <div>
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1 mb-2">Distancia</h3>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={100}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm w-12 text-right">{distance} km</span>
            </div>
          </div>

          {/* Botón de reinicio */}
          <div className="pt-2">
            <button
              onClick={onResetFilters}
              className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
