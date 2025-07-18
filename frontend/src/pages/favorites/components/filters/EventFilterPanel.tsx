import { Button } from "@/components/ui/button";
import { Sliders, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EventFilterPanelProps {
  showFilters: boolean;
  selectedFilter: 'recent' | 'today' | 'custom' | null;
  customDate: string;
  selectedCategory: string;
  sortByPrice: 'free' | 'price_asc' | 'price_desc' | '';
  onFilterChange: (filter: 'recent' | 'today' | 'custom' | null) => void;
  onCustomDateChange: (date: string) => void;
  onCategoryChange: (category: string) => void;
  onSortByPrice: (sort: 'free' | 'price_asc' | 'price_desc' | '') => void;
  onClearFilters: () => void;
  onModalityChange: (modality: string) => void;
  onCityChange: (city: string) => void;
  onClose: () => void;
}

export function EventFilterPanel({
  showFilters,
  selectedFilter,
  customDate,
  selectedCategory,
  sortByPrice,
  onFilterChange,
  onCustomDateChange,
  onCategoryChange,
  onSortByPrice,
  onClearFilters,
  onModalityChange,
  onCityChange,
  onClose
}: EventFilterPanelProps) {
  // Categorías de eventos
  const categories = [
    'Conciertos', 
    'Negocios', 
    'Exposiciones', 
    'Talleres', 
    'Otros'
  ];

  // Opciones de ordenación por precio
  const sortOptions: Array<{ value: 'free' | 'price_asc' | 'price_desc' | ''; label: string }> = [
    { value: 'free', label: 'Entrada libre' },
    { value: 'price_asc', label: 'Menor precio' },
    { value: 'price_desc', label: 'Mayor precio' }
  ];
  
  // Opciones de modalidad
  const modalityOptions = [
    { value: 'online', label: 'Online' },
    { value: 'presential', label: 'Presencial' }
  ];
  
  // Opciones de ciudad
  const cityOptions = [
    { value: 'medellin', label: 'Medellín' },
    { value: 'bogota', label: 'Bogotá' }
  ];
  
  // Estado para la modalidad seleccionada
  const [selectedModality, setSelectedModality] = useState<string>('');
  
  // Estado para la ciudad seleccionada
  const [selectedCity, setSelectedCity] = useState<string>('');

  // Manejar cambio de modalidad
  const handleModalityChange = (modality: string) => {
    setSelectedModality(modality);
    onModalityChange(modality);
  };

  // Manejar cambio de ciudad
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    onCityChange(city);
  };

  // Nota: selectedFilter y onFilterChange se mantienen en las props para mantener la consistencia
  // con la interfaz del componente, aunque no se usan actualmente en esta implementación
  console.log(selectedFilter, onFilterChange); // Evita advertencias de variables no utilizadas

  if (!showFilters) return null;

  return (
    <div className="fixed md:right-64 md:top-48 right-12 top-32 md:w-72 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50 flex flex-col max-h-[80vh] overflow-y-auto" style={{ transform: 'none', left: 'auto' }}>
      <div 
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50 border-b border-gray-700"
        onClick={onClose}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <Sliders className="w-4 h-4" />
          Filtro de Eventos
        </h2>
        <span className="text-xs text-gray-400">Cerrar</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-gray-300">
        {/* Filtro por categoría - Menú desplegable */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Categoría</h3>
          <div className="mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
                >
                  {selectedCategory || 'Seleccionar categoría'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
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
                    key={category}
                    className="cursor-pointer focus:bg-gray-700 focus:text-white"
                    onClick={() => onCategoryChange(category)}
                  >
                    <span className={`flex-1 ${selectedCategory === category ? 'text-[#bb00aa]' : ''}`}>
                      {category}
                    </span>
                    {selectedCategory === category && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Filtro por fecha específica */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Fecha específica</h3>
          <div className="space-y-2">
            <div className="pl-2">
              <input
                type="date"
                className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-[#bb00aa]"
                value={customDate}
                onChange={(e) => onCustomDateChange(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Ordenar por */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Ordenar por</h3>
          <div className="space-y-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
                >
                  {sortOptions.find(opt => opt.value === sortByPrice)?.label || 'Seleccionar orden'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                <DropdownMenuItem 
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => onSortByPrice('')}
                >
                  <span className={`flex-1 ${!sortByPrice ? 'text-[#bb00aa]' : ''}`}>
                    Sin orden específico
                  </span>
                  {!sortByPrice && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
                {sortOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    className="cursor-pointer focus:bg-gray-700 focus:text-white"
                    onClick={() => onSortByPrice(option.value)}
                  >
                    <span className={`flex-1 ${sortByPrice === option.value ? 'text-[#bb00aa]' : ''}`}>
                      {option.label}
                    </span>
                    {sortByPrice === option.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Filtro por modalidad */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Modalidad</h3>
          <div className="space-y-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
                >
                  {selectedModality ? 
                    (modalityOptions.find(opt => opt.value === selectedModality)?.label || selectedModality) : 
                    'Todas las modalidades'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                <DropdownMenuItem 
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => handleModalityChange('')}
                >
                  <span className={`flex-1 ${!selectedModality ? 'text-[#bb00aa]' : ''}`}>
                    Todas las modalidades
                  </span>
                  {!selectedModality && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
                {modalityOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    className="cursor-pointer focus:bg-gray-700 focus:text-white"
                    onClick={() => handleModalityChange(option.value)}
                  >
                    <span className={`flex-1 ${selectedModality === option.value ? 'text-[#bb00aa]' : ''}`}>
                      {option.label}
                    </span>
                    {selectedModality === option.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Filtro por ciudad */}
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Ciudad</h3>
          <div className="space-y-2 mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
                >
                  {selectedCity ? 
                    (cityOptions.find(opt => opt.value === selectedCity)?.label || selectedCity) : 
                    'Todas las ciudades'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
                <DropdownMenuItem 
                  className="cursor-pointer focus:bg-gray-700 focus:text-white"
                  onClick={() => handleCityChange('')}
                >
                  <span className={`flex-1 ${!selectedCity ? 'text-[#bb00aa]' : ''}`}>
                    Todas las ciudades
                  </span>
                  {!selectedCity && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                </DropdownMenuItem>
                {cityOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value}
                    className="cursor-pointer focus:bg-gray-700 focus:text-white"
                    onClick={() => handleCityChange(option.value)}
                  >
                    <span className={`flex-1 ${selectedCity === option.value ? 'text-[#bb00aa]' : ''}`}>
                      {option.label}
                    </span>
                    {selectedCity === option.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="pt-4 border-t border-gray-700">
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
    </div>
  );
}
