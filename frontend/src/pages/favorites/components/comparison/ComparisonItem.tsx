"use client";

import {
  Star,
  Users,
  Music,
  Share2,
  MessageSquare,
  Phone,
  Award,
  UserCheck,
  UserX,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FeatureItemProps {
  icon: React.ReactNode;
  value: string | number | React.ReactNode;
  className?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, value, className }) => {
  return (
    <div className={cn("flex items-center gap-2 text-sm text-gray-100", className)}>
      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
        {icon}
      </div>
      <span>{value}</span>
    </div>
  );
};

interface ComparisonItemProps {
  item: {
    id: string;
    name?: string;
    title?: string;
    image?: string;
    category?: string;
    type?: string;
    price?: number;
    discount?: number;
    rating?: number;
    members?: number;
    equipment?: string;
    verified?: boolean;
    specialties?: string[];
    instruments?: string[];
    availability?: string;
  };
}

export const ComparisonItem: React.FC<ComparisonItemProps> = ({ item }) => {
  return (
    <div className="bg-neutral-900 p-2 rounded-2xl h-[460px] flex flex-col">
      <Card className="flex flex-col border-none shadow-xl overflow-hidden rounded-2xl h-full">
        <div className="relative flex-shrink-0 h-44">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name || item.title || "Imagen"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
              Sin imagen
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-3">
            <div className="flex justify-between items-start">
              {item.category && (
                <Badge className="bg-fuchsia-700 text-white border-none text-xs px-2 py-0.5">
                  {item.category}
                </Badge>
              )}
              <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span>{item.rating?.toFixed(1) || "Nuevo"}</span>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-base font-bold text-white line-clamp-1">
                  {item.name || item.title || "Sin nombre"}
                </h3>
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <Music className="w-3 h-3" />
                  <span>{item.type || item.category}</span>
                </div>
              </div>
              {item.availability && (
                <Badge
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 border-none text-white",
                    item.availability === "Disponible"
                      ? "bg-green-500"
                      : "bg-red-500"
                  )}
                >
                  {item.availability}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-950 flex-1 flex flex-col">
          {/* Fila 1: Miembros y Verificado */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <FeatureItem
              icon={<Users className="w-4 h-4" />}
              value={`${item.members ?? 1} ${item.members === 1 ? "miembro" : "miembros"}`}
              className="text-sm"
            />
            <FeatureItem
              icon={item.verified ? (
                <UserCheck className="w-4 h-4 text-blue-500" />
              ) : (
                <UserX className="w-4 h-4 text-gray-400" />
              )}
              value={item.verified ? "Verificado" : "No verificado"}
              className="text-sm"
            />
          </div>

          {/* Fila 2: Equipo y Especialidad */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {item.equipment && (
              <FeatureItem
                icon={<Info className="w-4 h-4" />}
                value={item.equipment === "Sí" ? "Equipo incluido" : "Sin equipo"}
                className="text-sm"
              />
            )}
            {item.specialties?.[0] && (
              <FeatureItem
                icon={<Award className="w-4 h-4" />}
                value={item.specialties[0]}
                className="text-sm"
              />
            )}
          </div>

          {/* Fila 3: Instrumentos */}
          {item.instruments && item.instruments.length > 0 && (
            <div className="mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-100">
                <Music className="w-4 h-4 flex-shrink-0 text-white/70 mt-0.5" />
                <div className="flex flex-wrap gap-1.5">
                  {item.instruments.map((instrument, index) => (
                    <span key={index} className="font-medium text-sm">
                      {instrument}{index < item.instruments.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-2">
            <div className="flex items-center">
              <div className="bg-white rounded-lg p-3 pr-32 border border-gray-200 flex-1">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">Precio desde</span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-fuchsia-700">
                      ${item.price?.toLocaleString('es-CO') || '0'}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">COP</span>
                  </div>
                  {item.discount && (
                    <span className="text-xs text-green-600 mt-0.5">
                      {item.discount}% OFF
                    </span>
                  )}
                </div>
              </div>
              <div className={`relative ${item.availability === "Disponible" ? "-ml-20" : "-ml-28"}`}>
                <button 
                  className={`${item.availability === "Disponible" 
                    ? 'bg-fuchsia-700 hover:bg-fuchsia-800' 
                    : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  } text-white font-medium py-2 px-4 rounded-lg shadow-md transition-colors whitespace-nowrap`}
                  disabled={item.availability !== "Disponible"}
                >
                  {item.availability === "Disponible" ? "Reservar" : "No disponible"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-2 border-t border-neutral-800">
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full hover:bg-neutral-800"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full hover:bg-neutral-800"
            >
              <Phone className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 rounded-full hover:bg-neutral-800"
          >
            <Share2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
