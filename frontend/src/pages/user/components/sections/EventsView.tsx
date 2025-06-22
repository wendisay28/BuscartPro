import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, Plus, Edit, ExternalLink, Video, Globe } from "lucide-react";

type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'workshop' | 'exhibition' | 'conference' | 'webinar' | 'other';
  attendees: number;
  maxAttendees: number;
  price: number;
  image: string;
  status: 'upcoming' | 'completed' | 'attending';
  rating?: number;
  feedback?: number;
  isOnline?: boolean;
  platform?: string;
};

const myEvents: EventType[] = [
  {
    id: 1,
    title: "Workshop: Ilustración Digital Avanzada",
    description: "Taller intensivo sobre técnicas avanzadas de ilustración digital y concept art",
    date: "2024-12-25",
    time: "10:00 AM",
    location: "Centro Cultural Arte Digital",
    type: "workshop",
    attendees: 15,
    maxAttendees: 20,
    price: 150000,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Exposición: Arte Digital Contemporáneo",
    description: "Muestra de mis últimas obras junto a otros artistas digitales emergentes",
    date: "2024-12-30",
    time: "6:00 PM",
    location: "Galería Arte Moderno",
    type: "exhibition",
    attendees: 45,
    maxAttendees: 100,
    price: 0,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    status: "upcoming"
  }
];

const attendingEvents: EventType[] = [
  {
    id: 3,
    title: "Webinar: Marketing Digital para Artistas",
    description: "Aprende a promocionar tu arte en redes sociales y plataformas digitales",
    date: "2024-07-15",
    time: "7:00 PM",
    location: "Online",
    type: "webinar",
    attendees: 120,
    maxAttendees: 500,
    price: 0,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    status: "attending",
    isOnline: true,
    platform: "Zoom"
  },
  {
    id: 4,
    title: "Taller de Pintura Digital Avanzada",
    description: "Domina las técnicas avanzadas de pintura digital con profesionales de la industria",
    date: "2024-08-05",
    time: "5:00 PM",
    location: "Online",
    type: "workshop",
    attendees: 85,
    maxAttendees: 100,
    price: 250000,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", // Imagen de pintura digital
    status: "attending",
    isOnline: true,
    platform: "Google Meet"
  },
  {
    id: 5,
    title: "Conferencia: Inteligencia Artificial en el Arte",
    description: "Explora cómo la IA está transformando la creación artística contemporánea",
    date: "2024-09-10",
    time: "6:30 PM",
    location: "Online",
    type: "conference",
    attendees: 320,
    maxAttendees: 1000,
    price: 50000,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400", // Imagen de IA y arte
    status: "attending",
    isOnline: true,
    platform: "Microsoft Teams"
  }
];

const pastEvents: EventType[] = [
  {
    id: 6,
    title: "Conferencia: El Futuro del Arte Digital",
    description: "Charla sobre tendencias y tecnologías emergentes en el arte digital",
    date: "2024-12-10",
    time: "7:00 PM",
    location: "Universidad de Artes",
    type: "conference",
    attendees: 80,
    maxAttendees: 80,
    price: 25,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    status: "completed",
    rating: 4.8,
    feedback: 12
  },
  {
    id: 7,
    title: "Taller de Iniciación al Arte Digital",
    description: "Introducción a las herramientas básicas para comenzar en el mundo del arte digital",
    date: "2024-05-15",
    time: "4:00 PM",
    location: "Centro Cultural Digital",
    type: "workshop",
    attendees: 25,
    maxAttendees: 30,
    price: 50000,
    image: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
    status: "completed",
    rating: 4.5,
    feedback: 18
  }
];

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'workshop':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'exhibition':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'conference':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const getEventTypeLabel = (type: string) => {
  switch (type) {
    case 'workshop': return 'Taller';
    case 'exhibition': return 'Exposición';
    case 'conference': return 'Conferencia';
    case 'webinar': return 'Webinar';
    default: return 'Evento';
  }
};

type EventsViewProps = {
  onCreate: () => void;
};

export function EventsView({ onCreate }: EventsViewProps) {
  return (
    <div className="bg-black w-full">
      <div className="border-t border-gray-700 w-full mt-2"></div>
      <Tabs defaultValue="my-events" className="w-full px-4 md:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-full md:w-1/2 grid-cols-2 bg-[#141b2a] p-1 rounded-xl border border-gray-700">
            <TabsTrigger 
              value="my-events" 
              className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors"
            >
              Mis Eventos ({myEvents.length})
            </TabsTrigger>
            <TabsTrigger 
              value="attending"
              className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors"
            >
              Asistiré ({attendingEvents.length})
            </TabsTrigger>
          </TabsList>
          <Button className="bg-[#e74f05] hover:bg-[#e74f05]/90 hidden md:flex" onClick={onCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Crear Evento
          </Button>
        </div>
        
        {/* Botón flotante para móviles */}
        <div className="md:hidden fixed bottom-6 right-6 z-10">
          <Button 
            className="rounded-full w-14 h-14 p-0 bg-[#e74f05] hover:bg-[#e74f05]/90 shadow-lg"
            onClick={onCreate}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        <TabsContent value="my-events" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Próximos Eventos</h3>
            <div className="space-y-4">
              {myEvents.filter(e => e.status === 'upcoming').map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Eventos Pasados</h3>
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attending" className="space-y-4">
          {attendingEvents.map((event) => (
            <EventCard key={event.id} event={event} isAttending />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

const EventCard = ({ event, isPast = false, isAttending = false }: { event: EventType, isPast?: boolean, isAttending?: boolean }) => (
  <Card className="overflow-hidden hover:border-[#e74f05] transition-colors bg-[#141b2a] border border-gray-700">
    <div className="md:flex">
      <div className={`w-full md:w-48 h-48 overflow-hidden relative flex-shrink-0 ${isAttending ? 'mt-8 ml-4' : 'm-4'} flex items-center`}>
        <img 
          src={event.image}
          alt={event.title}
          className={`w-full h-full object-cover border border-gray-700 ${isAttending ? 'rounded-2xl' : 'rounded-lg'}`}
        />
        {event.isOnline && (
          <div className="absolute top-2 left-2 bg-[#e74f05] text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Video className="w-3 h-3 mr-1" />
            Online
          </div>
        )}
      </div>
      <CardContent className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <Badge className={getEventTypeColor(event.type)}>
              {getEventTypeLabel(event.type)}
            </Badge>
            {event.price > 0 ? (
              <Badge className="bg-[#e74f05] text-white border-transparent">
                ${event.price.toLocaleString()}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-green-400 border-green-500/30">
                Gratis
              </Badge>
            )}
          </div>
          <div className="flex space-x-2">
            {!isAttending && (
              <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05]">
                <Edit className="w-4 h-4" />
              </Button>
            )}
            <Button size="sm" variant="outline" className="text-white border-gray-600 hover:bg-[#e74f05] hover:border-[#e74f05]">
              {isAttending ? <Globe className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <h3 className="font-semibold text-white mb-2">{event.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{event.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-400">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            {event.time}
          </div>
          <div className="flex items-center text-gray-400">
            {event.isOnline ? (
              <>
                <Globe className="w-4 h-4 mr-2" />
                {event.platform}
              </>
            ) : (
              <>
                <MapPin className="w-4 h-4 mr-2" />
                {event.location}
              </>
            )}
          </div>
          <div className="flex items-center text-gray-400">
            <Users className="w-4 h-4 mr-2" />
            {event.attendees}/{event.maxAttendees} asistentes
          </div>
        </div>
        
        {isPast && event.rating && (
          <div className="mt-3 flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-400">
              {event.rating} ({event.feedback} reseñas)
            </span>
          </div>
        )}
        
        {isAttending && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <Button className="w-full bg-black hover:bg-[#e74f05] border border-gray-700 hover:border-[#e74f05] transition-colors">
              {event.isOnline ? 'Unirme ahora' : 'Ver detalles'}
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  </Card>
);
