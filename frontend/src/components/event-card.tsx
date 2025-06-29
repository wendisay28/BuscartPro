import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Star, 
  MapPin, 
  Calendar,
  Clock,
  Ticket,
  Users,
  ExternalLink
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface EventCardProps {
  event: any;
}

export default function EventCard({ event }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(89);
  const [saveCount, setSaveCount] = useState(23);
  
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await apiRequest('DELETE', `/api/favorites/event/${event.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'event',
          targetId: event.id
        });
      }
    },
    onSuccess: () => {
      setIsLiked(!isLiked);
      setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el favorito",
        variant: "destructive",
      });
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isFavorited) {
        await apiRequest('DELETE', `/api/favorites/event/${event.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'event',
          targetId: event.id
        });
      }
    },
    onSuccess: () => {
      setIsFavorited(!isFavorited);
      setSaveCount(prev => isFavorited ? prev - 1 : prev + 1);
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo guardar en favoritos",
        variant: "destructive",
      });
    },
  });

  const handleLike = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para dar me gusta",
      });
      return;
    }
    likeMutation.mutate();
  };

  const handleSave = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para guardar favoritos",
      });
      return;
    }
    saveMutation.mutate();
  };

  const handleReserve = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para reservar",
      });
      return;
    }
    
    if (event.purchaseLink) {
      window.open(event.purchaseLink, '_blank');
    } else {
      toast({
        title: "Reserva exitosa",
        description: "Tu reserva ha sido confirmada",
      });
    }
  };

  const formatPrice = (price: string | number) => {
    if (!price || price === '0') return 'Gratis';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), "d 'de' MMMM, yyyy", { locale: es });
  };

  const formatTime = (date: string) => {
    return format(new Date(date), "h:mm a", { locale: es });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'gratuito':
        return 'bg-green-500';
      case 'pago':
        return 'bg-blue-500';
      case 'online':
        return 'bg-purple-500';
      default:
        return 'bg-accent';
    }
  };

  const getEventTypeText = (type: string) => {
    switch (type) {
      case 'gratuito':
        return 'Gratis';
      case 'pago':
        return 'De pago';
      case 'online':
        return 'Online';
      default:
        return 'Evento';
    }
  };

  const isEventPast = () => {
    return new Date(event.startDate) < new Date();
  };

  const getAvailableSpots = () => {
    if (!event.capacity) return null;
    const available = event.capacity - (event.attendeeCount || 0);
    return available;
  };

  const availableSpots = getAvailableSpots();

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="relative">
        {/* Event Image */}
        <div className="h-48 bg-gradient-to-br from-secondary via-accent to-primary flex items-center justify-center">
          {event.multimedia?.images?.[0] ? (
            <img 
              src={event.multimedia.images[0]} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white">
              <Calendar className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-75">Imagen del evento</p>
            </div>
          )}
        </div>
        
        {/* Event Type Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getEventTypeColor(event.eventType)} text-white`}>
            {getEventTypeText(event.eventType)}
          </Badge>
        </div>

        {/* Capacity Badge */}
        {availableSpots !== null && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className={`text-xs font-medium flex items-center gap-1 ${
              availableSpots > 10 ? 'text-green-600' : 
              availableSpots > 0 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              <Users className="h-3 w-3" />
              {availableSpots > 0 ? `${availableSpots} cupos` : 'Agotado'}
            </span>
          </div>
        )}

        {/* Past Event Overlay */}
        {isEventPast() && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-white">
              Evento Finalizado
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-dark mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600">
              {event.category?.name || 'Evento cultural'}
            </p>
            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{formatDate(event.startDate)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>{formatTime(event.startDate)}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-yellow-400 text-sm mb-1">
              <span className="mr-1">{event.rating || '4.7'}</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-xs text-gray-500">
              {event.totalReviews || 0} asistentes
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {event.description || 'Una experiencia cultural única que no te puedes perder.'}
        </p>

        {/* Location */}
        {event.location && (
          <div className="flex items-center text-xs text-gray-500 mb-3">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{event.location}</span>
            {event.city && <span className="ml-1">• {event.city}</span>}
          </div>
        )}

        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {event.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          {event.isOutdoor && (
            <Badge variant="secondary" className="text-xs">
              Al aire libre
            </Badge>
          )}
          {event.isAccessible && (
            <Badge variant="secondary" className="text-xs">
              Accesible
            </Badge>
          )}
          {event.requiresReservation && (
            <Badge variant="secondary" className="text-xs">
              Requiere reserva
            </Badge>
          )}
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(event.price)}
            </span>
            {event.price && parseFloat(event.price) > 0 && (
              <span className="text-sm text-gray-500">/entrada</span>
            )}
          </div>
          {event.organizer && (
            <div className="text-right">
              <p className="text-xs text-gray-600">Organizado por</p>
              <p className="text-sm font-medium">
                {event.organizer.firstName} {event.organizer.lastName}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm">
            <button 
              onClick={handleLike}
              className={`flex items-center transition-colors ${
                isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
              disabled={likeMutation.isPending}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{likeCount}</span>
            </button>
            
            <button 
              onClick={handleSave}
              className={`flex items-center transition-colors ${
                isFavorited ? 'text-primary' : 'text-gray-600 hover:text-primary'
              }`}
              disabled={saveMutation.isPending}
            >
              <Bookmark className={`h-4 w-4 mr-1 ${isFavorited ? 'fill-current' : ''}`} />
              <span>{saveCount}</span>
            </button>
            
            <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{event.totalReviews || 7}</span>
            </button>
          </div>

          <Button 
            onClick={handleReserve}
            className={`${
              event.eventType === 'pago' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-secondary hover:bg-secondary/90'
            } text-white`}
            size="sm"
            disabled={isEventPast() || (availableSpots !== null && availableSpots <= 0)}
          >
            {isEventPast() ? (
              'Finalizado'
            ) : availableSpots !== null && availableSpots <= 0 ? (
              'Agotado'
            ) : event.purchaseLink ? (
              <>
                <ExternalLink className="h-4 w-4 mr-1" />
                Comprar
              </>
            ) : (
              <>
                <Ticket className="h-4 w-4 mr-1" />
                Reservar
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
