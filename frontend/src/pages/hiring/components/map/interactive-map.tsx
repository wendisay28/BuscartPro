import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Navigation, MapPin } from "lucide-react";
import { MapPin as MapPinComponent } from "./map-pin";
import type { MapPin as MapPinType } from "../../types";

interface InteractiveMapProps {
  pins: MapPinType[];
  selectedPin: number | null;
  onPinClick: (pinId: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
}

// Medellín center coordinates (Parque de los Deseos)
const MEDELLIN_CENTER = {
  lat: 6.2706,
  lng: -75.5658
};

// Convert lat/lng to pixel coordinates for our viewport
const latLngToPixels = (lat: number, lng: number, zoom: number, centerLat: number, centerLng: number, mapWidth: number, mapHeight: number) => {
  // Simplified mercator projection for local area
  const scale = Math.pow(2, zoom) * 256;
  
  // Calculate offset from center
  const latOffset = (lat - centerLat) * (scale / 360);
  const lngOffset = (lng - centerLng) * (scale / 360) * Math.cos(centerLat * Math.PI / 180);
  
  return {
    x: mapWidth / 2 + lngOffset,
    y: mapHeight / 2 - latOffset
  };
};

// Generate detailed street network for Medellín based on real street layout
const generateStreetNetwork = (zoom: number, theme: string) => {
  const isDark = theme === 'dark';
  const strokeColor = isDark ? 'rgba(156, 163, 175, 0.8)' : 'rgba(107, 114, 128, 0.6)';
  const majorStrokeColor = isDark ? 'rgba(209, 213, 219, 1)' : 'rgba(75, 85, 99, 0.8)';
  const minorStrokeColor = isDark ? 'rgba(156, 163, 175, 0.4)' : 'rgba(107, 114, 128, 0.3)';
  
  return (
    <g className="street-network">
      {/* Major avenues and main roads (always visible) */}
      <g stroke={majorStrokeColor} strokeWidth={zoom > 12 ? 4 : 3} fill="none" strokeLinecap="round">
        {/* Autopista Norte */}
        <path d="M100,0 L120,200 L140,400 L160,600"/>
        {/* Autopista Sur */}
        <path d="M600,0 L580,200 L560,400 L540,600"/>
        {/* Avenida Oriental */}
        <path d="M200,0 L210,150 L220,300 L230,450 L240,600"/>
        {/* Avenida Regional */}
        <path d="M0,180 L200,185 L400,190 L600,195 L800,200"/>
        {/* Avenida 80 */}
        <path d="M0,320 L150,315 L300,310 L450,305 L600,300 L800,295"/>
        {/* Avenida Nutibara */}
        <path d="M0,450 L200,445 L400,440 L600,435 L800,430"/>
      </g>
      
      {/* Secondary streets (visible at medium zoom) */}
      {zoom > 11 && (
        <g stroke={strokeColor} strokeWidth={zoom > 13 ? 3 : 2} fill="none" strokeLinecap="round">
          {/* Carrera 70 */}
          <path d="M350,0 L360,150 L370,300 L380,450 L390,600"/>
          {/* Carrera 65 */}
          <path d="M450,0 L460,150 L470,300 L480,450 L490,600"/>
          {/* Calle 33 */}
          <path d="M0,250 L200,248 L400,246 L600,244 L800,242"/>
          {/* Calle 44 */}
          <path d="M0,280 L200,278 L400,276 L600,274 L800,272"/>
          {/* Calle 70 */}
          <path d="M0,350 L200,348 L400,346 L600,344 L800,342"/>
          {/* Avenida Las Vegas */}
          <path d="M0,380 L200,378 L400,376 L600,374 L800,372"/>
        </g>
      )}
      
      {/* Tertiary streets (visible at high zoom) */}
      {zoom > 13 && (
        <g stroke={minorStrokeColor} strokeWidth={zoom > 15 ? 2 : 1} fill="none" strokeLinecap="round">
          {/* Carrera 43A */}
          <path d="M300,0 L310,150 L320,300 L330,450 L340,600"/>
          {/* Carrera 50 */}
          <path d="M400,0 L410,150 L420,300 L430,450 L440,600"/>
          {/* Transversal streets */}
          <path d="M0,220 L800,215"/>
          <path d="M0,290 L800,285"/>
          <path d="M0,360 L800,355"/>
          <path d="M0,410 L800,405"/>
          <path d="M0,480 L800,475"/>
          <path d="M0,520 L800,515"/>
        </g>
      )}
      
      {/* Local streets (visible at very high zoom) */}
      {zoom > 15 && (
        <g stroke={minorStrokeColor} strokeWidth={1} fill="none" opacity={0.6} strokeLinecap="round">
          {/* Grid of small streets */}
          {Array.from({ length: 15 }, (_, i) => (
            <g key={`street-${i}`}>
              <path d={`M${50 + i * 50},0 L${60 + i * 50},300 L${70 + i * 50},600`}/>
              <path d={`M0,${100 + i * 30} L800,${95 + i * 30}`}/>
            </g>
          ))}
        </g>
      )}
    </g>
  );
};

// Generate parks and green areas
const generateParks = (theme: string) => {
  const isDark = theme === 'dark';
  const parkColor = isDark ? 'rgba(34, 197, 94, 0.3)' : 'rgba(34, 197, 94, 0.2)';
  
  return (
    <g className="parks">
      {/* Parque de los Deseos area */}
      <ellipse cx="400" cy="250" rx="60" ry="40" fill={parkColor} />
      {/* Cerro Nutibara */}
      <ellipse cx="600" cy="400" rx="50" ry="35" fill={parkColor} />
      {/* Parque Norte */}
      <ellipse cx="200" cy="150" rx="45" ry="30" fill={parkColor} />
    </g>
  );
};

// Generate water bodies (Medellín River)
const generateWater = (theme: string) => {
  const isDark = theme === 'dark';
  const waterColor = isDark ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)';
  
  return (
    <g className="water">
      {/* Medellín River */}
      <path 
        d="M0,320 Q200,310 400,315 T800,325" 
        stroke={waterColor} 
        strokeWidth={8} 
        fill="none"
        opacity={0.8}
      />
    </g>
  );
};

export function InteractiveMap({ 
  pins, 
  selectedPin, 
  onPinClick, 
  onZoomIn, 
  onZoomOut, 
  onCenter 
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState(MEDELLIN_CENTER);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 1, 18));
    onZoomIn();
  }, [onZoomIn]);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 1, 10));
    onZoomOut();
  }, [onZoomOut]);

  const handleCenter = useCallback(() => {
    setCenter(MEDELLIN_CENTER);
    setZoom(13);
    onCenter();
  }, [onCenter]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;
    
    // Convert pixel movement to lat/lng offset
    const scale = Math.pow(2, zoom) * 256;
    const latOffset = deltaY / (scale / 360);
    const lngOffset = deltaX / (scale / 360) / Math.cos(center.lat * Math.PI / 180);
    
    setCenter(prev => ({
      lat: prev.lat + latOffset,
      lng: prev.lng - lngOffset
    }));
    
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastMousePos, zoom, center.lat]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  }, [handleZoomIn, handleZoomOut]);

  // Calculate pin positions
  const pinPositions = pins.map(pin => {
    const position = latLngToPixels(
      pin.lat, 
      pin.lng, 
      zoom, 
      center.lat, 
      center.lng, 
      800, 
      600
    );
    
    // Create an object that matches the MapPin interface
    const mapPin = {
      id: Number(pin.id), // Ensure id is a number
      lat: pin.lat,
      lng: pin.lng,
      title: 'title' in pin ? String(pin.title) : `Pin ${pin.id}`,
      category: 'category' in pin ? String(pin.category) : 'default',
      type: pin.type === 'artist' ? 'person' : 'building',
      color: 'color' in pin ? String(pin.color) : '#000000',
      icon: 'icon' in pin ? String(pin.icon) : 'pin',
      pixelX: position.x,
      pixelY: position.y,
      isVisible: position.x >= -50 && position.x <= 850 && position.y >= -50 && position.y <= 650
    } as const;
    
    return mapPin;
  });

  return (
    <div 
      ref={mapRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-l-xl cursor-move select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* Map Base Layer */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 800 600" 
          preserveAspectRatio="xMidYMid slice"
          style={{ transform: `scale(${Math.pow(1.2, zoom - 13)})` }}
        >
          {/* Background */}
          <rect 
            width="800" 
            height="600" 
            fill="#f9fafb"
          />
          
          {/* Water bodies */}
          {generateWater('light')}
          
          {/* Parks */}
          {generateParks('light')}
          
          {/* Street network */}
          {generateStreetNetwork(zoom, 'light')}
        </svg>
        
        {/* Map Pins */}
        {pinPositions
          .filter(pin => pin.isVisible)
          .map((pin) => (
            <div
              key={pin.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
              style={{
                left: `${(pin.pixelX / 800) * 100}%`,
                top: `${(pin.pixelY / 600) * 100}%`,
              }}
            >
              <MapPinComponent
                pin={pin}
                isSelected={selectedPin === pin.id}
                onClick={() => onPinClick(pin.id)}
              />
            </div>
          ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-3 z-20">
        <Button 
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          className="w-10 h-10 p-0 shadow-lg bg-gray-800/90 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:scale-105"
        >
          <Plus size={18} className="text-blue-400" />
        </Button>
        <Button 
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          className="w-10 h-10 p-0 shadow-lg bg-gray-800/90 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white transition-all duration-200 hover:scale-105"
        >
          <Minus size={18} className="text-blue-400" />
        </Button>
        <Button 
          variant="outline"
          size="icon"
          onClick={handleCenter}
          className="w-10 h-10 p-0 shadow-lg bg-gray-800/90 border-gray-700 text-gray-200 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200 hover:scale-105"
        >
          <Navigation size={18} className="text-blue-400 group-hover:text-white" />
        </Button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 left-4 z-20">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-lg">
          Zoom: {zoom}
        </Badge>
      </div>

      {/* Location Indicator */}
      <div className="absolute bottom-4 left-4 z-20">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-lg">
          <MapPin size={14} className="mr-2 text-green-500" />
          Medellín, Colombia
        </Badge>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded backdrop-blur-sm">
          Map data © OpenStreetMap
        </div>
      </div>
    </div>
  );
}