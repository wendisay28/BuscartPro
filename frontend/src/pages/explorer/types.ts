export type CardType = 'artist' | 'event' | 'venue' | 'gallery';

export type ExplorerTab = 'artists' | 'events' | 'venues' | 'gallery';

export interface BaseItem {
  id: string;
  name: string;
  image: string;
  images?: string[];
  price?: number;
  rating?: number;
  reviews?: number;
  tags: string[];
  city?: string;
  distance?: string;
  verified?: boolean;
  description: string;
}

export interface Artist extends BaseItem {
  profession: string;
  availability?: string;
  stats?: {
    responseTime?: string;
    projectsCompleted?: number;
    languages?: string[];
  };
}

export interface EventItem extends BaseItem {
  date: string;
  time: string;
  location: string;
  type: 'free' | 'paid';
  category: string;
  duration?: string;
  capacity?: number;
}

export interface VenueItem extends BaseItem {
  address: string;
  capacity: number;
  amenities: string[];
  openingHours: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface GalleryItem extends BaseItem {
  type: 'image' | 'video';
  views: number;
  likes: number;
  comments: number;
}

export interface ContentCardProps {
  type: CardType;
  data: Artist | EventItem | VenueItem | GalleryItem;
  onSwipe?: (direction: 'left' | 'right') => void;
  className?: string;
  activeTab: ExplorerTab;
  onTabChange: (tab: ExplorerTab) => void;
}