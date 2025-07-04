import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues } from './data/mockData';
import { Artist, EventItem, VenueItem } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { 
  User as UserIcon, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  Handshake
} from 'lucide-react';

type ExplorerTab = 'artists' | 'events' | 'venues' | 'gallery';
type ExplorerItem = Artist | EventItem | VenueItem;

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('artists');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  
  // Get the current items based on active tab
  const getCurrentItems = () => {
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

  // Get the current item based on active tab and card index
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
      <div className="pt-12 md:pt-2">
        {/* Barra de navegación - Solo móviles */}
        <div className="md:hidden fixed top-3 left-3 z-10">
          <NavigationTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            className="!mb-0"
          />
        </div>
        
        {/* Barra de navegación - Solo escritorio */}
        <div className="hidden md:flex justify-center mb-1">
          <div className="w-[90%] max-w-sm bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full px-1 py-1">
            <div className="grid grid-cols-4 h-full gap-1">
              <button 
                className={`flex flex-col items-center justify-center h-full rounded-full transition-all duration-200 ${
                  activeTab === 'artists' 
                    ? 'text-white bg-[#bb00aa] shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-[#bb00aa]/20'
                }`}
                onClick={() => setActiveTab('artists')}
              >
                <UserIcon className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] font-medium leading-none">Artistas</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center h-full rounded-full transition-all duration-200 ${
                  activeTab === 'events' 
                    ? 'text-white bg-[#bb00aa] shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-[#bb00aa]/20'
                }`}
                onClick={() => setActiveTab('events')}
              >
                <Calendar className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] font-medium leading-none">Eventos</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center h-full rounded-full transition-all duration-200 ${
                  activeTab === 'venues' 
                    ? 'text-white bg-[#bb00aa] shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-[#bb00aa]/20'
                }`}
                onClick={() => setActiveTab('venues')}
              >
                <MapPin className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] font-medium leading-none">Sitios</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center h-full rounded-full transition-all duration-200 ${
                  activeTab === 'gallery' 
                    ? 'text-white bg-[#bb00aa] shadow-md' 
                    : 'text-gray-300 hover:text-white hover:bg-[#bb00aa]/20'
                }`}
                onClick={() => setActiveTab('gallery')}
              >
                <ImageIcon className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[9px] font-medium leading-none">Galería</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Card Container */}
        <div className="w-full max-w-md mx-auto px-2 md:px-4 pt-2">
          <div className="w-full">
            <div className="transition-transform duration-300 transform hover:scale-[1.02] hover:shadow-xl -mt-2 md:mt-0" {...swipeHandlers}>
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
          </div>
        </div>
        
        {/* Controles de navegación - Solo escritorio */}
        <div className="hidden md:flex justify-center items-center mt-6 space-x-8">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Acción de conectar
              // Lógica de conexión aquí
            }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:scale-105 transform hover:rotate-2"
            aria-label="Conectar"
          >
            <Handshake className="h-6 w-6" />
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
            className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:scale-105 transform hover:-rotate-2"
            aria-label="Descartar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
