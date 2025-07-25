import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { SuggestedArtist } from "../../types";

type SuggestedArtistsProps = {
  artists?: SuggestedArtist[];
};

export const SuggestedArtists = ({ 
  artists = [] 
}: SuggestedArtistsProps) => {
  // Datos de ejemplo en caso de que no se proporcionen artistas
  const defaultArtists: SuggestedArtist[] = [
    { id: '1', name: 'Ana Rodríguez', role: 'Bailarina', location: 'Medellín' },
    { id: '2', name: 'Carlos Pérez', role: 'Pintor', location: 'Bogotá' },
    { id: '3', name: 'María Gómez', role: 'Músico', location: 'Cali' },
  ];

  const displayArtists = artists.length > 0 ? artists : defaultArtists;

  return (
    <Card className="bg-gray-900 border border-gray-800 w-full">
      <CardHeader>
        <CardTitle className="text-lg text-white">Artistas Sugeridos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayArtists.map((artist) => (
          <div key={artist.id} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex-shrink-0">
              {/* Aquí iría la imagen del artista si estuviera disponible */}
              <span className="w-full h-full flex items-center justify-center text-white font-bold">
                {artist.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-white truncate">
                {artist.name}
              </h4>
              <p className="text-xs text-gray-400 truncate">{artist.role}</p>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <MapPin className="h-3 w-3 mr-1 text-white" />
                <span>{artist.location}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-gray-700 hover:bg-[#bb00aa] hover:text-white whitespace-nowrap"
            >
              Seguir
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
