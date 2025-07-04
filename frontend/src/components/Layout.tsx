import { ReactNode } from 'react';
import NavigationHeader from './navigation-header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // Nota: isAuthenticated está comentado temporalmente para pruebas
  // const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* NavigationHeader maneja tanto el header de escritorio como la navegación móvil */}
      <NavigationHeader />
      
      {/* Contenido principal */}
      <main className="pt-14 pb-16 md:pt-16 md:pb-0 -mb-4">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}
