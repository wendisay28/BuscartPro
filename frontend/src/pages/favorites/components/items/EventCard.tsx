import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Users, Eye } from "lucide-react";

interface EventCardProps {
  event: any;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function EventCard({ 
  event, 
  isSelected, 
  onToggleSelect, 
  onToggleFavorite 
}: EventCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Checkbox 
          id={`compare-${event.id}`}
          checked={isSelected} 
          onCheckedChange={() => onToggleSelect(event.id)}
          className="absolute top-2 left-2 h-5 w-5 border-2 border-white bg-black/60 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
        />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          <Badge className="bg-black/60 hover:bg-[#bb00aa] text-white text-xs px-2 py-1 rounded-full transition-colors duration-300">
            {event.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{event.title}</h3>
            {event.mode && (
              <Badge 
                variant="outline" 
                className={`text-xs mt-1 ${event.mode.toLowerCase() === 'online' ? 'border-blue-500 text-blue-400' : 'border-green-500 text-green-400'}`}
              >
                {event.mode.toLowerCase() === 'online' ? 'En línea' : 'Presencial'}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{event.attendees} asistentes</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 min-h-[2.5rem]">
          {event.description}
        </p>
        <div className="flex items-end justify-between pt-2 mt-auto">
          <div className="flex flex-col min-h-[3rem] justify-center">
            <span className="text-xs text-gray-400">Precio</span>
            {event.price === 0 || (typeof event.price === 'object' && event.price?.type === 'free') ? (
              <span className="text-base font-bold text-[#00bb00]">Entrada Libre</span>
            ) : typeof event.price === 'object' ? (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-[#bb00aa]">
                  ${(event.price?.value * 1000).toLocaleString('es-CO', { 
                    style: 'decimal', 
                    maximumFractionDigits: 0 
                  })}
                </span>
                {event.price?.type === 'hourly' && (
                  <span className="text-xs text-gray-400 ml-1">/hora</span>
                )}
                {event.price?.type === 'ticket' && (
                  <span className="text-xs text-gray-400 ml-1">por entrada</span>
                )}
              </div>
            ) : (
              <div className="flex items-baseline">
                <span className="text-lg font-bold text-[#bb00aa]">
                  ${(event.price * 1000).toLocaleString('es-CO', { 
                    style: 'decimal', 
                    maximumFractionDigits: 0 
                  })}
                </span>
                {event.priceType === 'hourly' && (
                  <span className="text-xs text-gray-400 ml-1">/hora</span>
                )}
                {event.priceType === 'ticket' && (
                  <span className="text-xs text-gray-400 ml-1">por entrada</span>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-9 w-9 bg-gray-800 hover:bg-gray-700 text-white hover:text-red-400 rounded-full"
              onClick={() => onToggleFavorite(event.id)}
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