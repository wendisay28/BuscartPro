
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FiltersSidebarProps {
  filters: any;
  setFilters: (filters: any) => void;
}

export function FiltersSidebar({ filters, setFilters }: FiltersSidebarProps) {
  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <Card className="w-72 p-4 bg-white/80 backdrop-blur-sm">
      <h3 className="font-semibold mb-4">Filtros</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Categoría</label>
          <Select 
            value={filters.category}
            onValueChange={(value) => handleFilterChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music">Música</SelectItem>
              <SelectItem value="dance">Danza</SelectItem>
              <SelectItem value="theater">Teatro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Ciudad</label>
          <Select
            value={filters.city}
            onValueChange={(value) => handleFilterChange('city', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bogota">Bogotá</SelectItem>
              <SelectItem value="medellin">Medellín</SelectItem>
              <SelectItem value="cali">Cali</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Rango de precio</label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            min={0}
            max={1000}
            step={10}
          />
        </div>
      </div>
    </Card>
  );
}
