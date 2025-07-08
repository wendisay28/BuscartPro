import {
  Sliders,
  MapPin,
  DollarSign,
  Tag,
  Calendar,
  Star,
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
  selectedDate: Date | null;
  setSelectedDate: (value: Date | null) => void;
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
  selectedDate,
  setSelectedDate,
  sortBy,
  setSortBy,
  onResetFilters,
}: EventFilterProps) => {
  const currentSubCategories = subcategoriesByCategory[category] || [];
  const formats = ['Presencial', 'Virtual', 'Híbrido'];

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
        <span className="text-xs text-gray-400">{isOpen ? 'Cerrar' : 'Abrir'}</span>
      </div>

      <div
        className={`transition-all duration-300 overflow-y-auto ${
          isOpen ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 space-y-4 text-sm text-gray-300">
          {/* Búsqueda */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Búsqueda</h3>

            {/* Ordenar por */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <Tag className="w-4 h-4" />
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
              >
                <option value="popularity">Popularidad</option>
                <option value="price">Precio</option>
                <option value="distance">Distancia</option>
                <option value="date">Fecha</option>
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <Tag className="w-4 h-4" /> Categoría
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory('');
                }}
                className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Selecciona categoría</option>
                {eventCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Subcategoría */}
            {currentSubCategories.length > 0 && (
              <div>
                <label className="flex items-center gap-2 mb-1 text-sm">
                  <Star className="w-4 h-4" /> Subcategoría
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Todas las subcategorías</option>
                  {currentSubCategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Ubicación */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Ubicación</h3>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <MapPin className="w-4 h-4" /> Distancia máxima
              </label>
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
          </div>

          {/* Precio */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">
              <DollarSign className="w-4 h-4 inline mr-2" /> Precio máximo (COP)
            </h3>
            <div>
              <div className="flex justify-between items-center mb-1 text-xs text-gray-400">
                <span>$0</span>
                <span>${price.toLocaleString()}</span>
                <span>$1.000.000</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000000"
                step="10000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Disponibilidad</h3>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <Calendar className="w-4 h-4" /> Fecha específica
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full bg-gray-700 p-2 rounded text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholderText="Selecciona una fecha"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="pt-2 pb-1">
            <button
              onClick={onResetFilters}
              className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm text-white transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
