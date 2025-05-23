import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Heart, 
  Star, 
  MapPin, 
  DollarSign,
  Calendar,
  Users,
  Building,
  Music,
  Camera,
  Palette,
  Mic,
  X,
  ArrowRight,
  Eye,
  MessageCircle,
  Share2,
  Compare,
  Filter
} from "lucide-react";

export default function Favorites() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("artists");
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Datos de favoritos realistas
  const favoriteData = {
    artists: [
      {
        id: 1, name: "María Elena Vásquez", category: "Música", type: "Cantante Folk", 
        city: "Madrid", rating: 4.8, price: 350, fans: 234,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        description: "Especialista en música folk con 10 años de experiencia",
        availability: "Disponible", verified: true
      },
      {
        id: 2, name: "Carlos Mendoza", category: "Danza", type: "Bailarín Flamenco",
        city: "Sevilla", rating: 4.9, price: 420, fans: 512,
        image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
        description: "Maestro de flamenco tradicional y contemporáneo",
        availability: "Disponible", verified: true
      },
      {
        id: 3, name: "Ana Lucía Torres", category: "Teatro", type: "Actriz Dramática",
        city: "Barcelona", rating: 4.7, price: 280, fans: 189,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        description: "Actriz con formación en teatro clásico y experimental",
        availability: "Ocupada", verified: true
      },
      {
        id: 4, name: "Diego Martín", category: "Música", type: "Saxofonista Jazz",
        city: "Valencia", rating: 4.6, price: 300, fans: 310,
        image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop",
        description: "Saxofonista profesional especializado en jazz contemporáneo",
        availability: "Disponible", verified: true
      }
    ],
    events: [
      {
        id: 1, title: "Festival de Jazz Barcelona", category: "Música", 
        date: "2024-06-15", city: "Barcelona", price: 45, attendees: 2500,
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        description: "El festival de jazz más importante del mediterráneo"
      },
      {
        id: 2, title: "Noche de Flamenco", category: "Danza",
        date: "2024-05-28", city: "Madrid", price: 35, attendees: 300,
        image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
        description: "Una noche mágica con los mejores bailaores"
      }
    ],
    venues: [
      {
        id: 1, name: "Centro Cultural Recoletos", type: "Galería", 
        city: "Madrid", rating: 4.5, capacity: 200,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "Espacio cultural multidisciplinar en el corazón de Madrid"
      }
    ]
  };

  const currentData = favoriteData[activeTab as keyof typeof favoriteData];

  const handleCompareToggle = (id: number) => {
    setSelectedForComparison(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const getComparisonData = () => {
    if (activeTab !== 'artists') return [];
    return favoriteData.artists.filter(artist => selectedForComparison.includes(artist.id));
  };

  const renderArtistCard = (artist: any) => (
    <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 flex gap-2">
          {artist.verified && (
            <Badge className="bg-blue-600 text-white">
              Verificado
            </Badge>
          )}
          <Badge className={`${
            artist.availability === 'Disponible' 
              ? 'bg-green-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            {artist.availability}
          </Badge>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 left-3 bg-white/80 hover:bg-white"
          onClick={() => {/* Remove from favorites */}}
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">{artist.name}</h3>
            <p className="text-sm text-gray-600">{artist.type}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-orange-500">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{artist.rating}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{artist.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{artist.fans} fans</span>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{artist.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-orange-600">
            €{artist.price}/hora
          </div>
          <div className="flex gap-2">
            {activeTab === 'artists' && (
              <Checkbox
                checked={selectedForComparison.includes(artist.id)}
                onCheckedChange={() => handleCompareToggle(artist.id)}
                disabled={!selectedForComparison.includes(artist.id) && selectedForComparison.length >= 3}
              />
            )}
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <MessageCircle className="w-3 h-3 mr-1" />
              Contactar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEventCard = (event: any) => (
    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 left-3 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{event.attendees}</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-orange-600">
            €{event.price}
          </div>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderVenueCard = (venue: any) => (
    <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 left-3 bg-white/80 hover:bg-white"
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </Button>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{venue.name}</h3>
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Building className="w-3 h-3" />
            <span>{venue.type}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{venue.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{venue.capacity} personas</span>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{venue.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-orange-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            Ver Disponibilidad
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Favoritos</h1>
              <p className="text-gray-600">Artistas, eventos y lugares que te gustan</p>
            </div>
            <div className="flex gap-3">
              {selectedForComparison.length >= 2 && (
                <Button
                  onClick={() => setShowComparison(true)}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Compare className="w-4 h-4 mr-2" />
                  Comparar ({selectedForComparison.length})
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowFilters(true)}>
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="artists">
              Artistas ({favoriteData.artists.length})
            </TabsTrigger>
            <TabsTrigger value="events">
              Eventos ({favoriteData.events.length})
            </TabsTrigger>
            <TabsTrigger value="venues">
              Lugares ({favoriteData.venues.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="artists">
            {selectedForComparison.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-800">
                      {selectedForComparison.length} artistas seleccionados para comparar
                    </p>
                    <p className="text-xs text-orange-600">
                      Máximo 3 artistas. Haz clic en "Comparar" para ver las diferencias.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedForComparison([])}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.artists.map(renderArtistCard)}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.events.map(renderEventCard)}
            </div>
          </TabsContent>

          <TabsContent value="venues">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.venues.map(renderVenueCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de comparación */}
      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comparar Artistas</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getComparisonData().map((artist) => (
              <Card key={artist.id} className="border-2 border-orange-200">
                <CardHeader className="pb-3">
                  <div className="relative">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle className="text-lg">{artist.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Categoría:</span>
                      <p className="font-medium">{artist.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Tipo:</span>
                      <p className="font-medium">{artist.type}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Ciudad:</span>
                      <p className="font-medium">{artist.city}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-orange-500 fill-current" />
                        <span className="font-medium">{artist.rating}</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Precio/hora:</span>
                      <p className="font-medium text-orange-600">€{artist.price}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Fans:</span>
                      <p className="font-medium">{artist.fans}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Disponibilidad:</span>
                      <Badge className={`ml-2 ${
                        artist.availability === 'Disponible' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {artist.availability}
                      </Badge>
                    </div>
                  </div>
                  
                  <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                    <MessageCircle className="w-3 h-3 mr-1" />
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}