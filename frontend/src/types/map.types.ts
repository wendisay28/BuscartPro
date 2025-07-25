export interface MapPin {
  id: string;
  lat: number;
  lng: number;
  title: string;
  category: string;
  type: 'artist' | 'venue';
  rating?: number;
  price?: number;
  priceUnit?: string;
  imageUrl?: string;
  isVerified?: boolean;
  onClick?: () => void;
}
