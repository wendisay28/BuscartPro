import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Category {
  id: number;
  name: string;
}

interface FilterBarProps {
  filters: {
    search: string;
    categoryId: string;
    city: string;
    minPrice: number;
    maxPrice: number;
    availability: string;
    rating: string;
    sortBy: string;
  };
  categories: Category[];
  onFilterChange: (key: string, value: any) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  activeFiltersCount: number;
}

export function FilterBar({
  filters,
  categories,
  onFilterChange,
  showFilters,
  onToggleFilters,
  activeFiltersCount
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Buscar artistas por nombre, categoría..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-3 lg:flex-nowrap">
          <Select value={filters.categoryId} onValueChange={(value) => onFilterChange('categoryId', value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(value) => onFilterChange('sortBy', value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Más relevantes</SelectItem>
              <SelectItem value="rating">Mejor calificados</SelectItem>
              <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={onToggleFilters}
            className="relative"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filtros
            {activeFiltersCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rango de Precio (por hora)
              </label>
              <div className="px-3">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => {
                    onFilterChange('minPrice', min);
                    onFilterChange('maxPrice', max);
                  }}
                  max={500000}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${filters.minPrice.toLocaleString()}</span>
                  <span>${filters.maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Calificación mínima
              </label>
              <Select value={filters.rating} onValueChange={(value) => onFilterChange('rating', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier calificación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Cualquier calificación</SelectItem>
                  <SelectItem value="4">4+ estrellas</SelectItem>
                  <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Disponibilidad
              </label>
              <Select value={filters.availability} onValueChange={(value) => onFilterChange('availability', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cualquier disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Cualquier disponibilidad</SelectItem>
                  <SelectItem value="available">Disponible ahora</SelectItem>
                  <SelectItem value="this-week">Esta semana</SelectItem>
                  <SelectItem value="next-week">Próxima semana</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
