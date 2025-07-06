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
}: FilterProps) => {
  const currentSubCategories = subCategories[category] || [];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg text-white">
      {/* Header clickable */}
      <div
        className="flex justify-between items-center p-3 cursor-pointer select-none"
        onClick={onToggle}
      >
        <h2 className="flex items-center gap-2 text-base font-semibold">
          <Sliders className="w-5 h-5" /> Filtro Avanzado
        </h2>
        <span className="text-xs text-gray-400">
          {isOpen ? 'Cerrar' : 'Abrir'}
        </span>
      </div>

      <div
        className={`transition-all duration-500 overflow-hidden px-4 ${
          isOpen ? 'max-h-[600px] opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'
        }`}
      >
        <div className="space-y-3">
          {/* Distancia */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm">
              <MapPin className="w-4 h-4" /> Distancia (km)
            </label>
            <input
              type="range"
              min={1}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-xs text-gray-300">{distance} km</p>
          </div>

          {/* Precio */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm">
              <DollarSign className="w-4 h-4" /> Precio mínimo (COP)
            </label>
            <input
              type="number"
              min={0}
              step={5000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-gray-700 p-2 rounded text-sm"
              placeholder="$"
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
              className="w-full bg-gray-700 p-2 rounded text-sm"
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
                className="w-full bg-gray-700 p-2 rounded text-sm"
              >
                <option value="">Selecciona subcategoría</option>
                {currentSubCategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Profesión */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm">
              <Tag className="w-4 h-4" /> Profesión
            </label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full bg-gray-700 p-2 rounded text-sm"
              placeholder="Ej: Cantante, Fotógrafo..."
            />
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm">
              <Calendar className="w-4 h-4" /> Disponibilidad
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full bg-gray-700 p-2 rounded text-sm"
              placeholderText="Selecciona una fecha"
            />
          </div>

          {/* Botones */}
          <div className="flex gap-2 mt-2">
            <button className="flex-1 bg-pink-600 py-2 rounded text-sm hover:bg-pink-700">
              Aplicar Filtros
            </button>
            <button
              onClick={() => {
                setDistance(50);
                setPrice(50000);
                setCategory('');
                setSubCategory('');
                setProfession('');
                setSelectedDate(null);
              }}
              className="flex-1 bg-gray-700 py-2 rounded text-sm hover:bg-gray-600"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
