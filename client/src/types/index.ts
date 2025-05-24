
/**
 * Tipos compartidos para toda la aplicación
 */

export interface User {
  id: string;
  email: string;
  userType: 'artist' | 'company' | 'regular';
  isVerified?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  category: string;
  rating?: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  artistId: string;
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
}
