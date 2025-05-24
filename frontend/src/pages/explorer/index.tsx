import { useState, useRef } from "react";
import { ExplorerHeader } from "./components/ExplorerHeader";
import { ContentCard } from "./components/ContentCard";
import { FiltersSidebar } from "./components/FiltersSidebar";
import { FiltersDialog } from "./components/FiltersDialog";
import { TabList } from "./components/TabList";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockArtists, mockEvents, mockVenues, mockRecommendations } from "./data/mockData";

export type ContentType = 'artists' | 'events' | 'venues' | 'recommendations';

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ContentType>('artists');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    priceRange: [0, 1000],
    rating: 0,
    search: ''
  });

  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);

  const getData = () => {
    switch (activeTab) {
      case 'artists': return mockArtists;
      case 'events': return mockEvents;
      case 'venues': return mockVenues;
      case 'recommendations': return mockRecommendations;
      default: return [];
    }
  };

  const currentData = getData();
  const currentItem = currentData[currentIndex];

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % currentData.length);
  };

  const handleLike = () => nextCard();
  const handleBookmark = () => nextCard();

  if (!currentItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 p-4">
        <div className="max-w-md mx-auto text-center py-20">
          <p className="text-gray-500">No hay contenido disponible</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-black/5">
      <ExplorerHeader
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="flex max-w-7xl mx-auto px-4 py-6">
        <div className={`${isMobile ? 'w-full' : 'flex-1 mr-6'} flex justify-center`}>
          <ContentCard
            ref={cardRef}
            item={currentItem}
            onLike={handleLike}
            onBookmark={handleBookmark}
          />
        </div>

        {!isMobile && (
          <FiltersSidebar
            filters={filters}
            setFilters={setFilters}
          />
        )}
      </div>

      {isMobile && (
        <FiltersDialog
          open={showFilters}
          onOpenChange={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}