import { useState } from 'react';
import { Home, Calendar, MapPin, Users, Heart, Plus, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type SidebarItem = {
  name: string;
  icon: React.ReactNode;
  active: boolean;
};

export function DesktopSidebar() {
  const [activeTab, setActiveTab] = useState('escena');
  const isMobile = useIsMobile();

  const sidebarItems: SidebarItem[] = [
    { name: 'Escena', icon: <Home size={24} />, active: activeTab === 'escena' },
    { name: 'Artistas', icon: <Users size={24} />, active: activeTab === 'artistas' },
    { name: 'Eventos', icon: <Calendar size={24} />, active: activeTab === 'eventos' },
    { name: 'Sitios', icon: <MapPin size={24} />, active: activeTab === 'sitios' },
    { name: 'Favoritos', icon: <Heart size={24} />, active: activeTab === 'favoritos' },
    { name: 'Contratar', icon: <Plus size={24} />, active: activeTab === 'contratar' },
  ];

  if (isMobile) return null;

  return (
    <aside className="sidebar-nav flex flex-col items-center py-6">
      <div className="mb-8">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
          B
        </div>
      </div>
      
      <nav className="flex-1 w-full space-y-6">
        {sidebarItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name.toLowerCase())}
            className={`w-full flex flex-col items-center py-3 ${item.active ? 'text-blue-500' : 'text-gray-400 hover:text-white'}`}
          >
            <span className={item.active ? 'text-blue-500' : ''}>
              {item.icon}
            </span>
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </nav>
      
      <div className="mt-auto">
        <button className="flex flex-col items-center text-gray-400 hover:text-white py-3">
          <LogOut size={24} />
          <span className="text-xs mt-1">Salir</span>
        </button>
      </div>
    </aside>
  );
}
