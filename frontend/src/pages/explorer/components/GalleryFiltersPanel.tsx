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

export type GalleryFilterProps = {
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

const galleryCategories = [
  { id: 'pinturas', name: 'Pinturas' },
  { id: 'esculturas', name: 'Esculturas' },
  { id: 'libros', name: 'Libros' },
  { id: 'instrumentos', name: 'Instrumentos' },
  { id: 'artesanias', name: 'Artesanías' },
  { id: 'decoraciones', name: 'Decoraciones' },
  { id: 'alta-costura', name: 'Alta Costura' },
];

const gallerySubCategories: Record<string, string[]> = {
  pinturas: ['Óleo', 'Acrílico', 'Acuarela', 'Digital', 'Mural'],
  esculturas: ['Madera', 'Metal', 'Piedra', 'Cerámica', 'Resina'],
  libros: ['Arte', 'Historia', 'Técnicas', 'Biografías', 'Catálogos'],
  instrumentos: ['Tradicionales', 'Modernos', 'De cuerda', 'De viento', 'Percusión'],
  artesanias: ['Tejidos', 'Cerámica', 'Vidrio', 'Cuero', 'Joyería artesanal'],
  decoraciones: ['Murales decorativos', 'Tapices', 'Objetos decorativos'],
  'alta-costura': ['Vestidos', 'Trajes', 'Accesorios', 'Diseño personalizado'],
};

export const GalleryFiltersPanel = ({
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
}: GalleryFilterProps) => {
  const currentSubCategories = gallerySubCategories[category] || [];

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
                className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Selecciona categoría</option>
                {galleryCategories.map((cat) => (
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
                  className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-pink-500"
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
                  className="flex-1 accent-gray-300"
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
                className="w-full accent-gray-300"
              />
            </div>
          </div>

          {/* Fecha */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1">Disponibilidad</h3>
            <div>
              <label className="flex items-center gap-2 mb-1 text-sm">
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
                placeholderText="Selecciona una fecha"
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>

          {/* Botón limpiar */}
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
