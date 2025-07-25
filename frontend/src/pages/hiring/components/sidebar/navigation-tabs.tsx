import { cn } from "@/lib/utils";
import { Users, Building, Zap } from "lucide-react";
import type { TabType } from "@/types/filters";

interface NavigationTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { 
    id: 'artists', 
    label: 'Artistas', 
    icon: Users,
    activeColor: 'bg-pink-500 text-white',
    inactiveColor: 'text-gray-400 hover:bg-gray-800',
    iconColor: 'text-pink-400'
  },
  { 
    id: 'venues', 
    label: 'Sitios', 
    icon: Building,
    activeColor: 'bg-blue-500 text-white',
    inactiveColor: 'text-gray-400 hover:bg-gray-800',
    iconColor: 'text-blue-400'
  },
  { 
    id: 'offers', 
    label: 'Ofertas', 
    icon: Zap,
    activeColor: 'bg-amber-500 text-white',
    inactiveColor: 'text-gray-400 hover:bg-gray-800',
    iconColor: 'text-amber-400'
  },
] as const;

export function NavigationTabs({ activeTab, onTabChange }: NavigationTabsProps) {
  return (
    <div className="flex bg-gray-900 rounded-lg p-1 border border-gray-800">
      {tabs.map(({ id, label, icon: Icon, activeColor, inactiveColor, iconColor }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={cn(
            "flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md transition-all duration-200 text-sm font-medium",
            activeTab === id 
              ? `${activeColor} shadow-md` 
              : `${inactiveColor} hover:bg-gray-800`
          )}
        >
          <Icon 
            size={16} 
            className={cn(
              activeTab === id ? 'text-white' : iconColor,
              'transition-colors duration-200'
            )} 
          />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
