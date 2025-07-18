import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";

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
    <Card className="relative overflow-hidden border border-gray-700 bg-gray-800 hover:border-[#bb00aa] transition-colors">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <CardTitle className="text-white text-xl">{event.title}</CardTitle>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {event.venue}, {event.city}
            </div>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onToggleFavorite(event.id)}
          >
            <Heart className={`w-5 h-5 ${event.isFavorite ? 'fill-[#bb00aa] text-[#bb00aa]' : 'text-white'}`} />
          </Button>
          
          <div className="absolute top-2 left-2 flex items-center space-x-1">
            <Checkbox 
              id={`compare-event-${event.id}`}
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(event.id)}
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center bg-[#1e1e1e] p-2 rounded-lg">
              <span className="text-sm font-medium text-white">{event.date.split(' ')[0]}</span>
              <span className="text-xs text-gray-400">{event.date.split(' ')[1]}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{event.time}</p>
              <p className="text-xs text-gray-400">{event.duration}</p>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-xs bg-[#1e1e1e] text-white">
            {event.category}
          </Badge>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            {event.price.type === 'free' ? (
              <p className="text-lg font-bold text-[#bb00aa]">Gratis</p>
            ) : event.price.type === 'ticket' ? (
              <p className="text-lg font-bold text-[#bb00aa]">
                ${event.price.amount.toLocaleString()}
                <span className="text-sm font-normal text-gray-400"> por entrada</span>
              </p>
            ) : (
              <p className="text-lg font-bold text-[#bb00aa]">
                Desde ${event.price.range.from.toLocaleString()}
                <span className="text-sm font-normal text-gray-400"> hasta </span>
                ${event.price.range.to.toLocaleString()}
              </p>
            )}
          </div>
          
          <Button 
            size="sm" 
            className="bg-[#bb00aa] hover:bg-[#9b0089]"
          >
            Ver más
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
