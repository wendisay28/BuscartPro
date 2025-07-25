import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { Post } from "../../types";

type PostListProps = {
  posts: Post[];
  // 'post' = 'Post', 'nota' = 'Nota', 'blog' = 'Blog'
  activeTab: 'post' | 'nota' | 'blog';
  onTabChange: (tab: 'post' | 'nota' | 'blog') => void;
};

export const PostList = ({ posts, activeTab, onTabChange }: PostListProps) => {
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<string, boolean>>({});

  const handleLike = (postId: string) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleSave = (postId: string) => {
    setSavedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const getPostTitle = (type: string) => {
    const titles = {
      post: "Post multimedia con texto largo",
      nota: "MicroPost estilo Twitter",
      blog: "Entrada de Blog destacada"
    };
    return titles[type as keyof typeof titles] || "Publicación";
  };

  return (
    <div className="space-y-0">
      {/* Contenido principal */}
      <div className="w-full">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Card key={post.id} className="bg-gray-900 border border-gray-800 w-full sm:mt-3">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-2 text-white">
                  {getPostTitle(activeTab)}
                </h4>
                <p className="text-gray-400 mb-4">
                  {post.content}
                </p>
                {post.mediaUrl && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={post.mediaUrl} 
                      alt="Media content" 
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                <div className="flex items-center gap-6 text-sm">
                  <button 
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${likedPosts[post.id] ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}
                  >
                    <Heart 
                      className={`h-4 w-4 ${likedPosts[post.id] ? 'fill-current' : 'text-white'}`} 
                    />{' '}
                    {likedPosts[post.id] ? post.likes + 1 : post.likes}
                  </button>
                  <button className="flex items-center gap-1 text-gray-300 hover:text-blue-500">
                    <MessageCircle className="h-4 w-4 text-white" /> {post.comments}
                  </button>
                  <button 
                    onClick={() => handleSave(post.id)}
                    className={`flex items-center gap-1 ${savedPosts[post.id] ? 'text-[#bb00aa]' : 'text-gray-300 hover:text-[#bb00aa]'}`}
                  >
                    <Bookmark 
                      className={`h-4 w-4 ${savedPosts[post.id] ? 'fill-current' : 'text-white'}`} 
                    />
                    {savedPosts[post.id] ? 'Guardado' : 'Guardar'}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No hay publicaciones para mostrar. ¡Sé el primero en publicar algo!
          </div>
        )}
      </div>
    </div>
  );
};
