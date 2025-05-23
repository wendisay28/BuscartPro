import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, MessageCircle, MapPin, Calendar, Star, Filter, Bookmark, Settings, Send, Users, Clock } from "lucide-react";
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

  // 10 Artistas de prueba
  const mockArtists = [
    {
      id: 1, name: "María Elena Vásquez", category: "Música", type: "Cantante Folk", city: "Madrid", rating: 4.8, price: 350,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 234, favorites: 89,
      description: "Artista folk con 10 años de experiencia en eventos íntimos y bodas"
    },
    {
      id: 2, name: "Carlos Mendoza", category: "Danza", type: "Bailarín Flamenco", city: "Sevilla", rating: 4.9, price: 420,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=600&fit=crop", likes: 512, favorites: 156,
      description: "Especialista en flamenco tradicional y contemporáneo para eventos especiales"
    },
    {
      id: 3, name: "Ana Lucía Torres", category: "Teatro", type: "Actriz Dramática", city: "Barcelona", rating: 4.7, price: 280,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", likes: 189, favorites: 67,
      description: "Actriz con formación en teatro clásico y experimental"
    },
    {
      id: 4, name: "Diego Martín", category: "Música", type: "Saxofonista Jazz", city: "Valencia", rating: 4.6, price: 300,
      image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=600&fit=crop", likes: 310, favorites: 124,
      description: "Saxofonista profesional especializado en jazz y música contemporánea"
    },
    {
      id: 5, name: "Isabella Rossi", category: "Arte Visual", type: "Pintora en Vivo", city: "Madrid", rating: 4.8, price: 450,
      image: "https://images.unsplash.com/photo-1494790108755-2616c333e3e7?w=400&h=600&fit=crop", likes: 445, favorites: 198,
      description: "Artista que crea obras en tiempo real durante eventos y celebraciones"
    },
    {
      id: 6, name: "Javier Ruiz", category: "Música", type: "Guitarrista Clásico", city: "Salamanca", rating: 4.5, price: 250,
      image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=600&fit=crop", likes: 267, favorites: 89,
      description: "Guitarrista clásico con repertorio español y internacional"
    },
    {
      id: 7, name: "Carmen Delgado", category: "Danza", type: "Bailarina Contemporánea", city: "Bilbao", rating: 4.7, price: 380,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop", likes: 389, favorites: 145,
      description: "Coreógrafa y bailarina especializada en danza contemporánea y moderna"
    },
    {
      id: 8, name: "Pablo Herrera", category: "Teatro", type: "Mimo y Comedia", city: "Zaragoza", rating: 4.4, price: 200,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop", likes: 198, favorites: 72,
      description: "Artista de mime y comedia física, perfecto para eventos familiares"
    },
    {
      id: 9, name: "Sofía Morales", category: "Música", type: "Violinista", city: "Córdoba", rating: 4.9, price: 400,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop", likes: 523, favorites: 234,
      description: "Violinista clásica con formación en conservatorio, ideal para bodas"
    },
    {
      id: 10, name: "Miguel Ángel Castro", category: "Arte Visual", type: "Escultor", city: "Toledo", rating: 4.6, price: 500,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=600&fit=crop", likes: 321, favorites: 156,
      description: "Escultor que realiza obras personalizadas durante eventos culturales"
    }
  ];

  // 10 Eventos de prueba
  const mockEvents = [
    {
      id: 1, title: "Festival de Jazz Barcelona", category: "Música", date: "2024-06-15", city: "Barcelona", rating: 4.6, price: 45,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 1250, attendees: 2500,
      description: "El festival de jazz más importante del mediterráneo con artistas internacionales"
    },
    {
      id: 2, title: "Noche de Flamenco", category: "Danza", date: "2024-05-28", city: "Madrid", rating: 4.8, price: 35,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=600&fit=crop", likes: 890, attendees: 300,
      description: "Una noche mágica con los mejores bailaores y guitarristas"
    },
    {
      id: 3, title: "Exposición Arte Contemporáneo", category: "Arte Visual", date: "2024-07-02", city: "Valencia", rating: 4.5, price: 20,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 567, attendees: 800,
      description: "Muestra de arte contemporáneo con obras de artistas emergentes"
    },
    {
      id: 4, title: "Concierto Sinfónico", category: "Música", date: "2024-06-20", city: "Sevilla", rating: 4.9, price: 60,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 1890, attendees: 1200,
      description: "Orquesta sinfónica interpretando las mejores piezas clásicas"
    },
    {
      id: 5, title: "Festival de Teatro Callejero", category: "Teatro", date: "2024-08-10", city: "Bilbao", rating: 4.4, price: 15,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", likes: 445, attendees: 600,
      description: "Compañías de teatro callejero de toda Europa se reúnen en Bilbao"
    },
    {
      id: 6, title: "Mercado de Artesanías", category: "Arte Visual", date: "2024-06-05", city: "Granada", rating: 4.3, price: 0,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 234, attendees: 1500,
      description: "Mercado de artesanías locales con talleres interactivos"
    },
    {
      id: 7, title: "Recital de Poesía", category: "Literatura", date: "2024-07-15", city: "Salamanca", rating: 4.7, price: 12,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", likes: 156, attendees: 200,
      description: "Noche de poesía con autores locales e invitados especiales"
    },
    {
      id: 8, title: "Festival Folk Asturiano", category: "Música", date: "2024-09-01", city: "Oviedo", rating: 4.6, price: 25,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 678, attendees: 800,
      description: "Celebración de la música tradicional asturiana con grupos locales"
    },
    {
      id: 9, title: "Taller de Danza Urbana", category: "Danza", date: "2024-06-25", city: "Málaga", rating: 4.5, price: 30,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=600&fit=crop", likes: 389, attendees: 150,
      description: "Taller intensivo de danza urbana para todos los niveles"
    },
    {
      id: 10, title: "Exposición Fotografía", category: "Arte Visual", date: "2024-08-20", city: "Cádiz", rating: 4.8, price: 18,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 445, attendees: 400,
      description: "Muestra de fotografía documental sobre la cultura andaluza"
    }
  ];

  // 10 Sitios de prueba  
  const mockVenues = [
    {
      id: 1, name: "Centro Cultural Recoletos", type: "Galería", city: "Madrid", rating: 4.5,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 456,
      description: "Espacio cultural multidisciplinar en el corazón de Madrid con exposiciones rotativas"
    },
    {
      id: 2, name: "Teatro Principal", type: "Teatro", city: "Barcelona", rating: 4.8,
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 789,
      description: "Teatro histórico con programación de obras clásicas y contemporáneas"
    },
    {
      id: 3, name: "Café Jazz Blue Note", type: "Club de Jazz", city: "Valencia", rating: 4.6,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=600&fit=crop", likes: 345,
      description: "Íntimo café-club con música jazz en vivo todas las noches"
    },
    {
      id: 4, name: "Museo de Arte Moderno", type: "Museo", city: "Sevilla", rating: 4.7,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 1234,
      description: "Colección de arte moderno español con talleres para artistas emergentes"
    },
    {
      id: 5, name: "Auditorio Municipal", type: "Auditorio", city: "Bilbao", rating: 4.9,
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 567,
      description: "Auditorio con acústica excepcional para conciertos sinfónicos y recitales"
    },
    {
      id: 6, name: "Galería Arte Contemporáneo", type: "Galería", city: "Granada", rating: 4.4,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 289,
      description: "Galería especializada en arte contemporáneo andaluz y exposiciones temporales"
    },
    {
      id: 7, name: "Centro Flamenco Tradicional", type: "Tablao", city: "Cádiz", rating: 4.8,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=600&fit=crop", likes: 456,
      description: "Tablao auténtico donde se celebra el flamenco tradicional gaditano"
    },
    {
      id: 8, name: "Sala de Conciertos El Rincón", type: "Sala de Conciertos", city: "Zaragoza", rating: 4.5,
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 234,
      description: "Sala íntima perfecta para conciertos acústicos y presentaciones en vivo"
    },
    {
      id: 9, name: "Espacio Cultural La Fábrica", type: "Centro Cultural", city: "Málaga", rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 378,
      description: "Antigua fábrica reconvertida en espacio multidisciplinar para las artes"
    },
    {
      id: 10, name: "Conservatorio de Música", type: "Conservatorio", city: "Salamanca", rating: 4.7,
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 567,
      description: "Conservatorio histórico que ofrece masterclasses y recitales públicos"
    }
  ];

  // 10 Recomendaciones/Solicitudes de prueba
  const mockRecommendations = [
    {
      id: 1, title: "¿Alguien conoce un saxofonista para bodas en Bogotá?", author: "Laura Jiménez", city: "Madrid",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=600&fit=crop", likes: 234,
      description: "Busco un saxofonista profesional para una boda en diciembre. Presupuesto: 300-400€"
    },
    {
      id: 2, title: "Necesito un mimo para evento infantil en Barcelona", author: "Carlos Ruiz", city: "Barcelona",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 156,
      description: "Evento para 50 niños, duración 2 horas. Fecha flexible en julio"
    },
    {
      id: 3, title: "¿Conocen una buena galería para exposición grupal?", author: "Ana Morales", city: "Valencia",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 89,
      description: "Grupo de 8 pintores busca galería para exposición colectiva en otoño"
    },
    {
      id: 4, title: "Busco bailarina de danza contemporánea", author: "Miguel Santos", city: "Sevilla",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop", likes: 267,
      description: "Para espectáculo de 45 minutos. Experiencia en teatro musical requerida"
    },
    {
      id: 5, title: "¿Algún violinista disponible para cena corporativa?", author: "Elena Vega", city: "Madrid",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 145,
      description: "Cena empresarial para 100 personas. Música clásica y moderna"
    },
    {
      id: 6, title: "Recomendaciones de espacios para teatro experimental", author: "David López", city: "Bilbao",
      image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=600&fit=crop", likes: 78,
      description: "Buscamos espacios alternativos para obra de teatro experimental, aforo 50-80 personas"
    },
    {
      id: 7, title: "¿Conocen un buen guitarrista flamenco?", author: "Carmen Delgado", city: "Granada",
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=600&fit=crop", likes: 189,
      description: "Para acompañar espectáculo de baile flamenco. Nivel profesional imprescindible"
    },
    {
      id: 8, title: "Busco escultor para obra en vivo", author: "Pablo Herrera", city: "Toledo",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop", likes: 234,
      description: "Evento cultural donde el artista cree una escultura durante 3 horas en vivo"
    },
    {
      id: 9, title: "¿Algún cantante indie para festival pequeño?", author: "Sofia Martín", city: "Córdoba",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop", likes: 156,
      description: "Festival de música independiente, 200 asistentes. Buen ambiente garantizado"
    },
    {
      id: 10, title: "Necesito actor para monólogo cómico", author: "Javier Ruiz", city: "Zaragoza",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop", likes: 123,
      description: "Espectáculo de 30 minutos para evento corporativo. Humor inteligente y elegante"
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