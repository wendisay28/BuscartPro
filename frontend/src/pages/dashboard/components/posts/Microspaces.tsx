"use client";

import { Play, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Microspace {
  id: string;
  creator: {
    name: string;
    avatar: string;
    initials: string;
  };
  title: string;
  duration: string;
  listeners: number;
  image?: string;
}

const mockMicrospaces: Microspace[] = [
  {
    id: '1',
    creator: {
      name: 'Ana Pérez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      initials: 'AP'
    },
    title: 'Conversaciones nocturnas',
    duration: '12:45',
    listeners: 245,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    creator: {
      name: 'Carlos Ruiz',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      initials: 'CR'
    },
    title: 'Tecnología y más',
    duration: '8:20',
    listeners: 189,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    creator: {
      name: 'María González',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      initials: 'MG'
    },
    title: 'Arte y creatividad',
    duration: '15:30',
    listeners: 312,
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52d6e654?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    creator: {
      name: 'Javier López',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
      initials: 'JL'
    },
    title: 'Música electrónica',
    duration: '22:15',
    listeners: 421,
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    creator: {
      name: 'Laura Martínez',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      initials: 'LM'
    },
    title: 'Cocina internacional',
    duration: '18:45',
    listeners: 276,
    image: 'https://images.unsplash.com/photo-1504674900247-0877039348bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
  },
];

export function Microspaces() {
  return (
    <div className="mb-6 w-full">
      <ScrollArea className="w-full">
        <div className="flex space-x-3 sm:space-x-4 pb-4">
          {/* Tarjeta para crear nuevo microespacio - Versión móvil */}
          <div className="flex-shrink-0 w-20 sm:w-36">
            <button 
              className="w-full h-full flex flex-col items-center justify-center gap-1 p-2 sm:p-3 rounded-xl border-2 border-dashed border-gray-700 hover:border-[#bb00aa] hover:bg-gray-900/50 transition-colors group"
              onClick={() => console.log('Crear nuevo microespacio')}
            >
              <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#bb00aa] to-purple-600 flex items-center justify-center group-hover:from-[#d400c0] group-hover:to-purple-500 transition-colors">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block text-xs font-medium text-white text-center">Crear</span>
            </button>
          </div>
          
          {mockMicrospaces.map((micro) => (
            <div key={micro.id} className="flex-shrink-0 w-20 sm:w-36">
              <Card className="w-full h-full bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#bb00aa]/50 transition-colors">
                <div className="relative group h-full flex flex-col">
                  {/* Versión móvil - Solo imagen circular */}
                  <div className="sm:hidden relative w-16 h-16 mx-auto mt-2 rounded-full overflow-hidden border-2 border-[#bb00aa]">
                    {micro.image ? (
                      <img 
                        src={micro.image} 
                        alt={micro.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/80 to-[#bb00aa]/80">
                        <span className="text-lg text-white/80">{micro.creator.initials}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Versión escritorio - Card completa */}
                  <div className="hidden sm:block aspect-square bg-gradient-to-br from-purple-900/80 to-[#bb00aa]/80 relative overflow-hidden">
                    {micro.image ? (
                      <img 
                        src={micro.image} 
                        alt={micro.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl text-white/80">{micro.creator.initials}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button 
                        size="icon" 
                        className="rounded-full w-10 h-10 bg-[#bb00aa] hover:bg-[#d400c0] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Contenido solo visible en escritorio */}
                  <CardContent className="hidden sm:block p-2 flex-1 flex flex-col">
                    <div className="flex items-start gap-1.5 mb-1">
                      <Avatar className="h-5 w-5 border border-gray-700 flex-shrink-0">
                        <AvatarImage src={micro.creator.avatar} />
                        <AvatarFallback className="text-[10px]">{micro.creator.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <h3 className="text-xs font-medium text-white truncate">{micro.title}</h3>
                        <p className="text-[10px] text-gray-400 truncate">{micro.creator.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto text-[10px] text-gray-400">
                      <span>{micro.duration}</span>
                      <div className="flex items-center gap-1">
                        <span>•</span>
                        <span>{micro.listeners}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  {/* Título solo en móvil */}
                  <div className="sm:hidden text-center px-1 py-2">
                    <p className="text-[10px] text-white truncate">{micro.title.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
}