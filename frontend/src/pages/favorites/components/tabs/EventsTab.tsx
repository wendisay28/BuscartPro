import { EventCard } from "../items/EventCard";

interface EventsTabProps {
  events: any[];
  selectedForComparison: number[];
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function EventsTab({ 
  events, 
  selectedForComparison, 
  onToggleSelect, 
  onToggleFavorite 
}: EventsTabProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay eventos en tus favoritos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          isSelected={selectedForComparison.includes(event.id)}
          onToggleSelect={onToggleSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
