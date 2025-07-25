import { useState, useCallback } from "react";
import type { MapPin } from "@/types/map.types";
import type { Profile } from "@/types/profile";

const MEDELLIN_CENTER = { lat: 6.2442, lng: -75.5812 };

const getCategoryColor = (category: string, type: string): string => {
  if (type === "venue") {
    switch (category) {
      case "Teatro": return "#ef4444"; // red-500
      case "Galería": return "#a855f7"; // purple-500
      case "Estudio": return "#06b6d4"; // cyan-500
      case "Salón": return "#f59e0b"; // amber-500
      default: return "#6b7280"; // gray-500
    }
  }
  
  // Artist colors
  switch (category) {
    case "Música": return "var(--artist-primary)";
    case "Fotografía": return "var(--artist-secondary)";
    case "Arte Visual": return "var(--artist-accent)";
    case "Danza": return "#ec4899"; // pink-500
    case "Video": return "#8b5cf6"; // violet-500
    case "Diseño": return "#06b6d4"; // cyan-500
    default: return "#6b7280"; // gray-500
  }
};

const getCategoryIcon = (category: string, type: string): string => {
  if (type === "venue") {
    switch (category) {
      case "Teatro": return "theater-masks";
      case "Galería": return "image";
      case "Estudio": return "microphone";
      case "Salón": return "glass-cheers";
      default: return "building";
    }
  }
  
  // Artist icons
  switch (category) {
    case "Música": return "music";
    case "Fotografía": return "camera";
    case "Arte Visual": return "palette";
    case "Danza": return "person-walking";
    case "Video": return "video";
    case "Diseño": return "pen-nib";
    default: return "user";
  }
};

export function useMap() {
  const [center, setCenter] = useState(MEDELLIN_CENTER);
  const [zoom, setZoom] = useState(13);
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const generateMapPins = useCallback((profiles: Profile[]): MapPin[] => {
    return profiles.map(profile => ({
      id: profile.id,
      lat: parseFloat(profile.lat),
      lng: parseFloat(profile.lng),
      type: profile.type as 'artist' | 'venue',
      category: profile.category,
      color: getCategoryColor(profile.category, profile.type),
      icon: getCategoryIcon(profile.category, profile.type),
    }));
  }, []);

  const zoomIn = () => setZoom(prev => Math.min(prev + 1, 18));
  const zoomOut = () => setZoom(prev => Math.max(prev - 1, 10));
  
  const centerOnMedellin = () => {
    setCenter(MEDELLIN_CENTER);
    setZoom(13);
  };

  const selectPin = (pinId: number | null) => {
    setSelectedPin(pinId);
  };

  return {
    center,
    zoom,
    selectedPin,
    generateMapPins,
    zoomIn,
    zoomOut,
    centerOnMedellin,
    selectPin,
    setCenter,
    setZoom,
  };
}
