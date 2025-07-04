import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues, mockGallery } from './data/mockData';
import { Artist, EventItem, VenueItem, GalleryItem } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { ExplorerTab } from './hooks/useExplorer';
import { Handshake } from 'lucide-react';

type ExplorerItem = Artist | EventItem | VenueItem | GalleryItem;

export type ContentType = ExplorerTab;

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('artists');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  // Get the current items based on active tab
  const currentItems = (() => {
    switch (activeTab) {
      case 'artists':
        return mockArtists as unknown as ExplorerItem[];
      case 'events':
        return mockEvents as unknown as ExplorerItem[];
      case 'venues':
        return mockVenues as unknown as ExplorerItem[];
      case 'gallery':
        return mockGallery as unknown as ExplorerItem[];
      default:
        return mockArtists as unknown as ExplorerItem[];
    }
  })();

  // Get the current item based on active tab and card index
  const currentItem = currentItems[activeCardIndex];

  // Handle tab change
  const handleTabChange = (tab: ExplorerTab) => {
    setActiveTab(tab);
    setActiveCardIndex(0);
  };

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
      <div className="max-w-md mx-auto pt-2 pb-4 md:pt-4">
        <div className="relative mt-32 md:mt-4">
          <div className="px-4 absolute -top-16 left-0 right-0 md:relative md:top-0">
            <NavigationTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />
          </div>
          
          <div className="mt-4 md:mt-0">
          {/* Card with swipe gestures (mobile) */}
          <div className="relative mt-4" {...swipeHandlers}>
            {/* Current card */}
            <div className="transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl">
              <ContentCard data={currentItem} />
              
              {/* Navigation Buttons - Bottom - Hidden on mobile, visible on md and up */}
              <div className="hidden md:flex justify-center items-center mt-2 space-x-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Acción de conectar
                    // Lógica de conexión aquí
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:scale-105 transform hover:rotate-2"
                  aria-label="Conectar"
                >
                  <Handshake className="h-5 w-5" />
                </button>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Acción de descartar
                    if (activeCardIndex < currentItems.length - 1) {
                      setActiveCardIndex(activeCardIndex + 1);
                    } else if (activeCardIndex > 0) {
                      setActiveCardIndex(0);
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-105 transform hover:-rotate-2"
                  aria-label="Descartar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Swipe indicators */}
            {currentItems.length > 1 && (
              <div className="mt-4 flex justify-center items-center space-x-2">
                {currentItems.map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === activeCardIndex ? 'w-6 bg-[#bb00aa]' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
