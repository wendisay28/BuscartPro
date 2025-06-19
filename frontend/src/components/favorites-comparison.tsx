import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  Users, 
  X,
  Send,
  Eye
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import RealTimeHiringModal from "./real-time-hiring-modal";

// Tipos para mayor claridad y validación
interface Artist {
  id: string;
  artistName: string;
  firstName: string;
  lastName: string;
  fanCount?: number;
  description?: string;
  pricePerHour: number;
  isAvailable?: boolean;
  rating?: number;
  totalReviews?: number;
  artistType?: string;
  categoryId: string;
  category: {
    name: string;
  };
  user: {
    firstName: string;
    lastName: string;
    city: string;
    profileImageUrl?: string;
    isVerified?: boolean;
  };
  subcategories?: string[];
  tags?: string[];
  serviceTypes?: string[];
  portfolio?: {
    images?: string[];
  };
}

interface Favorite {
  id: number;
  targetId?: string;
  artist?: Artist;
  rating?: number;
  name?: string;
  category?: string;
  type?: string;
  city?: string;
  price?: number;
  fans?: number;
  description?: string;
  availability?: string;
  verified?: boolean;
  image?: string;
  // Propiedades adicionales utilizadas en el renderizado
  artistName?: string;
  firstName?: string;
  lastName?: string;
  fanCount?: number;
  pricePerHour?: number;
  isAvailable?: boolean;
  totalReviews?: number;
  artistType?: string;
  categoryId?: string;
  subcategories?: string[];
  tags?: string[];
  serviceTypes?: string[];
  portfolio?: {
    images?: string[];
  };
  user?: {
    firstName: string;
    lastName: string;
    city: string;
    profileImageUrl?: string;
    isVerified?: boolean;
  };
}



export default function FavoritesComparison() {
  const [showHiringModal, setShowHiringModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<Artist | undefined>(undefined);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favoriteArtists = [], isLoading } = useQuery<Favorite[]>({
    queryKey: ["/api/favorites", { targetType: 'artist' }],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/favorites?targetType=artist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      
      const data = await response.json();
      return data.data || [];
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (artistId: number) => {
      await apiRequest('DELETE', `/api/favorites/artist/${artistId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Favorito eliminado",
        description: "El artista ha sido removido de tus favoritos.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo eliminar el favorito. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleHire = (artistOrFavorite: Artist | Favorite) => {
    // Si es un Favorite, usamos el artista si está disponible, de lo contrario usamos el propio favorite
    const artist = 'artist' in artistOrFavorite && artistOrFavorite.artist ? 
                  artistOrFavorite.artist : artistOrFavorite as Artist;
    setSelectedArtist(artist);
    setShowHiringModal(true);
  };

  const handleRemove = (artistId: number) => {
    removeFavoriteMutation.mutate(artistId);
  };

  // Función para obtener el precio de un artista
  const getArtistPrice = (favorite: Favorite) => {
    return favorite.artist?.pricePerHour || favorite.price || 0;
  };

  // Función para obtener la imagen del artista
  const getArtistImage = (favorite: Favorite) => {
    return favorite.image || favorite.artist?.user?.profileImageUrl || '';
  };

  // Función para obtener el nombre del artista
  const getArtistName = (favorite: Favorite) => {
    return favorite.artistName || 
           favorite.name || 
           (favorite.artist ? `${favorite.artist.firstName} ${favorite.artist.lastName}` : 'Artista');
  };

  // Función para obtener la ciudad del artista
  const getArtistCity = (favorite: Favorite) => {
    return favorite.artist?.user?.city || favorite.city || 'Ciudad no especificada';
  };

  // Función para obtener la categoría del artista
  const getArtistCategory = (favorite: Favorite) => {
    return favorite.artist?.category?.name || favorite.category || 'Música';
  };

  // Función para obtener la calificación del artista
  const getArtistRating = (favorite: Favorite) => {
    return favorite.artist?.rating || favorite.rating || 4.8;
  };

  // Función para obtener el número de reseñas
  const getArtistReviewsCount = (favorite: Favorite) => {
    return favorite.artist?.totalReviews || favorite.totalReviews || 0;
  };

  // Función para obtener los servicios del artista
  const getArtistServices = (favorite: Favorite) => {
    return favorite.artist?.serviceTypes || favorite.serviceTypes || [];
  };

  // Función para verificar si el artista está disponible
  const isArtistAvailable = (favorite: Favorite) => {
    return favorite.artist?.isAvailable !== false && favorite.availability !== 'No disponible';
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
  };

  const formatPrice = (price: string | number | undefined) => {
    if (!price) return 'Consultar';
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  const getAvailabilityStatus = (isAvailable: boolean) => {
    return isAvailable ? 
      { text: "Disponible", className: "bg-green-100 text-green-800" } :
      { text: "Ocupado", className: "bg-yellow-100 text-yellow-800" };
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparar Artistas Favoritos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!favoriteArtists.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Comparar Artistas Favoritos</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-xl text-dark mb-2">
            No tienes artistas para comparar
          </h3>
          <p className="text-gray-600">
            Agrega artistas a tus favoritos para poder compararlos aquí
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Comparar Artistas Favoritos
            </CardTitle>
            <Badge variant="outline">
              {favoriteArtists.length} artista{favoriteArtists.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[200px]">
                    Artista
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                    Categoría
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                    Precio/hora
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[100px]">
                    Calificación
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[120px]">
                    Disponibilidad
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[140px]">
                    Servicios
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 min-w-[150px]">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {favoriteArtists.map((favorite) => {
                  const availability = getAvailabilityStatus(isArtistAvailable(favorite));
                  const services = getArtistServices(favorite);
                  
                  return (
                    <tr key={favorite.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage 
                              src={getArtistImage(favorite)} 
                              alt={getArtistName(favorite)} 
                            />
                            <AvatarFallback>
                              {getInitials(getArtistName(favorite))}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-dark truncate">
                              {getArtistName(favorite)}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">
                                {getArtistCity(favorite)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="text-xs">
                          {getArtistCategory(favorite)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-dark">
                          {formatPrice(getArtistPrice(favorite))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">
                            {getArtistRating(favorite).toFixed(1)}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({getArtistReviewsCount(favorite)})
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`text-xs ${availability.className}`}>
                          {availability.text}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {services.slice(0, 2).join(', ') || 'Shows, Eventos'}
                          {services.length > 2 && (
                            <span className="text-gray-400"> +más</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleHire(favorite.artist || favorite)}
                            className="bg-primary hover:bg-primary/90 text-white"
                            disabled={!isArtistAvailable(favorite)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            {isArtistAvailable(favorite) ? 'Contratar' : 'No disponible'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Función próximamente",
                                description: "La vista del perfil estará disponible pronto",
                              });
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemove(Number(favorite.targetId || favorite.id))}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Resumen */}
          <div className="bg-gray-50 px-6 py-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-dark">
                  {favoriteArtists.length}
                </div>
                <div className="text-xs text-gray-600">Artistas comparados</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-dark">
                  {
                    favoriteArtists.filter((f) =>
                    (f.artist?.rating || 4.8) >= 4.5
                  ).length}
                </div>
                <div className="text-xs text-gray-600">Con 4.5+ estrellas</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-dark">
                  {
                    favoriteArtists.filter((f) =>
                      f.artist?.isAvailable !== false
                    ).length
                  }
                </div>
                <div className="text-xs text-gray-600">Disponibles ahora</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-dark">
                  ${Math.round(
                    favoriteArtists.reduce((acc, f) => {
                      const price = f.artist?.pricePerHour || 0;
                      return acc + price;
                    }, 0) / favoriteArtists.length
                  ).toLocaleString()}
                </div>
                <div className="text-xs text-gray-600">Precio promedio/hora</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <RealTimeHiringModal
        open={showHiringModal}
        onOpenChange={setShowHiringModal}
        artist={selectedArtist}
      />
    </>
  );
}
