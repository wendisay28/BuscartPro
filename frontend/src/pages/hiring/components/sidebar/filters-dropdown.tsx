import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter } from "lucide-react";
import type { FilterState } from "@/types/filters";

interface FiltersDropdownProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilters: () => void;
}

const categories = [
  "Todas las categorías",
  "Música",
  "Arte Visual", 
  "Fotografía",
  "Danza",
  "Video",
  "Diseño",
  "Teatro",
  "Galería",
  "Estudio",
  "Salón"
];

export function FiltersDropdown({ filters, onFilterChange, onClearFilters }: FiltersDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalityChange = (modality: string, checked: boolean) => {
    const current = filters.modality || [];
    const updated = checked 
      ? [...current, modality]
      : current.filter((m: string) => m !== modality);
    onFilterChange('modality', updated);
  };

  const handleApplyFilters = () => {
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center space-x-2 bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-200"
        >
          <Filter size={16} className="text-blue-400" />
          <span>Filtros</span>
          {filters.modality?.length > 0 && (
            <span className="ml-1 bg-blue-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
              {filters.modality.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 space-y-4" align="end">
        <div>
          <Label className="text-sm font-medium mb-2 block">Categoría</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onFilterChange('category', value === "Todas las categorías" ? "" : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría..." />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block">Rango de Precio (COP)</Label>
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Mín"
              value={filters.priceMin || ""}
              onChange={(e) => onFilterChange('priceMin', e.target.value ? parseInt(e.target.value) : null)}
            />
            <Input
              type="number"
              placeholder="Máx"
              value={filters.priceMax || ""}
              onChange={(e) => onFilterChange('priceMax', e.target.value ? parseInt(e.target.value) : null)}
            />
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block">Modalidad</Label>
          <div className="flex space-x-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="presencial"
                checked={filters.modality?.includes('presencial')}
                onCheckedChange={(checked) => handleModalityChange('presencial', checked as boolean)}
              />
              <Label htmlFor="presencial" className="text-sm">Presencial</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="online"
                checked={filters.modality?.includes('online')}
                onCheckedChange={(checked) => handleModalityChange('online', checked as boolean)}
              />
              <Label htmlFor="online" className="text-sm">Online</Label>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t border-border">
          <Button variant="ghost" onClick={onClearFilters} className="text-sm">
            Limpiar
          </Button>
          <Button onClick={handleApplyFilters} className="text-sm">
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
