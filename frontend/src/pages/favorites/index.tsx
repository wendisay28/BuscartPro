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
import { RefreshCw } from "lucide-react";

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

  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('');
  const [_, setSelectedModality] = useState<string>('');
  const [__, setSelectedEventCity] = useState<string>('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedSiteCity, setSelectedSiteCity] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBookType, setSelectedBookType] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedTrend, setSelectedTrend] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);

  useEffect(() => {
    if (!showFilters) return;
    const handleScroll = () => { setShowFilters(false); };
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

  const toggleComparison = (id: number) => {
    setSelectedForComparison(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const handleFilterChange = (filter: 'recent' | 'today' | 'custom' | null) => {
    setSelectedFilter(filter);
  };

  const handleSortByPrice = (sort: 'free' | 'price_asc' | 'price_desc' | '') => {
    setSortByPrice(sort);
  };

  const toggleFavorite = (id: number) => {
    console.log('Toggle favorite:', id);
  };

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
      <div className="max-w-6xl mx-auto px-4 py-0">
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

      <div className="w-full py-6 overflow-x-visible">
        <div className="max-w-[90rem] mx-auto w-full px-4 overflow-y-visible">
          <Tabs value={activeTab} onValueChange={(value) => { setActiveTab(value); setSelectedForComparison([]); }} className="w-full">
            <div className="sm:hidden mb-6 relative flex items-center gap-2 mt-6">
              <div className="relative w-1/2">
                <div 
                  className="w-full appearance-none bg-gray-900 border border-gray-700 text-white rounded-md pl-3 pr-8 py-2.5 text-sm cursor-pointer"
                  onClick={() => setShowMobileDropdown(!showMobileDropdown)}
                >
                  {activeTab === 'artists' && `Artistas (${favoriteData.artists.length})`}
                  {activeTab === 'events' && `Eventos (${favoriteData.events.length})`}
                  {activeTab === 'sites' && `Sitios (${favoriteData.sites.length})`}
                  {activeTab === 'gallery' && `Galería (${favoriteData.gallery.length})`}
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-md px-3 py-2.5 text-sm flex items-center justify-center gap-2 hover:bg-gray-800/50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                Filtros
              </button>

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

            <div className="hidden sm:flex items-center justify-between mb-6">
              <TabsList className="bg-gray-900 border border-gray-700 rounded-lg p-1">
                <TabsTrigger value="artists" className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors">Artistas ({favoriteData.artists.length})</TabsTrigger>
                <TabsTrigger value="events" className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors">Eventos ({favoriteData.events.length})</TabsTrigger>
                <TabsTrigger value="sites" className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors">Sitios ({favoriteData.sites.length})</TabsTrigger>
                <TabsTrigger value="gallery" className="px-6 data-[state=active]:bg-gray-800 data-[state=active]:text-white rounded-md hover:bg-gray-800/50 transition-colors">Galería ({favoriteData.gallery.length})</TabsTrigger>
              </TabsList>
              <FilterControls
                showFilters={showFilters}
                selectedForComparison={selectedForComparison}
                onShowFilters={() => setShowFilters(!showFilters)}
                onShowComparison={() => setShowComparison(true)}
              />
            </div>

            {selectedForComparison.length > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-400 mb-4 p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">{selectedForComparison.length} {getCategoryNoun(activeTab, selectedForComparison.length)} seleccionados para comparar.</p>
                  <p className="text-xs text-gray-500">Máximo 3. Haz clic en "Comparar" cuando tengas al menos 2.</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedForComparison([])} className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
                  Limpiar
                </Button>
              </div>
            )}

            <TabsContent value="artists">
              <ArtistsTab artists={favoriteData.artists} selectedForComparison={selectedForComparison} onToggleSelect={toggleComparison} onToggleFavorite={toggleFavorite} />
            </TabsContent>
            <TabsContent value="events">
              <EventsTab events={favoriteData.events} selectedForComparison={selectedForComparison} onToggleSelect={toggleComparison} onToggleFavorite={toggleFavorite} />
            </TabsContent>
            <TabsContent value="sites">
              <SitesTab sites={favoriteData.sites} selectedForComparison={selectedForComparison} onToggleSelect={toggleComparison} onToggleFavorite={toggleFavorite} />
            </TabsContent>
            <TabsContent value="gallery">
              <GalleryTab galleryItems={favoriteData.gallery} selectedForComparison={selectedForComparison} onToggleSelect={toggleComparison} onToggleFavorite={toggleFavorite} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Global Floating Compare Button - Mobile Only */}
      {selectedForComparison.length >= 2 && (
        <div className="fixed bottom-20 right-4 z-40 sm:hidden">
          <Button 
            onClick={() => setShowComparison(true)}
            className="rounded-full h-14 w-14 p-0 bg-[#bb00aa] hover:bg-[#9b0089] shadow-lg flex items-center justify-center animate-bounce"
          >
            <RefreshCw className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-white text-[#bb00aa] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              {selectedForComparison.length}
            </span>
          </Button>
        </div>
      )}

      <ComparisonDialog open={showComparison} onOpenChange={setShowComparison} comparisonData={getComparisonData()} />
    </div>
  );
}
