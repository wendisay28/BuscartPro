import { TabItem } from '../../../data/portfolio.mock';
import { Briefcase, ShoppingBag, Image as ImageIcon, Video, Star } from 'lucide-react';

interface PortfolioTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  Briefcase,
  ShoppingBag,
  Image: ImageIcon,
  Video,
  Star,
};

export const PortfolioTabs = ({ tabs, activeTab, onTabChange }: PortfolioTabsProps) => (
  <div className="w-full sticky top-0 bg-[#141b2a] z-10 shadow-md rounded-t-2xl rounded-b-2xl border border-gray-700/50 overflow-hidden">
    <nav className="flex items-center w-full">
      <div className="flex justify-between w-full max-w-4xl mx-auto px-4 py-1">
        {tabs.map((tab: TabItem) => {
          const IconComponent = iconComponents[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center justify-center px-4 py-3 text-left transition-colors ${
                activeTab === tab.id
                  ? 'text-white font-medium border-b-2 border-orange-500 bg-[#1e293b] rounded-t-lg mx-1'
                  : 'text-white/80 hover:bg-[#1e293b]/80 hover:text-white mx-1 rounded-lg'
              }`}
            >
              {IconComponent && <IconComponent className="w-5 h-5 mr-2 text-current" />}
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  </div>
);
