import React, { useState } from 'react';
import { User, Calendar, MapPin, Image, ChevronDown } from 'lucide-react';
import { ExplorerTab } from '../types';

interface NavigationTabsProps {
  activeTab: ExplorerTab;
  onTabChange: (tab: ExplorerTab) => void;
  className?: string;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange, className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const tabs: { id: ExplorerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'artists', label: 'Artistas', icon: <User size={14} className="flex-shrink-0" /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={14} className="flex-shrink-0" /> },
    { id: 'venues', label: 'Sitios', icon: <MapPin size={14} className="flex-shrink-0" /> },
    { id: 'gallery', label: 'Galería', icon: <Image size={14} className="flex-shrink-0" /> },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

  const handleTabChange = (tabId: ExplorerTab) => {
    onTabChange(tabId);
    setIsMenuOpen(false);
  };

  return (
    <div className={`w-full max-w-md mx-auto px-4 ${className}`}>
      {/* Versión móvil */}
      <div className="md:hidden fixed top-3 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center justify-between w-40 bg-gray-900/90 border border-gray-700 rounded-full px-4 py-2 text-white text-sm font-medium"
        >
          <div className="flex items-center gap-2">
            {activeTabData.icon}
            <span className="truncate text-sm">{activeTabData.label}</span>
          </div>
          <ChevronDown size={14} className={`transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isMenuOpen && (
          <div className="absolute left-0 mt-1.5 w-44 bg-gray-900/95 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#bb00aa] text-white'
                    : 'text-white hover:bg-gray-800'
                }`}
              >
                {React.cloneElement(tab.icon as React.ReactElement, { size: 16 })}
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Versión escritorio */}
      <div className="hidden md:block">
        <div className="bg-gray-900/90 border border-gray-700 rounded-full px-3 py-1.5">
          <div className="flex justify-between items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white bg-[#bb00aa] shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-[#bb00aa]/20'
                }`}
              >
                {React.cloneElement(tab.icon as React.ReactElement, { size: 16 })}
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;