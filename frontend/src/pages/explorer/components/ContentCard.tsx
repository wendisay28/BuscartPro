import { ReactNode } from 'react';
import { ArtistCard } from './cards/ArtistCard';
import { EventCard } from './cards/EventCard';
import { VenueCard } from './cards/VenueCard';
import { Artist, EventItem, VenueItem, GalleryItem, CardType } from '../types';

// Componente para manejar la tarjeta de galería
const GalleryCard = ({ galleryItem }: { galleryItem: GalleryItem }) => {
  return (
    <div className="relative w-full h-full">
      <img 
        src={galleryItem.image} 
        alt={galleryItem.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{galleryItem.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{galleryItem.description}</p>
      </div>
    </div>
  );
};

type ContentCardProps = {
  type: CardType;
  data: Artist | EventItem | VenueItem | GalleryItem;
  onSwipe?: (direction: 'left' | 'right') => void;
  className?: string;
};

export const ContentCard = ({
  // type ya no es necesario ya que determinamos el tipo basado en los datos
  data,
  onSwipe,
  className = ''
}: Omit<ContentCardProps, 'type'> & { data: ContentCardProps['data'] }) => {
  if (!data) return null;

  const renderContent = (): ReactNode => {
    // Usar type guard para determinar el tipo de dato
    if ('profession' in data) {
      return <ArtistCard artist={data as Artist} />;
    } else if ('date' in data && 'time' in data) {
      return <EventCard data={data as EventItem} />;
    } else if ('address' in data && 'capacity' in data) {
      return <VenueCard data={data as VenueItem} />;
    } else {
      return <GalleryCard galleryItem={data as GalleryItem} />;
    }
  };

  return (
    <div 
      className={`content-card w-full ${className}`}
      onKeyDown={(e) => {
        if (!onSwipe) return;
        if (e.key === 'ArrowLeft') onSwipe('left');
        if (e.key === 'ArrowRight') onSwipe('right');
      }}
      tabIndex={onSwipe ? 0 : -1}
    >
      {renderContent()}
    </div>
  );
};
