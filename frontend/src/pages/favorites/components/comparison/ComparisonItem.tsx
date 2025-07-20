"use client";

import {
  Users,
  Music,
  Share2,
  MessageSquare,
  Phone,
  Award,
  UserCheck,
  UserX,
  Info,
  CalendarDays,
  MapPin,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface FeatureItemProps {
  icon: React.ReactNode;
  value: string | number | React.ReactNode;
  className?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, value, className }) => (
  <div className={"flex items-center gap-3 text-sm text-gray-100 leading-relaxed " + (className || '')}>
    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
      {icon}
    </div>
    <span>{value}</span>
  </div>
);

interface Price {
  type: 'fixed' | 'free' | 'ticket';
  value?: number;
}

interface ComparisonItemProps {
  item: {
    id: string | number;
    name?: string;
    title?: string;
    image?: string;
    category?: string;
    type?: string;
    price?: number | Price;
    discount?: number;
    rating?: number;
    members?: number;
    equipment?: string;
    verified?: boolean;
    specialties?: string[];
    instruments?: string[];
    availability?: string;
    venue?: string;
    date?: string;
    time?: string;
    attendees?: number;
    tags?: string[];
    description?: string;
    city?: string;
    mode?: string;
  };
}

export const ComparisonItem: React.FC<ComparisonItemProps> = ({ item }) => {
  // Check if this is an event (has venue and date)
  const isEvent = 'venue' in item && 'date' in item;
  const price = isEvent && typeof item.price === 'object' ? item.price : { type: 'fixed' as const, value: item.price };
  
  return (
    <div className="bg-neutral-900 p-2 rounded-2xl flex flex-col h-[440px]">
      <Card className="flex flex-col border-none shadow-xl overflow-hidden rounded-2xl h-full">
        <div className="relative flex-shrink-0 h-40">
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
              {isEvent && item.attendees !== undefined && (
                <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                  <Users className="w-3 h-3" />
                  <span>{item.attendees.toLocaleString()}</span>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">
                {item.name || item.title || "Sin nombre"}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-xs">
                {isEvent ? (
                  <>
                    <span>{item.venue}</span>
                    <span>•</span>
                    <span>{item.city}</span>
                  </>
                ) : (
                  <>
                    <Music className="w-3 h-3" />
                    <span>{item.type || item.category}</span>
                  </>
                )}
              </div>
              {isEvent && 'mode' in item && (
                <div className="mt-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${item.mode === 'Online' ? 'border-blue-500 text-blue-400' : 'border-green-500 text-green-400'}`}
                  >
                    {item.mode === 'Online' ? 'En línea' : 'Presencial'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 bg-neutral-950 flex-1 flex flex-col pb-2">
          {isEvent ? (
            <>
              <div className="space-y-3 mb-4">
                {item.date && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-100">
                      {format(new Date(item.date), "dd/MM/yyyy")}
                      {item.time && (
                        <>
                          <Clock className="w-3.5 h-3.5 text-gray-400 mx-1.5 inline" />
                          <span className="text-gray-100">
                            {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('es-CO', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            }).toLowerCase()}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                )}
                
                {item.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-300 line-clamp-3">{item.description}</p>
                  </div>
                )}

                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-neutral-800 text-gray-200 border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <FeatureItem
                  icon={<Users className="w-4 h-4" />}
                  value={`${item.members ?? 1} ${(item.members ?? 1) === 1 ? "miembro" : "miembros"}`}
                />
                <FeatureItem
                  icon={item.verified ? <UserCheck className="w-4 h-4 text-blue-500" /> : <UserX className="w-4 h-4 text-gray-400" />}
                  value={item.verified ? "Verificado" : "No verificado"}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {item.equipment && (
                  <FeatureItem
                    icon={<Info className="w-4 h-4" />}
                    value={item.equipment === "Sí" ? "Equipo incluido" : "Sin equipo"}
                  />
                )}
                {item.specialties?.[0] && (
                  <FeatureItem
                    icon={<Award className="w-4 h-4" />}
                    value={item.specialties[0]}
                  />
                )}
              </div>

              {item.instruments && item.instruments.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-start gap-2 text-sm text-gray-100 leading-relaxed">
                    <Music className="w-4 h-4 flex-shrink-0 text-white/70 mt-0.5" />
                    <div className="flex flex-wrap gap-1.5">
                      {item.instruments.map((instrument, index) => (
                        <span key={index} className="font-medium text-sm">
                          {instrument}
                          {index < item.instruments!.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="relative" style={{ marginTop: '-5px' }}>
            <div className="flex items-center">
              <div className={`bg-white rounded-lg p-3 pr-32 border border-gray-200 flex-1 max-w-[calc(100%-65px)] ${!isEvent ? 'pr-28' : ''}`}>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">
                    {!isEvent ? 'Precio por hora' : price.type === 'free' || (price.type === 'ticket' && price.value === 0) ? 'Entrada' : 'Precio desde'}
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-fuchsia-700 whitespace-nowrap">
                      {!isEvent && item.price !== undefined ? 
                        `$${typeof item.price === 'number' ? item.price.toLocaleString("es-CO") : item.price.value?.toLocaleString("es-CO")}` : 
                        price.type === 'free' || (price.type === 'ticket' && price.value === 0) ?
                        'Gratis' : 
                        `$${(price.value || 0).toLocaleString("es-CO")}`}
                    </span>
                    {((!isEvent && item.price !== 0) || (isEvent && price.type !== 'free' && price.value !== 0)) && (
                      <span className="text-xs text-gray-500 ml-1">COP</span>
                    )}
                  </div>
                  {item.discount && (
                    <span className="text-xs text-green-600 mt-0.5">{item.discount}% OFF</span>
                  )}
                </div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                {isEvent ? (
                  <button
                    className="bg-fuchsia-700 hover:bg-fuchsia-800 text-white font-medium py-2.5 px-3 rounded-lg shadow hover:shadow-md transition-all whitespace-nowrap text-sm"
                  >
                    Comprar ahora
                  </button>
                ) : (
                  <button
                    className={`${item.availability === "Disponible" ? "bg-fuchsia-700 hover:bg-fuchsia-800 w-32" : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"} text-white font-medium py-2.5 px-3 rounded-lg shadow hover:shadow-md transition-all whitespace-nowrap text-sm`}
                    disabled={item.availability !== "Disponible"}
                  >
                    {item.availability === "Disponible" ? "Reservar" : "No disponible"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-2 border-t border-neutral-800">
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full hover:bg-neutral-800">
              <MessageSquare className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full hover:bg-neutral-800">
              <Phone className="w-3.5 h-3.5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="w-6 h-6 rounded-full hover:bg-neutral-800">
            <Share2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </Card>
    </div>
  );
};