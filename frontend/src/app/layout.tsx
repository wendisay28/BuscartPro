import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NavigationProvider } from '@/context/NavigationContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BuscArt - Plataforma de Arte y Cultura',
  description: 'Descubre y conecta con artistas y eventos culturales',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-black text-white`}>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
