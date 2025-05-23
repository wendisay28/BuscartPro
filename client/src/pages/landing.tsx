import { Palette, Music, Drama, PaintbrushVertical, Camera, BookOpen, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  const categories = [
    { name: "Música", icon: Music, gradient: "from-primary to-secondary" },
    { name: "Teatro", icon: Drama, gradient: "from-secondary to-accent" },
    { name: "Artes Visuales", icon: PaintbrushVertical, gradient: "from-accent to-primary" },
    { name: "Fotografía", icon: Camera, gradient: "from-primary to-secondary" },
    { name: "Literatura", icon: BookOpen, gradient: "from-secondary to-accent" },
    { name: "Audiovisual", icon: Video, gradient: "from-accent to-primary" },
  ];

  return (
    <div className="min-h-screen bg-warm-gray">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Palette className="text-white h-6 w-6" />
              </div>
              <span className="font-heading font-bold text-2xl text-dark">
                Bus<span className="text-primary">Cart</span>
              </span>
            </div>
            
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <a href="/api/login">Iniciar Sesión</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-accent py-16 cultural-pattern">
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-white mb-6 animate-fade-in">
            Descubre el Arte que
            <span className="font-accent text-accent block mt-2">Te Inspira</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Conecta con artistas locales, encuentra eventos únicos y descubre espacios culturales en tu ciudad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <a href="/api/login">
                <Music className="mr-2 h-5 w-5" />
                Explorar Artistas
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <a href="/api/login">
                <Sparkles className="mr-2 h-5 w-5" />
                Ver Eventos
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-semibold text-3xl text-dark mb-12 text-center">
            Explora por Categoría
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={index} className="group cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComponent className="text-white h-8 w-8" />
                    </div>
                    <h3 className="font-medium text-gray-700">{category.name}</h3>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-dark mb-4">
              ¿Por qué elegir BusCart?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La plataforma más completa para conectar el talento artístico con quienes buscan experiencias culturales auténticas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Music className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                  Artistas Verificados
                </h3>
                <p className="text-gray-600">
                  Todos nuestros artistas pasan por un proceso de verificación para garantizar calidad y profesionalismo
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                  Contratación en Tiempo Real
                </h3>
                <p className="text-gray-600">
                  Sistema innovador de contratación inmediata con ofertas y contraofertas para necesidades urgentes
                </p>
              </CardContent>
            </Card>

            <Card className="text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PaintbrushVertical className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-4">
                  Comunidad Cultural
                </h3>
                <p className="text-gray-600">
                  Blog colaborativo, recomendaciones comunitarias y networking entre artistas y organizadores
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-dark to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-bold text-3xl text-white mb-6">
            ¿Listo para formar parte de la comunidad cultural más vibrante?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de artistas y organizadores que ya están conectando a través de BusCart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
              <a href="/api/login">
                Soy Artista
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-dark">
              <a href="/api/login">
                Busco Artistas
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Palette className="text-white h-6 w-6" />
                </div>
                <span className="font-heading font-bold text-2xl">
                  Bus<span className="text-primary">Cart</span>
                </span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                La plataforma que conecta el talento artístico con quienes buscan experiencias culturales auténticas.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">Para Artistas</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Crear perfil</li>
                <li>Publicar servicios</li>
                <li>Gestionar agenda</li>
                <li>Verificación</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-lg mb-4">Para Clientes</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Explorar artistas</li>
                <li>Crear eventos</li>
                <li>Solicitar recomendaciones</li>
                <li>Reseñas y calificaciones</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 BusCart. Todos los derechos reservados. <span className="font-accent text-accent">Conectando arte y cultura</span></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
