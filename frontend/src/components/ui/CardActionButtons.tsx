import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

interface CardActionButtonsProps {
  onLike?: (e: React.MouseEvent) => void;
  onComment?: (e: React.MouseEvent) => void;
  onShare?: (e: React.MouseEvent) => void;
  onSave?: (e: React.MouseEvent) => void;
  onMore?: (e: React.MouseEvent) => void;
  className?: string;
}

export const CardActionButtons: React.FC<CardActionButtonsProps> = ({
  onLike,
  onComment,
  onShare,
  onSave,
  onMore,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center gap-3 z-20 ${className}`}>
      <button 
        onClick={onLike}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        title="Me gusta"
      >
        <Heart className="w-5 h-5" fill="currentColor" />
      </button>
      
      <button 
        onClick={onComment}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        title="Opinión"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
      
      <button 
        onClick={onShare}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        title="Compartir"
      >
        <Share2 className="w-5 h-5" />
      </button>
      
      <button 
        onClick={onSave}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        title="Guardar"
      >
        <Bookmark className="w-5 h-5" />
      </button>
      
      <button 
        onClick={onMore}
        className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        title="Más opciones"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CardActionButtons;
