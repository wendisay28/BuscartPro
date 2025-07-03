'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { Home, Compass, BookOpen, ShoppingBag, LogIn, UserPlus } from 'lucide-react';

const menuItems = [
  { name: 'Inicio', section: 'hero', icon: <Home className="w-5 h-5" /> },
  { name: 'Explorar', section: 'explorar', icon: <Compass className="w-5 h-5" /> },
  { name: 'Blog', section: 'blog', icon: <BookOpen className="w-5 h-5" /> },
  { name: 'Tienda', section: 'tienda', icon: <ShoppingBag className="w-5 h-5" /> }
];

const authItems = [
  { name: 'Ingresar', section: 'login', icon: <LogIn className="w-5 h-5" /> },
  { name: 'Registrarse', section: 'register', icon: <UserPlus className="w-5 h-5" /> }
];

// Componente de navegación del lado del cliente
function ClientNavigation() {
  const [isMounted, setIsMounted] = useState(false);
  const { activeSection, setActiveSection } = useNavigation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              BuscArt
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-gray-700 pr-4">
              {menuItems.map((item) => (
                <Link
                  key={item.section}
                  href={`#${item.section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.section as any);
                    document.getElementById(item.section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.section
                      ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 pl-2">
              {authItems.map((item) => (
                <Link
                  key={item.section}
                  href={`/${item.section}`}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente principal de navegación que maneja el renderizado del servidor
export default function Navigation() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // En el servidor, renderizar una versión simplificada
  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BuscArt
              </span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {menuItems.map((item) => (
                  <a
                    key={item.section}
                    href={`#${item.section}`}
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // En el cliente, renderizar la navegación completa con el contexto
  return <ClientNavigation />;
}