import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, Navigation, MapPin } from "lucide-react";
import { MapPin as MapPinComponent } from "./map-pin";
import type { MapPin as MapPinType } from "@/types";

interface MapContainerProps {
  pins: MapPinType[];
  selectedPin: number | null;
  onPinClick: (pinId: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onCenter: () => void;
}

export function MapContainer({ 
  pins, 
  selectedPin, 
  onPinClick, 
  onZoomIn, 
  onZoomOut, 
  onCenter 
}: MapContainerProps) {
  return (
    <div className="map-container rounded-l-xl">
      {/* Map Base with Street Network */}
      <div className="absolute inset-0">
        <svg 
          className="w-full h-full opacity-60 dark:opacity-40" 
          viewBox="0 0 800 600" 
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main Streets */}
          <g stroke="currentColor" strokeWidth="2" fill="none" className="map-street">
            <path d="M0,200 L800,200 M0,400 L800,400 M200,0 L200,600 M400,0 L400,600 M600,0 L600,600"/>
            <path d="M0,100 L600,100 M0,300 L700,300 M0,500 L800,500 M100,0 L100,600 M300,0 L300,400 M500,100 L500,600 M700,0 L700,600"/>
          </g>
          
          {/* Parks/Green Areas */}
          <circle cx="150" cy="150" r="40" fill="currentColor" className="map-park"/>
          <circle cx="650" cy="450" r="50" fill="currentColor" className="map-park"/>
          
          {/* Water Bodies */}
          <ellipse cx="500" cy="100" rx="60" ry="30" fill="currentColor" className="map-water"/>
        </svg>
        
        {/* Map Pins */}
        {pins.map((pin) => (
          <MapPinComponent
            key={pin.id}
            pin={pin}
            isSelected={selectedPin === pin.id}
            onClick={() => onPinClick(pin.id)}
          />
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button 
          variant="secondary"
          size="sm"
          onClick={onZoomIn}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <Plus size={16} />
        </Button>
        <Button 
          variant="secondary"
          size="sm"
          onClick={onZoomOut}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <Minus size={16} />
        </Button>
        <Button 
          variant="secondary"
          size="sm"
          onClick={onCenter}
          className="w-10 h-10 p-0 shadow-lg"
        >
          <Navigation size={16} />
        </Button>
      </div>

      {/* Location Indicator */}
      <div className="absolute bottom-4 left-4">
        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm shadow-lg">
          <MapPin size={14} className="mr-2 text-green-500" />
          Medellín, Colombia
        </Badge>
      </div>
    </div>
  );
}
