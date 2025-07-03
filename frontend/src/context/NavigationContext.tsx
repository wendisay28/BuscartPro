'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Section = 'hero' | 'eventos' | 'artistas' | 'galeria' | 'contacto';

interface NavigationContextType {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

// Hook personalizado para acceder al contexto
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  
  // Si no hay contexto, devolvemos un valor por defecto que no rompa el renderizado
  if (context === null) {
    return {
      activeSection: 'hero' as const,
      setActiveSection: () => {
        if (typeof window !== 'undefined') {
          console.warn('setActiveSection fue llamado fuera de NavigationProvider');
        }
      },
    };
  }
  
  return context;
};

// Componente proveedor
export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState<Section>('hero');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Marcar que estamos en el cliente
    setIsMounted(true);
    
    // Sincronizar con la URL al cargar
    const updateSectionFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['hero', 'eventos', 'artistas', 'galeria', 'contacto'].includes(hash)) {
        setActiveSection(hash as Section);
      }
    };
    
    updateSectionFromHash();
    
    // Manejar cambios en la URL
    const handleHashChange = () => {
      updateSectionFromHash();
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Si no se ha montado aún (durante SSR o hidratación inicial),
  // renderizamos los hijos directamente sin el proveedor
  if (!isMounted) {
    return <>{children}</>;
  }

  // Una vez montado en el cliente, renderizamos el proveedor con el contexto
  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
};
