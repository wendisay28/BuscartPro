import { Button } from "@/components/ui/button";
import { Sliders, ChevronDown, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SiteFilterPanelProps {
  showFilters: boolean;
  selectedService: string;
  selectedCapacity: string;
  selectedCity: string;
  selectedPrice: string;
  onServiceChange: (service: string) => void;
  onCapacityChange: (capacity: string) => void;
  onCityChange: (city: string) => void;
  onPriceChange: (price: string) => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export function SiteFilterPanel({
  showFilters,
  selectedService,
  selectedCapacity,
  selectedCity,
  selectedPrice,
  onServiceChange,
  onCapacityChange,
  onCityChange,
  onPriceChange,
  onClearFilters,
  onClose
}: SiteFilterPanelProps) {
  // Opciones de servicios
  const services = [
    { value: 'restaurant', label: 'Restaurante/Café cultural' },
    { value: 'museum', label: 'Museo/Galería' },
    { value: 'culture_house', label: 'Casa de la Cultura' },
    { value: 'space_rental', label: 'Alquiler de espacios' },
    { value: 'recording', label: 'Grabación de audio/video' },
    { value: 'live_events', label: 'Eventos en vivo' }
  ];

  // Opciones de capacidad
  const capacities = [
    { value: 'small', label: 'Pequeño (1-20)' },
    { value: 'medium', label: 'Mediano (21-50)' },
    { value: 'large', label: 'Grande (51-100)' },
    { value: 'xlarge', label: 'Muy grande (100+)' }
  ];

  // Opciones de ubicación
  const cities = [
    { value: 'medellin', label: 'Medellín' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'other', label: 'Otras ciudades' }
  ];

  // Opciones de precio
  const prices = [
    { value: 'economic', label: 'Económico' },
    { value: 'moderate', label: 'Moderado' },
    { value: 'high', label: 'Alto' },
    { value: 'premium', label: 'Premium' }
  ];

  if (!showFilters) return null;

  const renderDropdown = (
    title: string,
    selectedValue: string,
    options: {value: string, label: string}[],
    onChange: (value: string) => void
  ) => (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">{title}</h3>
      <div className="space-y-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-[#bb00aa]/50 text-white"
            >
              {options.find(opt => opt.value === selectedValue)?.label || `Seleccionar ${title.toLowerCase()}`}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
            <DropdownMenuItem 
              className="cursor-pointer focus:bg-gray-700 focus:text-white"
              onClick={() => onChange('')}
            >
              <span className={`flex-1 ${!selectedValue ? 'text-[#bb00aa]' : ''}`}>
                Todas las opciones
              </span>
              {!selectedValue && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
            </DropdownMenuItem>
            {options.map((option) => (
              <DropdownMenuItem 
                key={option.value}
                className="cursor-pointer focus:bg-gray-700 focus:text-white"
                onClick={() => onChange(option.value)}
              >
                <span className={`flex-1 ${selectedValue === option.value ? 'text-[#bb00aa]' : ''}`}>
                  {option.label}
                </span>
                {selectedValue === option.value && <Check className="h-4 w-4 text-[#bb00aa] ml-2" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed md:right-56 md:top-40 right-8 top-32 md:w-72 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50 flex flex-col max-h-[80vh] overflow-y-auto" 
      style={{ transform: 'none', left: 'auto' }}
    >
      <div 
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50 border-b border-gray-700"
        onClick={onClose}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <Sliders className="w-4 h-4" />
          Filtro de Sitios
        </h2>
        <span className="text-xs text-gray-400">Cerrar</span>
      </div>
      
      <div className="p-4 space-y-4">
        {renderDropdown('Servicio', selectedService, services, onServiceChange)}
        {renderDropdown('Capacidad', selectedCapacity, capacities, onCapacityChange)}
        {renderDropdown('Ubicación', selectedCity, cities, onCityChange)}
        {renderDropdown('Precio', selectedPrice, prices, onPriceChange)}
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