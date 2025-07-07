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

export type FilterProps = {
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
  profession: string;
  setProfession: (value: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onResetFilters: () => void;
};

const subCategories: { [key: string]: string[] } = {
  musica: [
    'Pop',
    'Balada',
    'Mariachis',
    'Reguetón',
    'Guaracha',
    'Rock',
    'Jazz',
    'Salsa',
    'Vallenato',
    'Música Clásica',
  ],
  fotografia: [
    'Retrato',
    'Boda',
    'Evento',
    'Producto',
    'Moda',
    'Documental',
    'Arquitectura',
    'Deporte',
    'Paisaje',
    'Estudio',
  ],
  danza: [
    'Ballet',
    'Hip Hop',
    'Salsa',
    'Contemporánea',
    'Folclórica',
    'Breakdance',
    'Jazz Dance',
    'Tap',
    'Flamenco',
    'K-Pop',
  ],
  // Puedes agregar más categorías aquí...
};

export const FiltersPanel = ({
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
  profession,
  setProfession,
  selectedDate,
  setSelectedDate,
  sortBy,
  setSortBy,
  onResetFilters,
}: FilterProps) => {
  const currentSubCategories = subCategories[category] || [];

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
      {/* Header clickable */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer select-none hover:bg-gray-800/50"
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
        <div className="p-4 space-y-4">
          {/* Sección: Búsqueda principal */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Búsqueda</h3>
            
            {/* Profesión */}
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <Tag className="w-4 h-4" /> Profesión o servicio
              </label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ej: Cantante, Fotógrafo..."
              />
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
                <option value="musica">Música</option>
                <option value="fotografia">Fotografía</option>
                <option value="danza">Danza</option>
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
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Sección: Ubicación */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Ubicación</h3>
            
            {/* Distancia */}
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

          {/* Sección: Precio */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">
              <DollarSign className="w-4 h-4 inline mr-2" /> Precio máximo (COP)
            </h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">${price.toLocaleString()}</span>
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

          {/* Sección: Disponibilidad */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Disponibilidad</h3>
            
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
                <Calendar className="w-4 h-4" /> Fecha específica
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholderText="Selecciona una fecha"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setDistance(50);
                setPrice(50000);
                setCategory('');
                setSubCategory('');
                setProfession('');
                setSelectedDate(null);
              }}
              className="flex-1 bg-gray-700 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};