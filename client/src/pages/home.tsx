import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import HeroSection from "@/components/hero-section";
import QuickCategories from "@/components/quick-categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Bookmark, MessageCircle, Calendar, Users, TrendingUp, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: featuredArtists } = useQuery({
    queryKey: ["/api/artists?featured=true"],
  });

  const { data: upcomingEvents } = useQuery({
    queryKey: ["/api/events?upcoming=true"],
  });

  const { data: recentBlogPosts } = useQuery({
    queryKey: ["/api/blog?recent=true"],
  });

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      <HeroSection />
      <QuickCategories />

      {/* Dashboard Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Quick Stats */}
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Artistas Disponibles</p>
                    <p className="text-2xl font-bold text-primary">1,247</p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Eventos Esta Semana</p>
                    <p className="text-2xl font-bold text-secondary">42</p>
                  </div>
                  <Calendar className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Contrataciones Hoy</p>
                    <p className="text-2xl font-bold text-accent">18</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Artists */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-semibold text-2xl text-dark">Artistas Destacados</h2>
              <Button asChild variant="outline">
                <Link href="/explorer">Ver todos</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mock data for featured artists - replace with real data */}
              {[1, 2, 3].map((_, index) => (
                <Card key={index} className="card-hover overflow-hidden">
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-primary to-secondary"></div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-medium text-green-600">● Disponible</span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Música</span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading font-semibold text-lg text-dark">Carlos Mendoza</h3>
                        <p className="text-sm text-gray-600">Guitarrista Acústico</p>
                        <p className="text-xs text-gray-500 flex items-center mt-1">
                          <span>Bogotá, Colombia</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-yellow-400 text-sm mb-1">
                          <span className="mr-1">4.8</span>
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                        <p className="text-xs text-gray-500">23 reseñas</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">Especialista en rock, pop y baladas. Perfecto para eventos íntimos y bodas.</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-primary">$80.000</span>
                        <span className="text-sm text-gray-500">/hora</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>127</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                          <Bookmark className="h-4 w-4 mr-1" />
                          <span>34</span>
                        </button>
                        <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>12</span>
                        </button>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                        Ver Perfil
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-secondary" />
                  Próximos Eventos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-dark">Festival de Jazz</h4>
                        <p className="text-sm text-gray-600">15 de Abril, 7:00 PM</p>
                      </div>
                      <Button size="sm" variant="outline">Ver</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Actividad Reciente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "like", message: "Te gustó el perfil de María Fernanda", time: "hace 2 horas" },
                    { type: "review", message: "Nueva reseña en tu evento", time: "hace 4 horas" },
                    { type: "hire", message: "Solicitud de contratación recibida", time: "hace 1 día" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        {activity.type === "like" && <Heart className="h-4 w-4 text-red-500" />}
                        {activity.type === "review" && <Star className="h-4 w-4 text-yellow-500" />}
                        {activity.type === "hire" && <Users className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-dark">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
