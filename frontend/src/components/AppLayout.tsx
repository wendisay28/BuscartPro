import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from './navigation-header';
import MobileBottomNav from './MobileBottomNav';

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [hideBottomNav, setHideBottomNav] = useState(false);

  useEffect(() => {
    const pathsWithoutNav = ['/login', '/register'];
    const pathsToHideBottomNav = ['/hiring'];
    setShowMobileNav(!pathsWithoutNav.includes(location.pathname));
    setHideBottomNav(pathsToHideBottomNav.some(path => location.pathname.startsWith(path)));
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Fondo negro */}
      <div className="fixed inset-0 bg-black"></div>

      {/* Estructura */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Header */}
        <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-sm border-b border-gray-800">
          <NavigationHeader />
        </header>

        {/* Main content */}
        <main className={`flex-1 w-full overflow-y-auto ${!hideBottomNav ? 'pb-20' : 'pb-4'}`}>
          <div 
            className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-6"
          >
            {children}
          </div>
        </main>

        {/* Nav inferior móvil */}
        {showMobileNav && !hideBottomNav && !isHomePage && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
            <MobileBottomNav />
          </div>
        )}
      </div>
    </div>
  );
}
