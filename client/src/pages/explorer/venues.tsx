import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import VenueCard from "@/components/venue-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, SlidersHorizontal, Building, Plus } from "lucide-react";

export default function ExploreVenues() {
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    venueType: '',
    capacity: '',
    services: '',
    sortBy: 'name'
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: venues, isLoading } = useQuery({
    queryKey: ['/api/venues', filters],
  });

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Pasto'
  ];

  const venueTypes = [
    'Teatro', 'Auditorio', 'Galería', 'Centro Cultural', 'Café Cultural',
    'Biblioteca', 'Museo', 'Sala de Conciertos', 'Espacio Abierto', 'Club'
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      venueType: '',
      capacity: '',
      services: '',
      sortBy: 'name'
    });
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-heading font-bold text-4xl text-dark mb-2">
                Explora Espacios
              </h1>
              <p className="text-gray-600 text-lg">
                Encuentra el lugar perfecto para tu próximo evento cultural
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Registrar Espacio
            </Button>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar espacios por nombre, ubicación..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex flex-wrap gap-3 lg:flex-nowrap">
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

                <Select value={filters.venueType} onValueChange={(value) => handleFilterChange('venueType', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos</SelectItem>
                    {venueTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.capacity} onValueChange={(value) => handleFilterChange('capacity', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Capacidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Cualquiera</SelectItem>
                    <SelectItem value="small">Hasta 50 personas</SelectItem>
                    <SelectItem value="medium">51-200 personas</SelectItem>
                    <SelectItem value="large">201-500 personas</SelectItem>
                    <SelectItem value="xlarge">500+ personas</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Services */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Servicios
                    </label>
                    <Select value={filters.services} onValueChange={(value) => handleFilterChange('services', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Servicios disponibles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Cualquiera</SelectItem>
                        <SelectItem value="sound">Equipo de sonido</SelectItem>
                        <SelectItem value="lighting">Iluminación</SelectItem>
                        <SelectItem value="projection">Proyección</SelectItem>
                        <SelectItem value="catering">Catering</SelectItem>
                        <SelectItem value="parking">Estacionamiento</SelectItem>
                        <SelectItem value="accessibility">Accesibilidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Ordenar por
                    </label>
                    <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Nombre</SelectItem>
                        <SelectItem value="rating">Mejor calificados</SelectItem>
                        <SelectItem value="capacity">Capacidad</SelectItem>
                        <SelectItem value="recent">Más recientes</SelectItem>
                        <SelectItem value="popular">Más populares</SelectItem>
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
              {isLoading ? 'Cargando...' : `${venues?.length || 0} espacios encontrados`}
            </h2>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
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
        ) : venues && venues.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue: any) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Building className="h-4 w-4 mr-2" />
                Cargar más espacios
              </Button>
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Building className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                No se encontraron espacios
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