import { useState } from 'react';
import { Home, Search, Heart, User, Plus } from 'lucide-react';
type NavItem = {
  name: string;
  icon: React.ReactNode;
  active: boolean;
};

export function MobileNav() {
  const [activeTab, setActiveTab] = useState('home');

  const navItems: NavItem[] = [
    { name: 'Inicio', icon: <Home size={20} />, active: activeTab === 'home' },
    { name: 'Explorar', icon: <Search size={20} />, active: activeTab === 'explore' },
    { name: 'Contratar', icon: <Plus size={24} className="text-blue-500" />, active: false },
    { name: 'Favoritos', icon: <Heart size={20} />, active: activeTab === 'favorites' },
    { name: 'Perfil', icon: <User size={20} />, active: activeTab === 'profile' },
  ];

  return (
    <nav className="bottom-nav px-4 py-2">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name.toLowerCase())}
            className={`flex flex-col items-center justify-center w-full py-2 ${item.active ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <span className={item.name === 'Contratar' ? 'bg-blue-500 text-white p-2 rounded-full -mt-8' : ''}>
              {item.icon}
            </span>
            <span className="text-xs mt-1">{item.name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
