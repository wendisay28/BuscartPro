// Los tipos se definen localmente para evitar conflictos

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

export const mockVenues = [
  {
    id: 'venue-1',
    name: 'Café Literario',
    description: 'Un acogedor café con ambiente bohemio, perfecto para trabajar, leer o disfrutar de un buen café. Con espacios al aire libre y una amplia selección de libros.',
    image: 'https://images.unsplash.com/photo-1453614512568-c5104f568a37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1453614512568-c5104f568a37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: 'Calle 123 #45-67, Bogotá',
    city: 'Bogotá',
    distance: '1.2',
    price: 0, // Entrada libre
    rating: 4.7,
    reviews: 45,
    verified: true,
    tags: ['Café', 'Trabajo', 'Lectura', 'WiFi'],
    capacity: 50,
    amenities: ['WiFi', 'Enchufes', 'Terraza', 'Libros'],
    openingHours: 'Lun-Vie: 8:00 AM - 10:00 PM, Sáb-Dom: 9:00 AM - 11:00 PM',
    contact: {
      phone: '+57 123 456 7890',
      email: 'info@cafeliterario.com',
      website: 'www.cafeliterario.com'
    }
  },
  {
    id: 'venue-2',
    name: 'Galería de Arte Moderno',
    description: 'Espacio cultural que exhibe obras de artistas contemporáneos emergentes y consagrados. Cuenta con tres pisos de exposición y una cafetería en la terraza.',
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52d6e654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1531913764164-f85c52d6e654?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578303512597-81e6fc158a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: 'Carrera 56 #12-34, Medellín',
    city: 'Medellín',
    distance: '3.5',
    price: 25000,
    rating: 4.9,
    reviews: 68,
    verified: true,
    tags: ['Arte', 'Cultura', 'Exposiciones', 'Talleres'],
    capacity: 200,
    amenities: ['Tienda', 'Cafetería', 'Ascensor', 'Accesible'],
    openingHours: 'Mar-Dom: 10:00 AM - 7:00 PM, Lunes cerrado',
    contact: {
      phone: '+57 4 123 4567',
      email: 'info@galeriamoderna.com',
      website: 'www.galeriamoderna.com'
    }
  },
  {
    id: 'venue-3',
    name: 'Estudio de Grabación Sonora',
    description: 'Estudio profesional de grabación equipado con tecnología de punta. Ideal para músicos, podcasters y productores. Ofrecemos paquetes por hora o por proyecto.',
    image: 'https://images.unsplash.com/photo-1514525252781-4e8f829c796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1514525252781-4e8f829c796d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605146769289-440113c0a3ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80'
    ],
    address: 'Avenida 8N #23-45, Cali',
    city: 'Cali',
    distance: '5.2',
    price: 80000,
    rating: 4.8,
    reviews: 32,
    verified: true,
    tags: ['Música', 'Grabación', 'Producción', 'Estudio'],
    capacity: 10,
    amenities: ['Equipo profesional', 'Sala de ensayo', 'Ingeniero de sonido', 'Estacionamiento'],
    openingHours: 'Lun-Sáb: 9:00 AM - 9:00 PM, Dom: 10:00 AM - 6:00 PM',
    contact: {
      phone: '+57 2 987 6543',
      email: 'reservas@estudiosonora.com',
      website: 'www.estudiosonora.com'
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
