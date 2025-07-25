export interface Profile {
  id: number;
  name: string;
  type: 'artist' | 'venue';
  category: string;
  title: string;
  about: string;
  experience: string;
  education?: string;
  description: string;
  location: string;
  neighborhood: string;
  lat: number;
  lng: number;
  price: number;
  basePrice: number;
  priceUnit: string;
  rating: number | string;
  reviewCount: number;
  imageUrl: string;
  services: string[];
  isActive: boolean;
  isVerified?: boolean;
  createdAt: string;
  [key: string]: any; // Add index signature for additional properties
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  category: string;
  budgetMin: number;
  budgetMax: number;
  modality: string;
  location?: string;
  eventDate: string;
  eventTime: string;
  status: 'active' | 'closed' | 'completed';
  createdAt: string;
}
