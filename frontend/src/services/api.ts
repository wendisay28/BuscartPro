
import axios from 'axios';

type AxiosRequestConfig = any; // Temporalmente para compatibilidad
import { auth } from '@/lib/firebase';
import { config } from '@/config/config';

// Crear instancia de axios
export const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true, // Importante para enviar cookies de autenticación
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    // Esperar a que Firebase esté listo
    await auth.authStateReady();
    
    // Obtener el usuario actual
    const currentUser = auth.currentUser;
    
    if (currentUser) {
      // Obtener el token de ID
      const token = await currentUser.getIdToken(true);
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn('No se pudo obtener el token de autenticación');
      }
    } else {
      console.warn('No hay usuario autenticado');
    }
  } catch (error) {
    console.error('Error en el interceptor de autenticación:', error);
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 y no es una solicitud de reintento
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const currentUser = auth.currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken(true); // Forzar refresco del token
          
          // Actualizar el token en el encabezado
          originalRequest.headers.Authorization = `Bearer ${token}`;
          
          // Reintentar la solicitud original con el nuevo token
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error al refrescar el token:', refreshError);
        // Si falla el refresco del token, redirigir al login
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
    }
    
    // Para otros errores, rechazar con el error original
    return Promise.reject(error);
  }
);
