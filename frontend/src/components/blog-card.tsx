import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  BookOpen,
  Clock,
  User
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface Author {
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
  userType?: 'artist' | 'company' | 'member';
  isVerified?: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  category: string;
  tags?: string[];
  publishedAt?: string;
  createdAt: string;
  likeCount?: number;
  commentCount?: number;
  visibility?: 'public' | 'followers' | 'collaborators';
  author?: Author;
}

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 45);
  const [saveCount, setSaveCount] = useState(12);
  
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await apiRequest('DELETE', `/api/favorites/blog_post/${post.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'blog_post',
          targetId: post.id
        });
      }
    },
    onSuccess: () => {
      setIsLiked(!isLiked);
      setLikeCount((prev: number) => isLiked ? prev - 1 : prev + 1);
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
        await apiRequest('DELETE', `/api/favorites/blog_post/${post.id}`);
      } else {
        await apiRequest('POST', '/api/favorites', {
          targetType: 'blog_post',
          targetId: post.id
        });
      }
    },
    onSuccess: () => {
      setIsFavorited(!isFavorited);
      setSaveCount((prev: number) => isFavorited ? prev - 1 : prev + 1);
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

  const handleReadMore = () => {
    toast({
      title: "Función próximamente",
      description: "La vista completa del artículo estará disponible pronto",
    });
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'A';
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { 
      addSuffix: true,
      locale: es 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'inspiracion':
        return 'bg-purple-500';
      case 'tecnica':
        return 'bg-blue-500';
      case 'reflexion':
        return 'bg-green-500';
      case 'convocatoria':
        return 'bg-red-500';
      case 'experiencia':
        return 'bg-yellow-500';
      case 'tutorial':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'inspiracion':
        return 'Inspiración';
      case 'tecnica':
        return 'Técnica';
      case 'reflexion':
        return 'Reflexión';
      case 'convocatoria':
        return 'Convocatoria';
      case 'experiencia':
        return 'Experiencia';
      case 'tutorial':
        return 'Tutorial';
      default:
        return 'Blog';
    }
  };

  const getReadingTime = (content?: string) => {
    if (!content) return '2 min';
    const words = content.split(' ').length;
    const readingTime = Math.ceil(words / 200);
    return `${readingTime} min`;
  };

  return (
    <Card className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative h-48">
          <img 
            src={post.featuredImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3">
            <Badge className={`${getCategoryColor(post.category)} text-white`}>
              {getCategoryText(post.category)}
            </Badge>
          </div>
        </div>
      )}

      {/* No featured image fallback */}
      {!post.featuredImage && (
        <div className="relative h-32 bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-white opacity-50" />
          <div className="absolute bottom-3 left-3">
            <Badge className={`${getCategoryColor(post.category)} text-white`}>
              {getCategoryText(post.category)}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className="p-5">
        {/* Author info */}
        <div className="flex items-center mb-3">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage 
              src={post.author?.profileImageUrl} 
              alt={`${post.author?.firstName} ${post.author?.lastName}`} 
            />
            <AvatarFallback className="text-sm">
              {getInitials(post.author?.firstName, post.author?.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm text-gray-500">
            <span className="font-medium text-dark">
              {post.author?.firstName} {post.author?.lastName}
            </span>
            <span className="mx-1">•</span>
            <span>{formatTimeAgo(post.publishedAt || post.createdAt)}</span>
            <span className="mx-1">•</span>
            <span>{getReadingTime(post.content)} lectura</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl text-dark mb-3 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
          {post.excerpt || 
           post.content?.substring(0, 150) + '...' || 
           'Un artículo interesante sobre arte y cultura que no te puedes perder.'}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} más
              </Badge>
            )}
          </div>
        )}

        {/* Reading time and stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{getReadingTime(post.content)} de lectura</span>
            </div>
            {post.visibility && post.visibility !== 'public' && (
              <Badge variant="outline" className="text-xs">
                {post.visibility === 'followers' ? 'Solo seguidores' : 'Colaboradores'}
              </Badge>
            )}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES')}
          </div>
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
              <span>{post.commentCount || 6}</span>
            </button>
          </div>

          <Button 
            onClick={handleReadMore}
            className="bg-dark hover:bg-dark/90 text-white"
            size="sm"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            Leer Más
          </Button>
        </div>

        {/* Author type indicator */}
        {post.author && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span>
                  {post.author.userType === 'artist' ? 'Artista' : 
                   post.author.userType === 'company' ? 'Empresa' : 'Miembro'} de la comunidad
                </span>
              </div>
              {post.author.isVerified && (
                <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                  ✓ Verificado
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}