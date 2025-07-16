import { Artist } from "@/types/artist";
import { MapPin } from "lucide-react";

interface ArtistCardsProps {
  artist: Artist;
  onSelectArtist: (artist: Artist) => void;
}

export default function ArtistCards({ artist, onSelectArtist }: ArtistCardsProps) {
  const renderRating = () => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-400 text-xs mr-1">
          {Array(5).fill(0).map((_, i) => (
            <span key={i} className="inline-block">
              {i < Math.floor(artist.rating) ? '★' : '☆'}
            </span>
          ))}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          ({artist.rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden">
        <div className="p-2.5">
          {/* Primera fila: Nombre y rating */}
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-sm font-semibold text-gray-300">
              {artist.name}
            </h3>
            {renderRating()}
          </div>
          
          {/* Segunda fila: Distancia y precio */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
              <MapPin className="w-3 h-3 mr-1 text-gray-500" />
              {artist.distance.toFixed(1).replace('.', ',')} km
            </div>
            <div className="flex items-baseline">
              <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mr-0.5">desde</span>
              <span className="text-sm font-bold text-[#bb00aa] dark:text-[#cc00bb]">
                ${artist.pricePerHour.toLocaleString('es-CO')}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-0.5">/h</span>
            </div>
          </div>

          {/* Tercera fila: Géneros/Especialidades */}
          {(artist.genres?.length || artist.specialties?.length) && (
            <div className="mb-2.5">
              <div className="flex flex-wrap gap-1.5">
                {[...(artist.genres || []), ...(artist.specialties || [])]
                  .slice(0, 3)
                  .map((item, i) => (
                    <span 
                      key={i}
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-800 text-gray-300 hover:bg-gray-700"
                    >
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-2 mt-2">
            <button 
              onClick={() => onSelectArtist(artist)}
              className="flex-1 bg-transparent hover:bg-gray-800 border border-gray-600 text-gray-300 hover:text-white text-xs py-1.5 px-2 rounded-lg transition-colors font-medium"
            >
              Ver perfil
            </button>
            <button 
              onClick={() => onSelectArtist(artist)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs py-1.5 px-2 rounded-lg transition-colors font-medium"
            >
              Ofertar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
