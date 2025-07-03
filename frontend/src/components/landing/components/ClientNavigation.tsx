'use client';

import dynamic from 'next/dynamic';
import { NavigationProvider } from '@/context/NavigationContext';

// Importar el componente Navigation de forma dinámica sin SSR
const Navigation = dynamic(
  () => import('./Navigation'),
  { ssr: false }
);

export default function ClientNavigation() {
  return (
    <NavigationProvider>
      <Navigation />
    </NavigationProvider>
  );
}
