
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Bookmark, MapPin, Calendar, Star } from "lucide-react";

interface ContentCardProps {
  item: any;
  onLike: () => void;
  onBookmark: () => void;
}

export function ContentCard({ item, onLike, onBookmark }: ContentCardProps) {
  return (
    <Card className="w-80 h-[600px] md:w-96 md:h-[700px] relative overflow-hidden shadow-2xl border-2 border-orange-200">
      <div className="relative h-full">
        <div className="h-3/5 relative overflow-hidden">
          <img
            src={item.image}
            alt={item.name || item.title}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute right-3 bottom-3 flex flex-col gap-3">
            <Button
              onClick={onLike}
              size="icon"
              className="w-12 h-12 bg-white/90 hover:bg-white text-red-500 hover:text-red-600 rounded-full shadow-lg"
            >
              <Heart className="w-6 h-6" />
            </Button>
            <div className="text-white text-sm font-medium text-center">
              {item.likes || 0}
            </div>
            
            <Button
              onClick={onBookmark}
              size="icon"
              className="w-12 h-12 bg-white/90 hover:bg-white text-orange-500 hover:text-orange-600 rounded-full shadow-lg"
            >
              <Bookmark className="w-6 h-6" />
            </Button>
            <div className="text-white text-sm font-medium text-center">
              {item.favorites || Math.floor(Math.random() * 100)}
            </div>

            <Button
              size="icon"
              className="w-12 h-12 bg-white/90 hover:bg-white text-blue-500 hover:text-blue-600 rounded-full shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        </div>

        <CardContent className="h-2/5 p-6 bg-gradient-to-t from-white to-orange-50">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
              {item.name || item.title}
            </h3>
            {item.rating && (
              <div className="flex items-center gap-1 text-orange-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              {item.category || item.type}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{item.city}</span>
          </div>

          {item.date && (
            <div className="flex items-center gap-1 text-gray-600 mb-3">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{item.date}</span>
            </div>
          )}

          <p className="text-sm text-gray-700 line-clamp-3">
            {item.description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
