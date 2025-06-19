import { useState, useMemo } from "react";
import { ContentCard } from "./components";
import NavigationTabs from "./components/NavigationTabs";
import { useExplorer } from "./hooks/useExplorer";
import { mockArtists, mockEvents, mockVenues, mockGallery } from "./data/mockData";
import type { Artist, EventItem, VenueItem, GalleryItem } from "./types";

// Tipo para los ítems del explorador
type ExplorerItem = Artist | EventItem | VenueItem | GalleryItem;



export default function Explorer() {
  const { activeTab, handleTabChange } = useExplorer();
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Get the current items based on active tab
  const currentItems = useMemo<ExplorerItem[]>(() => {
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
  }, [activeTab]);

  // Get the current item based on active tab and card index
  const currentItem = currentItems[activeCardIndex];

  if (!currentItem) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  // Render content based on the active tab
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-md mx-auto">
        <NavigationTabs 
          activeTab={activeTab}
          onTabChange={(tab) => {
            handleTabChange(tab);
            setActiveCardIndex(0);
          }}
        />
        
        <div className="mt-8 mb-6">
          <ContentCard data={currentItem} />
        </div>
        
        {/* Navigation Buttons */}
        {currentItems.length > 1 && (
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => {
                if (activeCardIndex > 0) {
                  setActiveCardIndex(activeCardIndex - 1);
                }
              }} 
              disabled={activeCardIndex === 0}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center px-4 bg-white rounded-full shadow-sm">
              <span className="text-sm font-medium text-gray-700">
                {activeCardIndex + 1} <span className="text-gray-400">/ {currentItems.length}</span>
              </span>
            </div>
            <button 
              onClick={() => {
                if (activeCardIndex < currentItems.length - 1) {
                  setActiveCardIndex(activeCardIndex + 1);
                }
              }} 
              disabled={activeCardIndex === currentItems.length - 1}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}