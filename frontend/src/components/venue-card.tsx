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
  Clock,
  Phone,
  Globe,
  Calendar,
  Info,
  ExternalLink
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface VenueCardProps {
  venue: any;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(156);
  const [saveCount, setSaveCount] = useState(48);
  
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await apiRequest('DELETE', `/api/favorites/venue/${venue.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'venue',
          targetId: venue.id
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
        await apiRequest('DELETE', `/api/favorites/venue/${venue.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'venue',
          targetId: venue.id
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

  const handleContact = () => {
    if (venue.contact?.phone) {
      window.open(`tel:${venue.contact.phone}`, '_blank');
    } else if (venue.contact?.email) {
      window.open(`mailto:${venue.contact.email}`, '_blank');
    } else {
      toast({
        title: "Información de contacto",
        description: "Información de contacto disponible en el perfil completo",
      });
    }
  };

  const formatPrice = (price: string | number) => {
    if (!price) return 'Consultar precio';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const getVenueTypeColor = (type: string) => {
    switch (type) {
      case 'galeria':
        return 'bg-purple-500';
      case 'cafe_cultural':
        return 'bg-amber-500';
      case 'sala_conciertos':
        return 'bg-blue-500';
      case 'teatro':
        return 'bg-red-500';
      case 'centro_cultural':
        return 'bg-green-500';
      case 'auditorio':
        return 'bg-indigo-500';
      default:
        return 'bg-primary';
    }
  };

  const getVenueTypeText = (type: string) => {
    switch (type) {
      case 'galeria':
        return 'Galería';
      case 'cafe_cultural':
        return 'Café Cultural';
      case 'sala_conciertos':
        return 'Sala de Conciertos';
      case 'teatro':
        return 'Teatro';
      case 'centro_cultural':
        return 'Centro Cultural';
      case 'auditorio':
        return 'Auditorio';
      case 'salon_eventos':
        return 'Salón de Eventos';
      default:
        return 'Espacio Cultural';
    }
  };

  const formatOpeningHours = (hours: any) => {
    if (!hours) return 'Horarios no especificados';
    if (typeof hours === 'string') return hours;
    if (hours.general) return hours.general;
    return 'Consultar horarios';
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className="relative">
        {/* Venue Image */}
        <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
          {venue.multimedia?.images?.[0] ? (
            <img 
              src={venue.multimedia.images[0]} 
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white">
              <MapPin className="h-16 w-16 mx-auto mb-2 opacity-50" />
              <p className="text-sm opacity-75">Imagen del espacio</p>
            </div>
          )}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-green-600 flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Disponible
          </span>
        </div>
        
        {/* Venue Type Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className={`${getVenueTypeColor(venue.venueType)} text-white`}>
            {getVenueTypeText(venue.venueType)}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-heading font-semibold text-lg text-dark mb-1">
              {venue.name}
            </h3>
            <p className="text-sm text-gray-600">
              {getVenueTypeText(venue.venueType)}
            </p>
            <p className="text-xs text-gray-500 flex items-center mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="line-clamp-1">{venue.address || venue.city}</span>
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center text-yellow-400 text-sm mb-1">
              <span className="mr-1">{venue.rating || '4.6'}</span>
              <Star className="h-4 w-4 fill-current" />
            </div>
            <p className="text-xs text-gray-500">
              {venue.totalReviews || 0} reseñas
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {venue.description || 'Espacio versátil para eventos culturales y presentaciones artísticas.'}
        </p>

        {/* Services */}
        {venue.services && venue.services.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-600 mb-2">Servicios disponibles:</p>
            <div className="flex flex-wrap gap-1">
              {venue.services.slice(0, 3).map((service: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
              {venue.services.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{venue.services.length - 3} más
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Opening Hours */}
        <div className="flex items-center text-xs text-gray-500 mb-3">
          <Clock className="h-3 w-3 mr-1" />
          <span>{formatOpeningHours(venue.openingHours)}</span>
        </div>

        {/* Contact Info */}
        {venue.contact && (
          <div className="flex items-center space-x-3 text-xs text-gray-500 mb-4">
            {venue.contact.phone && (
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                <span>{venue.contact.phone}</span>
              </div>
            )}
            {venue.contact.website && (
              <div className="flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                <span>Sitio web</span>
              </div>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              {formatPrice(venue.dailyRate)}
            </span>
            {venue.dailyRate && (
              <span className="text-sm text-gray-500">/día</span>
            )}
          </div>
          {venue.owner && (
            <div className="text-right">
              <p className="text-xs text-gray-600">Administrado por</p>
              <p className="text-sm font-medium">
                {venue.owner.firstName} {venue.owner.lastName}
              </p>
            </div>
          )}
        </div>

        {/* Capacity and Features */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs">
          {venue.capacity && (
            <Badge variant="secondary" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              Capacidad: {venue.capacity}
            </Badge>
          )}
          {venue.hasParking && (
            <Badge variant="secondary" className="text-xs">
              Estacionamiento
            </Badge>
          )}
          {venue.hasSound && (
            <Badge variant="secondary" className="text-xs">
              Sistema de sonido
            </Badge>
          )}
          {venue.hasLighting && (
            <Badge variant="secondary" className="text-xs">
              Iluminación
            </Badge>
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
              <span>{venue.totalReviews || 31}</span>
            </button>
          </div>

          <div className="flex gap-2">
            {venue.contact?.website && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => window.open(venue.contact.website, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Web
              </Button>
            )}
            <Button 
              onClick={handleContact}
              className="bg-accent text-dark hover:bg-accent/90"
              size="sm"
            >
              <Info className="h-4 w-4 mr-1" />
              Contactar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
