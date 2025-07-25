import { MoreHorizontal, Hand, Sparkles, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PostCard3DProps {
  id: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  imageUrl: string;
  likes: number;
  comments: number;
  type: 'post' | 'nota' | 'blog';
  createdAt: Date;
}

export default function PostCard3D({ 
  id,
  content,
  author,
  imageUrl,
  likes,
  comments,
  type,
  createdAt 
}: PostCard3DProps) {
  return (
    <Card className="relative bg-gradient-to-b from-[#0d0d0d] to-[#111] border border-purple-900/40 rounded-2xl overflow-hidden mb-6 shadow-md hover:shadow-purple-800/30 transition-all duration-300">
      {/* Botón de 3 puntos */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
        <MoreHorizontal className="w-5 h-5" />
      </button>

      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-900 to-pink-600 flex-shrink-0 overflow-hidden ring-2 ring-purple-700">
            {author.avatar ? (
              <img 
                src={author.avatar}
                alt={author.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author.name)}&background=random`;
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-base font-bold">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-white">{author.name}</p>
            <p className="text-xs text-gray-400 flex items-center gap-2">
              {new Date(createdAt).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
              })}
              <span className="px-2 py-0.5 bg-purple-800/30 border border-purple-700 rounded-full text-[10px] uppercase tracking-wider">
                {type}
              </span>
            </p>
          </div>
        </div>

        {/* Contenido */}
        {content && (
          <p className="text-gray-200 text-[15px] leading-relaxed mb-4">{content}</p>
        )}

        {/* Imagen */}
        {imageUrl && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img
              src={imageUrl}
              alt="Post content"
              className="w-full aspect-video object-cover"
            />
          </div>
        )}

        {/* Acciones artísticas */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors">
              <Hand className="w-5 h-5" />
              <span className="text-sm">{likes.toLocaleString()}</span>
            </button>
            <button className="flex items-center gap-1 text-gray-400 hover:text-purple-400 transition-colors">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm">Recomendar</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{comments.toLocaleString()}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
