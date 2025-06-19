import axios from 'axios';
import { auth } from '@/lib/firebase';

// Define minimal types for axios v1.9.0 compatibility
type AxiosResponse = any;
interface AxiosError extends Error {
  isAxiosError: boolean;
  config: any;
  request?: any;
  response?: {
    data?: any;
    status?: number;
    statusText?: string;
    headers?: any;
    config?: any;
  };
}

// Extend AxiosRequestConfig with our custom properties
interface CustomAxiosRequestConfig {
  _retry?: boolean;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
  data?: any;
  params?: any;
  [key: string]: any;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Type guard for AxiosError
const isAxiosError = (error: unknown): error is AxiosError => {
  return error instanceof Error && 
         'isAxiosError' in error && 
         (error as any).isAxiosError === true;
};

export { api, isAxiosError };
export type { CustomAxiosRequestConfig, AxiosError, AxiosResponse };

// Custom error class for API errors
class ApiError extends Error {
  constructor(
    public message: string,
    public status?: number,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Request queue for token refresh (currently unused)
// const failedQueue: Array<{ resolve: (token: string) => void; reject: (error: Error) => void }> = [];

// Request interceptor
api.interceptors.request.use(
  async (config: any) => {
    const newConfig = { ...config };
    
    const authRoutes = ['/auth/login', '/auth/register'];
    if (authRoutes.some(route => newConfig.url?.includes(route))) {
      return newConfig;
    }

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error('No authenticated user');
      }

      const token = await currentUser.getIdToken();
      if (!token) {
        throw new Error('No token available');
      }

      newConfig.headers = newConfig.headers || {};
      newConfig.headers.Authorization = `Bearer ${token}`;
      
      return newConfig;
    } catch (error) {
      console.error('Error adding auth token:', error);
      return Promise.reject(error);
    }
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('No authenticated user');
        }

        const token = await currentUser.getIdToken(true);
        if (!token) {
          throw new Error('Failed to get ID token');
        }

        const newConfig = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`
          }
        };
        
        return api(newConfig);
      } catch (err) {
        console.error('Token refresh error:', err);
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    }
    
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || error.message || 'Request failed';
      const code = data?.code || 'REQUEST_FAILED';
      
      return Promise.reject(
        new ApiError(
          message,
          status,
          code,
          data?.details || data
        )
      );
    } else if (error.request) {
      return Promise.reject(
        new ApiError(
          'No response from server. Please check your connection.',
          undefined,
          'NETWORK_ERROR'
        )
      );
    }
    
    return Promise.reject(
      new ApiError(
        error.message || 'An unknown error occurred',
        undefined,
        'UNKNOWN_ERROR'
      )
    );
  }
);

// Types for user synchronization
interface UserProfile {
  _id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  displayName: string;
  profileImageUrl: string | null;
  userType: 'artist' | 'general' | 'company';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SyncUserResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

export const syncUser = async (): Promise<SyncUserResponse> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw new ApiError('No authenticated user', 401, 'UNAUTHENTICATED');
  }
  
  try {
    const token = await currentUser.getIdToken(true);
    
    if (!token) {
      throw new ApiError('Failed to get authentication token', 401, 'TOKEN_FETCH_FAILED');
    }
    
    const response = await api.get<SyncUserResponse>('/auth/sync', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      timeout: 10000
    });
    
    if (!response.data.success) {
      throw new ApiError(
        response.data.error || 'Failed to sync user',
        response.status,
        'SYNC_FAILED',
        response.data
      );
    }
    
    return response.data;
  } catch (error: unknown) {
    console.error('[Auth] Sync user error:', error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to sync user',
        status,
        'SYNC_USER_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to sync user',
      undefined,
      'SYNC_USER_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

// Tipos para los eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: string;
  city: string;
  country: string;
  isOnline: boolean;
  isFree: boolean;
  price?: number;
  currency?: string;
  maxAttendees?: number;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  categoryId: string;
  organizerId: string;
  slug: string;
  multimedia?: string[];
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventInput {
  title: string;
  description: string;
  shortDescription: string;
  startDate: string;
  endDate: string;
  location: string;
  city: string;
  country: string;
  isOnline: boolean;
  isFree: boolean;
  price?: number;
  currency?: string;
  maxAttendees?: number;
  categoryId: string;
  tags?: string[];
  multimedia?: File[];
}

export interface UpdateEventInput extends Partial<CreateEventInput> {
  id: string;
  status?: 'draft' | 'published' | 'cancelled' | 'completed';
}

export const createEvent = async (eventData: CreateEventInput): Promise<Event> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new ApiError('No authenticated user', 401, 'UNAUTHENTICATED');
    }
    
    const formData = new FormData();
    
    Object.entries(eventData).forEach(([key, value]) => {
      if (key !== 'multimedia' && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(item => formData.append(key, item));
        } else if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (value !== null) {
          formData.append(key, String(value));
        }
      }
    });

    if (eventData.multimedia?.length) {
      eventData.multimedia.forEach((file, index) => {
        if (file) {
          formData.append('multimedia', file, file.name || `file-${index}`);
        }
      });
    }
    
    const response = await api.post<Event>('/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: unknown) {
    console.error('[Event] Create event error:', error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to create event',
        status,
        'EVENT_CREATE_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to create event',
      undefined,
      'EVENT_CREATE_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getEventByIdOrSlug = async (idOrSlug: string): Promise<Event> => {
  try {
    const response = await api.get<Event>(`/events/${encodeURIComponent(idOrSlug)}`);
    return response.data;
  } catch (error: unknown) {
    console.error(`[Event] Get event ${idOrSlug} error:`, error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to get event',
        status,
        'EVENT_FETCH_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to get event',
      undefined,
      'EVENT_FETCH_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const updateEvent = async (eventData: UpdateEventInput): Promise<Event> => {
  try {
    const { id, ...data } = eventData;
    const response = await api.put<Event>(`/events/${id}`, data);
    return response.data;
  } catch (error: unknown) {
    console.error(`[Event] Update event ${eventData.id} error:`, error);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const data = axiosError.response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to update event',
        status,
        'EVENT_UPDATE_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to update event',
      undefined,
      'EVENT_UPDATE_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const cancelEvent = async (eventId: string): Promise<Event> => {
  try {
    const response = await api.patch<Event>(`/events/${eventId}/cancel`);
    return response.data;
  } catch (error: unknown) {
    console.error(`[Event] Cancel event ${eventId} error:`, error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to cancel event',
        status,
        'EVENT_CANCEL_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to cancel event',
      undefined,
      'EVENT_CANCEL_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export interface SearchEventsParams {
  search?: string;
  categoryId?: string;
  city?: string;
  isFree?: boolean;
  startDate?: string | Date;
  endDate?: string | Date;
  status?: 'draft' | 'published' | 'cancelled' | 'completed';
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const searchEvents = async (params: SearchEventsParams = {}): Promise<{ events: Event[]; total: number }> => {
  const processedParams = { ...params } as Record<string, any>;
  
  if (params.startDate instanceof Date) {
    processedParams.startDate = params.startDate.toISOString();
  }
  
  if (params.endDate instanceof Date) {
    processedParams.endDate = params.endDate.toISOString();
  }
  
  try {
    const response = await api.get<{ events: Event[]; total: number }>('/events/search', { 
      params: processedParams,
      paramsSerializer: (params: Record<string, any>) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => searchParams.append(key, String(item)));
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
        return searchParams.toString();
      }
    });
    
    return response.data;
  } catch (error: unknown) {
    console.error('[Event] Search events error:', error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to search events',
        status,
        'EVENT_SEARCH_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to search events',
      undefined,
      'EVENT_SEARCH_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

export const getUpcomingEvents = async (limit: number = 10): Promise<Event[]> => {
  try {
    console.log('[Event] Fetching upcoming events with limit:', limit);
    const response = await api.get<Event[]>('/events/upcoming', { 
      params: { limit },
      validateStatus: (status) => status < 500 // Don't throw for 5xx errors
    });
    
    if (response.status >= 400) {
      console.error('[Event] Server error response:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data
      });
      
      // Return empty array or throw based on your error handling strategy
      return [];
    }
    
    return response.data;
  } catch (error: unknown) {
    console.error('[Event] Get upcoming events error:', error);
    
    // Log detailed error information for debugging
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      console.error('[Event] Axios error details:', {
        status,
        data,
        config: (error as AxiosError).config,
        isAxiosError: true
      });
      
      // Return empty array or throw based on your error handling strategy
      return [];
    }
    
    // For non-Axios errors, log and return empty array
    console.error('[Event] Non-Axios error:', error);
    return [];
  }
};

export const uploadEventImages = async (eventId: string, files: File[]): Promise<{ urls: string[] }> => {
  try {
    if (!files.length) {
      throw new ApiError('No files provided', 400, 'NO_FILES');
    }
    
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await api.post<{ urls: string[] }>(
      `/events/${eventId}/upload`, 
      formData, 
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  } catch (error: unknown) {
    console.error(`[Event] Upload images for event ${eventId} error:`, error);
    
    if (error && typeof error === 'object' && 'status' in error) {
      throw error as ApiError;
    }
    
    if (isAxiosError(error as Error)) {
      const status = (error as AxiosError).response?.status;
      const data = (error as AxiosError).response?.data;
      
      throw new ApiError(
        data?.message || 'Failed to upload images',
        status,
        'IMAGE_UPLOAD_FAILED',
        data
      );
    }
    
    throw new ApiError(
      'Failed to upload images',
      undefined,
      'IMAGE_UPLOAD_ERROR',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};