import { ReactNode, useState } from 'react';
import { ArtistCard } from './cards/ArtistCard';
import { EventCard } from './cards/EventCard';
import { VenueCard } from './cards/VenueCard';
import { Artist, EventItem, VenueItem, GalleryItem, CardType, ExplorerTab } from '../types';
import { 
  User, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Heart, 
  MessageSquare, 
  Share2, 
  Bookmark 
} from 'lucide-react';

// Componente para manejar la tarjeta de galería
const GalleryCard = ({ galleryItem }: { galleryItem: GalleryItem }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const images = galleryItem.images || [galleryItem.image];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.image-container') && !target.closest('.navigation-button')) {
      const rect = target.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      
      if (images.length <= 1) return;
      
      if (clickX < width / 2) {
        setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      } else {
        setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }
  };

  return (
    <div className="relative w-full h-[700px] mx-auto bg-gray-900 rounded-[20px] overflow-hidden shadow-xl md:h-[800px] md:w-[500px] flex flex-col">
      {/* Contenedor de la imagen - 65% en escritorio */}
      <div 
        className="relative w-full h-[600px] md:flex-[0_0_65%] bg-gray-900 image-container" 
        style={{ flex: '0 0 65%' }}
        onClick={handleCardClick}
      >
        <img 
          src={images[currentImageIndex]} 
          alt={galleryItem.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Navegación de imágenes */}
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full navigation-button z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full navigation-button z-10"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Indicadores de imagen */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 rounded-full transition-all ${index === currentImageIndex ? 'w-6 bg-[#bb00aa]' : 'w-2 bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Botón de información */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMoreInfo(!showMoreInfo);
          }}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full z-10"
        >
          <Info size={20} />
        </button>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-[16px] text-white">{galleryItem.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400 text-[10px]">{galleryItem.city || 'Ubicación no disponible'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-black/5 px-2 py-1 rounded-full">
            <MapPin size={14} className="text-[#bb00aa]" />
            <span className="text-xs font-medium">{galleryItem.distance} km</span>
          </div>
        </div>
        
        {/* Sección de información adicional */}
        {showMoreInfo && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-gray-300 text-[10px] leading-tight">{galleryItem.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {galleryItem.tags?.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Acciones */}
        <div className="mt-3 flex justify-between items-center pt-2 border-t border-gray-800">
          <div className="flex gap-4">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="text-gray-400 hover:text-[#bb00aa] transition-colors"
            >
              <Heart size={16} fill={isLiked ? '#bb00aa' : 'none'} />
            </button>
            <button className="text-gray-400 hover:text-[#bb00aa] transition-colors">
              <MessageSquare size={16} />
            </button>
            <button className="text-gray-400 hover:text-[#bb00aa] transition-colors">
              <Share2 size={16} />
            </button>
          </div>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className="text-gray-400 hover:text-[#bb00aa] transition-colors"
          >
            <Bookmark size={16} fill={isSaved ? '#bb00aa' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

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
    } else {
      return <GalleryCard galleryItem={data as GalleryItem} />;
    }
  };

  return (
    <div className={`w-full h-full ${className} relative`}>
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
        {renderContent()}
      </SwipeableContent>
    </div>
  );
};
