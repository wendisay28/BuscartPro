import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { 
  Heart, 
  Bookmark, 
  MessageCircle, 
  Calendar, 
  Users, 
  Star,
  Music,
  BookOpen,
  ThumbsUp,
  Edit3,
  MapPin,
  Award,
  Image,
  PenTool,
  Store
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();
  const [postContent, setPostContent] = useState("");

  // Ejemplo de publicaciones de blog (comentado ya que no se usa actualmente)
  // const mockBlogPosts = [
  //   {
  //     id: 1,
  //     title: 'Publicación de ejemplo',
  //     excerpt: 'Esta es una publicación de ejemplo para mostrar en el dashboard.',
  //     date: '2023-11-20'
  //   }
  // ];

  const getPostTypeButtons = () => {
    const baseButtons = [
      { icon: Image, label: "Foto/Video", type: "media" },
      { icon: PenTool, label: "Post escrito", type: "text" },
    ];

    if (user?.userType === 'artist') {
      return [
        ...baseButtons,
        { icon: Calendar, label: "Evento", type: "event" },
        { icon: Music, label: "Servicio", type: "service" },
      ];
    }

    if (user?.userType === 'company') {
      return [
        ...baseButtons,
        { icon: Calendar, label: "Evento", type: "event" },
        { icon: Users, label: "Oportunidad", type: "opportunity" },
      ];
    }

    return [
      ...baseButtons,
      { icon: BookOpen, label: "Entrada de Blog", type: "blog" },
      { icon: ThumbsUp, label: "Recomendación", type: "recommendation" },
    ];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1 space-y-6">
            {/* Mini Profile */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg text-white">
                  {user?.firstName} {user?.lastName}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {user?.userType === 'artist' && 'Artista'}
                  {user?.userType === 'company' && 'Empresa'}
                  {user?.userType === 'general' && 'Usuario General'}
                  {!user?.userType && 'Invitado'}
                </p>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/user/profile">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Ver Perfil
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Accesos Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/user/favorites">
                    <Bookmark className="h-4 w-4 mr-3" />
                    Elementos Guardados
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/community/groups">
                    <Users className="h-4 w-4 mr-3" />
                    Grupos
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/community/blog">
                    <BookOpen className="h-4 w-4 mr-3" />
                    Blog
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/marketplace">
                    <Store className="h-4 w-4 mr-3" />
                    Tienda
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/explorer/events">
                    <Calendar className="h-4 w-4 mr-3" />
                    Eventos
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/user/subscriptions">
                    <Star className="h-4 w-4 mr-3" />
                    Suscripciones
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Center Column - Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Post Creation Section */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="¿Qué quieres compartir hoy?"
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="min-h-[80px] resize-none border-gray-200"
                    />
                    <div className="flex flex-wrap gap-2 mt-4">
                      {getPostTypeButtons().map((button, index) => {
                        const IconComponent = button.icon;
                        return (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                          >
                            <IconComponent className="h-4 w-4" />
                            {button.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Content Feed */}
            <div className="space-y-6">
              <h2 className="font-heading font-semibold text-xl text-dark">
                Contenido de tus Favoritos
              </h2>
              
              {/* Example content from favorites */}
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="overflow-hidden bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-dark">María Fernández</h4>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">hace 2 horas</span>
                        </div>
                        <p className="text-sm text-gray-600">Artista Musical</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      ¡Emocionada de anunciar mi nuevo espectáculo acústico este sábado! Será una noche mágica llena de música y emociones. ¿Quién se apunta? 🎸✨
                    </p>
                    
                    <div className="h-48 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4"></div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4" />
                          <span>24</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>8</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                          <Bookmark className="h-4 w-4" />
                          <span>Guardar</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {/* Blog Posts Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Últimas Entradas del Blog
                    </CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/community/blog">Ver más</Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-lg flex-shrink-0"></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-dark line-clamp-2">
                            Cómo preparar tu primera presentación en vivo: Guía completa
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Por Carlos Mendoza • hace 1 día
                          </p>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                            Consejos esenciales para artistas que están comenzando en el mundo de las presentaciones en vivo...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Suggestions & Ads */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Suggested Artists */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Artistas Sugeridos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">Ana Rodríguez</h4>
                      <p className="text-xs text-gray-400">Bailarina Contemporánea</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>Medellín</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Seguir</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Eventos Sugeridos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex-shrink-0 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white text-sm">Festival de Jazz</h4>
                        <p className="text-xs text-gray-400">15 de Abril</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Teatro Nacional</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Cultural Banner */}
            <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 mx-auto mb-3" />
                <h3 className="font-heading font-semibold mb-2">
                  ¡Únete a nuestro programa de artistas verificados!
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Obtén más visibilidad y credibilidad en la plataforma
                </p>
                <Button variant="secondary" size="sm" className="w-full">
                  Saber más
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}