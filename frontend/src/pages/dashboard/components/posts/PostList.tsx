import { Post } from "../../types";
import PostCard3D from "./PostCard3D";

type PostListProps = {
  posts: Post[];
  activeTab: 'post' | 'nota' | 'blog';
  onTabChange: (tab: 'post' | 'nota' | 'blog') => void;
};

export const PostList = ({ activeTab }: PostListProps) => {
  // Datos de ejemplo para simular publicaciones
  const mockPosts = [
    {
      id: '1',
      content: '¡Acabo de terminar mi última obra de arte! ¿Qué opinan? 🎨✨ #Arte #Creatividad',
      author: {
        name: 'Martha Foster',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      imageUrl: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=640',
      likes: 1243,
      comments: 87,
      type: 'post' as const,
      createdAt: new Date(2025, 6, 24, 14, 30)
    },
    {
      id: '2',
      content: 'Pensamiento del día: La creatividad es la inteligencia divirtiéndose. 🧠✨',
      author: {
        name: 'Carlos Ruiz',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      imageUrl: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=640',
      likes: 892,
      comments: 45,
      type: 'nota' as const,
      createdAt: new Date(2025, 6, 23, 9, 15)
    },
    {
      id: '3',
      content: 'Nuevo artículo en mi blog: "Técnicas avanzadas de pintura digital" - Un viaje a través de mis métodos y herramientas favoritas para crear arte digital que realmente destaque. #ArteDigital #Tutorial',
      author: {
        name: 'Ana Martínez',
        avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
      },
      imageUrl: 'https://images.unsplash.com/photo-1554080351-a576cf803bda?w=640',
      likes: 2456,
      comments: 132,
      type: 'blog' as const,
      createdAt: new Date(2025, 6, 22, 16, 45)
    }
  ];

  // Filtrar publicaciones según la pestaña activa
  const filteredPosts = activeTab === 'post' || activeTab === 'nota' || activeTab === 'blog'
    ? mockPosts.filter(post => post.type === activeTab)
    : mockPosts;

  return (
    <div className="space-y-6 py-2">
      {filteredPosts.map((post) => (
        <PostCard3D
          key={post.id}
          id={post.id}
          content={post.content}
          author={post.author}
          imageUrl={post.imageUrl}
          likes={post.likes}
          comments={post.comments}
          type={post.type}
          createdAt={post.createdAt}
        />
      ))}
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-400">No hay publicaciones para mostrar.</p>
        </div>
      )}
    </div>
  );
};
