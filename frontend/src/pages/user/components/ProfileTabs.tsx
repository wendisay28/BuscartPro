import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  onPortfolioClick?: () => void;
  activeTab?: string;
};

export function ProfileTabs({ onPortfolioClick, activeTab }: Props) {
  // Imágenes de ejemplo - en una aplicación real estas vendrían de tu estado o API
  const featuredImages = [
    {
      id: 1,
      src: 'https://picsum.photos/id/1005/300/400',
      alt: 'Dibujo digital 1',
      title: 'Retrato Digital',
      isActive: true,
      type: 'artwork'
    },
    {
      id: 2,
      src: 'https://picsum.photos/id/1015/300/400',
      alt: 'Dibujo digital 2',
      title: 'Paisaje Digital',
      isActive: true,
      type: 'artwork'
    },
    {
      id: 3,
      src: 'https://picsum.photos/id/1025/300/400',
      alt: 'Dibujo digital 3',
      title: 'Arte Conceptual',
      isActive: true,
      type: 'artwork'
    },
    {
      id: 4,
      src: 'https://picsum.photos/id/1027/300/400',
      alt: 'Foto de perfil',
      title: 'Foto de Perfil',
      isActive: true,
      type: 'profile'
    }
  ];

  // Mostrar solo cuando la pestaña activa sea 'portfolio'
  const showFeaturedImages = activeTab === 'portfolio';

  return (
    <div className="w-full z-10 mb-4 space-y-3">
      {/* Barra superior con título */}
      <div className="relative bg-[#141b2a] shadow-lg rounded-2xl overflow-hidden border border-gray-700/30">
        
        <div className="relative flex items-center justify-between px-6 py-3">
          <h2 
            className="text-lg font-bold text-white cursor-pointer hover:text-orange-300 transition-colors flex items-center"
            onClick={onPortfolioClick}
          >
            <span className="bg-orange-500/90 text-white px-3 py-1.5 rounded-lg mr-3 text-sm font-medium">
              Mi Perfil
            </span>
          </h2>
          
          <TabsList className="flex overflow-x-auto space-x-2 bg-transparent border border-gray-600/30 rounded-xl p-1">
            {[
              { id: 'portfolio', label: 'Portafolio' },
              { id: 'blog', label: 'Mi Blog' },
              { id: 'events', label: 'Eventos' },
              { id: 'recommendations', label: 'Recomendaciones' },
              { id: 'offers', label: 'Ofertas' },
              { id: 'settings', label: 'Configuración' }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id}
                className={`whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-md' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* Efecto de brillo sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"></div>
      </div>

      {/* Sección de imágenes destacadas - Solo visible en portafolio */}
      {showFeaturedImages && (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2">
          <div className="grid grid-cols-4 gap-2">
            {featuredImages.map((image) => (
              <div 
                key={image.id} 
                className={`relative group overflow-hidden rounded-lg aspect-[3/4] transition-all duration-300 transform hover:scale-[1.02] ${
                  image.type === 'profile' 
                    ? 'border-2 border-white' 
                    : 'border border-gray-600/30'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                    style={{
                      filter: 'brightness(0.9) contrast(1.1) saturate(1.1)'
                    }}
                    onError={(e) => {
                      // Si hay un error al cargar la imagen, reemplazamos con una imagen de respaldo
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // Evitar bucles
                      target.src = 'https://via.placeholder.com/300x400?text=Imagen+no+disponible';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="text-white text-sm">
                    <div className="font-medium">{image.title}</div>
                    {image.type === 'artwork' && (
                      <div className="text-xs text-white/80">Ver más</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
