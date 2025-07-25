import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { ProxyOptions } from 'vite';

// Configuración del proxy
const proxyConfig: Record<string, string | ProxyOptions> = {
  // Proxy para rutas que comienzan con /api
  '/api': {
    target: 'http://localhost:5001',
    changeOrigin: true,
    secure: false,
    // No eliminar /api del path para que el backend lo reciba correctamente
    rewrite: (path: string) => path,
    configure: (proxy) => {
      proxy.on('error', (err, _req, res) => {
        console.error('Error de proxy:', err);
        if (res && !res.headersSent) {
          res.writeHead(500, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify({
            error: 'Error de conexión con el servidor',
            details: err.message
          }));
        }
      });
      proxy.on('proxyReq', (proxyReq, req) => {
        console.log('Enviando solicitud al backend:', req.method, req.url);
        console.log('Headers de la solicitud:', proxyReq.getHeaders());
      });
      proxy.on('proxyRes', (proxyRes, req, res) => {
        console.log('Respuesta del backend:', {
          statusCode: proxyRes.statusCode,
          statusMessage: proxyRes.statusMessage,
          headers: proxyRes.headers
        });
      });
      proxy.on('proxyRes', (proxyRes, req) => {
        console.log('Respuesta del backend:', proxyRes.statusCode, req.url);
      });
    }
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000, // Puerto del frontend
    host: true, // Escuchar en todas las interfaces
    proxy: proxyConfig,
    cors: true // Habilitar CORS para desarrollo
  },
  define: {
    'process.env': {}
  }
});
