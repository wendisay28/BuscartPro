
export const mockRecommendations = [
  {
    id: 1,
    title: "Los mejores artistas emergentes",
    category: "Música",
    description: "Descubre nuevos talentos en la escena musical",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    rating: 4.8,
    authorName: "Carlos Ruiz",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
  },
  {
    id: 2,
    title: "Fotógrafos destacados del mes",
    category: "Fotografía", 
    description: "Los profesionales más solicitados",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=600&fit=crop",
    rating: 4.7,
    authorName: "Ana Martinez",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
  }
];

export const mockVenues = [
  {
    id: 1,
    name: "Teatro La Luna",
    description: "Espacio íntimo para performances y obras experimentales",
    venueType: "teatro",
    services: ["Iluminación", "Sonido", "Camerinos"],
    address: "Calle del Arte 123",
    city: "Madrid",
    openingHours: { general: "Mar-Dom 15:00-23:00" },
    contact: {
      phone: "+34 912345678",
      website: "https://teatrolaluna.es"
    },
    multimedia: {
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96"]
    },
    coordinates: { lat: 40.4168, lng: -3.7038 },
    dailyRate: 450,
    rating: 4.8,
    totalReviews: 124
  },
  {
    id: 2,
    name: "Galería Nova",
    description: "Galería de arte contemporáneo con espacios versátiles",
    venueType: "galeria",
    services: ["Montaje", "Seguridad", "Climatización"],
    address: "Avenida Creativa 45",
    city: "Barcelona",
    openingHours: { general: "Lun-Sab 10:00-20:00" },
    contact: {
      phone: "+34 933456789",
      website: "https://galerianova.es"
    },
    multimedia: {
      images: ["https://images.unsplash.com/photo-1577083552431-6e5fd75a9160"]
    },
    coordinates: { lat: 41.3851, lng: 2.1734 },
    dailyRate: 350,
    rating: 4.6,
    totalReviews: 89
  }
];

export const mockArtists = [
  {
    id: 1,
    name: "María Elena Vásquez",
    category: "Música",
    type: "Cantante Folk",
    city: "Madrid",
    rating: 4.8,
    price: 350,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    likes: 234,
    favorites: 89,
    description: "Artista folk con 10 años de experiencia en eventos íntimos y bodas"
  }
];

export const mockEvents = [
  {
    id: 1,
    title: "Festival de Jazz Barcelona",
    category: "Música",
    date: "2024-06-15",
    city: "Barcelona",
    rating: 4.6,
    price: 45,
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
    likes: 1250,
    attendees: 2500,
    description: "El festival de jazz más importante del mediterráneo con artistas internacionales"
  }
];
