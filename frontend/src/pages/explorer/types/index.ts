// Base interface for all content types
export interface BaseContent {
  id: string;
  type: 'event' | 'artist' | 'venue' | 'recommendation';
  title: string;
  description: string;
  image: string;
  images?: string[];
  city?: string;
  isVerified?: boolean;
  rating?: number;
}

// Specific type for Events
export interface EventContent extends BaseContent {
  type: 'event';
  date: string;
  time: string;
  tags?: string[];
  price?: string;
}

// Specific type for Artists
export interface ArtistContent extends BaseContent {
  type: 'artist';
  genre: string;
  specialties?: string[];
  priceRange?: string;
}

// Specific type for Venues (Sitios)
export interface VenueContent extends BaseContent {
  type: 'venue';
  address: string;
  capacity?: number;
}

// Specific type for Recommendations
export interface RecommendationContent extends BaseContent {
  type: 'recommendation';
  category: string;
  author?: string;
}

// Union type for any content item
export type ContentItem = EventContent | ArtistContent | VenueContent | RecommendationContent;

export type ExplorerTab = 'artists' | 'studios';

export interface ExplorerState {
  activeTab: ExplorerTab;
  currentIndex: number;
  currentImageIndex: number;
  isSwiping: boolean;
  swipeOffset: number;
  startX: number;
  likedItems: number[];
  bookmarkedItems: number[];
  currentData: ContentItem[];
  isLoading: boolean;
}
