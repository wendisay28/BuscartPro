import { MapPin } from '../components/map/map.types';

// Tipos de ofertas
export type OfferType = 'concierto' | 'exposición' | 'taller' | 'evento' | 'contratación';

// Interfaz para lugares (venues)
export interface Venue {
  id: number;
  name: string;
  type: 'bar' | 'restaurante' | 'teatro' | 'galería' | 'centro_comercial' | 'hotel' | 'café' | 'universidad' | 'parque' | 'otro';
  description: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  website: string;
  capacity: number;
  priceRange: 'económico' | 'medio' | 'alto' | 'premium';
  rating: number;
  amenities: string[];
  mapPin: Omit<MapPin, 'id' | 'selected'>;
}

// Interfaz para ofertas laborales/artísticas
export interface JobOffer {
  id: number;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  type: OfferType;
  venueId: number;
  salary: string;
  schedule: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Datos de ejemplo para lugares en Medellín
export const mockVenues: Venue[] = [
  {
    id: 1,
    name: 'Teatro Metropolitano',
    type: 'teatro',
    description: 'Uno de los teatros más importantes de Medellín con capacidad para 1,600 personas.',
    address: 'Cl. 41 #57-30',
    neighborhood: 'Buenos Aires',
    phone: '+57 4 4757170',
    email: 'info@teatrometropolitano.org',
    website: 'https://teatrometropolitano.org.co',
    capacity: 1600,
    priceRange: 'alto',
    rating: 4.7,
    amenities: ['backstage', 'iluminación', 'sonido', 'vestuarios', 'estacionamiento'],
    mapPin: {
      lat: 6.2509,
      lng: -75.5636,
      title: 'Teatro Metropolitano',
      category: 'Teatro',
      type: 'building',
      icon: 'theater-masks',
      color: '#9c27b0'
    }
  },
  {
    id: 2,
    name: 'Casa Gardeliana',
    type: 'bar',
    description: 'Bar cultural dedicado al tango con presentaciones en vivo.',
    address: 'Cra. 45 #76-50',
    neighborhood: 'Manrique',
    phone: '+57 4 2120968',
    email: 'casagardeliana@medellin.gov.co',
    website: '',
    capacity: 120,
    priceRange: 'medio',
    rating: 4.5,
    amenities: ['escenario', 'sonido básico', 'bar'],
    mapPin: {
      lat: 6.2769,
      lng: -75.5564,
      title: 'Casa Gardeliana',
      category: 'Bar Cultural',
      type: 'music',
      icon: 'music',
      color: '#e91e63'
    }
  },
  {
    id: 3,
    name: 'Parque de los Deseos',
    type: 'parque',
    description: 'Espacio público con escenario al aire libre para eventos culturales.',
    address: 'Carrera 52 # 71-117',
    neighborhood: 'Buenos Aires',
    phone: '+57 4 5167676',
    email: 'parquedelosdeseos@epm.com.co',
    website: 'https://www.epm.com.co',
    capacity: 5000,
    priceRange: 'económico',
    rating: 4.6,
    amenities: ['escenario', 'área verde', 'baños públicos'],
    mapPin: {
      lat: 6.2706,
      lng: -75.5658,
      title: 'Parque de los Deseos',
      category: 'Parque',
      type: 'palette',
      icon: 'tree',
      color: '#4caf50'
    }
  }
];

// Datos de ejemplo para ofertas laborales/artísticas
export const mockJobOffers: JobOffer[] = [
  {
    id: 1,
    title: 'Músico en vivo para restaurante',
    description: 'Buscamos músico acústico para presentaciones en vivo en restaurante de lunes a sábado en horario nocturno.',
    requirements: [
      'Experiencia mínima de 1 año en presentaciones en vivo',
      'Repertorio variado (boleros, baladas, pop)',
      'Buena presencia y trato con el público'
    ],
    responsibilities: [
      'Presentaciones de 2 horas por noche',
      'Repertorio acorde al ambiente del lugar',
      'Puntualidad y profesionalismo'
    ],
    type: 'contratación',
    venueId: 2,
    salary: '$1.500.000 - $2.000.000 mensual',
    schedule: 'Lunes a Sábado 7:00 PM - 10:00 PM',
    startDate: '2025-08-01',
    isActive: true,
    createdAt: '2025-07-15',
    updatedAt: '2025-07-15'
  },
  {
    id: 2,
    title: 'Artista plástico para exposición temporal',
    description: 'Convocatoria para artistas plásticos que deseen exponer su obra en galería del centro de Medellín.',
    requirements: [
      'Portafolio con trabajos previos',
      'Disponibilidad para montar y desmontar la exposición',
      'Asistencia a inauguración'
    ],
    responsibilities: [
      'Preparar mínimo 10 piezas para exposición',
      'Participar en rueda de prensa',
      'Disponibilidad para visitas guiadas'
    ],
    type: 'exposición',
    venueId: 1,
    salary: 'Porcentaje de ventas (70% artista / 30% galería)',
    schedule: 'Horario de galería',
    startDate: '2025-09-15',
    endDate: '2025-10-15',
    isActive: true,
    createdAt: '2025-07-10',
    updatedAt: '2025-07-10'
  },
  {
    id: 3,
    title: 'Taller de pintura para niños',
    description: 'Invitación a artistas plásticos para dictar talleres de pintura los fines de semana en el Parque de los Deseos.',
    requirements: [
      'Experiencia trabajando con niños',
      'Conocimientos básicos de pintura',
      'Paciencia y creatividad'
    ],
    responsibilities: [
      'Preparar material didáctico',
      'Dirigir actividades para grupos de 15-20 niños',
      'Mantener orden y seguridad en el taller'
    ],
    type: 'taller',
    venueId: 3,
    salary: '$80.000 por taller (4 horas)',
    schedule: 'Sábados y domingos 9:00 AM - 1:00 PM',
    startDate: '2025-08-10',
    endDate: '2025-12-15',
    isActive: true,
    createdAt: '2025-07-05',
    updatedAt: '2025-07-05'
  }
];

// Función para obtener los pines del mapa a partir de los lugares
export const getMapPins = (): MapPin[] => {
  return mockVenues.map(venue => ({
    id: venue.id,
    ...venue.mapPin,
    selected: false
  }));
};

// Función para obtener un lugar por su ID
export const getVenueById = (id: number): Venue | undefined => {
  return mockVenues.find(venue => venue.id === id);
};

// Función para obtener ofertas por tipo
export const getOffersByType = (type: OfferType): JobOffer[] => {
  return mockJobOffers.filter(offer => offer.type === type && offer.isActive);
};

// Función para buscar ofertas por palabra clave
export const searchOffers = (query: string): JobOffer[] => {
  const lowerQuery = query.toLowerCase();
  return mockJobOffers.filter(offer => 
    (offer.title.toLowerCase().includes(lowerQuery) || 
     offer.description.toLowerCase().includes(lowerQuery)) &&
    offer.isActive
  );
};
