import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues, mockGalleryItems } from './data/mockData';
import { Artist, EventItem, VenueItem, GalleryItem, CardType, ExplorerTab } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { FiltersPanel } from './components/FiltersPanel';
import { EventFiltersPanel } from './components/EventFiltersPanel';
import { GalleryFiltersPanel } from './components/GalleryFiltersPanel';
import Sidebar from './components/Sidebar';
import { Sliders } from 'lucide-react';
import { VenueFiltersPanel } from './components/VenueFiltersPanel';

type ExplorerItem = Artist | EventItem | VenueItem | GalleryItem;

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('artists');
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Estado del panel desplegable
  const [showFilters, setShowFilters] = useState(true);

  // Estados de filtros avanzados
  const [distance, setDistance] = useState<number>(50);
  const [price, setPrice] = useState<number>(50000);
  const [category, setCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  const [profession, setProfession] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [format, setFormat] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Obtener items según pestaña activa
  const getCurrentItems = (): ExplorerItem[] => {
    switch (activeTab) {
      case 'artists':
        return mockArtists as ExplorerItem[];
      case 'events':
        return mockEvents as ExplorerItem[];
      case 'venues':
        return mockVenues as ExplorerItem[];
      case 'gallery':
        return mockGalleryItems as ExplorerItem[];
      default:
        return mockArtists as ExplorerItem[];
    }
  };

  const currentItems = getCurrentItems();
  const currentItem = currentItems[activeCardIndex];

  // Reset index al cambiar pestaña
  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeTab]);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && activeCardIndex > 0) {
      setActiveCardIndex(prev => prev - 1);
    } else if (direction === 'left' && activeCardIndex < currentItems.length - 1) {
      setActiveCardIndex(prev => prev + 1);
    }
  };

  const getCardType = (tab: ExplorerTab): CardType => {
    switch (tab) {
      case 'artists': return 'artist';
      case 'events': return 'event';
      case 'venues': return 'venue';
      case 'gallery': return 'gallery';
      default: return 'artist';
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  const handleResetFilters = () => {
    setDistance(50);
    setPrice(50000);
    setCategory('');
    setSubCategory('');
    setProfession('');
    setFormat('');
    setSortBy('rating');
    setSelectedDate(null);
  };

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-x-visible relative">
      <div className="flex w-full relative">
        {/* Sidebar */}
        <div className="w-1/4 fixed left-45 top-28 bottom-[calc(4rem-9px)] z-50 overflow-y-auto">
          <div className="h-full pr-6">
            <Sidebar />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="w-[40%] mx-auto px-4 pt-2">
          <div className="flex justify-center w-full mb-3">
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              className="md:mt-2"
            />
          </div>

          <div 
            className="relative w-full max-w-md mx-auto"
            {...swipeHandlers}
          >
            <ContentCard
              type={getCardType(activeTab)}
              data={currentItem}
              onSwipe={handleSwipe}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            
            {/* Botones de acción debajo de la tarjeta - Solo visibles en md y superiores */}
            <div className="hidden md:flex justify-center gap-6 -mt-2 -translate-y-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeCardIndex < currentItems.length - 1) {
                    setActiveCardIndex(activeCardIndex + 1);
                  } else if (activeCardIndex > 0) {
                    setActiveCardIndex(0);
                  }
                }}
                className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform bg-white/10 hover:bg-[#bb00aa] backdrop-blur-sm hover:scale-105 -rotate-2 hover:rotate-0"
                aria-label="Descartar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí va la lógica de conectar
                }}
                className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform bg-white/10 hover:bg-[#bb00aa] backdrop-blur-sm hover:scale-105 rotate-2 hover:rotate-0"
                aria-label="Conectar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-white/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Panel de filtros */}
        <div className="w-64 fixed right-32 top-28 bottom-[calc(4rem-9px)] overflow-y-auto z-50 transform -translate-x-[5.25rem]">
          {showFilters ? (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 h-full overflow-y-auto">
              {activeTab === 'events' ? (
                <EventFiltersPanel
                  isOpen={true}
                  onToggle={() => setShowFilters(false)}
                  distance={distance}
                  setDistance={setDistance}
                  price={price}
                  setPrice={setPrice}
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  format={format}
                  setFormat={setFormat}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onResetFilters={handleResetFilters}
                />
              ) : activeTab === 'venues' ? (
                <VenueFiltersPanel
                  isOpen={true}
                  onToggle={() => setShowFilters(false)}
                  distance={distance}
                  setDistance={setDistance}
                  price={price}
                  setPrice={setPrice}
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onResetFilters={handleResetFilters}
                />
              ) : activeTab === 'gallery' ? (
                <GalleryFiltersPanel
                  isOpen={true}
                  onToggle={() => setShowFilters(false)}
                  distance={distance}
                  setDistance={setDistance}
                  price={price}
                  setPrice={setPrice}
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onResetFilters={handleResetFilters}
                />
              ) : activeTab === 'artists' ? (
                <FiltersPanel
                  isOpen={true}
                  onToggle={() => setShowFilters(false)}
                  distance={distance}
                  setDistance={setDistance}
                  price={price}
                  setPrice={setPrice}
                  category={category}
                  setCategory={setCategory}
                  subCategory={subCategory}
                  setSubCategory={setSubCategory}
                  profession={profession}
                  setProfession={setProfession}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  onResetFilters={handleResetFilters}
                />
              ) : (
                <div className="text-white p-2">No hay filtros disponibles para esta pestaña.</div>
              )}
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-2">
              <button
                onClick={() => setShowFilters(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 text-white py-2 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Sliders className="w-4 h-4 md:hidden" />
                <span className="hidden md:inline">Filtros</span>
                <Sliders className="hidden md:inline w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
