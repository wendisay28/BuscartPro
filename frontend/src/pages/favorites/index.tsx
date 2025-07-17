"use client";

import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { favoriteData } from "@/data/mockFavorites";
import {
  Heart,
  Star,
  MapPin,
  Users,
  Building,
  MessageCircle,
  Filter,
  Scale,
  User
} from "lucide-react";

export default function Favorites() {
  useAuth();
  const [activeTab, setActiveTab] = useState("artists");
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonTab, setComparisonTab] = useState("artists"); 
  const [, setShowFilters] = useState(false);

  const getCategoryNoun = (tab: string, count: number) => {
    const nouns: { [key: string]: { singular: string; plural: string } } = {
      artists: { singular: 'artista', plural: 'artistas' },
      events: { singular: 'evento', plural: 'eventos' },
      sites: { singular: 'sitio', plural: 'sitios' },
      gallery: { singular: 'producto', plural: 'productos' },
    };
    const selectedNouns = nouns[tab] || { singular: 'elemento', plural: 'elementos' };
    return count === 1 ? selectedNouns.singular : selectedNouns.plural;
  };

  const handleCompareToggle = (id: number) => {
    setSelectedForComparison(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const getComparisonData = () => {
    switch (comparisonTab) {
      case 'artists':
        return favoriteData.artists.filter(artist => selectedForComparison.includes(artist.id));
      case 'events':
        return favoriteData.events.filter(event => selectedForComparison.includes(event.id));
      case 'sites':
        return favoriteData.sites.filter(site => selectedForComparison.includes(site.id));
      case 'gallery':
        return favoriteData.gallery.filter(item => selectedForComparison.includes(item.id));
      default:
        return [];
    }
  };

  const renderArtistCard = (artist: any) => (
    <Card key={artist.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {artist.verified && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              Verificado
            </Badge>
          )}
          <Badge className={`text-xs px-2 py-0.5 rounded-full ${
            artist.availability === "Disponible" ? "bg-green-500 hover:bg-green-600 text-white" : "bg-red-500 hover:bg-red-600 text-white"
          }`}>
            {artist.availability}
          </Badge>
        </div>
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3">
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
            <MapPin className="w-3.5 h-3.5" /><span>{artist.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /><span>{artist.fans} fans</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{artist.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-[#bb00aa]">${artist.price.toLocaleString()}/hora</div>
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedForComparison.includes(artist.id)} 
              onCheckedChange={() => handleCompareToggle(artist.id)} 
              disabled={!selectedForComparison.includes(artist.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button size="sm" className="bg-[#bb00aa] hover:bg-[#9b0089] text-white text-xs h-8 px-3 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Contactar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEventCard = (event: any) => (
    <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{event.title}</h3>
            <p className="text-sm text-gray-400">{event.category}</p>
          </div>
          <div className="flex items-center gap-1 bg-[#bb00aa]/10 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
            <span className="text-sm font-medium text-white">{event.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /><span>{event.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /><span>{event.attendees} asistentes</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{event.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-[#bb00aa]">${event.price.toLocaleString()}</div>
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedForComparison.includes(event.id)} 
              onCheckedChange={() => handleCompareToggle(event.id)} 
              disabled={!selectedForComparison.includes(event.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button size="sm" className="bg-[#bb00aa] hover:bg-[#9b0089] text-white text-xs h-8 px-3 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Ver Detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSiteCard = (site: any) => (
    <Card key={site.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={site.image} alt={site.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{site.name}</h3>
            <p className="text-sm text-gray-400">{site.type}</p>
          </div>
          <div className="flex items-center gap-1 bg-[#bb00aa]/10 px-2 py-1 rounded-full">
            <Star className="w-3.5 h-3.5 fill-[#ffd700] text-[#ffd700]" />
            <span className="text-sm font-medium text-white">{site.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /><span>{site.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Building className="w-3.5 h-3.5" /><span>{site.capacity} personas</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2">{site.description}</p>
        <div className="flex items-center justify-between pt-2">
          {site.price ? (
            <div className="text-lg font-bold text-[#bb00aa]">${site.price.toLocaleString()}</div>
          ) : <div />} 
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedForComparison.includes(site.id)} 
              onCheckedChange={() => handleCompareToggle(site.id)} 
              disabled={!selectedForComparison.includes(site.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button size="sm" className="bg-[#bb00aa] hover:bg-[#9b0089] text-white text-xs h-8 px-3 rounded-lg">
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" /> Ver Disponibilidad
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGalleryCard = (item: any) => (
    <Card
      key={item.id}
      className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full"
        >
          <Heart className="w-4 h-4 fill-current" />
        </Button>
        <Badge className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {item.type}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-bold text-white text-base line-clamp-1" title={item.title}>{item.title}</h3>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <User className="w-3.5 h-3.5" />
          <span>{item.artist}</span>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 h-10">{item.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-bold text-[#bb00aa]">
            ${item.price.toLocaleString()}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={selectedForComparison.includes(item.id)} 
              onCheckedChange={() => handleCompareToggle(item.id)} 
              disabled={!selectedForComparison.includes(item.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button
              size="sm"
              className="bg-transparent border border-[#bb00aa] text-[#bb00aa] hover:bg-[#bb00aa] hover:text-white text-xs h-8 px-3 rounded-lg"
            >
              Ver Producto
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gray-900 border border-gray-700 rounded-lg mx-4 mt-4">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Mis Favoritos</h1>
              <p className="text-gray-400">Artistas, eventos y sitios que te gustan</p>
            </div>
            <div className="flex gap-3">
              {selectedForComparison.length >= 2 && (
                <Button 
                  onClick={() => { setShowComparison(true); setComparisonTab(activeTab); }} 
                  className="bg-[#bb00aa] hover:bg-[#9b0089]"
                >
                  <Scale className="w-4 h-4 mr-2" />
                  Comparar ({selectedForComparison.length})
                </Button>
              )}
              <Button variant="outline" onClick={() => setShowFilters(true)}>
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setSelectedForComparison([]); }}>
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
            <TabsTrigger value="artists">
              Artistas ({favoriteData.artists.length})
            </TabsTrigger>
            <TabsTrigger value="events">
              Eventos ({favoriteData.events.length})
            </TabsTrigger>
            <TabsTrigger value="sites">
              Sitios ({favoriteData.sites.length})
            </TabsTrigger>
            <TabsTrigger value="gallery">
              Galería ({favoriteData.gallery.length})
            </TabsTrigger>
          </TabsList>

          {selectedForComparison.length > 0 && (
            <div className="flex items-center justify-between text-sm text-gray-400 mb-4 p-3 bg-gray-800 rounded-lg">
              <div>
                <p className="font-medium">
                  {selectedForComparison.length} {getCategoryNoun(activeTab, selectedForComparison.length)} seleccionados para comparar.
                </p>
                <p className="text-xs text-gray-500">
                  Máximo 3. Haz clic en "Comparar" cuando tengas al menos 2.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedForComparison([])} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                Limpiar
              </Button>
            </div>
          )}

          <TabsContent value="artists">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.artists.map(renderArtistCard)}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.events.map(renderEventCard)}
            </div>
          </TabsContent>

          <TabsContent value="sites">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteData.sites.map(renderSiteCard)}
            </div>
          </TabsContent>

          <TabsContent value="gallery">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoriteData.gallery.map(renderGalleryCard)}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showComparison} onOpenChange={setShowComparison}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
          <DialogHeader>
            <DialogTitle>Comparar {comparisonTab.charAt(0).toUpperCase() + comparisonTab.slice(1)}</DialogTitle>
          </DialogHeader>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {getComparisonData().map(item => (
              <Card key={item.id} className="border-2 border-[#f3e8ff]">
                <CardHeader className="pb-3">
                  <div className="relative">
                    <img src={item.image} alt={(item as any).name || (item as any).title} className="w-full h-32 object-cover rounded-lg" />
                  </div>
                  <CardTitle className="text-lg">{(item as any).name || (item as any).title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {comparisonTab === 'artists' && (
                      <>
                        <div><span className="text-gray-600">Categoría:</span><p className="font-medium">{(item as any).category}</p></div>
                        <div><span className="text-gray-600">Tipo:</span><p className="font-medium">{(item as any).type}</p></div>
                        <div><span className="text-gray-600">Ciudad:</span><p className="font-medium">{(item as any).city}</p></div>
                        <div><span className="text-gray-600">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#bb00aa] fill-current" /><span className="font-medium">{(item as any).rating}</span>
                          </div>
                        </div>
                        <div><span className="text-gray-600">Precio/hora:</span><p className="font-medium text-[#9b0089]">€{(item as any).price}</p></div>
                        <div><span className="text-gray-600">Fans:</span><p className="font-medium">{(item as any).fans}</p></div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Disponibilidad:</span>
                          <Badge className={`ml-2 ${(item as any).availability === "Disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                            {(item as any).availability}
                          </Badge>
                        </div>
                      </>
                    )}
                    {comparisonTab === 'events' && (
                      <>
                        <div><span className="text-gray-600">Categoría:</span><p className="font-medium">{(item as any).category}</p></div>
                        <div><span className="text-gray-600">Fecha:</span><p className="font-medium">{(item as any).date}</p></div>
                        <div><span className="text-gray-600">Ciudad:</span><p className="font-medium">{(item as any).city}</p></div>
                        <div><span className="text-gray-600">Precio:</span><p className="font-medium text-[#9b0089]">€{(item as any).price}</p></div>
                        <div className="col-span-2"><span className="text-gray-600">Asistentes:</span><p className="font-medium">{(item as any).attendees}</p></div>
                      </>
                    )}
                    {comparisonTab === 'sites' && (
                      <>
                        <div><span className="text-gray-600">Tipo:</span><p className="font-medium">{(item as any).type}</p></div>
                        <div><span className="text-gray-600">Ciudad:</span><p className="font-medium">{(item as any).city}</p></div>
                        <div><span className="text-gray-600">Rating:</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-[#bb00aa] fill-current" /><span className="font-medium">{(item as any).rating}</span>
                          </div>
                        </div>
                        <div className="col-span-2"><span className="text-gray-600">Capacidad:</span><p className="font-medium">{(item as any).capacity} personas</p></div>
                      </>
                    )}
                     {comparisonTab === 'gallery' && (
                      <>
                        <div><span className="text-gray-600">Tipo:</span><p className="font-medium">{(item as any).type}</p></div>
                        <div><span className="text-gray-600">Artista/Marca:</span><p className="font-medium">{(item as any).artist}</p></div>
                        <div className="col-span-2"><span className="text-gray-600">Precio:</span><p className="font-medium text-[#9b0089]">€{(item as any).price}</p></div>
                      </>
                    )}
                  </div>
                  <Button size="sm" className="w-full bg-[#bb00aa] hover:bg-[#9b0089]">
                    <MessageCircle className="w-3 h-3 mr-1" />Contactar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
