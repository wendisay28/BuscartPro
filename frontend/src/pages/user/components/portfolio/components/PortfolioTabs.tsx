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
  <div className="w-full border-b sticky top-0 bg-white z-10">
    <nav className="flex items-center w-full">
      <div className="flex justify-between w-full max-w-4xl mx-auto px-2">
        {tabs.map((tab: TabItem) => {
          const IconComponent = iconComponents[tab.icon];
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#e74f05]/10 text-[#e74f05] font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  </div>
);
