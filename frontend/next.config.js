/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['randomuser.me', 'images.unsplash.com'],
  },
  // Opcional: Configuración de compresión
  compress: true,
  // Opcional: Habilitar soporte para módulos ES
  experimental: {
    esmExternals: true,
  },
};

module.exports = nextConfig;
