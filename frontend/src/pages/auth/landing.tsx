import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Drama, PaintbrushVertical, Camera, BookOpen, Video, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Navbar from "@/components/landing/components/Navbar";
import HeroSection from "@/components/landing/components/HeroSection";
import ArtistsCarousel from "@/components/landing/components/ArtistsCarousel";
import HowItWorksSection from "@/components/landing/components/HowItWorksSection";
import FeaturesSection from "@/components/landing/components/FeaturesSection";
import MapSection from "@/components/landing/components/MapSection";
import ArtistCategories from "@/components/landing/components/ArtistCategories";

import EventsSection from "@/components/landing/components/EventsSection";

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sections = useRef<HTMLDivElement[]>([]);
  const sectionContents = useRef<HTMLDivElement[]>([]);

  const addToSections = (el: HTMLDivElement | null) => {
    if (el) sections.current.push(el);
  };

  const addToSectionContents = (el: HTMLDivElement | null) => {
    if (el) sectionContents.current.push(el);
  };

  useEffect(() => {
    // Verificar que estamos en el navegador
    if (typeof window === 'undefined') return;
    
    // Configurar ScrollTrigger para cada sección
    sections.current.forEach((section, index) => {
      const content = sectionContents.current[index];
      if (!content || !section) return;

      // Configurar la altura de la sección para que coincida con el viewport
      gsap.set(section, { height: '100vh' });
      
      // Crear la animación para el contenido
      gsap.to(content, {
        y: () => -(content.scrollHeight - window.innerHeight),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          // Limpiar los ScrollTriggers cuando el componente se desmonte
          onRefresh: (self: any) => self.progress === 0 && self.animation?.progress(0),
          pin: true,
          pinSpacing: false,
          markers: true, // Desactivar en producción
          onUpdate: (self) => {
            // Añadir clase cuando la sección está activa
            const progress = self.progress;
            if (progress > 0.1 && progress < 0.9) {
              section.classList.add('active-section');
            } else {
              section.classList.remove('active-section');
            }
          }
        }
      });
    });

    // Limpiar los ScrollTriggers cuando el componente se desmonte
    return () => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);

  const categories = [
    { name: "Música", icon: Music, gradient: "from-primary to-secondary" },
    { name: "Teatro", icon: Drama, gradient: "from-secondary to-accent" },
    { name: "Artes Visuales", icon: PaintbrushVertical, gradient: "from-accent to-primary" },
    { name: "Fotografía", icon: Camera, gradient: "from-primary to-secondary" },
    { name: "Literatura", icon: BookOpen, gradient: "from-secondary to-accent" },
    { name: "Audiovisual", icon: Video, gradient: "from-accent to-primary" },
  ];

  return (
    <div className="min-h-screen bg-warm-gray overflow-x-hidden" ref={containerRef}>
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section 
        ref={addToSections} 
        className="relative h-screen w-full bg-gradient-to-b from-purple-900 to-gray-900 flex items-center justify-center overflow-hidden"
      >
        <div ref={addToSectionContents} className="w-full">
          <HeroSection />
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-black"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <FeaturesSection />
        </div>
      </section>

      {/* How It Works + Artists Carousel */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-[#390052]"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <HowItWorksSection />
              <ArtistsCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-gray-900"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <MapSection />
        </div>
      </section>

      {/* User Profiles Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-black"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <ArtistCategories />
        </div>
      </section>

      {/* Events Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-gray-950"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <EventsSection />
        </div>
      </section>

      {/* Categories Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-white"
      >
        <div ref={addToSectionContents} className="w-full py-20">
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
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={addToSections} 
        className="relative w-full bg-gradient-to-r from-primary to-secondary text-white"
      >
        <div ref={addToSectionContents} className="w-full py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <p> 2024 BusCart. Todos los derechos reservados. <span className="font-accent text-accent">Conectando arte y cultura</span></p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        /* Estilos globales para el scroll suave */
        html {
          scroll-behavior: smooth;
        }
        
        /* Estilos para las secciones activas */
        section {
          will-change: transform;
        }
        
        .active-section {
          outline: 2px solid rgba(236, 72, 153, 0.5);
          outline-offset: -2px;
        }
      `}</style>
    </div>
  );
}