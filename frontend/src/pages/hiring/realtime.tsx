"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Implementación temporal de toast
const useToast = () => ({
  toast: (options: { title: string; description: string }) => {
    console.log(`${options.title}: ${options.description}`);
  }
});

// Importación dinámica para evitar errores de SSR
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

import InteractiveMap from "./map/interactive-map";
import type { MapMarker } from "./lib/types";
import { HiringForm } from "./forms/hiring-form";
import ArtistCards from "./components/ArtistCards";

interface Artist {
  id: number;
  name: string;
  type: string;
  isOnline: boolean;
  rating: number;
  distance: number;
  pricePerHour: number;
  latitude?: number;
  longitude?: number;
}

const mockArtists: Artist[] = [
  {
    id: 1,
    name: "María García",
    type: "Cantante",
    isOnline: true,
    rating: 4.8,
    distance: 1.2,
    pricePerHour: 150000,
    latitude: 4.7109,
    longitude: -74.0721
  },
  {
    id: 2,
    name: "Carlos López",
    type: "Guitarrista",
    isOnline: true,
    rating: 4.6,
    distance: 2.5,
    pricePerHour: 120000,
    latitude: 4.7119,
    longitude: -74.0821
  },
];

export default function RealTimeHiring() {
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [activeView, setActiveView] = useState<"offer" | "artists">("offer");
  const [showMobileForm, setShowMobileForm] = useState(!isMobile);
  const [mapCenter, setMapCenter] = useState<[number, number]>([4.7109, -74.0721]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    setArtists(mockArtists);
  }, []);

  const handleOfferCreated = (offerId?: number) => {  
    if (offerId) {
      toast({
        title: "Oferta creada",
        description: `Se ha creado la oferta #${offerId} correctamente.`,
      });
      setActiveView("artists");
    }
  };

  const handleSelectArtist = (artist: Artist) => {
    console.log("Artista seleccionado:", artist);
    toast({
      title: "Oferta enviada",
      description: `Has enviado una oferta a ${artist.name}`,
    });
  };

  const mapMarkers: MapMarker[] = artists.map(artist => ({
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
      {/* Mapa ocupando toda la pantalla */}
      <div className="absolute inset-0 h-[calc(100vh-4rem)]">
        <InteractiveMap 
          markers={mapMarkers}
          className="w-full h-full"
          initialLocation={{
            address: userLocation ? 'Tu ubicación' : 'Bogotá, Colombia',
            coordinates: mapCenter
          }}
          zoom={14}
          interactive={true}
        />
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

      {/* Contenedor flotante del formulario */}
      <div className="absolute left-4 top-20 z-10 transition-all duration-300 w-[350px]">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
          {activeView === "offer" ? (
            <HiringForm onOfferCreated={handleOfferCreated} />
          ) : (
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
              <ArtistCards 
                artists={artists}
                onSelectArtist={handleSelectArtist}
              />
            </div>
          )}
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
