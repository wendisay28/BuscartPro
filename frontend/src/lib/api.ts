import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Incluir credenciales en las solicitudes
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un estado de error
      console.error('Error de API:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
      });
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      // Error al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async <T>({
  url,
  method = 'GET',
  data,
  params,
}: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  params?: any;
}): Promise<T> => {
  try {
    const response = await api({
      url,
      method,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Error en la solicitud');
    }
    throw new Error('Error de conexión');
  }
};
