export interface FilterState {
    category: string;
    priceMin: number | null;
    priceMax: number | null;
    modality: string[];
    location: string;
    activeTab: 'artists' | 'venues' | 'offers';
  }
  
  export interface MapPin {
    id: number;
    lat: number;
    lng: number;
    type: 'artist' | 'venue';
    category: string;
    color: string;
    icon: string;
  }
  
  export interface OfferFormData {
    category: string;
    description: string;
    budgetMin: number;
    budgetMax: number;
    modality: 'presencial' | 'online' | 'ambas';
    eventDate: string;
    eventTime: string;
    location: string;
  }
  