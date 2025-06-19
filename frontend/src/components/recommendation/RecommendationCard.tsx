import { Heart, MessageCircle, MapPin, Calendar as CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface RecommendationCardProps {
  id: string;
  title: string;
  description: string;
  location?: string;
  date?: Date;
  category: string;
  tags?: string[];
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  likes: number;
  comments: number;
  isOwner?: boolean;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function RecommendationCard({
  id,
  title,
  description,
  location,
  date,
  category,
  tags = [],
  user,
  likes = 0,
  comments = 0,
  isOwner = false,
  onLike,
  onComment,
  onDelete,
}: RecommendationCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <User className="h-4 w-4 mr-1" />
              <span>{user.name}</span>
              {location && (
                <>
                  <span className="mx-2">•</span>
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{location}</span>
                </>
              )}
              {date && (
                <>
                  <span className="mx-2">•</span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{format(new Date(date), "d MMM yyyy", { locale: es })}</span>
                </>
              )}
            </div>
          </div>
          <Badge variant="outline" className="bg-orange-100 text-orange-800">
            {category}
          </Badge>
        </div>

        <p className="mt-3 text-foreground">{description}</p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onLike?.(id)}
            >
              <Heart className="h-4 w-4 mr-1" />
              <span>{likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => onComment?.(id)}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span>{comments}</span>
            </Button>
          </div>
          
          {isOwner && (
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive/90"
              onClick={() => onDelete?.(id)}
            >
              Eliminar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
