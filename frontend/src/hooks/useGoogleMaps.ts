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
        countrycodes: 'co', // Priorizar Colombia
        addressdetails: 1,
        limit: 5,
        dedupe: 1,
        polygon_geojson: 0,
        format: 'json',
        namedetails: 1
      },
    });
  }, [initialLocation]);

  const normalizeQuery = useCallback((query: string): string => {
    // Primero, limpiar la consulta básica
    let cleanQuery = query
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

    // Reemplazar abreviaturas comunes
    cleanQuery = cleanQuery
      .replace(/\b(cra|cr|kra)\b/g, 'carrera')
      .replace(/\b(cll|cl)\b/g, 'calle')
      .replace(/\bav\b/g, 'avenida')
      .replace(/\btransv\b/g, 'transversal')
      .replace(/[#°]/g, '')  // Eliminar símbolos de número
      .replace(/no\.?\s*/gi, '')  // Eliminar "No." o "No "
      .replace(/\s+/g, ' ')  // Eliminar espacios múltiples
      .trim();

    // Si no tiene Medellín, lo agregamos
    if (!cleanQuery.includes('medellín') && !cleanQuery.includes('medellin')) {
      cleanQuery += ', Medellín';
    }

    return cleanQuery;
  }, []);

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
