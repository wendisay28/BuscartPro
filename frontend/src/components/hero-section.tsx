import { Button } from "@/components/ui/button";
import { Music, Calendar, Sparkles } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
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
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-lg">
            <Link href="/explorer?type=artists">
              <Music className="mr-2 h-5 w-5" />
              Explorar Artistas
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary shadow-lg">
            <Link href="/explorer?type=events">
              <Calendar className="mr-2 h-5 w-5" />
              Ver Eventos
            </Link>
          </Button>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-white/80">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">Contratación en tiempo real</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Music className="h-4 w-4" />
            <span className="text-sm">Artistas verificados</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Eventos únicos</span>
          </div>
        </div>
      </div>
    </section>
  );
}
