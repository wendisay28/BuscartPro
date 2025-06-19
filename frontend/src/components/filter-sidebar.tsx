import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, MapPin, DollarSign, Star, Filter, X } from "lucide-react";
import { format } from "date-fns";

interface Category {
  id: number;
  name: string;
}

interface Filters {
  categoryId?: number;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  date?: Date;
  sortBy?: string;
  [key: string]: any;
}

interface FilterSidebarProps {
  contentType: 'artists' | 'events' | 'venues' | 'recommendations' | 'blog';
  onContentTypeChange: (type: 'artists' | 'events' | 'venues' | 'recommendations' | 'blog') => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export default function FilterSidebar({ 
  contentType, 
  onContentTypeChange, 
  filters, 
  onFiltersChange 
}: FilterSidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const cities = [
    "Todas las ciudades",
    "Bogotá",
    "Medellín", 
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Manizales"
  ];

  const handleFilterChange = (key: keyof Filters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    onFiltersChange({
      categoryId: undefined,
      city: '',
      minPrice: undefined,
      maxPrice: undefined,
      availability: '',
      rating: undefined,
      search: '',
    });
    setPriceRange([0, 1000000]);
    setSelectedDate(undefined);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value !== undefined && value !== '' && value !== null
  );

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpiar
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Type Filter */}
        <div>
          <Label className="text-sm font-medium text-dark mb-3 block">Tipo de contenido</Label>
          <RadioGroup 
            value={contentType} 
            onValueChange={onContentTypeChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="artists" id="artists" />
              <Label htmlFor="artists" className="text-sm">Artistas</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="events" id="events" />
              <Label htmlFor="events" className="text-sm">Eventos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="venues" id="venues" />
              <Label htmlFor="venues" className="text-sm">Espacios</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recommendations" id="recommendations" />
              <Label htmlFor="recommendations" className="text-sm">Recomendaciones</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="blog" id="blog" />
              <Label htmlFor="blog" className="text-sm">Blog</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Category Filter */}
        {(contentType === 'artists' || contentType === 'events' || contentType === 'recommendations') && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Categoría</Label>
            <Select 
              value={filters.categoryId?.toString() || ''} 
              onValueChange={(value) => handleFilterChange('categoryId', value ? parseInt(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
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
          </div>
        )}

        {/* Location Filter */}
        <div>
          <Label className="text-sm font-medium text-dark mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ubicación
          </Label>
          <Select 
            value={filters.city || ''} 
            onValueChange={(value) => handleFilterChange('city', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Todas las ciudades" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city === "Todas las ciudades" ? "" : city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        {(contentType === 'artists' || contentType === 'events' || contentType === 'venues') && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Rango de precio {contentType === 'artists' ? '/hora' : contentType === 'venues' ? '/día' : ''}
            </Label>
            <div className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={(value) => {
                  setPriceRange(value);
                  handleFilterChange('minPrice', value[0]);
                  handleFilterChange('maxPrice', value[1]);
                }}
                max={1000000}
                min={0}
                step={10000}
                className="w-full"
              />
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Desde"
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    const newRange = [value, priceRange[1]];
                    setPriceRange(newRange);
                    handleFilterChange('minPrice', value);
                  }}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Hasta"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1000000;
                    const newRange = [priceRange[0], value];
                    setPriceRange(newRange);
                    handleFilterChange('maxPrice', value);
                  }}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Availability Filter */}
        {contentType === 'artists' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Disponibilidad</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="today"
                  checked={filters.availability === 'today'}
                  onCheckedChange={(checked) => 
                    handleFilterChange('availability', checked ? 'today' : '')
                  }
                />
                <Label htmlFor="today" className="text-sm">Hoy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="weekend"
                  checked={filters.availability === 'weekend'}
                  onCheckedChange={(checked) => 
                    handleFilterChange('availability', checked ? 'weekend' : '')
                  }
                />
                <Label htmlFor="weekend" className="text-sm">Este fin de semana</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="custom-date"
                  checked={!!selectedDate}
                  onCheckedChange={(checked) => {
                    if (!checked) {
                      setSelectedDate(undefined);
                      handleFilterChange('availability', '');
                    }
                  }}
                />
                <Label htmlFor="custom-date" className="text-sm">Fecha específica</Label>
              </div>
              
              {filters.availability !== 'today' && filters.availability !== 'weekend' && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Elegir fecha"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        handleFilterChange('availability', date ? 'custom' : '');
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        )}

        {/* Date Filter for Events */}
        {contentType === 'events' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Fecha del evento
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Todas las fechas"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    handleFilterChange('startDate', date);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Rating Filter */}
        {(contentType === 'artists' || contentType === 'events' || contentType === 'venues') && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Calificación mínima
            </Label>
            <RadioGroup 
              value={filters.rating?.toString() || ''} 
              onValueChange={(value) => handleFilterChange('rating', value ? parseFloat(value) : undefined)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-ratings" />
                <Label htmlFor="all-ratings" className="text-sm">Todas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="4-stars" />
                <Label htmlFor="4-stars" className="text-sm flex items-center">
                  <span className="text-yellow-400 mr-1">★★★★</span>
                  4+ estrellas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="3-stars" />
                <Label htmlFor="3-stars" className="text-sm flex items-center">
                  <span className="text-yellow-400 mr-1">★★★</span>
                  3+ estrellas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="5-stars" />
                <Label htmlFor="5-stars" className="text-sm flex items-center">
                  <span className="text-yellow-400 mr-1">★★★★★</span>
                  5 estrellas
                </Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Experience Level for Artists */}
        {contentType === 'artists' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Nivel de experiencia</Label>
            <RadioGroup 
              value={filters.experience || ''} 
              onValueChange={(value) => handleFilterChange('experience', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-experience" />
                <Label htmlFor="all-experience" className="text-sm">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="principiante" id="beginner" />
                <Label htmlFor="beginner" className="text-sm">Principiante</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermedio" id="intermediate" />
                <Label htmlFor="intermediate" className="text-sm">Intermedio</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="profesional" id="professional" />
                <Label htmlFor="professional" className="text-sm">Profesional</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="referente" id="expert" />
                <Label htmlFor="expert" className="text-sm">Referente</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Event Type Filter */}
        {contentType === 'events' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Tipo de evento</Label>
            <RadioGroup 
              value={filters.eventType || ''} 
              onValueChange={(value) => handleFilterChange('eventType', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="" id="all-events" />
                <Label htmlFor="all-events" className="text-sm">Todos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gratuito" id="free" />
                <Label htmlFor="free" className="text-sm">Gratuitos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pago" id="paid" />
                <Label htmlFor="paid" className="text-sm">De pago</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="text-sm">Online</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        {/* Venue Type Filter */}
        {contentType === 'venues' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Tipo de espacio</Label>
            <Select 
              value={filters.venueType || ''} 
              onValueChange={(value) => handleFilterChange('venueType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los tipos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los tipos</SelectItem>
                <SelectItem value="galeria">Galería</SelectItem>
                <SelectItem value="cafe_cultural">Café Cultural</SelectItem>
                <SelectItem value="sala_conciertos">Sala de Conciertos</SelectItem>
                <SelectItem value="teatro">Teatro</SelectItem>
                <SelectItem value="centro_cultural">Centro Cultural</SelectItem>
                <SelectItem value="auditorio">Auditorio</SelectItem>
                <SelectItem value="salon_eventos">Salón de Eventos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Blog Category Filter */}
        {contentType === 'blog' && (
          <div>
            <Label className="text-sm font-medium text-dark mb-3 block">Categoría de blog</Label>
            <Select 
              value={filters.category || ''} 
              onValueChange={(value) => handleFilterChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las categorías</SelectItem>
                <SelectItem value="inspiracion">Inspiración</SelectItem>
                <SelectItem value="tecnica">Técnica</SelectItem>
                <SelectItem value="reflexion">Reflexión</SelectItem>
                <SelectItem value="convocatoria">Convocatoria</SelectItem>
                <SelectItem value="experiencia">Experiencia</SelectItem>
                <SelectItem value="tutorial">Tutorial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
