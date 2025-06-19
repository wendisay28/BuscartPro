import { Heart, MessageCircle, Bookmark, Share2, MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type ContentCardProps = {
  item: {
    id: string | number;
    title: string;
    description?: string;
    image: string;
    category?: string;
    location?: string;
    date?: string;
    price?: number;
    isRecommended?: boolean;
    likes?: number;
    comments?: number;
    tags?: string[];
  };
  variant?: 'grid' | 'full';
  onLike?: (id: string | number) => void;
  onBookmark?: (id: string | number) => void;
  onShare?: (id: string | number) => void;
};

export function ContentCard({
  item,
  variant = 'grid',
  onLike,
  onBookmark,
  onShare,
}: ContentCardProps) {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.(item.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.(item.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(item.id);
  };

  if (variant === 'grid') {
    return (
      <div 
        className={cn(
          'card card-hover overflow-hidden relative',
          item.isRecommended && 'ring-2 ring-blue-500'
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          
          {/* Badge de recomendado */}
          {item.isRecommended && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              Recomendado
            </div>
          )}

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
              {item.tags.length > 2 && (
                <span className="bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  +{item.tags.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-3">
          <h3 className="font-bold text-sm line-clamp-2 h-10">{item.title}</h3>
          
          {item.category && (
            <p className="text-xs text-gray-400 mt-1">{item.category}</p>
          )}
          
          {(item.location || item.date) && (
            <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
              {item.location && (
                <span className="flex items-center">
                  <MapPin size={12} className="mr-1" />
                  {item.location}
                </span>
              )}
              {item.date && (
                <span className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  {item.date}
                </span>
              )}
            </div>
          )}
          
          {item.price !== undefined && (
            <div className="mt-2">
              <span className="text-sm font-bold">${item.price.toFixed(2)}</span>
              <span className="text-xs text-gray-400 ml-1">por persona</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Vista completa (estilo TikTok)
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Imagen o video de fondo */}
      <div className="absolute inset-0 z-0">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col">
        {/* Información del contenido */}
        <div className="flex-1 flex flex-col justify-end pb-24">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
            
            {item.description && (
              <p className="text-gray-200 mb-4 line-clamp-2">{item.description}</p>
            )}
            
            <div className="flex items-center space-x-4 text-sm mb-4">
              {item.category && (
                <span className="flex items-center text-gray-300">
                  {item.category}
                </span>
              )}
              {item.location && (
                <span className="flex items-center text-gray-300">
                  <MapPin size={14} className="mr-1" />
                  {item.location}
                </span>
              )}
            </div>
            
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center font-medium">
              Ver detalles <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Acciones laterales */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
          {/* Perfil */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs mt-1">@{item.title.split(' ')[0].toLowerCase()}</span>
          </div>
          
          {/* Botón de like */}
          <button 
            onClick={handleLike}
            className="flex flex-col items-center text-white"
          >
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
              <Heart size={20} fill="currentColor" className="text-white" />
            </div>
            <span className="text-xs">{item.likes || 0}</span>
          </button>
          
          {/* Botón de comentarios */}
          <button className="flex flex-col items-center text-white">
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
              <MessageCircle size={20} className="text-white" />
            </div>
            <span className="text-xs">{item.comments || 0}</span>
          </button>
          
          {/* Botón de guardar */}
          <button 
            onClick={handleBookmark}
            className="flex flex-col items-center text-white"
          >
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center mb-1">
              <Bookmark size={20} className="text-white" />
            </div>
          </button>
          
          {/* Botón de compartir */}
          <button 
            onClick={handleShare}
            className="flex flex-col items-center text-white"
          >
            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center">
              <Share2 size={20} className="text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
