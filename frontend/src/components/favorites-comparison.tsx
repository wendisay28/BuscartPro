import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Star, 
  MapPin, 
  DollarSign, 
  Users, 
  Clock,
  X,
  Send,
  Eye,
  Phone,
  Mail
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import RealTimeHiringModal from "./real-time-hiring-modal";

export default function FavoritesComparison() {
  const [showHiringModal, setShowHiringModal] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favoriteArtists, isLoading } = useQuery({
    queryKey: ["/api/favorites", { targetType: 'artist' }],
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

  const handleHire = (artist: any) => {
    setSelectedArtist(artist);
    setShowHiringModal(true);
  };

  const handleRemove = (artistId: number) => {
    removeFavoriteMutation.mutate(artistId);
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'A';
  };

  const formatPrice = (price: string | number) => {
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

  if (!favoriteArtists || favoriteArtists.length === 0) {
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
                {favoriteArtists.map((favorite: any) => {
                  // Note: In a real implementation, this would fetch the actual artist data
                  // For now, we'll work with what we have in the favorite object
                  const artist = favorite.artist || favorite; // Fallback structure
                  const availability = getAvailabilityStatus(artist.isAvailable !== false);
                  
                  return (
                    <tr key={favorite.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage 
                              src={artist.user?.profileImageUrl || artist.profileImageUrl} 
                              alt={artist.artistName || artist.name} 
                            />
                            <AvatarFallback>
                              {getInitials(artist.artistName || artist.name || 'Artista')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-dark truncate">
                              {artist.artistName || artist.name || 'Artista'}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">
                                {artist.user?.city || artist.city || 'Ciudad no especificada'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary" className="text-xs">
                          {artist.category?.name || artist.categoryName || 'Música'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-dark">
                          {formatPrice(artist.pricePerHour || artist.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">
                            {artist.rating || '4.8'}
                          </span>
                          <span className="text-xs text-gray-500 ml-1">
                            ({artist.totalReviews || artist.reviewsCount || 0})
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
                          {artist.serviceTypes?.slice(0, 2).join(', ') || 
                           artist.services?.slice(0, 2).join(', ') ||
                           'Shows, Eventos'}
                          {(artist.serviceTypes?.length > 2 || artist.services?.length > 2) && (
                            <span className="text-gray-400"> +más</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleHire(artist)}
                            className="bg-primary hover:bg-primary/90 text-white"
                            disabled={artist.isAvailable === false}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            {artist.isAvailable === false ? 'No disponible' : 'Contratar'}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // TODO: Navigate to artist profile
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
                            onClick={() => handleRemove(favorite.targetId || artist.id)}
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

          {/* Summary Stats */}
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
                  {favoriteArtists.filter((f: any) => (f.artist?.rating || f.rating || 4.8) >= 4.5).length}
                </div>
                <div className="text-xs text-gray-600">Con 4.5+ estrellas</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-dark">
                  {favoriteArtists.filter((f: any) => f.artist?.isAvailable !== false).length}
                </div>
                <div className="text-xs text-gray-600">Disponibles ahora</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-dark">
                  ${Math.round(favoriteArtists.reduce((acc: number, f: any) => {
                    const price = parseFloat(f.artist?.pricePerHour || f.price || '0');
                    return acc + price;
                  }, 0) / favoriteArtists.length).toLocaleString()}
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
