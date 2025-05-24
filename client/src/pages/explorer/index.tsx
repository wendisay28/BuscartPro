import { useState, useRef } from "react";
import { ExplorerHeader } from "./components/ExplorerHeader";
import { ContentCard } from "./components/ContentCard";
import { TabButton } from "./components/TabButton";
import { FiltersSidebar } from "./components/FiltersSidebar";
import { FiltersDialog } from "./components/FiltersDialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockArtists, mockEvents, mockVenues, mockRecommendations } from "./data/mockData";

type ContentType = 'artists' | 'events' | 'venues' | 'recommendations';

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
  const dragStart = useRef({ x: 0, y: 0 });
  const dragCurrent = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

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

  const handleMouseDown = (e: React.MouseEvent) => {
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragCurrent.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;
      dragCurrent.current = { x: deltaX, y: deltaY };
  };

  const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const threshold = 100;
      if (Math.abs(dragCurrent.current.x) > threshold) {
          nextCard();
      }
      dragCurrent.current = { x: 0, y: 0 };
  };

  const nextCard = () => {
      setCurrentIndex((prev) => (prev + 1) % currentData.length);
  };


  const handleLike = () => {
    nextCard();
  };

  const handleBookmark = () => {
    nextCard();
  };

  const TabButtonComponent = ({ type, label }: { type: ContentType; label: string }) => (
    <button
      className={`text-xs px-3 py-1 h-8 transition-all ${
        activeTab === type 
          ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600" 
          : "bg-white text-gray-700 border-gray-300 hover:bg-orange-50 hover:border-orange-300"
      }`}
      onClick={() => {
        setActiveTab(type);
        setCurrentIndex(0);
      }}
    >
      {label}
    </button>
  );

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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            dragCurrentX={dragCurrent.current.x}
            dragCurrentY={dragCurrent.current.y}
            isDragging={isDragging.current}
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