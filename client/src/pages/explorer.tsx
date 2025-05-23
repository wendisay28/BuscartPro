import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import FilterSidebar from "@/components/filter-sidebar";
import ArtistCard from "@/components/artist-card";
import EventCard from "@/components/event-card";
import VenueCard from "@/components/venue-card";
import RecommendationCard from "@/components/recommendation-card";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

export default function Explorer() {
  const [contentType, setContentType] = useState<'artists' | 'events' | 'venues' | 'recommendations' | 'blog'>('artists');
  const [filters, setFilters] = useState({
    categoryId: undefined,
    city: '',
    minPrice: undefined,
    maxPrice: undefined,
    availability: '',
    rating: undefined,
    search: '',
  });

  const { data: results, isLoading } = useQuery({
    queryKey: [`/api/${contentType}`, filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(key, value.toString());
        }
      });
      
      const response = await fetch(`/api/${contentType}?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    },
  });

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const renderCard = (item: any, index: number) => {
    switch (contentType) {
      case 'artists':
        return <ArtistCard key={item.id} artist={item} />;
      case 'events':
        return <EventCard key={item.id} event={item} />;
      case 'venues':
        return <VenueCard key={item.id} venue={item} />;
      case 'recommendations':
        return <RecommendationCard key={item.id} recommendation={item} />;
      case 'blog':
        return <BlogCard key={item.id} post={item} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (contentType) {
      case 'artists': return 'Artistas';
      case 'events': return 'Eventos';
      case 'venues': return 'Espacios Culturales';
      case 'recommendations': return 'Recomendaciones';
      case 'blog': return 'Blog Cultural';
      default: return 'Explorar';
    }
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <FilterSidebar 
              contentType={contentType}
              onContentTypeChange={setContentType}
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="font-heading font-semibold text-3xl text-dark mb-1">{getTitle()}</h1>
                <p className="text-gray-600">
                  {isLoading ? 'Cargando...' : `Mostrando ${results?.length || 0} resultados`}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Ordenar por:</span>
                  <Select defaultValue="relevance">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Más relevantes</SelectItem>
                      <SelectItem value="rating">Mejor calificados</SelectItem>
                      <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                      <SelectItem value="recent">Más recientes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(contentType === 'recommendations' || contentType === 'blog') && (
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear {contentType === 'recommendations' ? 'Solicitud' : 'Artículo'}
                  </Button>
                )}
              </div>
            </div>

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg h-80 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : results && results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {results.map(renderCard)}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Cargar más resultados
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Plus className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o buscar términos diferentes
                </p>
                <Button variant="outline">
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
