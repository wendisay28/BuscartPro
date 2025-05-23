import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import ArtistCard from "@/components/artist-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, SlidersHorizontal, Users, Star, MapPin } from "lucide-react";

export default function ExploreArtists() {
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    city: '',
    minPrice: 0,
    maxPrice: 500000,
    availability: '',
    rating: '',
    sortBy: 'relevance'
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: artists, isLoading } = useQuery({
    queryKey: ['/api/artists', filters],
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Pasto'
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      city: '',
      minPrice: 0,
      maxPrice: 500000,
      availability: '',
      rating: '',
      sortBy: 'relevance'
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categoryId) count++;
    if (filters.city) count++;
    if (filters.availability) count++;
    if (filters.rating) count++;
    if (filters.minPrice > 0 || filters.maxPrice < 500000) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-4xl text-dark mb-2">
            Explora Artistas
          </h1>
          <p className="text-gray-600 text-lg">
            Descubre talento excepcional para tus eventos y proyectos
          </p>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar artistas por nombre, especialidad..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                <Select value={filters.categoryId} onValueChange={(value) => handleFilterChange('categoryId', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
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
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
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
                          handleFilterChange('minPrice', min);
                          handleFilterChange('maxPrice', max);
                        }}
                        max={500000}
                        step={10000}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>${filters.minPrice.toLocaleString()}</span>
                        <span>${filters.maxPrice.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Disponibilidad
                    </label>
                    <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar disponibilidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Cualquiera</SelectItem>
                        <SelectItem value="available">Disponible ahora</SelectItem>
                        <SelectItem value="weekends">Solo fines de semana</SelectItem>
                        <SelectItem value="weekdays">Solo días laborales</SelectItem>
                        <SelectItem value="flexible">Horario flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Calificación Mínima
                    </label>
                    <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Cualquier calificación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Cualquiera</SelectItem>
                        <SelectItem value="4">4+ estrellas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                        <SelectItem value="4.8">4.8+ estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" onClick={clearFilters}>
                    Limpiar Filtros
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-dark">
              {isLoading ? 'Cargando...' : `${artists?.length || 0} artistas encontrados`}
            </h2>
            {(filters.search || filters.categoryId || filters.city) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.search && (
                  <Badge variant="secondary">
                    Búsqueda: "{filters.search}"
                  </Badge>
                )}
                {filters.categoryId && (
                  <Badge variant="secondary">
                    Categoría: {categories?.find((c: any) => c.id.toString() === filters.categoryId)?.name}
                  </Badge>
                )}
                {filters.city && (
                  <Badge variant="secondary">
                    Ciudad: {filters.city}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                <CardContent className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : artists && artists.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artists.map((artist: any) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Users className="h-4 w-4 mr-2" />
                Cargar más artistas
              </Button>
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                No se encontraron artistas
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar tus filtros o buscar términos diferentes
              </p>
              <Button onClick={clearFilters}>
                Limpiar filtros
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}