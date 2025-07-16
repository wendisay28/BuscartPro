export interface MockArtist {
  id: number;
  name: string;
  type: string;
  subType: string;
  isOnline: boolean;
  rating: number;
  distance: number;
  pricePerHour: number;
  latitude: number;
  longitude: number;
  genres: string[];
  experience: number;
  specialties: string[];
  image?: string;
  isFavorite?: boolean;
  reviewsCount?: number;
}

export const mockArtists: MockArtist[] = [
  // Músicos
  {
    id: 1,
    name: "Sofía Ramírez",
    type: "Música",
    subType: "Cantante",
    isOnline: true,
    rating: 4.8,
    distance: 1.2,
    pricePerHour: 250000,
    latitude: 4.7109,
    longitude: -74.0721,
    genres: ["Pop", "Baladas"],
    experience: 5,
    specialties: ["Vocalista", "Compositora"],
    image: "/artists/sofia-ramirez.jpg",
    isFavorite: false,
    reviewsCount: 24
  },
  {
    id: 2,
    name: "Carlos Vives",
    type: "Música",
    subType: "Músico en vivo",
    isOnline: false,
    rating: 4.9,
    distance: 3.1,
    pricePerHour: 350000,
    latitude: 4.7159,
    longitude: -74.0751,
    genres: ["Vallenato", "Tropical"],
    experience: 8,
    specialties: ["Guitarrista", "Cantante"],
    image: "/artists/carlos-vives.jpg",
    isFavorite: true,
    reviewsCount: 156
  },
  // Agrega más artistas según sea necesario
];
