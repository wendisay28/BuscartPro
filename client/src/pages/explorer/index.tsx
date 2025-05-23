import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, MessageCircle, MapPin, Calendar, Star, Filter, ChevronLeft, ChevronRight, Zap, Send } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type ContentType = 'artists' | 'events' | 'venues' | 'recommendations';

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ContentType>('artists');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    priceRange: [0, 1000],
    rating: 0,
    search: ''
  });
  const isMobile = useIsMobile();

  // Mock data realista
  const mockArtists = [
    {
      id: 1,
      name: "María Elena Vásquez",
      category: "Música",
      type: "Cantante Folk",
      city: "Madrid",
      rating: 4.8,
      price: 350,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      likes: 234,
      favorites: 89,
      description: "Artista folk con 10 años de experiencia en eventos íntimos"
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      category: "Danza",
      type: "Bailarín Flamenco",
      city: "Sevilla",
      rating: 4.9,
      price: 420,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
      likes: 512,
      favorites: 156,
      description: "Especialista en flamenco tradicional y contemporáneo"
    },
    {
      id: 3,
      name: "Ana Lucía Torres",
      category: "Teatro",
      type: "Actriz Dramática",
      city: "Barcelona",
      rating: 4.7,
      price: 280,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      likes: 189,
      favorites: 67,
      description: "Actriz con formación en teatro clásico y experimental"
    }
  ];

  const mockEvents = [
    {
      id: 1,
      title: "Festival de Jazz Barcelona",
      category: "Música",
      date: "2024-06-15",
      city: "Barcelona",
      rating: 4.6,
      price: 45,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      likes: 1250,
      attendees: 2500,
      description: "El festival de jazz más importante del mediterráneo"
    },
    {
      id: 2,
      title: "Noche de Flamenco",
      category: "Danza",
      date: "2024-05-28",
      city: "Madrid",
      rating: 4.8,
      price: 35,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
      likes: 890,
      attendees: 300,
      description: "Una noche mágica con los mejores bailaores"
    }
  ];

  const mockVenues = [
    {
      id: 1,
      name: "Centro Cultural Recoletos",
      type: "Galería",
      city: "Madrid",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      likes: 456,
      description: "Espacio cultural multidisciplinar en el corazón de Madrid"
    }
  ];

  const mockRecommendations = [
    {
      id: 1,
      title: "Los mejores cafés con música en vivo",
      author: "Laura Jiménez",
      city: "Valencia",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
      likes: 234,
      description: "Descubre los rincones más auténticos para disfrutar música en directo"
    }
  ];

  const getData = () => {
    switch (activeTab) {
      case 'artists': return mockArtists;
      case 'events': return mockEvents;
      case 'venues': return mockVenues;
      case 'recommendations': return mockRecommendations;
      default: return [];
    }
  };

  const currentData = getData();
  const currentItem = currentData[currentIndex] || currentData[0];

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % currentData.length);
  };

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + currentData.length) % currentData.length);
  };

  const TabButton = ({ type, label }: { type: ContentType; label: string }) => (
    <Button
      variant={activeTab === type ? "default" : "outline"}
      onClick={() => {
        setActiveTab(type);
        setCurrentIndex(0);
      }}
      className="flex-1 md:flex-none"
    >
      {label}
    </Button>
  );

  if (!currentItem) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Cargando explorador...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Buscart: <span className="text-primary">
            {activeTab === 'artists' && 'Artistas'}
            {activeTab === 'events' && 'Eventos'}
            {activeTab === 'venues' && 'Sitios'}
            {activeTab === 'recommendations' && 'Recomendaciones'}
          </span>
        </h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-6">
          <TabButton type="artists" label="Artistas" />
          <TabButton type="events" label="Eventos" />
          <TabButton type="venues" label="Sitios" />
          <TabButton type="recommendations" label="Recomendaciones" />
        </div>

        {/* Filter Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-6">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avanzados
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Filtros Avanzados</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Búsqueda</label>
                <Input 
                  placeholder="Buscar..." 
                  value={filters.search}
                  onChange={(e) => setFilters({...filters, search: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Ciudad</label>
                <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="sevilla">Sevilla</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {activeTab === 'artists' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Rango de Precios: €{filters.priceRange[0]} - €{filters.priceRange[1]}
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value})}
                    max={1000}
                    step={50}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content Card */}
      <div className="relative max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
          <div className="relative">
            <img 
              src={currentItem.image} 
              alt={currentItem.name || currentItem.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            
            {/* Navigation Arrows - Desktop */}
            {!isMobile && currentData.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={prevItem}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                  onClick={nextItem}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}

            {/* Category Badge */}
            <Badge className="absolute top-4 left-4 bg-primary/90 text-white">
              {currentItem.category}
            </Badge>

            {/* Rating */}
            {currentItem.rating && (
              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{currentItem.rating}</span>
              </div>
            )}
          </div>

          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Title and Type */}
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {currentItem.name || currentItem.title}
                </h2>
                <p className="text-gray-600">
                  {currentItem.type} • {currentItem.city}
                  {currentItem.date && (
                    <>
                      {' '}• <Calendar className="inline h-4 w-4 mr-1" />
                      {new Date(currentItem.date).toLocaleDateString('es-ES')}
                    </>
                  )}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700">{currentItem.description}</p>

              {/* Price */}
              {currentItem.price && (
                <div className="text-lg font-semibold text-primary">
                  €{currentItem.price}
                  {activeTab === 'artists' && ' / evento'}
                  {activeTab === 'events' && ' / entrada'}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span>{currentItem.likes}</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center space-x-1">
                  <MessageCircle className="h-4 w-4" />
                  <span>Comentarios</span>
                </Button>

                {activeTab === 'artists' && (
                  <Button size="sm" className="flex items-center space-x-1">
                    <Send className="h-4 w-4" />
                    <span>Hacer Oferta</span>
                  </Button>
                )}

                {activeTab === 'events' && (
                  <Button size="sm" className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Reservar</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile Swipe Indicator */}
        {isMobile && currentData.length > 1 && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Desliza para ver más</p>
            <div className="flex justify-center space-x-2 mt-2">
              {currentData.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons for Mobile */}
      {isMobile && currentData.length > 1 && (
        <div className="flex justify-center space-x-4 mt-6">
          <Button variant="outline" onClick={prevItem}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          <Button variant="outline" onClick={nextItem}>
            Siguiente
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}