// Los tipos se definen localmente para evitar conflictos

export interface Artist {
  id: string;
  name: string;
  profession: string;
  description: string;
  image: string;
  images: string[];
  city: string;
  distance: string;
  price: number;
  rating: number;
  reviews: number;
  verified: boolean;
  tags: string[];
  availability: string;
  stats?: {
    projectsCompleted: number;
    responseTime: string;
    languages: string[];
  };
}

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Carla Ortiz',
    profession: 'Ilustradora Digital',
    description: 'Artista visual especializada en ilustración digital y muralismo urbano. Con más de 7 años de experiencia creando piezas únicas para marcas y clientes internacionales.',
    image: 'https://images.unsplash.com/photo-1573497621117-9ebf843f974f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1573497621117-9ebf843f974f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496358766-f068d43b7a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573497620058-e95ceb8f9e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    city: 'Medellín',
    distance: '2.5',
    price: 120000,
    rating: 4.8,
    reviews: 24,
    verified: true,
    tags: ['Ilustración Digital', 'Muralismo', 'Arte Urbano', 'Diseño Gráfico'],
    availability: 'Disponible esta semana',
    stats: {
      projectsCompleted: 87,
      responseTime: '1 hora',
      languages: ['Español', 'Inglés']
    }
  },
  {
    id: 'artist-2',
    name: 'Juan Pérez',
    profession: 'Fotógrafo Profesional',
    description: 'Especialista en fotografía de retrato y moda con más de 5 años de experiencia. Capturando momentos únicos y contando historias a través de mi lente.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=60'
    ],
    city: 'Bogotá',
    distance: '1.8',
    price: 180000,
    rating: 4.9,
    reviews: 42,
    verified: true,
    tags: ['Fotografía', 'Retrato', 'Moda', 'Edición'],
    availability: 'Disponible hoy',
    stats: {
      projectsCompleted: 124,
      responseTime: '2 horas',
      languages: ['Español', 'Inglés', 'Portugués']
    }
  },
  {
    id: 'artist-3',
    name: 'María García',
    profession: 'Diseñadora de Interiores',
    description: 'Transformo espacios en experiencias únicas. Especializada en diseño residencial y comercial con un toque moderno y funcional.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1616486338817-2a8d4f1b8e8f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1616486338817-2a8d4f1b8e8f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1616486338817-2a8d4f1b8e8f?auto=format&fit=crop&w=800&q=60'
    ],
    city: 'Cali',
    distance: '3.2',
    price: 250000,
    rating: 4.9,
    reviews: 36,
    verified: true,
    tags: ['Diseño de Interiores', 'Decoración', 'Espacios Comerciales', 'Renovación'],
    availability: 'Disponible la próxima semana',
    stats: {
      projectsCompleted: 56,
      responseTime: '3 horas',
      languages: ['Español', 'Inglés']
    }
  }
];

export const mockEvents: any[] = [
  {
    id: 'event-1',
    name: 'Festival de Arte Urbano',
    description: 'Música en vivo, arte callejero, presentaciones en tarima y experiencias interactivas. ¡No te lo pierdas! Un evento para toda la familia con lo mejor del arte callejero local e internacional.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=60'
    ],
    date: '2024-08-15',
    time: '3 PM - 10 PM',
    city: 'Bogotá',
    distance: '3 km',
    reviews: 42,
    tags: ['Música', 'Pop/Rock', 'Presencial'],
    type: 'free',
    price: 0
  },
  {
    id: 'event-2',
    name: 'Exposición de Fotografía',
    description: 'Una muestra de lo más destacado de la fotografía contemporánea con artistas emergentes y consagrados. Una experiencia visual única que no te puedes perder.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1454165804606-c3b57fc33616?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60'
    ],
    date: '2024-09-10',
    time: '10 AM - 8 PM',
    city: 'Medellín',
    distance: '1.5 km',
    reviews: 28,
    tags: ['Arte', 'Fotografía', 'Presencial'],
    type: 'paid',
    price: 70000
  },
  {
    id: 'event-3',
    name: 'Concierto de Jazz al Aire Libre',
    description: 'Disfruta de una noche mágica con lo mejor del jazz en un ambiente único. Trae tu manta y disfruta de la música bajo las estrellas.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=60',
    images: [
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1514525252781-3bddd70915ad?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1514525252781-3bddd70915ad?auto=format&fit=crop&w=800&q=60'
    ],
    date: '2024-07-22',
    time: '6 PM - 11 PM',
    city: 'Cali',
    distance: '5 km',
    reviews: 35,
    tags: ['Música', 'Jazz', 'Al Aire Libre'],
    location: 'Parque de los Novios, Bogotá',
    type: 'paid',
    category: 'Arte y Cultura',
    verified: true,
    rating: 4.8,
    price: 70000
  }
];

export const mockVenues: any[] = [
  {
    id: 'venue-1',
    name: 'Galería El Cubo',
    description: 'Un espacio donde el aroma del café se mezcla con exposiciones de arte, talleres creativos y charlas culturales. Perfecto para una tarde inspiradora.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60',
    images: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=60'],
    address: 'Cra. 10 #20-30, Bogotá',
    city: 'Bogotá',
    distance: '3.2',
    price: 50000,
    rating: 4.7,
    reviews: 18,
    verified: true,
    tags: ['Galería', 'Exposiciones', 'Arte'],

    capacity: 150,
    amenities: ['WiFi', 'Aire acondicionado', 'Baños', 'Estacionamiento'],
    openingHours: 'Lunes a Viernes: 9AM - 8PM, Sábados: 10AM - 6PM',
    contact: {
      phone: '+57 1234567890',
      email: 'info@galeriaelcubo.com',
      website: 'https://galeriaelcubo.com'
    }
  }
];

export const mockGallery: any[] = [
  {
    id: 'gallery-1',
    name: 'Exposición Colectiva',
    description: 'Obras de artistas emergentes de la ciudad.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=60',
    images: ['https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=60'],
    city: 'Medellín',
    distance: '1.5',
    price: 20000,
    rating: 4.6,
    reviews: 15,
    verified: true,
    tags: ['Exposición', 'Arte Contemporáneo', 'Colectiva'],
    availability: 'Hasta el 30 de junio'
  }
];
