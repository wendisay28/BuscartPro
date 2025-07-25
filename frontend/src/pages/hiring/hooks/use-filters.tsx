import { useState } from "react";
import type { FilterState, TabType } from "@/types/filters";

const DEFAULT_TAB: TabType = 'artists';

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    category: "",
    priceMin: null,
    priceMax: null,
    modality: [],
    location: "",
    activeTab: DEFAULT_TAB,
  });

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev: FilterState) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      priceMin: null,
      priceMax: null,
      modality: [],
      location: "",
      activeTab: DEFAULT_TAB,
    });
  };

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}
