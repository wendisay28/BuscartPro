import { config } from './config';

/**
 * Clase que contiene todas las rutas de la API
 * Todas las rutas son relativas a la URL base configurada en config.ts
 */
class ApiRoutes {
  private static readonly BASE = config.apiUrl;

  // Rutas de autenticación
  static readonly AUTH = {
    LOGIN: `${this.BASE}/auth/login`,
    LOGOUT: `${this.BASE}/auth/logout`,
    REFRESH: `${this.BASE}/auth/refresh`,
    ME: `${this.BASE}/auth/me`,
  };

  // Rutas de artistas
  static readonly ARTISTS = {
    BASE: `${this.BASE}/artists`,
    FEATURED: `${this.BASE}/artists/featured`,
    byId: (id: string | number) => `${this.BASE}/artists/${id}`,
  };

  // Rutas de ofertas
  static readonly OFFERS = {
    BASE: `${this.BASE}/offers`,
    byId: (id: string | number) => `${this.BASE}/offers/${id}`,
    ACCEPT: (id: string | number) => `${this.BASE}/offers/${id}/accept`,
    REJECT: (id: string | number) => `${this.BASE}/offers/${id}/reject`,
    NEGOTIATE: (id: string | number) => `${this.BASE}/offers/${id}/negotiate`,
  };

  // Rutas de eventos
  static readonly EVENTS = {
    BASE: `${this.BASE}/events`,
    UPCOMING: `${this.BASE}/events/upcoming`,
    byId: (id: string | number) => `${this.BASE}/events/${id}`,
  };
}

export default ApiRoutes;
