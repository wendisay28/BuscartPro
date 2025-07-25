export type TabType = 'artists' | 'venues' | 'offers';

export interface FilterState {
  category: string;
  priceMin: number | null;
  priceMax: number | null;
  modality: string[];
  location: string;
  activeTab: TabType;
}
