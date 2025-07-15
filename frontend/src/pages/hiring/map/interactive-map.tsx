import { useEffect, useRef, useState } from 'react';
import L, { Map as LeafletMap } from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarker, Location } from '../lib/types';

// Componente para actualizar la vista del mapa
const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
};

// Componente para forzar la actualización del tamaño del mapa
const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 0);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

// Componente para manejar el contenido del mapa
const MapContent = ({
  markers = [],
  onLocationSelect,
  interactive = true
}: {
  markers: MapMarker[];
  onLocationSelect?: (location: Location) => void;
  interactive?: boolean;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!interactive || !onLocationSelect) return;
    
    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      onLocationSelect({
        coordinates: [lat, lng],
        address: `Ubicación seleccionada: ${lat.toFixed(6)}, ${lng.toFixed(6)}`
      });
    };
    
    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [map, interactive, onLocationSelect]);

  return null;
};

// Props del componente InteractiveMap
interface InteractiveMapProps {
  markers?: MapMarker[];
  initialLocation: Location;
  zoom?: number;
  className?: string;
  interactive?: boolean;
  onLocationSelect?: (location: Location) => void;
}

// Componente principal del mapa interactivo
const InteractiveMap: React.FC<InteractiveMapProps> = ({
  markers = [],
  initialLocation,
  zoom = 14,
  className = "",
  interactive = true,
  onLocationSelect,
}) => {
  const mapRef = useRef<LeafletMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  // Obtener la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          
          // Si el mapa ya está listo, centrarlo en la ubicación del usuario
          if (mapRef.current) {
            mapRef.current.flyTo([latitude, longitude], 14);
          }
        },
        (error) => {
          console.warn('Error obteniendo la ubicación:', error);
          // Si hay error, usar la ubicación inicial
          if (mapRef.current) {
            mapRef.current.flyTo(initialLocation.coordinates, 12);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      console.warn('Geolocalización no soportada por el navegador');
    }
  }, [initialLocation.coordinates]);
  
  // Estilo del contenedor del mapa
  const containerStyle = {
    height: '100%',
    width: '100%',
    minHeight: '400px',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    backgroundColor: '#000000',
  };

  // Efecto para manejar la inicialización del mapa
  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Usar la ubicación del usuario si está disponible, de lo contrario usar la ubicación inicial
    const centerCoords = userLocation || initialLocation.coordinates;
    
    if (!mapRef.current) {
      const map = new LeafletMap(mapContainerRef.current, {
        center: centerCoords,
        zoom,
        zoomControl: false,
        renderer: L.canvas(),
        preferCanvas: true,
      });
      
      mapRef.current = map;
      
      // Agregar capa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      
      const timer = setTimeout(() => {
        map.invalidateSize();
        setMapReady(true);
      }, 100);
      
      return () => {
        clearTimeout(timer);
        map.remove();
        mapRef.current = null;
      };
    } else {
      // Si el mapa ya existe, actualizar el centro si hay una ubicación de usuario
      mapRef.current.setView(centerCoords, zoom);
    }
  }, [initialLocation.coordinates, zoom, userLocation]);

  return (
    <div 
      ref={mapContainerRef}
      className={`relative ${className}`} 
      style={containerStyle}
    >
      {mapReady && (
        <MapContainer
          center={userLocation || initialLocation.coordinates}
          zoom={zoom}
          style={{ 
            height: '100%', 
            width: '100%',
            backgroundColor: '#000000',
          }}
          zoomControl={false}
          whenReady={() => {
            const map = mapRef.current;
            if (map) {
              setTimeout(() => {
                map.invalidateSize();
              }, 0);
            }
          }}
          className="dark-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userLocation && (
            <Marker position={userLocation}>
              <Popup>Tu ubicación actual</Popup>
            </Marker>
          )}
          <MapResizer />
          <ChangeView 
            center={userLocation || initialLocation.coordinates} 
            zoom={userLocation ? 14 : zoom} 
          />
          <MapContent 
            markers={markers}
            onLocationSelect={onLocationSelect}
            interactive={interactive}
          />
        </MapContainer>
      )}
    </div>
  );
};

export default InteractiveMap;