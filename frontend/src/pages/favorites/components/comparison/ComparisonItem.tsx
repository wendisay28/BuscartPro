import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Clock, Music, Calendar, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonItemProps {
  item: any;
  type: string;
}

export function ComparisonItem({ item, type }: ComparisonItemProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price * 1000);
  };

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />;
          }
          if (i === fullStars && hasHalfStar) {
            return <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />;
          }
          return <Star key={i} className="w-4 h-4 text-gray-300" />;
        })}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Card className="h-full flex flex-col border border-gray-200 hover:shadow-md transition-shadow">
      <div className="relative group">
        <img 
          src={item.image} 
          alt={item.name || item.title} 
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-end p-4">
          <span className="text-white text-sm font-medium">Ver perfil</span>
        </div>
      </div>
      
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold text-gray-900 line-clamp-1">
            {item.name || item.title}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs font-medium px-2 py-0.5",
              item.availability === "Disponible" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : "bg-red-50 text-red-700 border-red-200"
            )}
          >
            {item.availability}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500">
          {item.category} • {item.type}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 pt-0 flex-1 flex flex-col">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{item.city}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{item.experience || '5+ años de experiencia'}</span>
          </div>
          
          {item.genre && (
            <div className="flex items-center gap-2 text-sm">
              <Music className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{item.genre}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-700">{item.members || '1'} miembro{item.members !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="pt-2">
            {renderRating(item.rating || 0)}
          </div>
          
          <div className="pt-2">
            <div className="text-xs text-gray-500">Precio por hora</div>
            <div className="text-lg font-bold text-[#9b0089]">{formatPrice(item.price || 0)}</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button 
            className={cn(
              "w-full py-2 px-4 rounded-lg font-medium transition-colors",
              item.availability === "Disponible"
                ? "bg-gradient-to-r from-[#9b0089] to-[#7a006c] text-white hover:from-[#89007a] hover:to-[#68005c]"
                : "bg-gray-100 text-gray-500 cursor-not-allowed"
            )}
            disabled={item.availability !== "Disponible"}
          >
            {item.availability === "Disponible" ? "Reservar ahora" : "No disponible"}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
