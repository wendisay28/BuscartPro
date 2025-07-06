import { ReactNode, useState } from 'react';
import { User, Calendar, MapPin, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { ArtistCard } from './cards/ArtistCard';
import { EventCard } from './cards/EventCard';
import { VenueCard } from './cards/VenueCard';
import { GalleryCard } from './cards/GalleryCard';
import { Artist, EventItem, VenueItem, GalleryItem, CardType, ExplorerTab } from '../types';

type ContentCardProps = {
  type: CardType;
  data: Artist | EventItem | VenueItem | GalleryItem;
  onSwipe?: (direction: 'left' | 'right') => void;
  className?: string;
  activeTab?: ExplorerTab;
  onTabChange?: (tab: ExplorerTab) => void;
};

// Componente que envuelve el contenido para manejar gestos de deslizamiento
const SwipeableContent: React.FC<{
  onSwipe?: (direction: 'left' | 'right') => void;
  children: React.ReactNode;
}> = ({ onSwipe, children }) => {
  if (!onSwipe) return <>{children}</>;
  
  // Implementación básica de detección de gestos de deslizamiento
  let touchStartX = 0;
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!onSwipe) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // Umbral mínimo de desplazamiento para considerar un deslizamiento
    if (Math.abs(diff) > 50) {
      onSwipe(diff > 0 ? 'left' : 'right');
    }
  };
  
  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full h-full"
    >
      {children}
    </div>
  );
};

export const ContentCard = ({
  data,
  onSwipe,
  className = '',
  activeTab = 'artists',
  onTabChange = () => {}
}: ContentCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs: { id: ExplorerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'artists', label: 'Artista', icon: <User size={16} /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={16} /> },
    { id: 'venues', label: 'Sitios', icon: <MapPin size={16} /> },
    { id: 'gallery', label: 'Galería', icon: <ImageIcon size={16} /> },
  ];
  
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];
  
  const handleTabChange = (tabId: ExplorerTab) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };
  if (!data) return null;

  const renderContent = (): ReactNode => {
    // Usar type guard para determinar el tipo de dato
    if ('profession' in data) {
      return <ArtistCard artist={data as Artist} />;
    } else if ('date' in data && 'time' in data) {
      return <EventCard data={data as EventItem} />;
    } else if ('address' in data && 'capacity' in data) {
      return <VenueCard data={data as VenueItem} />;
    } else if ('category' in data && 'price' in data) {
      return <GalleryCard item={data as GalleryItem} />;
    }
  };

  return (
    <div className={`w-full h-full ${className} relative flex flex-col justify-between`}>
      {/* Menú desplegable para móviles - Dentro de la tarjeta */}
      <div className="md:hidden absolute top-3 left-3 z-10">
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-between w-40 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full px-4 py-2 text-white text-sm font-medium"
          >
            <div className="flex items-center">
              <span className="mr-2">{activeTabData.icon}</span>
              {activeTabData.label}
            </div>
            <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isMenuOpen && (
            <div className="absolute mt-1 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg overflow-hidden z-20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as ExplorerTab)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                    activeTab === tab.id
                      ? 'bg-[#bb00aa]/20 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <SwipeableContent onSwipe={onSwipe}>
        <div className="relative w-full h-full overflow-visible">
          {renderContent()}
        </div>
      </SwipeableContent>
    </div>
  );
};