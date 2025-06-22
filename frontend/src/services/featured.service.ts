import { api } from './api';

export interface FeaturedItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'youtube' | 'spotify' | 'vimeo' | 'soundcloud' | 'other';
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

// Obtener los elementos destacados del usuario actual
export const getMyFeaturedItems = async (): Promise<FeaturedItem[]> => {
  try {
    const response = await api.get<FeaturedItem[]>('/v1/featured');
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener elementos destacados:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(error.response.data.error || 'Error al obtener elementos destacados');
    }
    throw new Error('Error de conexión al obtener elementos destacados');
  }
};

// Obtener los elementos destacados de un usuario específico
export const getUserFeaturedItems = async (userId: string): Promise<FeaturedItem[]> => {
  try {
    const response = await api.get<FeaturedItem[]>(`/v1/users/${userId}/featured`);
    return response.data;
  } catch (error: any) {
    console.error('Error al obtener elementos destacados del usuario:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(error.response.data.error || 'Error al obtener elementos destacados del usuario');
    }
    throw new Error('Error de conexión al obtener elementos destacados del usuario');
  }
};

// Crear un nuevo elemento destacado
export const createFeaturedItem = async (
  data: Omit<FeaturedItem, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
): Promise<FeaturedItem> => {
  try {
    const response = await api.post<FeaturedItem>('/v1/featured', data);
    return response.data;
  } catch (error: any) {
    console.error('Error al crear elemento destacado:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(error.response.data.error || 'Error al crear el elemento destacado');
    }
    throw new Error('Error de conexión al crear el elemento destacado');
  }
};

// Actualizar un elemento destacado existente
export const updateFeaturedItem = async (
  id: string,
  data: Partial<Omit<FeaturedItem, 'id' | 'createdAt' | 'updatedAt' | 'userId'>>
): Promise<FeaturedItem> => {
  try {
    const response = await api.put<FeaturedItem>(`/v1/featured/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error al actualizar elemento destacado:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(error.response.data.error || 'Error al actualizar el elemento destacado');
    }
    throw new Error('Error de conexión al actualizar el elemento destacado');
  }
};

// Eliminar un elemento destacado
export const deleteFeaturedItem = async (id: string): Promise<void> => {
  try {
    await api.delete(`/v1/featured/${id}`);
  } catch (error: any) {
    console.error('Error al eliminar elemento destacado:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
      throw new Error(error.response.data.error || 'Error al eliminar el elemento destacado');
    }
    throw new Error('Error de conexión al eliminar el elemento destacado');
  }
};
