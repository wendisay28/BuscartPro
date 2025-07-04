import { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { mockArtists, mockEvents, mockVenues } from './data/mockData';
import { Artist, EventItem, VenueItem } from './types';
import { ContentCard } from './components/ContentCard';
import NavigationTabs from './components/NavigationTabs';
import { FiltersPanel } from './components/FiltersPanel';
import { 
  User as UserIcon, 
  Calendar, 
  MapPin, 
  Image as ImageIcon, 
  Handshake,
  Filter
} from 'lucide-react';

type ExplorerTab = 'artists' | 'events' | 'venues' | 'gallery';
type ExplorerItem = Artist | EventItem | VenueItem;

export default function Explorer() {
  const [activeTab, setActiveTab] = useState<ExplorerTab>('artists');
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
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
        
        {/* Main Content Area: Card and Desktop Controls */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-center gap-x-8 px-4 pt-2">
          {/* Botones de acción flotantes */}
          <div className="hidden md:flex flex-col gap-6 fixed left-[29.25rem] top-1/2 -translate-y-1/2 z-50">
            {/* Botón de descartar */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveButton('rechazar');
                setTimeout(() => setActiveButton(null), 300);
                if (activeCardIndex < currentItems.length - 1) {
                  setActiveCardIndex(activeCardIndex + 1);
                } else if (activeCardIndex > 0) {
                  setActiveCardIndex(0);
                }
              }}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform ${
                activeButton === 'rechazar' 
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 scale-110 shadow-lg shadow-pink-500/30' 
                  : 'bg-white/10 hover:bg-pink-500/80 backdrop-blur-sm hover:scale-105 -rotate-2 hover:rotate-0'
              }`}
              aria-label="Descartar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-7 w-7 transition-colors duration-300 ${
                  activeButton === 'rechazar' ? 'text-white' : 'text-white/80 group-hover:text-white'
                }`} 
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
                setActiveButton('conectar');
                setTimeout(() => setActiveButton(null), 300);
                // Acción de conectar
              }}
              className={`w-14 h-14 flex items-center justify-center rounded-full transition-all duration-300 transform ${
                activeButton === 'conectar' 
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 scale-110 shadow-lg shadow-pink-500/30' 
                  : 'bg-white/10 hover:bg-pink-500/80 backdrop-blur-sm hover:scale-105 rotate-2 hover:rotate-0'
              }`}
              aria-label="Conectar"
            >
              <Handshake 
                className={`h-7 w-7 transition-colors duration-300 ${
                  activeButton === 'conectar' ? 'text-white' : 'text-white/80 group-hover:text-white'
                }`} 
              />
            </button>
          </div>

          {/* Card Container */}
          <div className="w-full max-w-lg">
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
      </div>
      
      {/* Botón flotante para filtros en móvil */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="fixed right-4 bottom-24 bg-[#bb00aa] text-white p-4 rounded-full shadow-lg z-40 md:hidden"
      >
        <Filter size={24} />
      </button>
      
      {/* Panel de filtros */}
      <FiltersPanel 
        isOpen={showFilters} 
        onClose={() => setShowFilters(false)}
        filterType={activeTab}
      />
    </div>
  );
}
