import { Photo } from '../../../data/portfolio.mock';
import { Plus, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface PhotoItemProps {
  photo: Photo;
}

export const PhotoItem = ({ photo }: PhotoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden rounded-lg bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Contenedor de la imagen con relación de aspecto 4:5 (vertical) */}
      <div className="relative pt-[125%] overflow-hidden">
        {/* Imagen con filtro */}
        <div className="absolute inset-0">
          <img
            src={photo.imageUrl}
            alt={photo.caption || 'Fotografía artística'}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          {/* Filtro superpuesto */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
          
          {/* Marca de agua diagonal que cubre toda la imagen */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(-30deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 300px)',
              pointerEvents: 'none',
              zIndex: 10
            }}
          >
            <div 
              className="absolute inset-0"
              style={{
                background: 'repeating-linear-gradient(60deg, rgba(0,0,0,0.03), rgba(0,0,0,0.03) 1px, transparent 1px, transparent 300px)',
                pointerEvents: 'none'
              }}
            />
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: '24px',
                color: 'rgba(255,255,255,0.1)',
                fontWeight: 'bold',
                pointerEvents: 'none',
                transform: 'rotate(-30deg)',
                whiteSpace: 'nowrap'
              }}
            >
              @ARTISTA_DIGITAL • @ARTISTA_DIGITAL • @ARTISTA_DIGITAL •
            </div>
          </div>
          
          {/* Espacio reservado para posibles acciones futuras */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          
          {/* Acciones */}
          <div className={`absolute inset-0 flex items-center justify-center gap-4 opacity-0 ${isHovered ? 'opacity-100' : ''} transition-opacity duration-300`}>
            <button className="flex flex-col items-center text-white/90 hover:text-white transition-colors">
              <Heart className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{photo.likes}</span>
            </button>
            <button className="flex flex-col items-center text-white/90 hover:text-white transition-colors">
              <MessageCircle className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{photo.comments}</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Pie de foto */}
      <div className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">
              {photo.title || 'Sin título'}
            </h3>
            {photo.location && (
              <p className="text-xs text-gray-400 truncate">{photo.location}</p>
            )}
          </div>
          <button className="text-gray-400 hover:text-white p-1 -mr-1">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface PhotosSectionProps {
  photos: Photo[];
  onUpload: () => void;
  type: 'photos' | 'videos';
}

export const PhotosSection = ({ photos, onUpload, type }: PhotosSectionProps) => (
  <div className="space-y-4 p-2">
    <div className="flex justify-between items-center px-2">
      <h2 className="text-xl font-bold text-white">Galería de Fotos</h2>
      <button 
        onClick={onUpload}
        className="flex items-center bg-[#e74f05] hover:bg-[#d14704] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:shadow-md hover:shadow-[#e74f05]/30 hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4 mr-1" />
        Subir {type === 'photos' ? 'Foto' : 'Vídeo'}
      </button>
    </div>
    
    {/* Grid de fotos con columnas responsivas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos.map((photo: Photo) => (
        <PhotoItem key={photo.id} photo={photo} />
      ))}
    </div>
    
    {/* Footer de la sección */}
    <div className="text-center py-6">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} Galería de Arte Digital. Todas las imágenes están protegidas por derechos de autor.
      </p>
    </div>
  </div>
);
