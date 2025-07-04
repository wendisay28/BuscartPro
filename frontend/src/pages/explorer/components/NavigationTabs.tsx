import React, { useState } from 'react';
import { User, Calendar, MapPin, Image, ChevronDown } from 'lucide-react';
import { ExplorerTab } from '../hooks/useExplorer';

interface NavigationTabsProps {
  activeTab: ExplorerTab;
  onTabChange: (tab: ExplorerTab) => void;
  className?: string;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs: { id: ExplorerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'artists', label: 'Artista', icon: <User size={16} /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={16} /> },
    { id: 'venues', label: 'Sitios', icon: <MapPin size={16} /> },
    { id: 'gallery', label: 'Galería', icon: <Image size={16} /> },
  ];

  // Encontrar la pestaña activa actual
  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  const handleTabChange = (tabId: ExplorerTab) => {
    onTabChange(tabId);
    setIsMenuOpen(false); // Cerrar el menú al seleccionar una opción
  };

  return (
    <div className={`w-full max-w-md mx-auto mb-2 md:mb-6 px-1 relative ${className}`}>
      {/* Menú desplegable para móviles */}
      <div className="md:hidden absolute left-1 top-0 z-10">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-between w-40 bg-gray-900 bg-opacity-90 border border-gray-700 rounded-full px-4 py-2 text-white text-sm font-medium"
        >
          <div className="flex items-center">
            <span className="mr-2">{activeTabData.icon}</span>
            {activeTabData.label}
          </div>
          <ChevronDown size={16} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isMenuOpen && (
          <div className="absolute mt-1 w-48 bg-gray-900 bg-opacity-95 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'bg-[#bb00aa] text-white'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Pestañas de navegación para escritorio */}
      <div className="hidden md:block">
        <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-full px-2 py-1.5 flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-[#bb00aa] text-white shadow-[0_0_10px_rgba(187,0,170,0.5)]'
                  : 'text-white hover:bg-[#bb00aa] hover:bg-opacity-20'
              }`}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;
