import { useState } from "react";

export type ExplorerTab = "artists" | "events" | "venues" | "gallery";

export const useExplorer = () => {
  const [activeTab, setActiveTab] = useState<ExplorerTab>("artists");

  const handleTabChange = (tabId: ExplorerTab) => {
    setActiveTab(tabId);
  };

  return {
    activeTab,
    handleTabChange,
  };
};