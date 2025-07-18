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
  User,
  Eye
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
    <Card key={artist.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          {artist.verified && (
            <Badge className="bg-gray-400 hover:bg-gray-500 text-gray-900 text-xs px-2 py-0.5 rounded-full">
              Verificado
            </Badge>
          )}
          <Badge className={`text-xs px-2 py-0.5 rounded-full ${
            artist.availability === "Disponible" ? "bg-[#bb00aa] hover:bg-[#a00090] text-white" : "bg-[#bb00aa] hover:bg-[#a00090] text-white"
          }`}>
            {artist.availability}
          </Badge>
        </div>
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
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
            <MapPin className="w-3.5 h-3.5" /><span>{artist.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /><span>{artist.fans} fans</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 flex-1">{artist.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Desde</span>
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-[#bb00aa]">${(artist.price * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
              <span className="text-xs text-gray-400 ml-1">/hora</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${artist.id}`}
              checked={selectedForComparison.includes(artist.id)} 
              onCheckedChange={() => handleCompareToggle(artist.id)} 
              disabled={!selectedForComparison.includes(artist.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button 
              size="sm" 
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Contactar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderEventCard = (event: any) => (
    <Card key={event.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
        <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
          <Badge className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {event.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-white text-base">{event.title}</h3>
            <p className="text-sm text-gray-400">{event.eventType || 'Presencial'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{event.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{event.attendees} asistentes</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 flex-1">{event.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Precio</span>
            <div className="flex items-baseline">
              {typeof event.price === 'object' ? (
                event.price.type === 'free' ? (
                  <span className="text-sm font-medium text-green-500">Entrada Libre</span>
                ) : event.price.type === 'ticket' ? (
                  <>
                    <span className="text-lg font-bold text-[#bb00aa]">${(event.price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
                    <span className="text-xs text-gray-400 ml-1">por entrada</span>
                  </>
                ) : event.price.type === 'hourly' ? (
                  <>
                    <span className="text-lg font-bold text-[#bb00aa]">${(event.price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
                    <span className="text-xs text-gray-400 ml-1">/hora</span>
                  </>
                ) : (
                  <span className="text-sm font-medium text-gray-400">Precio a consultar</span>
                )
              ) : (
                <>
                  <span className="text-lg font-bold text-[#bb00aa]">${(event.price * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
                  <span className="text-xs text-gray-400 ml-1">por entrada</span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${event.id}`}
              checked={selectedForComparison.includes(event.id)} 
              onCheckedChange={() => handleCompareToggle(event.id)} 
              disabled={!selectedForComparison.includes(event.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button 
              size="sm" 
              variant="outline"
              className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>Detalle</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderSiteCard = (site: any) => (
    <Card key={site.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={site.image} alt={site.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
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
        <p className="text-sm text-gray-300 line-clamp-2 flex-1">{site.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Precio</span>
            <div className="flex items-baseline">
              {site.price?.type === 'free' ? (
                <span className="text-sm font-medium text-green-500">Entrada Libre</span>
              ) : site.price?.type === 'ticket' ? (
                <>
                  <span className="text-lg font-bold text-[#bb00aa]">${(site.price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
                  <span className="text-xs text-gray-400 ml-1">por entrada</span>
                </>
              ) : site.price?.type === 'hourly' ? (
                <>
                  <span className="text-lg font-bold text-[#bb00aa]">${(site.price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}</span>
                  <span className="text-xs text-gray-400 ml-1">/hora</span>
                </>
              ) : (
                <span className="text-sm font-medium text-gray-400">Precio a consultar</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${site.id}`}
              checked={selectedForComparison.includes(site.id)} 
              onCheckedChange={() => handleCompareToggle(site.id)} 
              disabled={!selectedForComparison.includes(site.id) && selectedForComparison.length >= 3} 
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]" 
            />
            <Button 
              size="sm" 
              variant="outline"
              className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center gap-1.5"
            >
              <Eye className="w-4 h-4" />
              <span>Detalle</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGalleryCard = (item: any) => (
    <Card key={item.id} className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-900 border-gray-800 hover:border-[#bb00aa]/30 hover:shadow-[#bb00aa]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon" variant="ghost" className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white hover:text-red-400 h-8 w-8 rounded-full">
          <Heart className="w-4 h-4 fill-current" />
        </Button>
        <Badge className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {item.type}
        </Badge>
      </div>
      <CardContent className="p-4 space-y-3 flex-1 flex flex-col">
        <div>
          <h3 className="font-bold text-white text-base">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.artist}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{item.city}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{item.sales} ventas</span>
          </div>
        </div>
        <p className="text-sm text-gray-300 line-clamp-2 flex-1">{item.description}</p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Precio</span>
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-[#bb00aa]">
                ${(item.price * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
              </span>
              {item.priceType === 'hourly' && (
                <span className="text-xs text-gray-400 ml-1">/hora</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${item.id}`}
              checked={selectedForComparison.includes(item.id)} 
              onCheckedChange={() => handleCompareToggle(item.id)} 
              disabled={!selectedForComparison.includes(item.id) && selectedForComparison.length >= 3} 
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

      <div className="w-full px-4 py-6">
        <div className="w-full max-w-full">
          <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setSelectedForComparison([]); }} className="w-full">
            <TabsList className="w-auto inline-flex mb-6 bg-gray-900 border border-gray-700 rounded-lg p-1">
              <TabsTrigger 
                value="artists"
                className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors"
              >
                Artistas ({favoriteData.artists.length})
              </TabsTrigger>
              <TabsTrigger 
                value="events"
                className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors"
              >
                Eventos ({favoriteData.events.length})
              </TabsTrigger>
              <TabsTrigger 
                value="sites"
                className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors"
              >
                Sitios ({favoriteData.sites.length})
              </TabsTrigger>
              <TabsTrigger 
                value="gallery"
                className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors"
              >
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {favoriteData.artists.map(renderArtistCard)}
              </div>
            </TabsContent>

            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {favoriteData.events.map(renderEventCard)}
              </div>
            </TabsContent>

            <TabsContent value="sites">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {favoriteData.sites.map(renderSiteCard)}
              </div>
            </TabsContent>

            <TabsContent value="gallery">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                {favoriteData.gallery.map(renderGalleryCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
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
                        <div><span className="text-gray-600">Precio/hora:</span><p className="font-medium text-[#9b0089]">${(item as any).price * 1000}</p></div>
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
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-2">Precio:</span>
                          {typeof (item as any).price === 'object' ? (
                            (item as any).price.type === 'free' ? (
                              <span className="text-sm font-medium text-green-500">Entrada Libre</span>
                            ) : (item as any).price.type === 'ticket' ? (
                              <>
                                <span className="text-lg font-bold text-[#bb00aa]">
                                  ${((item as any).price.value! * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-xs text-gray-400 ml-1">por entrada</span>
                              </>
                            ) : (item as any).price.type === 'hourly' ? (
                              <>
                                <span className="text-lg font-bold text-[#bb00aa]">
                                  ${((item as any).price.value! * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-xs text-gray-400 ml-1">/hora</span>
                              </>
                            ) : (
                              <span className="text-sm font-medium text-gray-400">Precio a consultar</span>
                            )
                          ) : (
                            <>
                              <span className="text-lg font-bold text-[#bb00aa]">
                                ${((item as any).price * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                              </span>
                              <span className="text-xs text-gray-400 ml-1">por entrada</span>
                            </>
                          )}
                        </div>
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
                        <div className="col-span-2">
                          <div className="flex items-center">
                            <span className="text-gray-600 mr-2">Precio:</span>
                            {typeof (item as any).price === 'object' ? (
                              (item as any).price.type === 'free' ? (
                                <span className="text-sm font-medium text-green-500">Entrada Libre</span>
                              ) : (item as any).price.type === 'ticket' ? (
                                <div className="flex items-baseline">
                                  <span className="text-lg font-bold text-[#bb00aa]">
                                    ${((item as any).price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                                  </span>
                                  <span className="text-xs text-gray-400 ml-1">por entrada</span>
                                </div>
                              ) : (item as any).price.type === 'hourly' ? (
                                <div className="flex items-baseline">
                                  <span className="text-lg font-bold text-[#bb00aa]">
                                    ${((item as any).price.value * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                                  </span>
                                  <span className="text-xs text-gray-400 ml-1">/hora</span>
                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-400">Precio a consultar</span>
                              )
                            ) : (
                              <div className="flex items-baseline">
                                <span className="text-lg font-bold text-[#bb00aa]">
                                  ${((item as any).price * 1000).toLocaleString('es-CO', { style: 'decimal', maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-xs text-gray-400 ml-1">por entrada</span>
                              </div>
                            )}
                          </div>
                        </div>
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
