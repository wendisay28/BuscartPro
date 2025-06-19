export type HiringRequestStatus = 'pending' | 'active' | 'completed' | 'cancelled';
export type HiringRequestUrgency = 'low' | 'normal' | 'high' | 'urgent';

export interface HiringRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  city: string;
  date: string;
  time: string;
  maxPrice: number;
  status: HiringRequestStatus;
  urgency: HiringRequestUrgency;
  client?: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
  };
  responseCount: number;
  timeLeft: string;
  userId: string;
}

export interface HiringResponse {
  id: string;
  requestId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  price?: number;
  createdAt: string;
}

export interface ChatMessage {
  id?: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  requestId: string;
}

export interface Offer {
  id?: string;
  requestId: string;
  artistId: string;
  amount: number;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'counter';
  createdAt: string;
}
