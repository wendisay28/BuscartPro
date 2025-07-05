import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues } from './data/mockData';
import { Artist, EventItem, VenueItem } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { FiltersPanel } from './components/FiltersPanel';
import { Filter } from 'lucide-react';

type ExplorerTab = 'artists' | 'events' | 'venues' | 'gallery';
type ExplorerItem = Artist | EventItem | VenueItem;

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('artists');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Get the current items based on active tab
  const getCurrentItems = (): ExplorerItem[] => {
    switch (activeTab) {
      case 'artists':
        return mockArtists as unknown as ExplorerItem[];
      case 'events':
        return mockEvents as unknown as ExplorerItem[];
      case 'venues':
        return mockVenues as unknown as ExplorerItem[];
      case 'gallery':
        return mockArtists as unknown as ExplorerItem[]; // Usamos los artistas como galería por ahora
      default:
        return mockArtists as unknown as ExplorerItem[];
    }
  };

  const currentItems = getCurrentItems();
  const currentItem = currentItems[activeCardIndex];

  // Reset card index when tab changes
  useEffect(() => {
    setActiveCardIndex(0);
  }, [activeTab]);

  // Swipe handlers for mobile
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (activeCardIndex < currentItems.length - 1) {
        setActiveCardIndex(activeCardIndex + 1);
      }
    },
    onSwipedRight: () => {
      if (activeCardIndex > 0) {
        setActiveCardIndex(activeCardIndex - 1);
      }
    },
    trackMouse: true
  });

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="pt-8 md:pt-0">
        {/* Barra de navegación */}
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="md:mt-2"
        />
        
        {/* Main Content Area: Card and Desktop Controls */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-x-8 px-4 pt-4">
          {/* Botones de acción flotantes */}
          <div className="hidden md:flex flex-col gap-6 fixed left-[31.5rem] top-2/5 -translate-y-1/4 z-50">
            {/* Botón de descartar */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                if (activeCardIndex < currentItems.length - 1) {
                  setActiveCardIndex(activeCardIndex + 1);
                } else if (activeCardIndex > 0) {
                  setActiveCardIndex(0);
                }
              }}
              className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform bg-white/10 hover:bg-pink-500/80 backdrop-blur-sm hover:scale-105 -rotate-2 hover:rotate-0"
              aria-label="Descartar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-white/80 group-hover:text-white transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Botón de conectar */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                // Acción de conectar
              }}
              className="w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform bg-white/10 hover:bg-pink-500/80 backdrop-blur-sm hover:scale-105 rotate-2 hover:rotate-0"
              aria-label="Conectar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-white/80 group-hover:text-white transition-colors duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM9 9h2v2H9V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" />
              </svg>
            </button>
          </div>

          {/* Card Container */}
          <div className="relative w-full max-w-md">
            <div className="transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl -mt-2 md:mt-0 border border-gray-800 rounded-2xl overflow-hidden" {...swipeHandlers}>
              <ContentCard 
                type={activeTab === 'artists' ? 'artist' : 
                      activeTab === 'events' ? 'event' : 
                      activeTab === 'venues' ? 'venue' : 'gallery'}
                data={currentItem}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onSwipe={(direction) => {
                  if (direction === 'left' && activeCardIndex < currentItems.length - 1) {
                    setActiveCardIndex(activeCardIndex + 1);
                  } else if (direction === 'right' && activeCardIndex > 0) {
                    setActiveCardIndex(activeCardIndex - 1);
                  }
                }}
              />
            </div>
            
            {/* Botones de acción - Solo en escritorio */}
            <div className="hidden md:flex absolute top-1/2 right-0 transform translate-x-16 -translate-y-1/2 flex-col gap-3 z-10">
              <button 
                onClick={() => console.log('Me gusta')}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => console.log('Comentarios')}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.84 8.84 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={() => console.log('Guardar')}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
              </button>
              <button 
                onClick={() => console.log('Compartir')}
                className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Botón flotante para filtros en móvil */}
        <button 
          onClick={() => setShowFilters(true)}
          className="md:hidden fixed bottom-6 right-6 bg-pink-600 text-white p-3 rounded-full shadow-lg z-40"
        >
          <Filter className="w-6 h-6" />
        </button>

        {/* Panel de filtros */}
        <FiltersPanel 
          isOpen={showFilters} 
          onClose={() => setShowFilters(false)}
          filterType={activeTab}
        />
      </div>
    </div>
  );
}