import { useState } from 'react';
import NavigationHeader from '@/components/navigation-header';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues, mockGallery } from './data/mockData';
import { Artist, EventItem, VenueItem, GalleryItem } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { ExplorerTab } from './hooks/useExplorer';

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
    <div className="min-h-screen bg-black">
      <NavigationHeader />
      <div className="max-w-md mx-auto pt-8">
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        
        <div className="relative mt-8">
          {/* Left Navigation Button */}
          <div className="hidden md:flex absolute left-0 -ml-12 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => activeCardIndex > 0 && setActiveCardIndex(activeCardIndex - 1)}
              disabled={activeCardIndex === 0}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/90 backdrop-blur-sm text-white hover:bg-[#bb00aa] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:scale-105"
              aria-label="Anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          {/* Card with swipe gestures (mobile) */}
          <div className="mt-8 mb-16 md:mb-6 relative" {...swipeHandlers}>
            {/* Current card */}
            <div className="transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl">
              <ContentCard data={currentItem} />
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
            
            {/* Swipe hint for first-time users (only on mobile) */}
            <div className="mt-6 text-center md:hidden">
              <p className="text-sm text-white/60">Desliza para ver más</p>
              <div className="flex justify-center mt-2 space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Right Navigation Button */}
          <div className="hidden md:flex absolute right-0 -mr-12 top-1/2 -translate-y-1/2 z-10">
            <button 
              onClick={() => activeCardIndex < currentItems.length - 1 && setActiveCardIndex(activeCardIndex + 1)}
              disabled={activeCardIndex === currentItems.length - 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/90 backdrop-blur-sm text-white hover:bg-[#bb00aa] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed shadow-md hover:scale-105"
              aria-label="Siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
