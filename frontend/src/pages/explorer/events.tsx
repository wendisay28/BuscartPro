import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import EventCard from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, SlidersHorizontal, MapPin, Clock, Plus } from "lucide-react";

export default function ExploreEvents() {
  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    city: '',
    eventType: '',
    dateRange: '',
    sortBy: 'date'
  });

  const [showFilters, setShowFilters] = useState(false);

  const { data: events, isLoading } = useQuery({
    queryKey: ['/api/events', filters],
  });

  const { data: categories } = useQuery({
    queryKey: ['/api/categories'],
  });

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Pasto'
  ];

  const eventTypes = [
    'Concierto', 'Teatro', 'Exposición', 'Taller', 'Festival',
    'Conferencia', 'Performance', 'Espectáculo', 'Muestra', 'Encuentro'
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categoryId: '',
      city: '',
      eventType: '',
      dateRange: '',
      sortBy: 'date'
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
                Explora Eventos
              </h1>
              <p className="text-gray-600 text-lg">
                Descubre experiencias culturales únicas en tu ciudad
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Crear Evento
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
                  placeholder="Buscar eventos por nombre, descripción..."
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

                <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Fecha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Cualquier fecha</SelectItem>
                    <SelectItem value="today">Hoy</SelectItem>
                    <SelectItem value="tomorrow">Mañana</SelectItem>
                    <SelectItem value="this-week">Esta semana</SelectItem>
                    <SelectItem value="this-month">Este mes</SelectItem>
                    <SelectItem value="next-month">Próximo mes</SelectItem>
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
          </CardContent>
        </Card>

        {/* Quick Date Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant={filters.dateRange === 'today' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('dateRange', filters.dateRange === 'today' ? '' : 'today')}
          >
            <Clock className="h-4 w-4 mr-2" />
            Hoy
          </Button>
          <Button
            variant={filters.dateRange === 'this-week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('dateRange', filters.dateRange === 'this-week' ? '' : 'this-week')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Esta Semana
          </Button>
          <Button
            variant={filters.dateRange === 'this-month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('dateRange', filters.dateRange === 'this-month' ? '' : 'this-month')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Este Mes
          </Button>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-heading font-semibold text-2xl text-dark">
              {isLoading ? 'Cargando...' : `${events?.length || 0} eventos encontrados`}
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
        ) : events && events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: any) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                <Calendar className="h-4 w-4 mr-2" />
                Cargar más eventos
              </Button>
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent className="p-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                No se encontraron eventos
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