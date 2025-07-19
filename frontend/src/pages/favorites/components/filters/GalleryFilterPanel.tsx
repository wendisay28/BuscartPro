import { Button } from "@/components/ui/button";
import { Sliders, ChevronDown, Check} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GalleryFilterPanelProps {
  showFilters: boolean;
  selectedCategory: string;
  selectedBookType: string;
  selectedStyle: string;
  selectedTrend: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onBookTypeChange: (type: string) => void;
  onStyleChange: (style: string) => void;
  onTrendChange: (trend: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export function GalleryFilterPanel({
  showFilters,
  selectedCategory,
  selectedBookType,
  selectedStyle,
  selectedTrend,
  priceRange,
  onCategoryChange,
  onBookTypeChange,
  onStyleChange,
  onTrendChange,
  onPriceRangeChange,
  onClearFilters,
  onClose
}: GalleryFilterPanelProps) {
  // Opciones de categorías
  const categories = [
    { value: 'paintings', label: 'Pinturas' },
    { value: 'sculptures', label: 'Esculturas' },
    { value: 'photography', label: 'Fotografía' },
    { value: 'books', label: 'Libros' },
    { value: 'handicrafts', label: 'Manualidades' },
    { value: 'art_supplies', label: 'Materiales de arte' },
    { value: 'prints', label: 'Impresiones' },
    { value: 'jewelry', label: 'Joyería' },
    { value: 'crafts', label: 'Artesanías' }
  ];

  // Opciones de tipos de libros (solo visible cuando se selecciona la categoría 'Libros')
  const bookTypes = [
    { value: 'literature', label: 'Literatura' },
    { value: 'fantasy', label: 'Fantasía' },
    { value: 'sci_fi', label: 'Ciencia Ficción' },
    { value: 'business', label: 'Negocios' },
    { value: 'motivation', label: 'Motivación' },
    { value: 'biography', label: 'Biografía' },
    { value: 'art', label: 'Arte' },
    { value: 'history', label: 'Historia' },
    { value: 'poetry', label: 'Poesía' },
    { value: 'theater', label: 'Teatro' }
  ];

  // Opciones de estilo/período
  const styles = [
    { value: 'contemporary', label: 'Contemporáneo' },
    { value: 'modern', label: 'Moderno' },
    { value: 'abstract', label: 'Abstracto' },
    { value: 'impressionist', label: 'Impresionista' },
    { value: 'realist', label: 'Realista' },
    { value: 'surrealist', label: 'Surrealista' },
    { value: 'pop_art', label: 'Pop Art' },
    { value: 'minimalist', label: 'Minimalista' },
    { value: 'traditional', label: 'Tradicional/Étnico' }
  ];

  // Opciones de tendencias
  const trends = [
    { value: 'bestsellers', label: 'Lo más vendido' },
    { value: 'new_arrivals', label: 'Nuevos lanzamientos' },
    { value: 'featured', label: 'Obras destacadas' },
    { value: 'collections', label: 'Colecciones especiales' }
  ];

  // Manejador para el rango de precios
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = Number(e.target.value);
    if (type === 'min') {
      onPriceRangeChange([value, priceRange[1]]);
    } else {
      onPriceRangeChange([priceRange[0], value]);
    }
  };

  // Función para manejar el arrastre del thumb
  const handleMouseDown = (e: React.MouseEvent, type: 'min' | 'max') => {
    e.preventDefault();
    const slider = e.currentTarget.parentElement?.parentElement;
    if (!slider) return;

    const sliderRect = slider.getBoundingClientRect();
    const minValue = 0;
    const maxValue = 1000000;
    const step = 10000;

    const moveHandler = (moveEvent: MouseEvent) => {
      const x = Math.min(Math.max(moveEvent.clientX, sliderRect.left), sliderRect.right) - sliderRect.left;
      const percentage = x / sliderRect.width;
      const value = Math.round((minValue + (maxValue - minValue) * percentage) / step) * step;
      
      if (type === 'min') {
        const newMin = Math.min(value, priceRange[1] - step);
        onPriceRangeChange([newMin, priceRange[1]]);
      } else {
        const newMax = Math.max(value, priceRange[0] + step);
        onPriceRangeChange([priceRange[0], newMax]);
      }
    };

    const upHandler = () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  // Formatear precio para mostrar
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (!showFilters) return null;

  return (
    <div 
      className="fixed md:right-64 md:top-48 right-12 top-32 md:w-72 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50 flex flex-col max-h-[80vh] overflow-y-auto" 
      style={{ transform: 'none', left: 'auto' }}
    >
      <div 
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50 border-b border-gray-700"
        onClick={onClose}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <Sliders className="w-4 h-4" />
          Filtros de Galería
        </h2>
        <span className="text-xs text-gray-400">Cerrar</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-gray-300">
        {/* Filtro de Categorías */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Categorías</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
              >
                {selectedCategory ? categories.find(c => c.value === selectedCategory)?.label || 'Seleccionar categoría' : 'Todas las categorías'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-800 border-gray-700 text-white max-h-60 overflow-y-auto"
              align="start"
            >
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-gray-700 focus:text-white"
                onClick={() => onCategoryChange('')}
              >
                <span className={`flex-1 ${!selectedCategory ? 'text-[#bb00aa]' : ''}`}>
                  Todas las categorías
                </span>
                {!selectedCategory && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category.value}
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => onCategoryChange(category.value)}
                >
                  <span className={`flex-1 ${selectedCategory === category.value ? 'text-[#bb00aa]' : ''}`}>
                    {category.label}
                  </span>
                  {selectedCategory === category.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filtro de Tipos de Libros (solo visible cuando se selecciona la categoría Libros) */}
        {selectedCategory === 'books' && (
          <div>
            <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Tipo de Libro</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700">
                  {selectedBookType ? bookTypes.find(t => t.value === selectedBookType)?.label || 'Seleccionar tipo' : 'Todos los tipos'}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-gray-200">
                <DropdownMenuItem 
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => onBookTypeChange('')}
                >
                  <span className={`flex-1 ${!selectedBookType ? 'text-[#bb00aa]' : ''}`}>
                    Todos los tipos
                  </span>
                  {!selectedBookType && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
                {bookTypes.map((type) => (
                  <DropdownMenuItem 
                    key={type.value}
                    className="cursor-pointer focus:bg-gray-700 focus:text-white"
                    onClick={() => onBookTypeChange(type.value)}
                  >
                    <span className={`flex-1 ${selectedBookType === type.value ? 'text-[#bb00aa]' : ''}`}>
                      {type.label}
                    </span>
                    {selectedBookType === type.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Filtro de Precio */}
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-2">Rango de Precio</h3>
          <div className="px-2">
            <div className="relative h-8 flex items-center">
              {/* Track */}
              <div className="absolute w-full h-1.5 bg-gray-700 rounded-full">
                <div 
                  className="absolute h-1.5 bg-[#bb00aa] rounded-full"
                  style={{
                    left: `${(priceRange[0] / 1000000) * 100}%`,
                    right: `${100 - (priceRange[1] / 1000000) * 100}%`,
                  }}
                />
              </div>
              
              {/* Min Thumb */}
              <div 
                className="absolute w-3.5 h-3.5 -translate-x-1/2 bg-white rounded-full border-2 border-[#bb00aa] cursor-pointer z-10"
                style={{ left: `${(priceRange[0] / 1000000) * 100}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'min')}
              />
              
              {/* Max Thumb */}
              <div 
                className="absolute w-3.5 h-3.5 -translate-x-1/2 bg-white rounded-full border-2 border-[#bb00aa] cursor-pointer z-10"
                style={{ left: `${(priceRange[1] / 1000000) * 100}%` }}
                onMouseDown={(e) => handleMouseDown(e, 'max')}
              />
            </div>
            
            <div className="flex justify-between mt-2 text-[11px] text-gray-400">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>
        </div>

        {/* Filtro de Estilo/Período */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Estilo/Período</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700">
                {selectedStyle ? styles.find(s => s.value === selectedStyle)?.label || 'Seleccionar estilo' : 'Todos los estilos'}
                <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-gray-200">
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-gray-700 focus:text-white"
                onClick={() => onStyleChange('')}
              >
                <span className={`flex-1 ${!selectedStyle ? 'text-[#bb00aa]' : ''}`}>
                  Todos los estilos
                </span>
                {!selectedStyle && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
              </DropdownMenuItem>
              {styles.map((style) => (
                <DropdownMenuItem 
                  key={style.value}
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => onStyleChange(style.value)}
                >
                  <span className={`flex-1 ${selectedStyle === style.value ? 'text-[#bb00aa]' : ''}`}>
                    {style.label}
                  </span>
                  {selectedStyle === style.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Filtro de Tendencias */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Tendencias</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
              >
                {selectedTrend ? trends.find(t => t.value === selectedTrend)?.label || 'Seleccionar tendencia' : 'Todas las tendencias'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-[var(--radix-dropdown-menu-trigger-width)] bg-gray-800 border-gray-700 text-white"
              align="start"
            >
              <DropdownMenuItem 
                className="cursor-pointer focus:bg-gray-700 focus:text-white"
                onClick={() => onTrendChange('')}
              >
                <span className={`flex-1 ${!selectedTrend ? 'text-[#bb00aa]' : ''}`}>
                  Todas las tendencias
                </span>
                {!selectedTrend && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
              </DropdownMenuItem>
              {trends.map((trend) => (
                <DropdownMenuItem 
                  key={trend.value}
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => onTrendChange(trend.value)}
                >
                  <span className={`flex-1 ${selectedTrend === trend.value ? 'text-[#bb00aa]' : ''}`}>
                    {trend.label}
                  </span>
                  {selectedTrend === trend.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-between space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 bg-transparent border-gray-600 hover:border-[#bb00aa] hover:bg-[#bb00aa]/10 hover:text-[#bb00aa]"
            onClick={onClearFilters}
          >
            Limpiar filtros
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1 bg-[#bb00aa] hover:bg-[#9b0089]"
            onClick={onClose}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </div>
  );
}