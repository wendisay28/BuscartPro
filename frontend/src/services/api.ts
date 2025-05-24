
import { queryClient } from "@/lib/queryClient";

interface ApiOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Cliente API centralizado para manejar todas las peticiones HTTP
 */
export const api = {
  async fetch<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const response = await fetch(`/api/${endpoint}`, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
      throw new Error(`Error API: ${response.statusText}`);
    }

    return response.json();
  }
};
