import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, SlidersHorizontal, Plus, TrendingUp, Heart, Eye } from "lucide-react";

export default function CommunityBlog() {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    author: '',
    sortBy: 'recent'
  });

  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ['/api/blog', filters],
  });

  const categories = [
    'Consejos Artísticos', 'Entrevistas', 'Tendencias', 'Técnicas', 
    'Industria Musical', 'Arte Visual', 'Teatro', 'Eventos'
  ];

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
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
                Blog Cultural
              </h1>
              <p className="text-gray-600 text-lg">
                Descubre consejos, tendencias y experiencias de la comunidad artística
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Escribir Artículo
            </Button>
          </div>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-primary">152</h3>
              <p className="text-gray-600">Artículos Publicados</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-secondary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-secondary">24.8K</h3>
              <p className="text-gray-600">Lecturas Totales</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-red-500">1.2K</h3>
              <p className="text-gray-600">Me Gusta</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar artículos por título, contenido..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Más recientes</SelectItem>
                    <SelectItem value="popular">Más populares</SelectItem>
                    <SelectItem value="trending">Tendencias</SelectItem>
                    <SelectItem value="liked">Más gustados</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={filters.category === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleFilterChange('category', '')}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Todos
          </Button>
          {categories.slice(0, 5).map((category) => (
            <Button
              key={category}
              variant={filters.category === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('category', filters.category === category ? '' : category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="font-heading font-semibold text-2xl text-dark mb-6">
              {isLoading ? 'Cargando...' : `${blogPosts?.length || 0} artículos encontrados`}
            </h2>

            {isLoading ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : blogPosts && blogPosts.length > 0 ? (
              <div className="space-y-6">
                {blogPosts.map((post: any) => (
                  <BlogCard key={post.id} post={post} />
                ))}
                
                <div className="text-center mt-8">
                  <Button variant="outline" size="lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Cargar más artículos
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent className="p-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                    No se encontraron artículos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Intenta ajustar tus filtros o sé el primero en escribir sobre este tema
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Escribir primer artículo
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-semibold text-lg">Autores Populares</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-dark text-sm">María Fernández</h4>
                      <p className="text-xs text-gray-600">15 artículos</p>
                    </div>
                    <Button size="sm" variant="outline">Seguir</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading font-semibold text-lg">Tags Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['#música', '#arte', '#teatro', '#consejos', '#técnicas', '#industria'].map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-white transition-colors">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Featured Article */}
            <Card className="bg-gradient-to-br from-primary to-secondary text-white">
              <CardContent className="p-6">
                <BookOpen className="h-8 w-8 mb-3" />
                <h3 className="font-heading font-semibold mb-2">
                  Artículo Destacado
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  "Cómo monetizar tu arte en el mundo digital" - Una guía completa para artistas modernos
                </p>
                <Button variant="secondary" size="sm">
                  Leer ahora
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}