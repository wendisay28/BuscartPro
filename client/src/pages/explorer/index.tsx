import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Heart, MessageCircle, MapPin, Calendar, Star, Filter, Bookmark, Settings, Send, Users, Clock, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type ContentType = 'artists' | 'events' | 'venues' | 'recommendations';

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ContentType>('artists');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    priceRange: [0, 1000],
    rating: 0,
    search: ''
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
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
  const currentItem = currentData[currentIndex];

  // Swipe functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragCurrent({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragCurrent.x) > threshold) {
      nextCard();
    }
    setDragCurrent({ x: 0, y: 0 });
  };

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % currentData.length);
  };

  const handleLike = () => {
    nextCard();
  };

  const handleBookmark = () => {
    nextCard();
  };

  const TabButton = ({ type, label }: { type: ContentType; label: string }) => (
    <Button
      variant={activeTab === type ? "default" : "outline"}
      onClick={() => {
        setActiveTab(type);
        setCurrentIndex(0);
      }}
      className={`text-xs px-3 py-1 h-8 transition-all ${
        activeTab === type 
          ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-300"
      }`}
    >
      {label}
    </Button>
  );

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4">
        <div className="max-w-md mx-auto text-center py-20">
          <p className="text-gray-500">No hay contenido disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-black/5">
      {/* Header Desktop & Mobile */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Buscador Principal */}
          <div className="max-w-2xl mx-auto mb-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar artistas, eventos, sitios..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-4 pr-12 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-xl bg-white"
              />
              {!isMobile && (
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:bg-orange-100"
                >
                  <Settings className="w-5 h-5" />
                </Button>
              )}
              {isMobile && (
                <Button
                  onClick={() => setShowFilters(!showFilters)}
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:bg-orange-100"
                >
                  <Filter className="w-5 h-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Tabs de Navegación */}
          <div className="flex justify-center gap-2">
            <TabButton type="artists" label="Artistas" />
            <TabButton type="events" label="Eventos" />
            <TabButton type="venues" label="Sitios" />
            <TabButton type="recommendations" label="Recomendar" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex max-w-7xl mx-auto px-4 py-6">
        {/* Tarjetas Estilo Tinder - Área Principal */}
        <div className={`${isMobile ? 'w-full' : 'flex-1 mr-6'} flex justify-center`}>
          <div className="relative">
            <Card
              ref={cardRef}
              className={`w-80 h-[600px] md:w-96 md:h-[700px] relative overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl border-2 border-orange-200 transition-transform duration-200 ${
                isDragging ? 'scale-105' : 'hover:scale-102'
              }`}
              style={{
                transform: `translate(${dragCurrent.x}px, ${dragCurrent.y}px) rotate(${dragCurrent.x * 0.1}deg)`,
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <div className="relative h-full">
                {/* Imagen Principal */}
                <div className="h-3/5 relative overflow-hidden">
                  <img
                    src={currentItem.image}
                    alt={currentItem.name || currentItem.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Botones de Acción Sobrepuestos (estilo TikTok) */}
                  <div className="absolute right-3 bottom-3 flex flex-col gap-3">
                    <Button
                      onClick={handleLike}
                      size="icon"
                      className="w-12 h-12 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 rounded-full shadow-lg"
                    >
                      <Heart className="w-6 h-6" />
                    </Button>
                    <div className="text-white text-sm font-medium text-center">
                      {currentItem.likes || (currentItem as any).attendees || 0}
                    </div>
                    
                    <Button
                      onClick={handleBookmark}
                      size="icon"
                      className="w-12 h-12 bg-white/90 hover:bg-white text-orange-500 hover:text-orange-600 rounded-full shadow-lg"
                    >
                      <Bookmark className="w-6 h-6" />
                    </Button>
                    <div className="text-white text-sm font-medium text-center">
                      {currentItem.favorites || Math.floor(Math.random() * 100)}
                    </div>

                    <Button
                      size="icon"
                      className="w-12 h-12 bg-white/90 hover:bg-white text-blue-500 hover:text-blue-600 rounded-full shadow-lg"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </Button>
                  </div>
                </div>

                {/* Información de la Tarjeta */}
                <CardContent className="h-2/5 p-6 bg-gradient-to-t from-white to-orange-50">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {currentItem.name || currentItem.title}
                    </h3>
                    {currentItem.rating && (
                      <div className="flex items-center gap-1 text-orange-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">{currentItem.rating}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      {currentItem.category || currentItem.type}
                    </Badge>
                    {(currentItem as any).type && (
                      <Badge variant="outline" className="text-gray-600">
                        {(currentItem as any).type}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{currentItem.city}</span>
                  </div>

                  {currentItem.price && (
                    <div className="text-lg font-bold text-orange-600 mb-3">
                      €{currentItem.price}
                    </div>
                  )}

                  {(currentItem as any).date && (
                    <div className="flex items-center gap-1 text-gray-600 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{(currentItem as any).date}</span>
                    </div>
                  )}

                  <p className="text-sm text-gray-700 line-clamp-3">
                    {currentItem.description}
                  </p>

                  {/* Indicador de tarjetas */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {currentData.slice(0, 5).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentIndex % 5 ? 'bg-orange-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>

        {/* Filtros Desktop */}
        {!isMobile && (
          <div className="w-80 bg-white rounded-xl p-6 h-fit sticky top-24 shadow-lg border border-orange-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Filtros Avanzados</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Ciudad</label>
                <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madrid">Madrid</SelectItem>
                    <SelectItem value="barcelona">Barcelona</SelectItem>
                    <SelectItem value="valencia">Valencia</SelectItem>
                    <SelectItem value="sevilla">Sevilla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Categoría</label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="musica">Música</SelectItem>
                    <SelectItem value="danza">Danza</SelectItem>
                    <SelectItem value="teatro">Teatro</SelectItem>
                    <SelectItem value="arte">Arte Visual</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Rango de Precio: €{filters.priceRange[0]} - €{filters.priceRange[1]}
                </label>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                  max={1000}
                  step={50}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Rating Mínimo: {filters.rating}★
                </label>
                <Slider
                  value={[filters.rating]}
                  onValueChange={(value) => setFilters({ ...filters, rating: value[0] })}
                  max={5}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Filtros Mobile */}
      <Dialog open={showFilters && isMobile} onOpenChange={setShowFilters}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Filtros Avanzados</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Ciudad</label>
              <Select value={filters.city} onValueChange={(value) => setFilters({ ...filters, city: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar ciudad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="madrid">Madrid</SelectItem>
                  <SelectItem value="barcelona">Barcelona</SelectItem>
                  <SelectItem value="valencia">Valencia</SelectItem>
                  <SelectItem value="sevilla">Sevilla</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Categoría</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="musica">Música</SelectItem>
                  <SelectItem value="danza">Danza</SelectItem>
                  <SelectItem value="teatro">Teatro</SelectItem>
                  <SelectItem value="arte">Arte Visual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Rango de Precio: €{filters.priceRange[0]} - €{filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
                max={1000}
                step={50}
                className="w-full"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}