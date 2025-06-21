import { ReactNode } from 'react';
import NavigationHeader from './navigation-header';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
