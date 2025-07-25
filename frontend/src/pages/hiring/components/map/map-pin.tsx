import { cn } from "@/lib/utils";
import type { MapPin } from "./map.types";
import { 
  Music, 
  Camera, 
  Palette, 
  PersonStanding,
  Video,
  PenTool,
  Building,
  Image,
  Mic,
  GlassWater,
  User 
} from "lucide-react";

interface MapPinProps {
  pin: MapPin;
  isSelected: boolean;
  onClick: () => void;
}

const iconMap = {
  "music": Music,
  "camera": Camera,
  "palette": Palette,
  "person-walking": PersonStanding,
  "video": Video,
  "pen-nib": PenTool,
  "building": Building,
  "image": Image,
  "microphone": Mic,
  "glass-cheers": GlassWater,
  "theater-masks": Building,
  "user": User,
};


export function MapPin({ pin, isSelected, onClick }: MapPinProps) {
  const IconComponent = iconMap[pin.icon as keyof typeof iconMap] || User;
  
  return (
    <div 
      className={cn(
        "map-pin transition-all duration-200 hover:scale-110 cursor-pointer relative",
        isSelected && "scale-110 z-20"
      )}
      onClick={onClick}
      title={`${pin.category} - ID: ${pin.id}`}
    >
      <div 
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4 border-white dark:border-gray-800 transition-transform duration-200 hover:scale-105"
        style={{ backgroundColor: pin.color }}
      >
        <IconComponent className="text-white" size={16} />
      </div>
      <div 
        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
        style={{ borderTopColor: pin.color }}
      />
      
      {/* Pulse animation for selected pin */}
      {isSelected && (
        <div 
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: pin.color, opacity: 0.3 }}
        />
      )}
    </div>
  );
}
