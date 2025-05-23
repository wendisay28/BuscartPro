import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Star, 
  MapPin, 
  Send,
  Users,
  CheckCircle
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import RealTimeHiringModal from "./real-time-hiring-modal";

interface ArtistCardProps {
  artist: any;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showHiringModal, setShowHiringModal] = useState(false);
  const [likeCount, setLikeCount] = useState(artist.fanCount || 127);
  const [saveCount, setSaveCount] = useState(34);
  
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await apiRequest('DELETE', `/api/favorites/artist/${artist.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'artist',
          targetId: artist.id
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
        await apiRequest('DELETE', `/api/favorites/artist/${artist.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'artist',
          targetId: artist.id
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

  const handleMakeOffer = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para hacer ofertas",
      });
      return;
    }
    setShowHiringModal(true);
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
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

  const getAvailabilityStatus = () => {
    if (artist.isAvailable) {
      return { text: "Disponible", className: "text-green-600", dot: "bg-green-500" };
    }
    return { text: "Ocupado", className: "text-yellow-600", dot: "bg-yellow-500" };
  };

  const availability = getAvailabilityStatus();

  return (
    <>
      <Card className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
        <div className="relative">
          {/* Artist Image/Avatar */}
          <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
            {artist.portfolio?.images?.[0] ? (
              <img 
                src={artist.portfolio.images[0]} 
                alt={artist.artistName}
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar className="w-24 h-24">
                <AvatarImage src={artist.user?.profileImageUrl} alt={artist.artistName} />
                <AvatarFallback className="text-2xl bg-white/20 text-white">
                  {getInitials(artist.artistName)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
          
          {/* Availability Badge */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <span className={`text-xs font-medium flex items-center gap-1 ${availability.className}`}>
              <div className={`w-2 h-2 rounded-full ${availability.dot}`}></div>
              {availability.text}
            </span>
          </div>
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-primary text-white">
              {artist.category?.name || 'Artista'}
            </Badge>
          </div>

          {/* Verified Badge */}
          {artist.user?.isVerified && (
            <div className="absolute bottom-3 right-3">
              <Badge variant="outline" className="bg-white text-green-600 border-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verificado
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg text-dark mb-1">
                {artist.artistName}
              </h3>
              <p className="text-sm text-gray-600">
                {artist.subcategories?.[0] || artist.category?.name || 'Artista'}
              </p>
              <p className="text-xs text-gray-500 flex items-center mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{artist.user?.city || 'Ciudad no especificada'}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-400 text-sm mb-1">
                <span className="mr-1">{artist.rating || '4.8'}</span>
                <Star className="h-4 w-4 fill-current" />
              </div>
              <p className="text-xs text-gray-500">
                {artist.totalReviews || 0} reseñas
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-4 line-clamp-2">
            {artist.description || 'Artista profesional con experiencia en diversos eventos y presentaciones.'}
          </p>

          {/* Tags */}
          {artist.tags && artist.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {artist.tags.slice(0, 3).map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-2xl font-bold text-primary">
                {formatPrice(artist.pricePerHour)}
              </span>
              {artist.pricePerHour && (
                <span className="text-sm text-gray-500">/hora</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {artist.artistType && (
                <Badge variant="secondary" className="text-xs">
                  <Users className="h-3 w-3 mr-1" />
                  {artist.artistType}
                </Badge>
              )}
            </div>
          </div>

          {/* Service Types */}
          {artist.serviceTypes && artist.serviceTypes.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-600 mb-1">Servicios:</p>
              <div className="flex flex-wrap gap-1">
                {artist.serviceTypes.slice(0, 2).map((service: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {service}
                  </Badge>
                ))}
                {artist.serviceTypes.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{artist.serviceTypes.length - 2} más
                  </Badge>
                )}
              </div>
            </div>
          )}

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
                <span>{artist.totalReviews || 12}</span>
              </button>
            </div>

            <Button 
              onClick={handleMakeOffer}
              className="bg-primary hover:bg-primary/90 text-white"
              size="sm"
              disabled={!artist.isAvailable}
            >
              <Send className="h-4 w-4 mr-1" />
              {artist.isAvailable ? 'Hacer Oferta' : 'No Disponible'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <RealTimeHiringModal
        open={showHiringModal}
        onOpenChange={setShowHiringModal}
        artist={artist}
      />
    </>
  );
}
