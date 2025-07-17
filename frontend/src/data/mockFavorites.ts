export const favoriteData = {
  artists: [
    {
      id: 1, name: "María Elena Vásquez", category: "Música", type: "Cantante Folk",
      city: "Madrid", rating: 4.8, price: 350, fans: 234,
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      description: "Especialista en música folk con 10 años de experiencia",
      availability: "Disponible", verified: true,
      specialties: ["Folk", "Acústico", "Baladas"]
    },
    {
      id: 2, name: "Carlos Ramírez", category: "Danza", type: "Bailaor Flamenco",
      city: "Sevilla", rating: 4.9, price: 450, fans: 512,
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=300&fit=crop",
      description: "Maestro de flamenco tradicional y contemporáneo",
      availability: "Disponible", verified: true,
      specialties: ["Flamenco Puro", "Fusión", "Clásico Español"]
    },
    {
      id: 3, name: "Ana Lucía Torres", category: "Teatro", type: "Actriz Dramática",
      city: "Barcelona", rating: 4.7, price: 280, fans: 189,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      description: "Actriz con formación en teatro clásico y experimental",
      availability: "Ocupada", verified: true,
      specialties: ["Drama", "Comedia", "Monólogos"]
    },
    {
      id: 4, name: "Diego Martín", category: "Música", type: "Saxofonista Jazz",
      city: "Valencia", rating: 4.6, price: 300, fans: 310,
      image: "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=300&fit=crop",
      description: "Saxofonista profesional especializado en jazz contemporáneo",
      availability: "Disponible", verified: true,
      specialties: ["Jazz", "Blues", "Soul"]
    },
    {
      id: 5, name: "Sofía Gómez", category: "Artes Plásticas", type: "Pintora Muralista",
      city: "Bilbao", rating: 4.9, price: 600, fans: 450,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop",
      description: "Creadora de murales urbanos que transforman espacios públicos.",
      availability: "Disponible", verified: false,
      specialties: ["Muralismo", "Grafiti", "Arte Urbano"]
    }
  ],
  events: [
    {
      id: 1, title: "Festival de Jazz Barcelona", category: "Música",
      date: "2024-09-15", city: "Barcelona", price: 45, attendees: 2500,
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&h=300&fit=crop",
      description: "El festival de jazz más importante del mediterráneo con artistas internacionales."
    },
    {
      id: 2, title: "Noche de Flamenco en Triana", category: "Danza",
      date: "2024-10-28", city: "Sevilla", price: 35, attendees: 300,
      image: "https://images.unsplash.com/photo-1583395613348-2b81033998a6?w=400&h=300&fit=crop",
      description: "Una noche mágica con los mejores bailaores en el corazón de Triana."
    },
    {
      id: 3, title: "Concierto Rock Alternativo", category: "Música",
      date: "2024-11-05", city: "Madrid", price: 25, attendees: 800,
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      description: "Las mejores bandas emergentes de la escena rockera nacional."
    },
    {
      id: 4, title: "Exposición de Arte Moderno 'Futuros'", category: "Arte",
      date: "2024-11-20", city: "Valencia", price: 15, attendees: 1200,
      image: "https://images.unsplash.com/photo-1506704568395-3ab53c400a40?w=400&h=300&fit=crop",
      description: "Una mirada al futuro a través de las obras de 50 artistas contemporáneos."
    },
    {
      id: 5, title: "Obra de Teatro 'El Gran Secreto'", category: "Teatro",
      date: "2024-12-01", city: "Barcelona", price: 30, attendees: 500,
      image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=300&fit=crop",
      description: "Un drama intenso que te mantendrá al borde de tu asiento."
    }
  ],
  sites: [
    {
      id: 1, name: "Centro Cultural Recoletos", type: "Galería",
      city: "Madrid", rating: 4.5, capacity: 200,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      description: "Espacio cultural multidisciplinar en el corazón de Madrid."
    },
    {
      id: 2, name: "Teatro Real", type: "Teatro",
      city: "Madrid", rating: 4.9, capacity: 1746,
      image: "https://images.unsplash.com/photo-15943931934-0311039353a4?w=400&h=300&fit=crop",
      description: "Uno de los teatros de ópera más importantes de Europa."
    },
    {
      id: 3, name: "Sala Apolo", type: "Sala de Conciertos",
      city: "Barcelona", rating: 4.6, capacity: 1500,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      description: "Mítica sala de conciertos y club nocturno de Barcelona."
    },
    {
      id: 4, name: "Galería de Arte Contemporáneo", type: "Galería",
      city: "Bilbao", rating: 4.7, capacity: 150,
      image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&h=300&fit=crop",
      description: "Exposiciones rotativas de artistas vascos e internacionales."
    },
    {
      id: 5, name: "Auditorio Nacional de Música", type: "Auditorio",
      city: "Madrid", rating: 4.8, capacity: 2324,
      image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400&h=300&fit=crop",
      description: "Principal sala de conciertos sinfónicos de la capital."
    }
  ],
  gallery: [
    {
      id: 1, title: "Guitarra Acústica Yamaha F310", type: "Instrumento",
      artist: "Yamaha", date: "2023", price: 150,
      image: "https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=400&h=300&fit=crop",
      description: "Guitarra acústica ideal para principiantes y nivel intermedio. Excelente sonido y construcción.",
    },
    {
      id: 2, title: "Libro: 'Historia del Arte'", type: "Libro",
      artist: "E.H. Gombrich", date: "2006", price: 45,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
      description: "Un clásico imprescindible para entender la evolución del arte a lo largo de la historia.",
    },
    {
      id: 3, title: "Pintura al Óleo 'Atardecer en la Costa'", type: "Pintura",
      artist: "Artista Local", date: "2024", price: 300,
      image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?w=400&h=300&fit=crop",
      description: "Obra original que captura la belleza de un atardecer en el Mediterráneo. Medidas: 80x60cm.",
    },
    {
      id: 4, title: "Escultura de Bronce 'El Pensador Moderno'", type: "Escultura",
      artist: "Anónimo", date: "2022", price: 750,
      image: "https://images.unsplash.com/photo-1589418382498-cb752d52d113?w=400&h=300&fit=crop",
      description: "Escultura de bronce pulido sobre base de mármol. Edición limitada.",
    },
    {
      id: 5, title: "Set de Pinceles Profesionales para Óleo", type: "Material de Arte",
      artist: "Artisan Pro", date: "N/A", price: 60,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
      description: "Set de 15 pinceles de pelo de marta de alta calidad para artistas profesionales.",
    }
  ]
};
