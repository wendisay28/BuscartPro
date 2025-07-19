"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { favoriteData } from "@/data/mockFavorites";

import { FilterControls } from "./components/filters/FilterControls";
import { FilterPanel } from "./components/filters/FilterPanel";
import { EventFilterPanel } from "./components/filters/EventFilterPanel";
import { ComparisonDialog } from "./components/comparison/ComparisonDialog";
import { ArtistsTab } from "./components/tabs/ArtistsTab";
import { EventsTab } from "./components/tabs/EventsTab";
import { SitesTab } from "./components/tabs/SitesTab";
import { GalleryTab } from "./components/tabs/GalleryTab";
import { Button } from "@/components/ui/button";
import { SiteFilterPanel } from "./components/filters/SiteFilterPanel";
import { GalleryFilterPanel } from "./components/filters/GalleryFilterPanel";

export default function Favorites() {
  useAuth();
  const [activeTab, setActiveTab] = useState("artists");
  const [selectedForComparison, setSelectedForComparison] = useState<number[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'recent' | 'today' | 'custom' | null>(null);
  const [customDate, setCustomDate] = useState('');
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<'free' | 'price_asc' | 'price_desc' | ''>('');
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  // Lista de profesiones disponibles
  const professions = [
    'Músico',
    'DJ',
    'Banda',
    'Animador',
    'Payaso',
    'Magos',
    'Chef',
    'Fotógrafo',
    'Decorador',
    'Otro'
  ];

  // Estados para los filtros de eventos
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSelectedModality] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [__, setSelectedEventCity] = useState<string>('');

  // Estados para filtros de sitios
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedService, setSelectedService] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCapacity, setSelectedCapacity] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedSiteCity, setSelectedSiteCity] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedPrice, setSelectedPrice] = useState('');
  
  // Estados para los filtros de la galería
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedCategory, setSelectedCategory] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBookType, setSelectedBookType] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedStyle, setSelectedStyle] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTrend, setSelectedTrend] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  // Efecto para cerrar el panel de filtros al hacer scroll
  useEffect(() => {
    if (!showFilters) return;

    const handleScroll = () => {      
      setShowFilters(false);
    };

    document.addEventListener('scroll', handleScroll, { passive: true, capture: true });
    
    const scrollContainers = document.querySelectorAll('.overflow-y-auto, .overflow-y-scroll, [style*="overflow-y"], [class*="overflow"]');
    scrollContainers.forEach(container => {
      if (container.scrollHeight > container.clientHeight) {
        container.addEventListener('scroll', handleScroll, { passive: true });
      }
    });

    return () => {
      document.removeEventListener('scroll', handleScroll, { capture: true });
      scrollContainers.forEach(container => {
        container.removeEventListener('scroll', handleScroll);
      });
    };
  }, [showFilters]);

  // Función para obtener los datos de comparación según la pestaña activa
  const getComparisonData = () => {
    switch (activeTab) {
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

  // Función para alternar un elemento en la selección para comparar
  const toggleComparison = (id: number) => {
    setSelectedForComparison(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Manejador para cambiar el filtro
  const handleFilterChange = (filter: 'recent' | 'today' | 'custom' | null) => {
    setSelectedFilter(filter);
  };

  // Manejador para cambiar el orden por precio
  const handleSortByPrice = (sort: 'free' | 'price_asc' | 'price_desc' | '') => {
    setSortByPrice(sort);
  };

  // Función para alternar favorito
  const toggleFavorite = (id: number) => {
    console.log('Toggle favorite:', id);
  };

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setSelectedFilter(null);
    setCustomDate('');
    setSelectedProfession('');
    setSortByPrice('');
    setSelectedEventCategory('');
    setSelectedModality('');
    setSelectedEventCity('');
    setSelectedService('');
    setSelectedCapacity('');
    setSelectedSiteCity('');
    setSelectedPrice('');
    setSelectedCategory('');
    setSelectedBookType('');
    setSelectedStyle('');
    setSelectedTrend('');
    setPriceRange([0, 1000000]);
  };

  // Obtener el sustantivo correcto para la categoría
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="bg-gray-900 border border-gray-700 rounded-lg mx-4 mt-4">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Mis Favoritos</h1>
              <p className="text-gray-400 whitespace-nowrap">Busca, Compara y contrata lo que te gusta</p>
            </div>
            <FilterControls
              showFilters={showFilters}
              selectedForComparison={selectedForComparison}
              onShowFilters={() => setShowFilters(!showFilters)}
              onShowComparison={() => setShowComparison(true)}
            />
          </div>

          {/* Panel de filtros para artistas */}
          {showFilters && activeTab === 'artists' && (
            <FilterPanel
              showFilters={showFilters}
              selectedFilter={selectedFilter}
              customDate={customDate}
              selectedProfession={selectedProfession}
              sortByPrice={sortByPrice}
              onFilterChange={handleFilterChange}
              onCustomDateChange={setCustomDate}
              onProfessionChange={setSelectedProfession}
              onSortByPrice={handleSortByPrice}
              onClearFilters={clearFilters}
              onClose={() => setShowFilters(false)}
              professions={professions}
            />
          )}

          {/* Panel de filtros para eventos */}
          {showFilters && activeTab === 'events' && (
            <EventFilterPanel
              showFilters={showFilters}
              selectedFilter={selectedFilter}
              customDate={customDate}
              selectedCategory={selectedEventCategory}
              sortByPrice={sortByPrice}
              onFilterChange={handleFilterChange}
              onCustomDateChange={setCustomDate}
              onCategoryChange={setSelectedEventCategory}
              onSortByPrice={handleSortByPrice}
              onClearFilters={clearFilters}
              onModalityChange={setSelectedModality}
              onCityChange={setSelectedEventCity}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Panel de filtros para sitios */}
          {showFilters && activeTab === 'sites' && (
            <SiteFilterPanel
              showFilters={showFilters}
              selectedService={selectedService}
              selectedCapacity={selectedCapacity}
              selectedCity={selectedSiteCity}
              selectedPrice={selectedPrice}
              onServiceChange={setSelectedService}
              onCapacityChange={setSelectedCapacity}
              onCityChange={setSelectedSiteCity}
              onPriceChange={setSelectedPrice}
              onClearFilters={clearFilters}
              onClose={() => setShowFilters(false)}
            />
          )}

          {/* Panel de filtros para la galería */}
          {showFilters && activeTab === 'gallery' && (
            <GalleryFilterPanel
              showFilters={showFilters}
              selectedCategory={selectedCategory}
              selectedBookType={selectedBookType}
              selectedStyle={selectedStyle}
              selectedTrend={selectedTrend}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onBookTypeChange={setSelectedBookType}
              onStyleChange={setSelectedStyle}
              onTrendChange={setSelectedTrend}
              onPriceRangeChange={setPriceRange}
              onClearFilters={clearFilters}
              onClose={() => setShowFilters(false)}
            />
          )}
        </div>
      </div>

      {/* Contenido principal con scroll */}
      <div className="w-full py-6 overflow-x-visible">
        <div className="max-w-[90rem] mx-auto w-full px-4 overflow-y-visible">
          <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setSelectedForComparison([]); }} className="w-full">
            {/* Versión móvil - Menú desplegable */}
            <div className="sm:hidden mb-6 relative">
              <div 
                className="relative w-1/2"
                onClick={() => setShowMobileDropdown(!showMobileDropdown)}
              >
                <div className="w-full appearance-none bg-gray-900 border border-gray-700 text-white rounded-md pl-3 pr-8 py-2.5 text-sm cursor-pointer">
                  {activeTab === 'artists' && `Artistas (${favoriteData.artists.length})`}
                  {activeTab === 'events' && `Eventos (${favoriteData.events.length})`}
                  {activeTab === 'sites' && `Sitios (${favoriteData.sites.length})`}
                  {activeTab === 'gallery' && `Galería (${favoriteData.gallery.length})`}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              {/* Panel personalizado que se mostrará debajo */}
              {showMobileDropdown && (
                <div className="absolute left-0 top-full mt-1 w-[calc(50%)] bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                  {['artists', 'events', 'sites', 'gallery'].map((tab) => (
                    <div 
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedForComparison([]);
                        setShowMobileDropdown(false);
                      }}
                      className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-800 ${
                        activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-300'
                      }`}
                    >
                      {tab === 'artists' && `Artistas (${favoriteData.artists.length})`}
                      {tab === 'events' && `Eventos (${favoriteData.events.length})`}
                      {tab === 'sites' && `Sitios (${favoriteData.sites.length})`}
                      {tab === 'gallery' && `Galería (${favoriteData.gallery.length})`}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Versión escritorio - Pestañas */}
            <TabsList className="hidden sm:inline-flex mb-6 bg-gray-900 border border-gray-700 rounded-lg p-1 ml-0">
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
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedForComparison([])} 
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Limpiar
                </Button>
              </div>
            )}
            
            {/* Contenido de las pestañas */}
            <TabsContent value="artists">
              <ArtistsTab 
                artists={favoriteData.artists}
                selectedForComparison={selectedForComparison}
                onToggleSelect={toggleComparison}
                onToggleFavorite={toggleFavorite}
              />
            </TabsContent>
            
            <TabsContent value="events">
              <EventsTab 
                events={favoriteData.events}
                selectedForComparison={selectedForComparison}
                onToggleSelect={toggleComparison}
                onToggleFavorite={toggleFavorite}
              />
            </TabsContent>
            
            <TabsContent value="sites">
              <SitesTab 
                sites={favoriteData.sites}
                selectedForComparison={selectedForComparison}
                onToggleSelect={toggleComparison}
                onToggleFavorite={toggleFavorite}
              />
            </TabsContent>
            
            <TabsContent value="gallery">
              <GalleryTab 
                galleryItems={favoriteData.gallery}
                selectedForComparison={selectedForComparison}
                onToggleSelect={toggleComparison}
                onToggleFavorite={toggleFavorite}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Diálogo de comparación */}
      <ComparisonDialog
        open={showComparison}
        onOpenChange={setShowComparison}
        comparisonData={getComparisonData()}
      />
    </div>
  );
}