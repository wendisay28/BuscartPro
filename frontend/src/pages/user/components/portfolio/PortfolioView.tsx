import { useState } from 'react';
import { 
  services, 
  products, 
  photos, 
  portfolioTabs
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

  const handleAddFeatured = () => {
    console.log('Agregar destacado');
    // Lógica para agregar destacado
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
        return <FeaturedSection items={[]} onAddContent={handleAddFeatured} />;
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
