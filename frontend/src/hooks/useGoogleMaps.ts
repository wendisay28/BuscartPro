import { useCallback, useEffect, useRef, useState } from 'react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

// Definir tipos básicos
type PointTuple = [number, number];
type BoundsTuple = [PointTuple, PointTuple];

export interface PlaceResult {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple;
  raw: any;
}

export const useOpenStreetMap = (
  inputRef: React.RefObject<HTMLInputElement>,
  onPlaceSelected: (place: PlaceResult) => void,
  initialLocation?: { city: string; country: string }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<PlaceResult[]>([]);
  const providerRef = useRef<any>();

  useEffect(() => {
    providerRef.current = new OpenStreetMapProvider({
      params: {
        'accept-language': 'es',
        countrycodes: initialLocation?.country.toLowerCase() || 'co',
        city: initialLocation?.city || '',
        addressdetails: '1',
        format: 'json',
        limit: '5',
        dedupe: '1'
      },
    });
  }, [initialLocation]);

  const normalizeQuery = useCallback((query: string): string => {
    let normalized = query
      .toLowerCase()
      .replace(/\bcra\b|\bcr\b|\bkra\b/gi, 'carrera ')
      .replace(/\bcll\b|\bcl\b/gi, 'calle ')
      .replace(/\bav\b/gi, 'avenida ')
      .replace(/\btransv\b/gi, 'transversal ')
      .replace(/\s+/g, ' ')
      .trim();

    if (initialLocation?.city && !normalized.includes(initialLocation.city.toLowerCase())) {
      normalized += `, ${initialLocation.city}`;
    }

    return normalized;
  }, [initialLocation]);

  const searchAddress = useCallback(async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const results = await providerRef.current?.search({ query: normalizeQuery(query) });
      
      if (results) {
        const formattedResults = results.map((result: any) => ({
          ...result,
          bounds: result.bounds || [[0, 0], [0, 0]] as BoundsTuple,
          x: result.x || 0,
          y: result.y || 0,
          label: result.raw?.display_name || result.label || '',
          raw: result.raw || {}
        })) as PlaceResult[];

        // Filtrar resultados duplicados
        const uniqueResults = Array.from(
          new Map(formattedResults.map(item => [item.label, item])).values()
        );

        setSuggestions(uniqueResults);
      }
    } catch (error) {
      console.error('Error buscando direcciones:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [normalizeQuery]);

  // Manejar cambios en el input
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    let timeoutId: NodeJS.Timeout;

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchAddress(target.value);
      }, 300);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (input !== e.target) {
        setSuggestions([]);
      }
    };

    input.addEventListener('input', handleInput);
    document.addEventListener('click', handleClickOutside);

    return () => {
      input.removeEventListener('input', handleInput);
      document.removeEventListener('click', handleClickOutside);
      clearTimeout(timeoutId);
    };
  }, [inputRef, searchAddress]);

  const handleSelectSuggestion = useCallback((suggestion: PlaceResult) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion.label;
      onPlaceSelected(suggestion);
      setSuggestions([]);
    }
  }, [onPlaceSelected]);

  return {
    isLoading,
    suggestions,
    handleSelectSuggestion,
  };
};
