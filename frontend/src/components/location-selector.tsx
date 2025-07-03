import { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  className?: string;
  variant?: 'default' | 'header';
}

export function LocationSelector({ onLocationSelect, className = '', variant = 'default' }: LocationSelectorProps) {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Función para obtener la ubicación actual del usuario
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
            );
            const data = await response.json();
            const address = data.display_name || 'Ubicación actual';
            setLocation(address);
            onLocationSelect(address);
          } catch (error) {
            console.error('Error al obtener la ubicación:', error);
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocalización no es soportada por este navegador');
      setIsLoading(false);
    }
  };

  // Función para manejar la búsqueda de ubicaciones
  const handleSearch = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.map((item: any) => item.display_name));
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
    }
  };

  const isHeaderVariant = variant === 'header';

  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        {!isHeaderVariant && <MapPin className="absolute left-3 h-4 w-4 text-gray-400" />}
        <Input
          type="text"
          placeholder={isHeaderVariant ? "Ubicación" : "Buscar ubicación..."}
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className={`${isHeaderVariant ? 'pl-3 pr-20' : 'pl-10 pr-24'} bg-black/30 border-gray-700 text-white placeholder-gray-400`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="absolute right-2 h-6 text-xs bg-[#bb00aa]/20 hover:bg-[#bb00aa]/30 text-white"
        >
          {isLoading ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            'Mi ubicación'
          )}
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-800 cursor-pointer"
              onMouseDown={() => {
                setLocation(suggestion);
                onLocationSelect(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
