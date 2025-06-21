import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Heart, MessageCircle, Share, Calendar, Plus, Bookmark, Bell, Edit } from "lucide-react";
import { useState } from "react";

// Datos de ejemplo para las publicaciones
const myPosts = [
  {
    id: 1,
    title: "Tendencias en Ilustración Digital 2024",
    excerpt: "Descubre las técnicas y estilos que están dominando el mundo de la ilustración digital este año...",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    publishDate: "15 Jun 2024",
    readTime: "5 min",
    views: 234,
    likes: 18,
    comments: 7,
    status: "published"
  },
  {
    id: 2,
    title: "Mi Proceso Creativo: De la Idea al Arte Final",
    excerpt: "Te muestro paso a paso cómo desarrollo mis ilustraciones, desde el boceto inicial hasta los detalles finales...",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    publishDate: "10 Jun 2024",
    readTime: "8 min",
    views: 156,
    likes: 24,
    comments: 12,
    status: "published"
  },
  {
    id: 3,
    title: "Colaboración con Autores: Ilustrando Cuentos Infantiles",
    excerpt: "La experiencia de trabajar en proyectos de literatura infantil y los desafíos únicos que presenta...",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    publishDate: "5 Jun 2024",
    readTime: "6 min",
    views: 89,
    likes: 15,
    comments: 4,
    status: "draft"
  }
];

const savedPosts = [
  {
    id: 4,
    title: "Técnicas Avanzadas de Ilustración Digital",
    excerpt: "Aprende técnicas profesionales para llevar tus ilustraciones al siguiente nivel...",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    publishDate: "20 Jun 2024",
    readTime: "10 min",
    views: 321,
    likes: 45,
    comments: 12,
    status: "saved"
  }
];

const subscriptionPosts = [
  {
    id: 5,
    title: "Novedades en Diseño Web: Tendencias 2024",
    excerpt: "Las últimas tendencias en diseño web que están marcando la pauta este año...",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
    publishDate: "22 Jun 2024",
    readTime: "7 min",
    views: 412,
    likes: 56,
    comments: 23,
    status: "subscribed"
  }
];

export function BlogView() {
  const [activeTab, setActiveTab] = useState("my-blog");
  
  return (
    <div className="bg-black w-full min-h-screen">
      <div className="border-t border-gray-700 w-full mt-2"></div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full px-4 md:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <TabsList className="grid w-full md:w-1/2 grid-cols-2 bg-[#141b2a] p-1 rounded-xl border border-gray-700">
            <TabsTrigger 
              value="my-blog" 
              className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors flex items-center justify-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Mi Blog ({myPosts.length})</span>
            </TabsTrigger>
            <TabsTrigger 
              value="others" 
              className="data-[state=active]:bg-[#e74f05] data-[state=active]:text-white hover:bg-[#e74f05]/20 hover:text-[#e74f05] rounded-lg py-2 transition-colors flex items-center justify-center space-x-2"
            >
              <Bookmark className="w-4 h-4" />
              <span>Otros ({savedPosts.length + subscriptionPosts.length})</span>
            </TabsTrigger>
          </TabsList>
          
          <Button 
            className="bg-[#e74f05] hover:bg-[#e74f05]/90 hidden md:flex"
            onClick={() => {}}
          >
            <Plus className="w-4 h-4 mr-2" />
            Crear entrada
          </Button>
        </div>
        
        {/* Botón flotante para móviles */}
        <div className="md:hidden fixed bottom-6 right-6 z-10">
          <Button 
            className="rounded-full w-14 h-14 p-0 bg-[#e74f05] hover:bg-[#e74f05]/90 shadow-lg"
            onClick={() => {}}
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
        
        <div className="space-y-8">
          {activeTab === 'my-blog' && (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              {myPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden border border-gray-700 bg-[#1a2234] hover:border-[#e74f05] transition-colors"
                >
                  <div className="relative">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={
                        post.status === 'published' 
                          ? "bg-green-500/90 text-white border-green-500 font-medium px-3 py-1" 
                          : "bg-yellow-500/90 text-white border-yellow-500 font-medium px-3 py-1"
                      }>
                        {post.status === 'published' ? 'Publicado' : 'Borrador'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{post.publishDate}</span>
                      <span>•</span>
                      <span>{post.readTime} lectura</span>
                    </div>
                    
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <Share className="w-4 h-4 mr-1" />
                        Compartir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {activeTab === 'others' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-[#e74f05]" />
                  Suscripciones ({subscriptionPosts.length})
                </h3>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {subscriptionPosts.map((post) => (
                    <Card key={post.id} className="border border-gray-700 bg-[#1a2234] hover:border-[#e74f05] transition-colors">
                      <div className="relative">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span>{post.readTime} lectura</span>
                        </div>
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Share className="w-4 h-4 mr-1" />
                            Compartir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Bookmark className="w-5 h-5 mr-2 text-[#e74f05]" />
                  Guardados ({savedPosts.length})
                </h3>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  {savedPosts.map((post) => (
                    <Card key={post.id} className="border border-gray-700 bg-[#1a2234] hover:border-[#e74f05] transition-colors">
                      <div className="relative">
                        <img 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span>{post.readTime} lectura</span>
                        </div>
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                            <Share className="w-4 h-4 mr-1" />
                            Compartir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
}