"use client";

import { Play, Plus, MoreHorizontal } from "lucide-react";
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
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60'
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
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60'
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
    image: 'https://images.unsplash.com/photo-1531913764164-f85c52d6e654?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60'
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
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60'
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
    image: 'https://images.unsplash.com/photo-1504674900247-0877039348bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60'
  },
];

export function Microspaces() {
  return (
    <div className="w-full mb-6 sm:mb-0">
      <ScrollArea className="w-full sm:mt-0 mt-8">
        <div className="flex space-x-3 px-3 sm:space-x-4 pb-3">

          {/* Crear microespacio - MÓVIL */}
          <div className="flex-shrink-0 w-32 sm:w-36">
            <div className="relative group sm:hidden">
              <div className="absolute -left-2 top-0 w-12 h-12 rounded-full border-2 border-[#bb00aa] bg-gradient-to-br from-[#bb00aa] to-purple-600 flex items-center justify-center z-10 shadow-lg">
                <Plus className="h-5 w-5 text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
              </div>
              <Card className="bg-gradient-to-br from-[#1e1b4b] to-[#1e1b4b]/90 border border-[#4c1d95] rounded-xl pl-10 pr-2 py-1.5 h-16 flex items-center transition-all duration-200 hover:from-[#2e1d6e] hover:to-[#1e1b4b]">
                <div className="space-y-0.5 overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">Nuevo espacio</h4>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                    <p className="text-[10px] text-purple-200 font-medium truncate">En vivo</p>
                  </div>
                  <p className="text-[9px] text-purple-300/80 font-medium">0 oyentes</p>
                </div>
              </Card>
            </div>
            
            {/* Botón escritorio - Mantener igual */}
            <button
              className="hidden sm:flex w-full h-full flex-col items-center justify-center gap-1 p-3 rounded-xl border-2 border-dashed border-gray-700 hover:border-[#bb00aa] hover:bg-gray-900/50 transition-colors group"
              onClick={() => console.log('Crear nuevo microespacio')}
              aria-label="Crear nuevo microespacio"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#bb00aa] to-purple-600 flex items-center justify-center">
                <Plus className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs font-medium text-white">Crear</span>
            </button>
          </div>

          {mockMicrospaces.map((micro) => (
            <div key={`${micro.id}-${micro.creator.name}`} className="flex-shrink-0 w-32 sm:w-36">
              {/* Versión móvil */}
              <div className="relative group sm:hidden">
                <div className="absolute -left-2 top-0 w-12 h-12 rounded-full border-2 border-[#bb00aa] overflow-hidden z-10">
                  <Avatar className="w-full h-full">
                    <AvatarImage src={micro.creator.avatar} />
                    <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-[#1e1b4b] to-[#4c1d95]">
                      {micro.creator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0f172a]" />
                </div>
                <Card className="bg-gradient-to-br from-[#1e1b4b] to-[#1e1b4b]/90 border border-[#4c1d95] rounded-xl pl-10 pr-2 py-1.5 h-16 flex items-center transition-all duration-200 hover:from-[#2e1d6e] hover:to-[#1e1b4b]">
                  <div className="space-y-0.5 overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">{micro.creator.name}</h4>
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                      <p className="text-[10px] text-purple-200 font-medium truncate">{micro.title}</p>
                    </div>
                    <p className="text-[9px] text-purple-300/80 font-medium">{micro.listeners} oyentes</p>
                  </div>
                </Card>
              </div>

              {/* Versión escritorio - Mantener igual */}
              <Card className="hidden sm:block w-full h-full bg-[#0f172a] border border-gray-800 rounded-xl overflow-hidden hover:border-[#bb00aa]/50 transition-colors">
                <div className="relative group h-full flex flex-col">
                  <div className="aspect-square bg-gradient-to-br from-purple-900/80 to-[#bb00aa]/80 relative overflow-hidden">
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
                        className="rounded-full w-10 h-10 bg-[#bb00aa] hover:bg-[#d400c0]"
                        aria-label={`Reproducir ${micro.title}`}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-2 flex-1 flex flex-col">
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
                </div>
              </Card>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-1" />
      </ScrollArea>
    </div>
  );
}
