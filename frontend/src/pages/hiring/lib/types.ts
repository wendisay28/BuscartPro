import { Icon, DivIcon } from 'leaflet';

export interface MapMarker {
  id: number;
  position: [number, number];
  title: string;
  type: string;
}

export interface Location {
  address: string;
  coordinates: [number, number];
}

export interface OfferFormData {
  artistType: string;
  eventLocation: Location;
  eventTime: string;
  budget: number;
  notes?: string;
}

export interface Artist {
  id: number;
  name: string;
  type: string;
  subType?: string;
  rating: number;
  distance: number;
  profileImage?: string | null;
  specialties?: string[];
  genres?: string[];
  description?: string | null;
  latitude: number;
  longitude: number;
  pricePerHour: number;
  isOnline: boolean;
  experience?: number;
}

export type ResponseStatus = 'pending' | 'accepted' | 'rejected' | 'negotiating';

export interface ArtistResponse {
  id: number;
  offerId: number;
  artistId: number;
  proposedPrice: number;
  message: string | null;
  status: ResponseStatus;
  createdAt: string;
  artist: Artist;
}

export interface ArtistResponseWithArtist extends Omit<ArtistResponse, 'artistId'> {
  artist: Artist;
}

export interface AcceptedOffer {
  offerId: number;
  artistLocation: [number, number];
  eventLocation: {
    address: string;
    coordinates: [number, number];
  };
  artistName: string;
  artistPhone: string;
  estimatedArrival: string;
  proposedPrice: number;
}

export interface Offer {
  id: number;
  eventLocation: {
    address: string;
    coordinates: [number, number];
  };
  eventTime: string;
  budget: number;
  artistType: string;
  notes?: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

// Tipos para el WebSocket
export interface WebSocketMessage<T = any> {
  type: 'NEW_RESPONSE' | 'STATUS_UPDATE' | 'ERROR';
  payload?: T;
  responseId?: number;
  status?: string;
}

export interface UseWebSocketProps {
  offerId: number | null;
  onNewResponse?: (response: ArtistResponse) => void;
  onStatusUpdate?: (responseId: number, status: string) => void;
}