export interface Profile {
  id: number;
  name: string;
  title: string;
  category: string;
  rating: number | string; // Can be number or string for flexibility
  reviewCount: number;
  location: string;
  neighborhood?: string;
  // Map-related properties
  lat?: number;
  lng?: number;
  type?: 'artist' | 'venue';
  // Pricing
  price: number;
  basePrice?: number;
  priceUnit: string;
  // Additional info
  services: string[];
  about: string;
  experience: string;
  education?: string;
  imageUrl: string;
  isVerified?: boolean;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
  imageUrl?: string;
}
