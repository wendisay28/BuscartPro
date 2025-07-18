import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, MapPin, Star, Users, MessageCircle } from "lucide-react";

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
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={artist.image} 
          alt={artist.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {artist.verified && (
            <Badge className="bg-gray-400 hover:bg-gray-500 text-gray-900 text-xs px-2 py-0.5 rounded-full">
              Verificado
            </Badge>
          )}
          <Badge className={`text-xs px-2 py-0.5 rounded-full ${
            artist.availability === "Disponible" 
              ? "bg-[#bb00aa] hover:bg-[#a00090] text-white" 
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}>
            {artist.availability}
          </Badge>
        </div>
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full"
          onClick={() => onToggleFavorite(artist.id)}
        >
          <Heart className={`w-4 h-4 ${isSelected ? 'fill-red-500 text-red-500' : 'fill-current'}`} />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{artist.name}</h3>
            <p className="text-sm text-gray-400">{artist.type}</p>
          </div>
          <div className="flex items-center gap-1 bg-[#bb00aa]/10 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
            <span className="text-sm font-medium text-white">{artist.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{artist.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{artist.fans} fans</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 flex-1">
          {artist.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Desde</span>
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-[#bb00aa]">
                ${(artist.price * 1000).toLocaleString('es-CO', { 
                  style: 'decimal', 
                  maximumFractionDigits: 0 
                })}
              </span>
              <span className="text-xs text-gray-400 ml-1">/hora</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${artist.id}`}
              checked={isSelected} 
              onCheckedChange={() => onToggleSelect(artist.id)}
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button 
              size="sm" 
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}