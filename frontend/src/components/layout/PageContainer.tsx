
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Contenedor base para todas las páginas
 */
export function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <main className={`container mx-auto px-4 py-6 ${className}`}>
      {children}
    </main>
  );
}
