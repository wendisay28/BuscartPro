import { Link } from "wouter";
import { LogIn, UserPlus } from "lucide-react";
import Button from "@/components/ui/button";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress > 100 ? 100 : progress);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 text-white shadow-xl backdrop-blur-sm border-b border-gray-800">
        {/* Barra de progreso */}
        <div 
          className="h-1 bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo y navegación izquierda */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                  Busc<span className="text-white">Art</span>
                </span>
              </Link>
              <div className="hidden md:ml-12 md:flex md:space-x-6">
                <a href="#" className="text-gray-300 hover:text-white px-5 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-white/5">
                  Inicio
                </a>
                <a href="#servicios" className="text-gray-300 hover:text-white px-5 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-white/5">
                  Servicios
                </a>
                <a href="#eventos" className="text-gray-300 hover:text-white px-5 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-white/5">
                  Eventos
                </a>
                <a href="#artistas" className="text-gray-300 hover:text-white px-5 py-3 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-white/5">
                  Artistas
                </a>
              </div>
            </div>

            {/* Navegación derecha */}
            <div className="flex items-center space-x-6">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200 text-base h-11 px-5">
                  <LogIn className="h-5 w-5 mr-2" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/30 transition-all duration-200 transform hover:-translate-y-0.5 text-base h-11 px-6">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Regístrate
                </Button>
              </Link>
            </div>

            {/* Menú móvil */}
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors duration-200"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Abrir menú principal</span>
                <svg
                  className="block h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Espacio para compensar el navbar fijo */}
      <div className="h-20"></div>
    </>
  );
}
