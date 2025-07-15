export type ArtistType = 'Música' | 'Fotografía' | 'Escena' | 'Imagen' | 'Contenido' | 'Diseño';

export interface Artist {
  id: number;
  name: string;
  type: ArtistType;
  subType?: string;
  isOnline: boolean;
  rating: number;
  distance: number;
  pricePerHour: number;
  latitude: number;
  longitude: number;
  experience?: number;
  genres?: string[];
  specialties?: string[];
  profileImage?: string | null;
  description?: string | null;
  
  // Optional properties from the original type
  imageUrl?: string;
  categories?: string[];
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  stats?: {
    completedJobs: number;
    responseRate: number;
    responseTime: string;
  };
  portfolio?: string[];
  availability?: {
    days: string[];
    timeSlots: string[];
  };
  languages?: string[];
  location?: {
    city: string;
    country: string;
    address?: string;
  };
  reviews?: Array<{
    id: number;
    rating: number;
    comment: string;
    author: string;
    date: string;
  }>;
}
