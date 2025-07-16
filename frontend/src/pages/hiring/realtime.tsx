"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { Artist } from "@/types/artist";
import InteractiveMap from "./map/interactive-map";
import type { ArtistType } from "@/types/artist";
import { HiringForm } from "./forms/hiring-form";
import ArtistCards from "./components/ArtistCards";
import { AdvancedFilters } from "./forms/advanced-filters";

interface MockArtist extends Omit<Artist, 'id'> {
  id: number;
  type: ArtistType;
  subType: string;
  isOnline: boolean;
  pricePerHour: number;
  experience: number;
  rating: number;
  genres: string[];
  distance: number;
  latitude: number;
  longitude: number;
  specialties: string[];
  name: string;
  image?: string;
  isFavorite?: boolean;
  reviewsCount?: number;
}

const mockArtists: MockArtist[] = [
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
  {
    id: 3,
    name: "Laura Pausini",
    type: "Música",
    subType: "Cantante",
    isOnline: true,
    rating: 4.7,
    distance: 2.5,
    pricePerHour: 400000,
    latitude: 4.7089,
    longitude: -74.0701,
    genres: ["Pop", "Baladas"],
    experience: 8,
    specialties: ["Vocalista", "Intérprete"],
    image: "/artists/laura-pausini.jpg",
    isFavorite: false,
    reviewsCount: 89
  },
  // Fotógrafos
  {
    id: 4,
    name: "Andrés García",
    type: "Fotografía",
    subType: "Fotógrafo de eventos",
    isOnline: true,
    rating: 4.6,
    distance: 1.8,
    pricePerHour: 180000,
    latitude: 4.7119,
    longitude: -74.0731,
    specialties: ["Bodas", "Eventos sociales"],
    experience: 6,
    genres: ["Eventos", "Retratos"],
    image: "/artists/andres-garcia.jpg",
    isFavorite: true,
    reviewsCount: 45
  },
  {
    id: 5,
    name: "María López",
    type: "Fotografía",
    subType: "Fotógrafa de moda",
    isOnline: false,
    rating: 4.9,
    distance: 0.9,
    pricePerHour: 220000,
    latitude: 4.7099,
    longitude: -74.0711,
    specialties: ["Moda", "Retratos"],
    experience: 7,
    genres: ["Moda", "Retratos"],
    image: "/artists/maria-lopez.jpg",
    isFavorite: false,
    reviewsCount: 67
  },
  // DJs
  {
    id: 6,
    name: "DJ Camilo",
    type: "Música",
    subType: "DJ",
    isOnline: true,
    rating: 4.5,
    distance: 2.2,
    pricePerHour: 200000,
    latitude: 4.7139,
    longitude: -74.0741,
    genres: ["Electrónica", "House"],
    experience: 4,
    specialties: ["DJ", "Productor"],
    image: "/artists/dj-camilo.jpg",
    isFavorite: true,
    reviewsCount: 112
  },
  // Músicos adicionales
  {
    id: 7,
    name: "Juanes",
    type: "Música",
    subType: "Músico en vivo",
    isOnline: true,
    rating: 4.9,
    distance: 1.5,
    pricePerHour: 300000,
    latitude: 4.7129,
    longitude: -74.0721,
    genres: ["Rock", "Pop"],
    experience: 12,
    specialties: ["Cantante", "Guitarrista", "Compositor"],
    image: "/artists/juanes.jpg",
    isFavorite: true,
    reviewsCount: 203
  },
  // Fotógrafos adicionales
  {
    id: 8,
    name: "Carolina Rojas",
    type: "Fotografía",
    subType: "Fotógrafa de productos",
    isOnline: true,
    rating: 4.7,
    distance: 2.8,
    pricePerHour: 190000,
    latitude: 4.7149,
    longitude: -74.0751,
    specialties: ["Productos", "Publicidad"],
    experience: 5,
    genres: ["Publicidad", "Comercial"],
    image: "/artists/carolina-rojas.jpg",
    isFavorite: false,
    reviewsCount: 34
  }
];

// Implementación temporal de toast
const useToast = () => ({
  toast: (options: { title: string; description: string }) => {
    console.log(`${options.title}: ${options.description}`);
  }
});

// Custom hook for media queries
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    
    return () => media.removeListener(listener);
  }, [matches, query]);
  
  return matches;
};

export default function RealTimeHiring() {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px");
  const [activeView, setActiveView] = useState<"offer" | "artists">("offer");
  const [showMobileForm, setShowMobileForm] = useState(!isMobile);
  const [mapCenter, setMapCenter] = useState<[number, number]>([4.7109, -74.0721]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [artists] = useState<MockArtist[]>(mockArtists);
  const [filteredArtists, setFilteredArtists] = useState<MockArtist[]>([]);
  const [selectedTypes] = useState<ArtistType[]>([]);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'distance'>('distance');
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    priceRange: [0, 1000000] as [number, number],
  });
  const formRef = useRef<HTMLDivElement>(null);

  const handleOfferCreated = (offerId?: number) => {  
    if (offerId) {
      toast({
        title: "Oferta creada",
        description: `Se ha creado la oferta #${offerId} correctamente.`,
      });
    }
  };

  const handleSelectArtist = (artist: Artist) => {
    console.log("Artista seleccionado:", artist);
    toast({
      title: "Oferta enviada",
      description: `Has enviado una oferta a ${artist.name}`,
    });
  };

  // Filter artists based on selected types and filters
  useEffect(() => {
    let result = [...artists];
    
    // Filter by type of artist
    if (selectedTypes.length > 0) {
      result = result.filter(artist => {
        const artistType = artist.type as ArtistType;
        return selectedTypes.some(type => type === artistType);
      });
    }
    
    // Filter by category if selected
    if (filters.category) {
      result = result.filter(artist => 
        artist.type === filters.category
      );
    }

    // Filter by subcategory if selected
    if (filters.subcategory) {
      result = result.filter(artist => 
        artist.subType === filters.subcategory
      );
    }
    
    // Filter by price range
    result = result.filter(artist => 
      artist.pricePerHour >= filters.priceRange[0] && 
      artist.pricePerHour <= filters.priceRange[1]
    );
    
    setFilteredArtists(result);
  }, [selectedTypes, filters, artists]);

  const sortArtists = (artists: MockArtist[], sortType: string) => {
    return [...artists].sort((a, b) => {
      switch (sortType) {
        case 'price-asc':
          return a.pricePerHour - b.pricePerHour;
        case 'price-desc':
          return b.pricePerHour - a.pricePerHour;
        case 'distance':
        default:
          return a.distance - b.distance;
      }
    });
  };

  const handleSort = (sortType: 'price-asc' | 'price-desc' | 'distance') => {
    setSortBy(sortType);
    setFilteredArtists(prevArtists => sortArtists(prevArtists, sortType));
  };

  useEffect(() => {
    // Filtrar artistas según los filtros actuales
    let filtered = artists.filter((artist) => {
      // Aquí puedes agregar más lógica de filtrado si es necesario
      return true;
    });
    
    // Aplicar ordenamiento
    filtered = sortArtists(filtered, sortBy);
    
    setFilteredArtists(filtered);
  }, [filters, artists, sortBy]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  const mapMarkers: any[] = artists.map(artist => ({
    id: artist.id, 
    position: [artist.latitude || 0, artist.longitude || 0] as [number, number],
    title: artist.name,
    type: artist.type.toLowerCase()
  }));

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error al obtener la ubicación:", error);
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Contenedor principal del mapa y contenido */}
      <div className="absolute inset-0 flex">
        {/* Mapa ocupando toda la pantalla */}
        <div className="absolute inset-0 h-full touch-none">
          <InteractiveMap 
            markers={mapMarkers}
            className="w-full h-full pointer-events-none"
            initialLocation={{
              address: userLocation ? 'Tu ubicación' : 'Bogotá, Colombia',
              coordinates: mapCenter
            }}
            zoom={14}
            interactive={false}
          />
        </div>

        {/* Contenedor del contenido flotante */}
        <div className="relative z-10 flex w-full h-full pt-16">
          {/* Formulario (izquierda) */}
          <div 
            ref={formRef}
            className="h-auto max-h-[75vh] transition-all duration-300 w-[350px] overflow-hidden flex flex-col mt-2"
          >
            <div className="overflow-y-auto p-3 flex-1">
              <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
                {activeView === "offer" ? (
                  <div className="p-3">
                    <HiringForm onOfferCreated={handleOfferCreated} />
                  </div>
                ) : (
                  <div className="p-3">
                    <div className="mb-2">
                      <h2 className="text-base font-semibold text-gray-300">Filtros</h2>
                      <p className="text-xs text-gray-400">
                        Ajusta los filtros para encontrar al artista ideal
                      </p>
                    </div>
                    <div className="p-1">
                      <AdvancedFilters 
                        onFilterChange={handleFilterChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tarjetas de artistas (derecha) - Solo visible en vista de artistas */}
          {activeView === "artists" && filteredArtists.filter(a => a.isOnline).length > 0 && (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Artistas Disponibles
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {filteredArtists.filter(a => a.isOnline).length} artistas en línea
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">Ordenar por:</span>
                  <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button 
                      onClick={() => handleSort('price-asc')}
                      className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                        sortBy === 'price-asc' 
                          ? 'bg-[#bb00aa] text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      Menor precio
                    </button>
                    <button 
                      onClick={() => handleSort('distance')}
                      className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                        sortBy === 'distance' 
                          ? 'bg-[#bb00aa] text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      Más cerca
                    </button>
                    <button 
                      onClick={() => handleSort('price-desc')}
                      className={`px-3 py-1 text-xs rounded-md whitespace-nowrap transition-colors ${
                        sortBy === 'price-desc' 
                          ? 'bg-[#bb00aa] text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      Mayor precio
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArtists
                  .filter(a => a.isOnline)
                  .map((artist) => (
                    <div key={artist.id} className="h-full">
                      <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 p-2 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {artist.subType}
                          </h3>
                          <div className="flex items-center text-[10px] text-gray-500 dark:text-gray-400">
                            {selectedTypes.length > 0 && (
                              <div className="flex flex-wrap gap-2 mb-4">
                                {selectedTypes.map((type) => (
                                  <div
                                    key={type}
                                    className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-800"
                                  >
                                    {type}
                                  </div>
                                ))}
                              </div>
                            )}
                            <MapPin className="w-3 h-3 mr-0.5" />
                            <span>Bogotá</span>
                          </div>
                        </div>
                        <ArtistCards 
                          artist={artist}
                          onSelectArtist={handleSelectArtist}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controles superiores */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-2 inline-flex">
          <button
            onClick={() => setActiveView("offer")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeView === "offer"
                ? 'bg-[#bb00aa] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
            }`}
          >
            Crear Oferta
          </button>
          <button
            onClick={() => setActiveView("artists")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeView === "artists"
                ? 'bg-[#bb00aa] text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50'
            }`}
          >
            Ofertar
          </button>
        </div>
      </div>

      {/* Botón flotante para móvil - Solo visible en móviles */}
      {isMobile && !showMobileForm && (
        <button
          onClick={() => setShowMobileForm(true)}
          className="fixed bottom-6 right-6 z-30 bg-[#bb00aa] hover:bg-[#a00090] text-white rounded-full p-3 shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      )}
    </div>
  );
}
