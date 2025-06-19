export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  userType?: 'artist' | 'client' | 'admin' | 'general' | 'company';
  city?: string;
  isVerified?: boolean;
  rating?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type AuthUser = User | null;
