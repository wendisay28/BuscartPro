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
  Clock,
  Ruler,
  Weight,
  Palette,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface FeatureItemProps {
  icon: React.ReactNode;
  value: string | number | React.ReactNode;
  className?: string;
}

// Componente FeatureItem comentado ya que no se está utilizando actualmente
// Se mantiene la interfaz por si es necesaria en el futuro
/*
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, value, className }) => (
  <div className={"flex items-center gap-3 text-sm text-gray-100 leading-relaxed " + (className || '')}>
    <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
      {icon}
    </div>
    <span>{value}</span>
  </div>
);
*/

interface Price {
  type: 'fixed' | 'free' | 'ticket' | 'hourly';
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
    available?: boolean; // Para sitios y productos
    venue?: string;
    date?: string;
    time?: string;
    location?: string;
    tags?: string[];
    description?: string;
    // Propiedades específicas de sitios
    capacity?: number;
    amenities?: string[];
    usage?: string;
    // Propiedades específicas de productos de galería
    artist?: string;
    sales?: number;
    stock?: number;
    condition?: string;
    weight?: string;
    dimensions?: string;
    medium?: string;
    certificate?: boolean;
    signed?: boolean;
    framed?: boolean;
    publisher?: string;
    pages?: number;
    language?: string;
    format?: string;
  };
  type?: 'artists' | 'events' | 'sites' | 'gallery';
}

export const ComparisonItem: React.FC<ComparisonItemProps> = ({ item, type }) => {
  // Type guard para verificar si es un evento
  const isEvent = 'date' in item && 'venue' in item;
  // Type guard para verificar si es un sitio
  const isSite = 'capacity' in item && 'amenities' in item;
  // Type guard para verificar si es un producto de galería
  const isGalleryItem = 'stock' in item && 'condition' in item;

  // Función para obtener el precio de forma segura
  const getPrice = () => {
    if (typeof item.price === 'number') {
      return { type: 'fixed' as const, value: item.price };
    }
    return item.price || { type: 'fixed' as const, value: 0 };
  };
  
  const price = getPrice();
  
  // Obtener el tipo de servicio basado en el precio
  const getServiceType = (): string => {
    if (!isSite) return '';
    if (price.type === 'free' || price.type === 'ticket') return 'Visita';
    if (price.type === 'hourly') return 'Alquiler';
    return 'Visita';
  };
  
  // Función para formatear el precio
  const getFormattedPrice = () => {
    // Si es gratis o ticket con valor 0
    if (price.type === 'free' || (price.type === 'ticket' && price.value === 0)) {
      return { display: 'Gratis', showCurrency: false };
    }
    
    // Si tiene un valor definido
    if (price.value !== undefined && price.value !== null) {
      return { 
        display: `$${price.value.toLocaleString("es-CO")}`, 
        showCurrency: true 
      };
    }
    
    // Si no hay precio o no se puede determinar
    return { display: 'No disponible', showCurrency: false };
  };
  
  // Obtenemos el precio formateado
  const { display: priceDisplay, showCurrency } = getFormattedPrice();
  
  // Estilos condicionales basados en el tipo
  const isGallery = type === 'gallery';
  
  return (
    <div className={`bg-neutral-900 p-2 rounded-2xl flex flex-col ${isGallery ? 'h-[580px]' : 'h-[520px]'}`}>
      <Card className="flex flex-col border-none shadow-xl overflow-hidden rounded-2xl h-full group transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
        <div className={`relative flex-shrink-0 ${isGallery ? 'h-48' : 'h-40'} overflow-hidden`}>
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
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-2">
                {isGalleryItem && item.condition && (
                  <div className="bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {item.condition === 'Nuevo' ? 'Nuevo' :
                     item.condition === 'Original' ? 'Original' :
                     item.condition === 'Segunda mano' ? '2da Mano' :
                     item.condition}
                  </div>
                )}
                {!isGalleryItem && !isEvent && item.rating !== undefined && (
                  <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{item.rating}</span>
                  </div>
                )}
                {item.category && !isGalleryItem && (
                  <Badge className="bg-fuchsia-700 text-white border-none text-xs px-2 py-0.5">
                    {item.category}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {isGalleryItem && (item.stock || item.stock === 0) && (
                  <div className="flex items-center gap-1 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <span>{item.stock} {item.stock === 1 ? 'disponible' : 'disponibles'}</span>
                  </div>
                )}
                {isEvent && 'attendees' in item && item.attendees !== undefined && (
                  <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                    <Users className="w-3 h-3" />
                    <span>{item.attendees.toLocaleString()}</span>
                  </div>
                )}
                {!isEvent && !isGalleryItem && item.capacity !== undefined && (
                  <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-xs">
                    <Users className="w-3 h-3" />
                    <span>{item.capacity.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white line-clamp-1">
                {item.name || item.title || "Sin nombre"}
              </h3>
              <div className="flex items-center gap-1 text-white/80 text-xs">
                {isGalleryItem ? (
                  <>
                    <span className="font-medium">{item.artist || 'Artista'}</span>
                    <span>•</span>
                    <span className="text-gray-300">{item.type || 'Sin tipo'}</span>
                    {item.condition && (
                      <Badge variant="outline" className="ml-2 text-[10px] h-5 px-1.5 py-0 border-gray-600 text-gray-300">
                        {item.condition}
                      </Badge>
                    )}
                  </>
                ) : isEvent ? (
                  <>
                    <span className="font-medium">{'venue' in item ? item.venue : ''}</span>
                    <span>•</span>
                    <span className="text-gray-300">{'city' in item ? item.city : ''}</span>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span className="font-medium">{item.type || item.category}</span>
                    {item.verified && (
                      <Badge variant="outline" className="h-4 px-1.5 text-[10px] border-blue-500 text-blue-400 bg-blue-500/10">
                        Verificado
                      </Badge>
                    )}
                  </div>
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

        <div className="p-4 bg-neutral-950 flex-1 flex flex-col pb-4">
          {isEvent ? (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                {/* Columna izquierda */}
                <div className="space-y-3">
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Fecha</p>
                        <p className="text-sm font-medium text-white">
                          {item.date ? format(new Date(item.date), "dd/MM/yyyy") : 'No especificada'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {item.type && (
                    <div className="bg-neutral-900/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400">Tipo</p>
                          <p className="text-sm font-medium text-white truncate" title={item.type}>
                            {item.type
                              .replace('Concierto', 'Concierto ')
                              .replace('Online', 'Online')
                              .replace('Presencial', 'Pres.')
                              .replace('Taller', 'Taller ')
                              .replace('Conferencia', 'Conf.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna derecha */}
                <div className="space-y-3">
                  {item.time && (
                    <div className="bg-neutral-900/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-400">Hora</p>
                          <p className="text-sm font-medium text-white">
                            {new Date(`2000-01-01T${item.time}`).toLocaleTimeString('es-CO', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {item.category && (
                    <div className="bg-neutral-900/50 p-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                          <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        <div>
                          <p className="text-xs text-gray-400">Categoría</p>
                          <p className="text-sm font-medium text-white">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Descripción */}
              {item.description && (
                <div className="mb-3">
                  <p className="text-sm text-gray-300 line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs bg-neutral-800 text-gray-200 border-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </>
          ) : isSite ? (
            <div className="space-y-4">
              {/* Layout similar a eventos con dos columnas */}
              <div className="grid grid-cols-2 gap-3">
                {/* Columna izquierda */}
                <div className="space-y-3">
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-400">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Visita</p>
                        <p className="text-sm font-medium text-white">
                          {getServiceType()}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Ambiente</p>
                        <p className="text-sm font-medium text-white">
                          Libre de humo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna derecha */}
                <div className="space-y-3">
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Ubicación</p>
                        <p className="text-sm font-medium text-white">
                          {item.city || 'No disponible'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-neutral-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 w-4 h-4">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Mascotas</p>
                        <p className="text-sm font-medium text-white">
                          Pet Friendly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Descripción */}
              {item.description && (
                <div className="relative -top-2">
                  <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                </div>
              )}
              
              {/* Amenities */}
              {item.amenities && Array.isArray(item.amenities) && item.amenities.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.amenities?.map((amenity: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-neutral-800 text-gray-200 border-none">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ) : isGalleryItem ? (
            <div className="space-y-4">
              {/* Detalles específicos */}
              <div className="space-y-1.5 mt-2">
                {/* Dimensiones y Peso en dos columnas */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {item.dimensions && (
                    <div className="flex items-center text-xs text-gray-300">
                      <Ruler className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{item.dimensions}</span>
                    </div>
                  )}
                  {item.weight && (
                    <div className="flex items-center text-xs text-gray-300">
                      <Weight className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{item.weight}</span>
                    </div>
                  )}
                </div>
                
                {/* Medio/Técnica en línea completa */}
                {item.medium && (
                  <div className="flex items-center text-xs text-gray-300 pt-0.5">
                    <Palette className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{item.medium}</span>
                  </div>
                )}
                
                {/* Páginas solo si aplica */}
                {item.pages && (
                  <div className="flex items-center text-xs text-gray-300 pt-0.5">
                    <BookOpen className="w-3.5 h-3.5 mr-1.5 text-gray-400 flex-shrink-0" />
                    <span>{item.pages} páginas</span>
                  </div>
                )}
              </div>
              
              {/* Descripción y etiquetas especiales */}
              <div className="space-y-1">
                {item.description && (
                  <div className="relative -top-2">
                    <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                  </div>
                )}
                
                {/* Etiquetas especiales */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {/* Badges para todos los items de galería */}
                  {item.certificate && (
                    <Badge variant="secondary" className="text-xs bg-green-900/50 text-green-300 border border-green-700/50">
                      Certificado
                    </Badge>
                  )}
                  {item.framed && (
                    <Badge variant="secondary" className="text-xs bg-purple-900/50 text-purple-300 border border-purple-700/50">
                      Con marco
                    </Badge>
                  )}
                  
                  {/* Badges específicos para libros */}
                  {item.format && (
                    <Badge variant="secondary" className="text-xs bg-amber-900/50 text-amber-300 border border-amber-700/50">
                      {item.format}
                    </Badge>
                  )}
                  {item.language && (
                    <Badge variant="secondary" className="text-xs bg-cyan-900/50 text-cyan-300 border border-cyan-700/50">
                      {item.language}
                    </Badge>
                  )}
                  {item.category && item.category !== 'Libro' && (
                    <Badge variant="secondary" className="text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-700/50">
                      {item.category}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-neutral-900/50 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-fuchsia-400 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400">Miembros</p>
                      <p className="text-sm font-medium text-white">{item.members ?? 1} {(item.members ?? 1) === 1 ? "miembro" : "miembros"}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-neutral-900/50 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    {item.verified ? (
                      <UserCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <UserX className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-gray-400">Estado</p>
                      <p className={`text-sm font-medium ${item.verified ? 'text-green-400' : 'text-gray-400'}`}>
                        {item.verified ? 'Verificado' : 'No verificado'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                {item.equipment && (
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Equipo</p>
                        <p className="text-sm font-medium text-white">
                          {item.equipment === "Sí" ? "Incluido" : "No incluido"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {item.specialties?.[0] && (
                  <div className="bg-neutral-900/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-400">Especialidad</p>
                        <p className="text-sm font-medium text-white line-clamp-1">{item.specialties[0]}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {item.description && (
                <div className="mb-3">
                  <p className="text-sm text-gray-300 line-clamp-2 leading-tight">
                    {item.description}
                  </p>
                </div>
              )}

              {item.instruments && item.instruments.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-start gap-2 text-sm text-gray-100">
                    <Music className="w-4 h-4 flex-shrink-0 text-white/70 mt-1" />
                    <div className="flex flex-wrap gap-1.5">
                      {item.instruments.map((instrument, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="text-xs bg-neutral-800 text-gray-200 border-none whitespace-nowrap"
                        >
                          {instrument}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="relative mt-4">
            <div className="flex items-center">
              <div className={`bg-white rounded-lg p-3 pr-32 border border-gray-200 flex-1 max-w-[calc(100%-65px)] ${!isEvent ? 'pr-28' : ''}`}>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-xs">
                    {isGalleryItem ? 'Precio' : (price.type === 'free' || (price.type === 'ticket' && price.value === 0) ? 'Entrada' : 'Precio desde')}
                  </span>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-fuchsia-700 whitespace-nowrap">
                      {priceDisplay}
                    </span>
                    {showCurrency && (
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
                ) : isGalleryItem ? (
                  <button
                    className={`${item.available ? "bg-fuchsia-700 hover:bg-fuchsia-800 w-32" : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"} text-white font-medium py-2.5 px-3 rounded-lg shadow hover:shadow-md transition-all whitespace-nowrap text-sm`}
                    disabled={!item.available}
                  >
                    {item.available ? "Comprar ahora" : "No disponible"}
                  </button>
                ) : (
                  <button
                    className={`${(isSite ? item.available : item.availability === "Disponible") ? "bg-fuchsia-700 hover:bg-fuchsia-800 w-32" : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"} text-white font-medium py-2.5 px-3 rounded-lg shadow hover:shadow-md transition-all whitespace-nowrap text-sm`}
                    disabled={isSite ? !item.available : item.availability !== "Disponible"}
                  >
                    {(isSite ? item.available : item.availability === "Disponible") ? "Reservar" : "No disponible"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 border-t border-neutral-800 mt-auto">
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 rounded-full hover:bg-neutral-800 transition-colors duration-200"
            >
              <MessageSquare className="w-4 h-4 text-gray-300" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8 rounded-full hover:bg-neutral-800 transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-gray-300" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full hover:bg-neutral-800 transition-colors duration-200"
          >
            <Share2 className="w-4 h-4 text-gray-300" />
          </Button>
        </div>
      </Card>
    </div>
  );
};