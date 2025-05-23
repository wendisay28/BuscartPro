import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import FavoritesComparison from "@/components/favorites-comparison";
import ArtistCard from "@/components/artist-card";
import EventCard from "@/components/event-card";
import VenueCard from "@/components/venue-card";
import BlogCard from "@/components/blog-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, MapPin, BookOpen, Users, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Favorites() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'artists' | 'events' | 'venues' | 'blog'>('comparison');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["/api/favorites"],
  });

  const { data: favoriteArtists } = useQuery({
    queryKey: ["/api/favorites", { targetType: 'artist' }],
  });

  const { data: favoriteEvents } = useQuery({
    queryKey: ["/api/favorites", { targetType: 'event' }],
  });

  const { data: favoriteVenues } = useQuery({
    queryKey: ["/api/favorites", { targetType: 'venue' }],
  });

  const { data: favoriteBlogPosts } = useQuery({
    queryKey: ["/api/favorites", { targetType: 'blog_post' }],
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async ({ targetType, targetId }: { targetType: string; targetId: number }) => {
      await apiRequest('DELETE', `/api/favorites/${targetType}/${targetId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Favorito eliminado",
        description: "El elemento ha sido removido de tus favoritos.",
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

  const handleRemoveFavorite = (targetType: string, targetId: number) => {
    removeFavoriteMutation.mutate({ targetType, targetId });
  };

  const getCounts = () => {
    const artistCount = favoriteArtists?.length || 0;
    const eventCount = favoriteEvents?.length || 0;
    const venueCount = favoriteVenues?.length || 0;
    const blogCount = favoriteBlogPosts?.length || 0;
    
    return { artistCount, eventCount, venueCount, blogCount };
  };

  const { artistCount, eventCount, venueCount, blogCount } = getCounts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warm-gray">
        <NavigationHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-3xl text-dark mb-2">Mis Favoritos</h1>
          <p className="text-gray-600">Gestiona y compara tus artistas, eventos y contenido guardado</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{artistCount}</p>
              <p className="text-sm text-gray-600">Artistas</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-secondary mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary">{eventCount}</p>
              <p className="text-sm text-gray-600">Eventos</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{venueCount}</p>
              <p className="text-sm text-gray-600">Espacios</p>
            </CardContent>
          </Card>
          
          <Card className="card-hover">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-500">{blogCount}</p>
              <p className="text-sm text-gray-600">Artículos</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="comparison">Comparar Artistas</TabsTrigger>
            <TabsTrigger value="artists">Artistas ({artistCount})</TabsTrigger>
            <TabsTrigger value="events">Eventos ({eventCount})</TabsTrigger>
            <TabsTrigger value="venues">Espacios ({venueCount})</TabsTrigger>
            <TabsTrigger value="blog">Blog ({blogCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison">
            {artistCount > 0 ? (
              <FavoritesComparison />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    No tienes artistas favoritos aún
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Agrega artistas a tus favoritos para poder compararlos aquí
                  </p>
                  <Button asChild>
                    <a href="/explorer/artists">Explorar Artistas</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="artists">
            {favoriteArtists && favoriteArtists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteArtists.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <ArtistCard artist={favorite} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleRemoveFavorite('artist', favorite.targetId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    No tienes artistas favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Descubre y guarda tus artistas favoritos para acceder a ellos fácilmente
                  </p>
                  <Button asChild>
                    <a href="/explorer/artists">Explorar Artistas</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events">
            {favoriteEvents && favoriteEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteEvents.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <EventCard event={favorite} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleRemoveFavorite('event', favorite.targetId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    No tienes eventos favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Guarda eventos que te interesen para no perderte ninguna oportunidad cultural
                  </p>
                  <Button asChild>
                    <a href="/explorer/events">Explorar Eventos</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="venues">
            {favoriteVenues && favoriteVenues.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteVenues.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <VenueCard venue={favorite} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleRemoveFavorite('venue', favorite.targetId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    No tienes espacios favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Descubre y guarda espacios culturales para tus futuros eventos
                  </p>
                  <Button asChild>
                    <a href="/explorer/venues">Explorar Espacios</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="blog">
            {favoriteBlogPosts && favoriteBlogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteBlogPosts.map((favorite: any) => (
                  <div key={favorite.id} className="relative">
                    <BlogCard post={favorite} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => handleRemoveFavorite('blog_post', favorite.targetId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    No tienes artículos favoritos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Guarda artículos interesantes del blog cultural para leer más tarde
                  </p>
                  <Button asChild>
                    <a href="/community/blog">Explorar Blog</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}