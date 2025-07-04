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
    description: 'Artista visual especializada en ilustración digital y muralismo. Crea piezas únicas.',
    image: '/images/explorador/artistas/artista1.jpeg',
    images: [
      '/images/explorador/artistas/artista1.jpeg',
      '/images/explorador/artistas/artista2.jpg',
      '/images/explorador/artistas/artista3.jpg',
      '/images/explorador/artistas/artista4.jpg',
      '/images/explorador/artistas/artista5.jpg'
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
    description: 'Fotógrafo de retrato y moda. Captura momentos únicos y cuenta historias con su lente.',
    image: '/images/explorador/eventos/artist1.jpg',
    images: [
      '/images/explorador/eventos/artist1.jpg',
      '/images/explorador/eventos/artist2.jpg',
      '/images/explorador/eventos/artist3.jpg',
      '/images/explorador/eventos/artist4.jpg',
      '/images/explorador/eventos/artist5.jpg'
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
    description: 'Transforma espacios en experiencias únicas con un toque moderno y funcional.',
    image: '/images/explorador/eventos/artist1.jpg',
    images: [
      '/images/explorador/eventos/artist1.jpg',
      '/images/explorador/eventos/artist2.jpg',
      '/images/explorador/eventos/artist3.jpg',
      '/images/explorador/eventos/artist4.jpg',
      '/images/explorador/eventos/artist5.jpg',
      '/images/explorador/eventos/artist6.jpg'
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
    description: 'Festival de arte con música en vivo, arte callejero y experiencias interactivas.',
    image: '/images/explorador/sitios/sitio1.jpg',
    images: [
      '/images/explorador/sitios/sitio1.jpg',
      '/images/explorador/sitios/sitio2.jpg',
      '/images/explorador/sitios/sitio3.jpg',
      '/images/explorador/sitios/sitio4.jpg',
      '/images/explorador/sitios/sitio5.jpg'
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
    image: '/images/explorador/artistas/artista3.jpg',
    images: [
      '/images/explorador/artistas/artista3.jpg',
      '/images/explorador/artistas/artista1.jpeg',
      '/images/explorador/artistas/artista2.jpg',
      '/images/explorador/artistas/artista4.jpg',
      '/images/explorador/artistas/artista5.jpg'
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
    description: 'Acogedor café bohemio, ideal para trabajar, leer o disfrutar. Con terraza y libros.',
    image: '/images/explorador/artistas/artista2.jpg',
    images: [
      '/images/explorador/artistas/artista2.jpg',
      '/images/explorador/artistas/artista1.jpeg',
      '/images/explorador/artistas/artista3.jpg',
      '/images/explorador/artistas/artista4.jpg',
      '/images/explorador/artistas/artista5.jpg'
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
    description: 'Galería de arte que exhibe obras de artistas contemporáneos. Con cafetería en la terraza.',
    image: '/images/explorador/artistas/artista5.jpg',
    images: [
      '/images/explorador/artistas/artista5.jpg',
      '/images/explorador/artistas/artista1.jpeg',
      '/images/explorador/artistas/artista2.jpg',
      '/images/explorador/artistas/artista3.jpg',
      '/images/explorador/artistas/artista4.jpg'
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
    description: 'Estudio de grabación profesional para músicos y productores. Equipado con alta tecnología.',
    image: '/images/explorador/artistas/artista3.jpg',
    images: [
      '/images/explorador/artistas/artista3.jpg',
      '/images/explorador/artistas/artista1.jpeg',
      '/images/explorador/artistas/artista2.jpg',
      '/images/explorador/artistas/artista4.jpg',
      '/images/explorador/artistas/artista5.jpg'
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
