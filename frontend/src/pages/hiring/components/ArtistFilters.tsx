import { Check, Clock, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { ArtistType } from "@/types/artist";

// Ensure we have all possible artist types with their corresponding icons
const ARTIST_TYPES: Record<ArtistType, string> = {
  'Música': '🎵',
  'Escena': '🎭',
  'Imagen': '📸',
  'Contenido': '🎥',
  'Fotografía': '🖼️',
  'Diseño': '🎨'
} as const;

interface ArtistFiltersProps {
  selectedTypes: ArtistType[];
  onTypeToggle: (type: ArtistType) => void;
  priceRange: [number, number];
  onPriceChange: (value: [number, number]) => void;
  onApply: () => void;
}

export function ArtistFilters({ 
  selectedTypes, 
  onTypeToggle, 
  priceRange, 
  onPriceChange,
  onApply 
}: ArtistFiltersProps) {
  const artistTypes = Object.entries(ARTIST_TYPES).map(([type, icon]) => ({
    type: type as ArtistType,
    icon
  }));
  
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Categorías
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {artistTypes.map(({ type, icon }) => {
              const isSelected = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  onClick={() => onTypeToggle(type)}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-colors",
                    isSelected 
                      ? "border-[#bb00aa] bg-[#fdf4ff] dark:bg-[#2a0b24]"
                      : "border-gray-200 dark:border-gray-700 hover:border-[#bb00aa]/50"
                  )}
                >
                  <div className="flex items-center">
                    <span className="text-lg mr-2">{icon}</span>
                    <span className="text-sm font-medium">{type}</span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#bb00aa] flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rango de precios
            </h3>
            <div className="text-sm font-medium text-[#bb00aa] dark:text-[#cc00bb]">
              {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
            </div>
          </div>
          
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceChange(value as [number, number])}
              min={50000}
              max={500000}
              step={10000}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>${(priceRange[0] / 1000).toFixed(0)}K</span>
            <span>${(priceRange[1] / 1000).toFixed(0)}K</span>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Disponibilidad
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#bb00aa]/50 transition-colors">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm">En línea ahora</span>
            </button>
            <button className="flex items-center justify-center p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#bb00aa]/50 transition-colors">
              <MapPin className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm">Cercanos</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Calificación
          </h3>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <button 
                key={rating}
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1.5" />
                  <span className="text-sm font-medium">{rating}+</span>
                </div>
                <span className="ml-auto text-xs text-gray-500">y más</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <Button 
        onClick={onApply}
        className="w-full bg-[#bb00aa] hover:bg-[#a00090] dark:bg-[#cc00bb] dark:hover:bg-[#aa00a0] text-white py-2 h-auto text-base font-medium"
      >
        Aplicar Filtros
      </Button>
    </div>
  );
}
