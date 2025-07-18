import { ArtistCard } from "../items/ArtistCard";

interface ArtistsTabProps {
  artists: any[];
  selectedForComparison: number[];
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function ArtistsTab({ 
  artists, 
  selectedForComparison, 
  onToggleSelect, 
  onToggleFavorite 
}: ArtistsTabProps) {
  if (artists.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay artistas en tus favoritos</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {artists.map(artist => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            isSelected={selectedForComparison.includes(artist.id)}
            onToggleSelect={onToggleSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
