export interface TabItem {
  id: string;
  icon: string;
  label: string;
}

export const portfolioTabs: TabItem[] = [
  { id: 'services', icon: 'Briefcase', label: 'Servicios' },
  { id: 'store', icon: 'ShoppingBag', label: 'Tienda' },
  { id: 'photos', icon: 'Image', label: 'Fotos' },
  { id: 'videos', icon: 'Video', label: 'Videos' },
  { id: 'featured', icon: 'Star', label: 'Destacados' },
];

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  category: string;
  imageUrl: string;
  image?: string; // Propiedad opcional para compatibilidad
  rating: number;
  reviews: number;
  deliveryType: 'Rápida' | 'Estándar';
  includesRevisions: boolean;
  peopleNeeded: string;
  tags: string[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string; // Precio original si está en oferta
  imageUrl: string;
  image: string; // Mantener compatibilidad con código existente
  rating?: number; // Valoración de 1 a 5
  reviews?: number; // Número de reseñas
  isOnSale?: boolean; // Si el producto está en oferta
  shippingTime?: string; // Tiempo estimado de envío
  category?: string; // Categoría del producto
  tags?: string[]; // Etiquetas para filtrado
}

export interface FeaturedItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'youtube' | 'spotify' | 'vimeo' | 'soundcloud' | 'other';
  thumbnailUrl?: string;
  createdAt: string;
}

export interface Photo {
  id: string;
  title?: string;
  caption?: string;
  description?: string;
  imageUrl: string;
  image: string; // Mantener compatibilidad con código existente
  likes: number;
  comments: number;
  location?: string;
  date?: string;
  tags?: string[];
  isProtected?: boolean;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Ilustración de Personaje',
    description: 'Diseño personalizado de personajes',
    price: '150',
    deliveryTime: '7-10d',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop',
    category: 'Digital',
    rating: 4.9,
    reviews: 128,
    deliveryType: 'Rápida',
    includesRevisions: true,
    peopleNeeded: '1',
    tags: ['Diseño', 'Digital', 'Personajes']
  },
  {
    id: '2',
    title: 'Diseño Conceptual',
    description: 'Conceptos artísticos para tus proyectos',
    price: '200',
    deliveryTime: '10-14d',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Concept Art',
    rating: 4.8,
    reviews: 95,
    deliveryType: 'Estándar',
    includesRevisions: true,
    peopleNeeded: '1-2',
    tags: ['Arte', 'Conceptual', 'Diseño']
  },
  {
    id: '3',
    title: 'Retrato Digital',
    description: 'Retratos personalizados con acabados profesionales',
    price: '80',
    deliveryTime: '5-7d',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    category: 'Retrato',
    rating: 4.7,
    reviews: 210,
    deliveryType: 'Rápida',
    includesRevisions: true,
    peopleNeeded: '1',
    tags: ['Retrato', 'Digital', 'Arte']
  },
  {
    id: '4',
    title: 'Diseño de Portada',
    description: 'Portadas creativas para libros y álbumes',
    price: '120',
    deliveryTime: '7-10d',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&h=500&fit=crop&crop=faces',
    category: 'Diseño',
    rating: 4.9,
    reviews: 156,
    deliveryType: 'Estándar',
    includesRevisions: true,
    peopleNeeded: '1-2',
    tags: ['Portada', 'Diseño', 'Creativo']
  },
  {
    id: '5',
    title: 'Ilustración de Mascota',
    description: 'Retratos artísticos de tus mascotas',
    price: '70',
    deliveryTime: '5-8d',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&h=500&fit=crop&crop=faces',
    category: 'Mascotas',
    rating: 4.8,
    reviews: 189,
    deliveryType: 'Rápida',
    includesRevisions: true,
    peopleNeeded: '1',
    tags: ['Mascotas', 'Retrato', 'Arte']
  },
  {
    id: '6',
    title: 'Arte para Juegos',
    description: 'Assets y personajes para videojuegos',
    price: '250',
    deliveryTime: '14-21d',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=500&fit=crop&crop=faces',
    category: 'Videojuegos',
    rating: 4.9,
    reviews: 142,
    deliveryType: 'Estándar',
    includesRevisions: true,
    peopleNeeded: '2-3',
    tags: ['Videojuegos', 'Arte', 'Diseño']
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Pinceles Digitales Pro',
    description: 'Paquete premium de pinceles para Photoshop e Illustrator, ideales para ilustración digital y diseño de personajes.',
    price: '29.99',
    originalPrice: '39.99',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.8,
    reviews: 142,
    isOnSale: true,
    shippingTime: 'Descarga inmediata',
    category: 'Pinceles',
    tags: ['photoshop', 'illustrator', 'pinceles', 'digital']
  },
  {
    id: 'p2',
    title: 'Curso de Ilustración Digital',
    description: 'Aprende a crear ilustraciones profesionales desde cero con este curso completo de 8 semanas.',
    price: '149.99',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.9,
    reviews: 89,
    shippingTime: 'Acceso inmediato',
    category: 'Cursos',
    tags: ['curso', 'tutorial', 'educación', 'digital']
  },
  {
    id: 'p3',
    title: 'Pack de Texturas',
    description: 'Colección de 50 texturas en alta resolución para dar vida a tus ilustraciones digitales.',
    price: '19.99',
    originalPrice: '29.99',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.7,
    reviews: 56,
    isOnSale: true,
    shippingTime: 'Descarga inmediata',
    category: 'Texturas',
    tags: ['texturas', 'recursos', 'altaresolucion']
  },
  {
    id: 'p4',
    title: 'Tableta Gráfica Wacom',
    description: 'Tableta digitalizadora profesional con lápiz sensible a la presión, perfecta para artistas digitales.',
    price: '249.99',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.9,
    reviews: 234,
    shippingTime: '2-3 días',
    category: 'Hardware',
    tags: ['wacom', 'tableta', 'hardware', 'dibujo']
  },
  {
    id: 'p5',
    title: 'Pack de Acciones para Photoshop',
    description: 'Automatiza tu flujo de trabajo con este set de 20 acciones profesionales para Photoshop.',
    price: '24.99',
    imageUrl: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.6,
    reviews: 78,
    shippingTime: 'Descarga inmediata',
    category: 'Acciones',
    tags: ['photoshop', 'acciones', 'automatización', 'productividad']
  },
  {
    id: 'p6',
    title: 'Libro de Arte Digital',
    description: 'Guía completa de técnicas avanzadas de ilustración digital por artistas profesionales.',
    price: '49.99',
    originalPrice: '59.99',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1000&fit=crop&crop=faces',
    rating: 4.8,
    reviews: 112,
    isOnSale: true,
    shippingTime: '3-5 días',
    category: 'Libros',
    tags: ['libro', 'educación', 'tutorial', 'referencia']
  }
];

export const photos: Photo[] = [
  {
    id: 'photo-1',
    title: 'Atardecer en la Ciudad',
    caption: 'Capturado desde mi estudio',
    description: 'Vista panorámica de la ciudad al atardecer con tonos cálidos',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=500&fit=crop&crop=faces',
    likes: 1243,
    comments: 89,
    location: 'Barcelona, España',
    date: '2023-06-15',
    tags: ['ciudad', 'atardecer', 'urbano'],
    isProtected: true
  },
  {
    id: 'photo-2',
    title: 'Retrato en Blanco y Negro',
    caption: 'Sesión de estudio',
    description: 'Retrato artístico con iluminación de estudio',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=faces',
    likes: 987,
    comments: 67,
    location: 'Estudio Fotográfico',
    date: '2023-07-22',
    tags: ['retrato', 'blancoynegro', 'arte'],
    isProtected: true
  },
  {
    id: 'photo-3',
    title: 'Naturaleza Viva',
    caption: 'Detalles que pasan desapercibidos',
    description: 'Primer plano de hojas con gotas de rocío',
    imageUrl: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1470229538611-16ba8c7ffbd7?w=400&h=500&fit=crop&crop=faces',
    likes: 1543,
    comments: 112,
    location: 'Bosque Nacional',
    date: '2023-05-10',
    tags: ['naturaleza', 'verde', 'detalle'],
    isProtected: true
  },
  {
    id: 'photo-4',
    title: 'Arquitectura Moderna',
    caption: 'Líneas y formas',
    description: 'Estructura arquitectónica con juego de luces y sombras',
    imageUrl: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=500&fit=crop&crop=faces',
    likes: 876,
    comments: 43,
    location: 'Berlín, Alemania',
    date: '2023-08-05',
    tags: ['arquitectura', 'diseño', 'moderno'],
    isProtected: true
  },
  {
    id: 'photo-5',
    title: 'Vida Urbana',
    caption: 'Historias en la calle',
    description: 'Escena urbana capturada en el momento preciso',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=500&fit=crop&crop=faces',
    likes: 2109,
    comments: 154,
    location: 'Nueva York, USA',
    date: '2023-09-12',
    tags: ['urbano', 'callejero', 'vida'],
    isProtected: true
  },
  {
    id: 'photo-6',
    title: 'Abstracción',
    caption: 'Jugando con colores',
    description: 'Composición abstracta con técnica mixta',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop&crop=faces',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop&crop=faces',
    likes: 765,
    comments: 32,
    location: 'Taller de Arte',
    date: '2023-07-30',
    tags: ['abstracto', 'arte', 'color'],
    isProtected: true
  }
];
