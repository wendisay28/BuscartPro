import { ExplorerTab } from "../hooks/useExplorer";
import { cn } from "@/lib/utils";

interface ExplorerTabConfig {
  id: ExplorerTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ExplorerTabsProps {
  activeTab: ExplorerTab;
  tabs: ExplorerTabConfig[];
  onTabChange: (tab: ExplorerTab) => void;
  className?: string;
}

export const ExplorerTabs = ({
  activeTab,
  tabs,
  onTabChange,
  className = "",
}: ExplorerTabsProps) => {
  return (
    <div className={cn("flex justify-between bg-white rounded-full p-1 shadow-sm overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-full",
              "text-sm font-medium transition-all min-w-[80px] whitespace-nowrap",
              isActive 
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            <tab.icon className={cn("h-5 w-5 mb-1 transition-transform", {
              "scale-110": isActive
            })} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};