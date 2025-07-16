"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Estilos personalizados para ocultar controles de zoom
const mapStyles = `
  .leaflet-control-zoom {
    display: none !important;
  }
  .leaflet-control-attribution {
    display: none !important;
  }
`;

// Agregar estilos al documento
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = mapStyles;
  document.head.appendChild(styleElement);
}

// Configurar íconos de Leaflet usando CDN
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  Object.assign(L.Icon.Default.prototype.options, {
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });
}

interface InteractiveMapProps {
  markers: {
    id: number;
    position: [number, number];
    title: string;
    type: string;
  }[];
  initialLocation: {
    address: string;
    coordinates: [number, number];
  };
  zoom?: number;
  theme?: 'dark' | 'light';
  className?: string;
}

const tileLayers = {
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd'
  },
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc'
  }
};

export default function InteractiveMap({
  markers,
  initialLocation,
  zoom = 14,
  theme = 'light',
  className = ""
}: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Inicializar mapa solo 1 vez
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      center: initialLocation.coordinates,
      zoom,
      zoomControl: false, // Deshabilitar controles de zoom por defecto
      attributionControl: false,
      scrollWheelZoom: true, // Habilitar zoom con rueda del mouse
      doubleClickZoom: true, // Habilitar zoom con doble clic
      touchZoom: true,      // Habilitar zoom táctil en móvil
      boxZoom: true,        // Habilitar zoom con shift + arrastrar
      keyboard: true,       // Habilitar zoom con teclado (+/-)
      dragging: true,       // Habilitar arrastrar el mapa
      inertia: true,       // Inercia al mover el mapa
      zoomSnap: 0.1,       // Ajuste fino del zoom
      zoomDelta: 0.5,      // Sensibilidad del zoom
      wheelPxPerZoomLevel: 100, // Sensibilidad de la rueda del mouse
      wheelDebounceTime: 40,    // Tiempo de espera entre eventos de rueda
      maxBoundsViscosity: 1.0,  // Hacer que los límites sean más estrictos
      bounceAtZoomLimits: false // Evitar rebotes al llegar a los límites de zoom
    });

    const selectedTileLayer = tileLayers[theme];
    tileLayerRef.current = L.tileLayer(selectedTileLayer.url, {
      maxZoom: 19,
      attribution: selectedTileLayer.attribution,
      subdomains: selectedTileLayer.subdomains || 'abc',
      detectRetina: true
    }).addTo(mapRef.current);

    L.control.attribution({
      position: 'bottomright',
      prefix: ''
    }).addTo(mapRef.current);

    setTimeout(() => {
      if (mapRef.current && mapRef.current.getContainer()) {
        mapRef.current.invalidateSize();
      }
    }, 0);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      tileLayerRef.current = null;
    };
  }, [initialLocation.coordinates, zoom]);

  // Cambiar TileLayer cuando cambia el theme
  useEffect(() => {
    if (!mapRef.current) return;

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
      tileLayerRef.current = null;
    }

    const selectedTileLayer = tileLayers[theme];
    tileLayerRef.current = L.tileLayer(selectedTileLayer.url, {
      maxZoom: 19,
      attribution: selectedTileLayer.attribution,
      subdomains: selectedTileLayer.subdomains || 'abc',
      detectRetina: true
    }).addTo(mapRef.current);
  }, [theme]);

  // Actualizar marcadores
  useEffect(() => {
    if (!mapRef.current) return;

    // Eliminar marcadores existentes de manera segura
    markersRef.current.forEach(marker => {
      if (marker && mapRef.current && mapRef.current.hasLayer(marker)) {
        mapRef.current.removeLayer(marker);
      }
    });
    markersRef.current = [];

    // Añadir nuevos marcadores
    markers.forEach(marker => {
      if (marker && marker.position) {
        const m = L.marker(marker.position, {
          icon: L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
          })
        }).addTo(mapRef.current!)
        .bindPopup(`<b>${marker.title}</b><br/>${marker.type}`);
        
        markersRef.current.push(m);
      }
    });
  }, [markers]);

  return (
    <div 
      ref={mapContainerRef} 
      className={`w-full h-full ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
        position: 'relative',
        zIndex: 0
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      onTouchStart={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      onTouchMove={(e) => {
        if (e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
      onWheel={(e) => {
        if (e.ctrlKey && e.target === e.currentTarget) {
          e.stopPropagation();
        }
      }}
    />
  );
}
