import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Star, MapPin, Users, MessageCircle } from "lucide-react";

interface ArtistCardProps {
  artist: any;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function ArtistCard({ 
  artist, 
  isSelected, 
  onToggleSelect, 
  onToggleFavorite 
}: ArtistCardProps) {
  return (
    <Card className="relative overflow-hidden border border-gray-700 bg-gray-800 hover:border-[#bb00aa] transition-colors">
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={artist.image} 
            alt={artist.name}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full">
            <div className="flex justify-between items-end">
              <div>
                <CardTitle className="text-white text-xl">{artist.name}</CardTitle>
                <p className="text-gray-300 text-sm flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> {artist.city}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{artist.rating}</span>
              </div>
            </div>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onToggleFavorite(artist.id)}
          >
            <Heart className={`w-5 h-5 ${artist.isFavorite ? 'fill-[#bb00aa] text-[#bb00aa]' : 'text-white'}`} />
          </Button>
          
          <div className="absolute top-2 left-2 flex items-center space-x-1">
            <Checkbox 
              id={`compare-${artist.id}`}
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(artist.id)}
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Badge variant="secondary" className="text-xs bg-[#1e1e1e] text-white">
            {artist.category}
          </Badge>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-sm text-gray-400">
              <Users className="w-4 h-4 mr-1" />
              {artist.fans} fans
            </div>
            <Badge className={`text-xs px-2 py-0.5 rounded-full ${
              artist.availability === "Disponible" 
                ? "bg-[#bb00aa] hover:bg-[#a00090] text-white" 
                : "bg-gray-600 text-white"
            }`}>
              {artist.availability}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {artist.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-[#bb00aa]">
              ${(artist.price * 1000).toLocaleString()}
              <span className="text-sm font-normal text-gray-400">/hora</span>
            </p>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            className="bg-transparent border-[#bb00aa] text-[#bb00aa] hover:bg-[#bb00aa]/10 hover:border-[#bb00aa] hover:text-[#bb00aa]"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contactar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
