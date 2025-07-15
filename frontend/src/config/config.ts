// Configuración de la aplicación
export const config = {
  // URL base de la API
  apiUrl: `${import.meta.env.VITE_API_URL || '/api'}/v1`,
  
  // Configuración de Firebase
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  },
  
  // Configuración de Mapbox
  mapbox: {
    accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '',
    style: 'mapbox://styles/mapbox/streets-v11',
    defaultCenter: [4.7109, -74.0721] as [number, number],
    defaultZoom: 12
  }
};
