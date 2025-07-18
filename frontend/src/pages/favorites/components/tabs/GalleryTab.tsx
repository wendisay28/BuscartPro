import { GalleryCard } from "../items/GalleryCard";

interface GalleryTabProps {
  galleryItems: any[];
  selectedForComparison: number[];
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function GalleryTab({ 
  galleryItems, 
  selectedForComparison, 
  onToggleSelect, 
  onToggleFavorite 
}: GalleryTabProps) {
  if (galleryItems.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay productos en tu galería de favoritos</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {galleryItems.map(item => (
          <GalleryCard
            key={item.id}
            item={item}
            isSelected={selectedForComparison.includes(item.id)}
            onToggleSelect={onToggleSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
