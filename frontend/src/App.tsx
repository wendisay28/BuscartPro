
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Toaster } from '@/components/ui/toaster';
import GlobalNavigation from '@/components/global-navigation';
import Routes from '@/routes';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalNavigation />
        <Routes />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
