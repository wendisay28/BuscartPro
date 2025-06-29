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
  Lightbulb,
  MapPin,
  Calendar,
  Reply,
  Clock
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface RecommendationCardProps {
  recommendation: any;
}

export default function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const [saveCount, setSaveCount] = useState(5);
  
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await apiRequest('DELETE', `/api/favorites/recommendation/${recommendation.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'recommendation',
          targetId: recommendation.id
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
        await apiRequest('DELETE', `/api/favorites/recommendation/${recommendation.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'recommendation',
          targetId: recommendation.id
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

  const handleRespond = () => {
    if (!isAuthenticated) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para responder",
      });
      return;
    }
    
    // TODO: Open response modal or navigate to detailed view
    toast({
      title: "Función próximamente",
      description: "La función de respuesta estará disponible pronto",
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: es 
    });
  };

  const getStatusColor = () => {
    if (!recommendation.isActive) return 'bg-gray-500';
    if (recommendation.responseCount > 0) return 'bg-green-500';
    return 'bg-yellow-500';
  };

  const getStatusText = () => {
    if (!recommendation.isActive) return 'Cerrada';
    if (recommendation.responseCount > 0) return 'Con respuestas';
    return 'Abierta';
  };

  const formatEstimatedDate = (date: string) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <CardContent className="p-5">
        {/* Header with user info */}
        <div className="flex items-start mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-3 flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-lg text-dark mb-1 line-clamp-2">
              {recommendation.title}
            </h3>
            <div className="flex items-center text-xs text-gray-500">
              <Avatar className="h-4 w-4 mr-1">
                <AvatarImage 
                  src={recommendation.author?.profileImageUrl} 
                  alt={`${recommendation.author?.firstName} ${recommendation.author?.lastName}`} 
                />
                <AvatarFallback className="text-xs">
                  {getInitials(recommendation.author?.firstName, recommendation.author?.lastName)}
                </AvatarFallback>
              </Avatar>
              <span className="mr-2">
                Por {recommendation.author?.firstName} {recommendation.author?.lastName}
              </span>
              <span>• {formatTimeAgo(recommendation.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center ml-3">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()} mr-1`}></div>
            <span className="text-xs text-gray-600">{getStatusText()}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {recommendation.description}
        </p>

        {/* Tags */}
        {recommendation.tags && recommendation.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {recommendation.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="space-y-2 mb-4">
          {recommendation.category && (
            <div className="flex items-center text-xs text-gray-600">
              <Badge variant="secondary" className="text-xs mr-2">
                {recommendation.category.name}
              </Badge>
            </div>
          )}
          
          {recommendation.city && (
            <div className="flex items-center text-xs text-gray-600">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{recommendation.city}</span>
            </div>
          )}
          
          {recommendation.estimatedDate && (
            <div className="flex items-center text-xs text-gray-600">
              <Calendar className="h-3 w-3 mr-1" />
              <span>Fecha estimada: {formatEstimatedDate(recommendation.estimatedDate)}</span>
            </div>
          )}
        </div>

        {/* Response count */}
        {recommendation.responseCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center text-sm text-green-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="font-medium">
                {recommendation.responseCount} {recommendation.responseCount === 1 ? 'respuesta' : 'respuestas'} recibida{recommendation.responseCount === 1 ? '' : 's'}
              </span>
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
              <span>{recommendation.responseCount || 0}</span>
            </button>
          </div>

          <Button 
            onClick={handleRespond}
            className="bg-primary hover:bg-primary/90 text-white"
            size="sm"
            disabled={!recommendation.isActive}
          >
            <Reply className="h-4 w-4 mr-1" />
            {recommendation.isActive ? 'Responder' : 'Cerrada'}
          </Button>
        </div>

        {/* Time remaining indicator */}
        {recommendation.isActive && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Solicitud activa</span>
              </div>
              <span>Publicado {formatTimeAgo(recommendation.createdAt)}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
