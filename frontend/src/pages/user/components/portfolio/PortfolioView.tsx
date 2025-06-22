import { useState } from 'react';
import { 
  services, 
  products, 
  photos, 
  portfolioTabs,
  FeaturedItem
} from '../../data/portfolio.mock';

// Los tipos ya están importados en los componentes hijos
import { PortfolioTabs } from './components/PortfolioTabs';
import { ServicesSection } from './services/ServicesSection';
import { StoreSection } from './store/StoreSection';
import { PhotosSection } from './photos/PhotosSection';
import { FeaturedSection } from './featured/FeaturedSection';

export const PortfolioView = () => {
  const [activeTab, setActiveTab] = useState<string>('services');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleAddService = () => {
    console.log('Agregar servicio');
    // Lógica para agregar servicio
  };

  const handleAddProduct = () => {
    console.log('Agregar producto');
    // Lógica para agregar producto
  };

  const handleUploadPhoto = () => {
    console.log('Subir foto/vídeo');
    // Lógica para subir foto/vídeo
  };

  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>([]);

  const handleAddFeatured = async (item: Omit<FeaturedItem, 'id' | 'createdAt'>) => {
    // En una implementación real, aquí harías una llamada a tu API
    const newItem: FeaturedItem = {
      ...item,
      id: `item-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    // Simulamos una llamada a la API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFeaturedItems(prev => [...prev, newItem]);
        resolve();
      }, 500);
    });
  };

  const handleRemoveFeatured = async (id: string) => {
    // En una implementación real, aquí harías una llamada a tu API
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setFeaturedItems(prev => prev.filter(item => item.id !== id));
        resolve();
      }, 500);
    });
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesSection services={services} onAddService={handleAddService} />;
      case 'store':
        return <StoreSection products={products} onAddProduct={handleAddProduct} />;
      case 'photos':
      case 'videos':
        return (
          <PhotosSection 
            photos={photos} 
            onUpload={handleUploadPhoto} 
            type={activeTab as 'photos' | 'videos'} 
          />
        );
      case 'featured':
        return (
          <FeaturedSection 
            items={featuredItems}
            onAddContent={handleAddFeatured}
            onRemoveContent={handleRemoveFeatured}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <PortfolioTabs 
        tabs={portfolioTabs} 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      {renderActiveTab()}
    </div>
  );
};

export default PortfolioView;
