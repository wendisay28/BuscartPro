import React from 'react';
import { User, Calendar, MapPin, Image } from 'lucide-react';
import { ExplorerTab } from '../hooks/useExplorer';

interface NavigationTabsProps {
  activeTab: ExplorerTab;
  onTabChange: (tab: ExplorerTab) => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: ExplorerTab; label: string; icon: React.ReactNode }[] = [
    { id: 'artists', label: 'Artista', icon: <User size={16} /> },
    { id: 'events', label: 'Eventos', icon: <Calendar size={16} /> },
    { id: 'venues', label: 'Sitios', icon: <MapPin size={16} /> },
    { id: 'gallery', label: 'Galería', icon: <Image size={16} /> },
  ];

  return (
    <div className="w-full max-w-[380px] mx-auto mb-4">
      <div className="bg-[#0A1A35] bg-opacity-90 border border-white border-opacity-15 rounded-full px-2 py-1.5 flex justify-between">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center justify-center px-3 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-[#FF7A00] text-white'
                : 'text-white hover:bg-[#FF7A00] hover:bg-opacity-20'
            }`}
          >
            <span className="mr-1.5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NavigationTabs;
