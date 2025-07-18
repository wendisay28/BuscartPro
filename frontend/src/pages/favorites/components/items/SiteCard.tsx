import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Star, Users } from "lucide-react";

interface SiteCardProps {
  site: any;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function SiteCard({ 
  site, 
  isSelected, 
  onToggleSelect, 
  onToggleFavorite 
}: SiteCardProps) {
  return (
    <Card className="relative overflow-hidden border border-gray-700 bg-gray-800 hover:border-[#bb00aa] transition-colors">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={site.image} 
            alt={site.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <CardTitle className="text-white text-xl">{site.name}</CardTitle>
            <div className="flex items-center text-gray-300 text-sm mt-1">
              <MapPin className="w-3 h-3 mr-1" />
              {site.location}
            </div>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onToggleFavorite(site.id)}
          >
            <Heart className={`w-5 h-5 ${site.isFavorite ? 'fill-[#bb00aa] text-[#bb00aa]' : 'text-white'}`} />
          </Button>
          
          <div className="absolute top-2 left-2 flex items-center space-x-1">
            <Checkbox 
              id={`compare-site-${site.id}`}
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(site.id)}
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-gray-300">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              {site.rating}
              <span className="text-gray-500 ml-1">({site.reviews} reseñas)</span>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-xs bg-[#1e1e1e] text-white">
            {site.category}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Users className="w-4 h-4 mr-2 text-gray-500" />
            Capacidad: {site.capacity} personas
          </div>
          <div className="flex items-center text-sm text-gray-400">
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            Área: {site.area} m²
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {site.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-[#bb00aa]">
              ${site.pricePerHour.toLocaleString()}
              <span className="text-sm font-normal text-gray-400">/hora</span>
            </p>
            <p className="text-xs text-gray-500">Mínimo {site.minimumHours} horas</p>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            className="bg-transparent border-[#bb00aa] text-[#bb00aa] hover:bg-[#bb00aa]/10 hover:border-[#bb00aa] hover:text-[#bb00aa]"
          >
            Ver disponibilidad
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
