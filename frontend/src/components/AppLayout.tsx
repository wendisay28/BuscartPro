import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from './navigation-header';
import MobileBottomNav from './MobileBottomNav';

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hideBottomNav, setHideBottomNav] = useState(false);

  // Determinar qué elementos de navegación mostrar basado en la ruta
  useEffect(() => {
    // Rutas donde no mostrar la navegación móvil
    const pathsWithoutNav = ['/login', '/register'];
    // Rutas donde ocultar el menú inferior
    const pathsToHideBottomNav = ['/hiring'];
    
    setShowMobileNav(!pathsWithoutNav.includes(location.pathname));
    setHideBottomNav(pathsToHideBottomNav.some(path => location.pathname.startsWith(path)));
  }, [location]);

  // Determinar si estamos en la página de inicio
  const isHomePage = location.pathname === '/';


  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo negro sólido */}
      <div className="fixed inset-0 bg-black"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header - Mostrar en todas las páginas */}
        <header className={`sticky top-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-800`}>
          <NavigationHeader />
        </header>

        {/* Contenido principal */}
        <main className={`flex-1 w-full overflow-y-auto ${!hideBottomNav ? 'pb-20' : 'pb-4'}`}>
          <div className={`w-full h-full ${!isHomePage ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6' : ''}`}>
            {children}
          </div>
        </main>

        {/* Navegación móvil inferior - Solo visible en móviles */}
        {showMobileNav && !hideBottomNav && !isHomePage && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <MobileBottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
