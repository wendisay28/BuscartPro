import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Users, Eye, Star } from "lucide-react";

interface GalleryCardProps {
  item: any;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function GalleryCard({ 
  item, 
  isSelected, 
  onToggleSelect, 
  onToggleFavorite 
}: GalleryCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Checkbox 
          id={`gallery-${item.id}`}
          checked={isSelected} 
          onCheckedChange={() => onToggleSelect(item.id)}
          className="absolute top-2 left-2 h-5 w-5 border-2 border-white bg-black/60 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
        />
        <Badge className="absolute top-2 right-2 bg-black/60 hover:bg-[#bb00aa] text-white text-xs px-2 py-1 rounded-full transition-colors duration-300">
          {item.type}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 
              className="font-bold text-white text-base truncate" 
              title={item.title}
            >
              {item.title}
            </h3>
            <p 
              className="text-sm text-gray-400" 
              title={item.artist}
            >
              {item.artist}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[120px]">{item.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{item.sales} ventas</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 min-h-[2.5rem]">
          {item.description}
        </p>
        <div className="flex items-end justify-between pt-2 mt-auto">
          <div className="flex flex-col min-h-[3rem] justify-center">
            <span className="text-xs text-gray-400">Precio</span>
            {item.price > 0 ? (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-[#bb00aa]">
                  ${(item.price * 1000).toLocaleString('es-CO', { 
                    style: 'decimal', 
                    maximumFractionDigits: 0 
                  })}
                </span>
                {item.priceType === 'hourly' && (
                  <span className="text-xs text-gray-400 ml-1">/hora</span>
                )}
              </div>
            ) : (
              <span className="text-base font-bold text-[#00bb00]">Entrada Libre</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-9 w-9 bg-gray-800 hover:bg-gray-700 text-white hover:text-red-400 rounded-full"
              onClick={() => onToggleFavorite(item.id)}
            >
              <Heart className={`w-4 h-4 ${isSelected ? 'fill-red-500 text-red-500' : 'fill-current'}`} />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>Detalle</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}