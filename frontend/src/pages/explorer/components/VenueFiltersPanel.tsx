import { MapPin, DollarSign, Tag, Calendar, ArrowUpDown, X } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export type VenueFilterProps = {
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
  sortBy: string;
  setSortBy: (value: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  onResetFilters: () => void;
};

const venueCategories = [
  { id: 'gastronomia', name: 'Gastronomía' },
  { id: 'arte-cultura', name: 'Arte y Cultura' },
  { id: 'entretenimiento', name: 'Entretenimiento' },
  { id: 'espacios-abiertos', name: 'Planes y Espacios Abiertos' },
];

const venueSubCategories: { [key: string]: { id: string; name: string }[] } = {
  'gastronomia': [
    { id: 'restaurantes', name: 'Restaurantes' },
    { id: 'bares', name: 'Bares' },
    { id: 'cafes', name: 'Cafés' },
  ],
  'arte-cultura': [
    { id: 'museos', name: 'Museos' },
    { id: 'galerias', name: 'Galerías' },
    { id: 'centros-culturales', name: 'Centros culturales' },
    { id: 'bibliotecas', name: 'Bibliotecas' },
  ],
  'entretenimiento': [
    { id: 'teatros', name: 'Teatros' },
    { id: 'cines-alternativos', name: 'Salas de cine alternativo' },
    { id: 'clubes-musica', name: 'Clubes de música' },
    { id: 'parques-tematicos', name: 'Parques temáticos' },
  ],
  'espacios-abiertos': [
    { id: 'picnic', name: 'Picnic en parques' },
    { id: 'plazas', name: 'Plazas' },
    { id: 'jardines', name: 'Jardines botánicos' },
    { id: 'tours', name: 'Tours guiados' },
    { id: 'talleres', name: 'Experiencias / Talleres' },
  ],
};

const sortOptions = [
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'bookings', label: 'Más reservados' },
  { value: 'distance', label: 'Más cercanos' },
];

export const VenueFiltersPanel = ({

  distance,
  setDistance,
  price,
  setPrice,
  category,
  setCategory,
  subCategory,
  setSubCategory,
  sortBy,
  setSortBy,
  selectedDate,
  setSelectedDate,
  onResetFilters,
}: VenueFilterProps) => {
  const currentSubCategories = venueSubCategories[category] || [];

  return (
    <div className="space-y-4">
      {/* Ordenar por */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <ArrowUpDown className="w-4 h-4" />
          <span>Ordenar por</span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Tag className="w-4 h-4" />
          <span>Categoría</span>
        </div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubCategory('');
          }}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        >
          <option value="">Todas las categorías</option>
          {venueCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategoría */}
      {category && currentSubCategories.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <Tag className="w-4 h-4 opacity-0" />
            <span>Subcategoría</span>
          </div>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="">Todas las subcategorías</option>
            {currentSubCategories.map((subCat) => (
              <option key={subCat.id} value={subCat.id}>
                {subCat.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Distancia */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <MapPin className="w-4 h-4" />
            <span>Distancia</span>
          </div>
          <span className="text-xs text-gray-400">Hasta {distance} km</span>
        </div>
        <input
          type="range"
          min="1"
          max="50"
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
            <DollarSign className="w-4 h-4" />
            <span>Precio máximo</span>
          </div>
          <span className="text-xs text-gray-400">
            {price === 0 ? 'Gratis' : `Hasta $${price.toLocaleString()}`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Gratis</span>
          <span>$500.000+</span>
        </div>
      </div>

      {/* Fecha */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-300">
          <Calendar className="w-4 h-4" />
          <span>Fecha</span>
        </div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          placeholderText="Seleccionar fecha"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          dateFormat="dd/MM/yyyy"
          isClearable
          clearButtonClassName="text-white"
        />
      </div>

      {/* Botón de limpiar filtros */}
      <div className="pt-2">
        <button
          onClick={onResetFilters}
          className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <X className="w-4 h-4" />
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default VenueFiltersPanel;
