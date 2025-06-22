import { Link } from "wouter";
import { LogIn, UserPlus } from "lucide-react";
import Button from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="bg-black/95 text-white shadow-xl backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo y navegación izquierda */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                Busc<span className="text-white">Art</span>
              </span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <a href="#" className="text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/5">
                Inicio
              </a>
              <a href="#servicios" className="text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/5">
                Servicios
              </a>
              <a href="#eventos" className="text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/5">
                Eventos
              </a>
              <a href="#artistas" className="text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-white/5">
                Artistas
              </a>
            </div>
          </div>

          {/* Navegación derecha */}
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-200 hover:bg-white/10 hover:text-white transition-colors duration-200">
                <LogIn className="h-5 w-5 mr-2" />
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-200 transform hover:-translate-y-0.5">
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
                className="block h-6 w-6"
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

      {/* Menú móvil desplegable */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Inicio
          </a>
          <a href="#servicios" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Servicios
          </a>
          <a href="#eventos" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Eventos
          </a>
          <a href="#artistas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
            Artistas
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="px-2 space-y-1">
            <Link
              href="/login"
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="block px-4 py-2.5 rounded-lg text-base font-medium text-white bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 hover:text-white transition-colors duration-200"
            >
              Regístrate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
