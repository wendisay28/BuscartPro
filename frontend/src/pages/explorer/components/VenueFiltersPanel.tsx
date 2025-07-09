import { MapPin, DollarSign, Tag, Calendar, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
  sortBy,
  setSortBy,
  selectedDate,
  setSelectedDate,
  onResetFilters,
}: VenueFilterProps) => {
  const currentSubCategories = venueSubCategories[category] || [];

  return (
    <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden transition-all duration-300">
      {/* Header */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50"
        onClick={onToggle}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <ArrowUpDown className="w-4 h-4" />
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
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1">Búsqueda</h3>

            {/* Ordenar por */}
            <div>
              <label className="flex items-center gap-2 mb-1">
                <ArrowUpDown className="w-4 h-4" /> Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label className="flex items-center gap-2 mb-1">
                <Tag className="w-4 h-4" /> Categoría
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory('');
                }}
                className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
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
            {currentSubCategories.length > 0 && (
              <div>
                <label className="flex items-center gap-2 mb-1">
                  <Tag className="w-4 h-4 opacity-0" /> Subcategoría
                </label>
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full bg-gray-700 p-2 rounded focus:ring-2 focus:ring-pink-500"
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
          </div>

          {/* Distancia */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1">Ubicación</h3>
            <div>
              <label className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4" /> Distancia máxima
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="flex-1 accent-gray-400"
                />
                <span className="text-sm w-12 text-right">{distance} km</span>
              </div>
            </div>
          </div>

          {/* Precio */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1">
              <DollarSign className="w-4 h-4 inline mr-2" /> Precio máximo (COP)
            </h3>
            <div>
              <div className="flex justify-between items-center mb-1 text-xs text-gray-400">
                <span>$0</span>
                <span>${price.toLocaleString()}</span>
                <span>$500.000</span>
              </div>
              <input
                type="range"
                min="0"
                max="500000"
                step="10000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-gray-400"
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium border-b border-gray-700 pb-1">Disponibilidad</h3>
            <div>
              <label className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" /> Fecha específica
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="w-full bg-white/10 p-2 rounded-lg text-sm text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent border border-white/20"
                wrapperClassName="w-full"
                calendarClassName="!bg-white !text-gray-900 border border-gray-200 rounded-lg shadow-xl p-2"
                dayClassName={(_) => 'hover:bg-pink-100 rounded-md'}
                monthClassName={() => 'bg-white'}
                weekDayClassName={() => 'text-gray-500 text-xs'}
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="flex items-center justify-between px-2 py-2 border-b border-gray-200 mb-2">
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                      type="button"
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="text-sm font-semibold text-gray-800">
                      {new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date)}
                    </div>
                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                      type="button"
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                )}
                renderDayContents={(day, date) => {
                  const isToday = date ? new Date().toDateString() === date.toDateString() : false;
                  const isSelected = selectedDate ? date?.toDateString() === selectedDate.toDateString() : false;
                  
                  return (
                    <div 
                      className={`w-8 h-8 flex items-center justify-center mx-auto rounded-md transition-colors ${
                        isToday ? 'bg-pink-100 text-pink-700 font-medium' : ''
                      } ${
                        isSelected 
                          ? 'bg-pink-500 text-white font-medium' 
                          : 'hover:bg-pink-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                }}
                placeholderText="Selecciona una fecha"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Acción */}
          <div className="pt-2 pb-1">
            <button
              onClick={onResetFilters}
              className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm text-white flex items-center justify-center gap-2 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
