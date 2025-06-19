import { User, Calendar, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const recommendedArtists = [
  { id: 1, name: 'María Gómez', category: 'Música', image: '/placeholder-artist.jpg' },
  { id: 2, name: 'Carlos Ruiz', category: 'Arte', image: '/placeholder-artist.jpg' },
  { id: 3, name: 'Ana Torres', category: 'Teatro', image: '/placeholder-artist.jpg' },
];

const upcomingEvents = [
  { id: 1, name: 'Festival de Verano', date: '15 Junio', location: 'Parque Central' },
  { id: 2, name: 'Noche de Jazz', date: '20 Junio', location: 'Teatro Nacional' },
  { id: 3, name: 'Feria de Arte', date: '25 Junio', location: 'Centro Cultural' },
];

const recommendedVenues = [
  { id: 1, name: 'Galería Moderna', type: 'Galería' },
  { id: 2, name: 'Teatro Principal', type: 'Teatro' },
  { id: 3, name: 'Parque de los Artistas', type: 'Espacio Abierto' },
];

export function RightSidebar() {
  const isMobile = useIsMobile();
  
  if (isMobile) return null;

  return (
    <aside className="right-sidebar p-6">
      <div className="space-y-8">
        {/* Artistas Destacados */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <User size={18} className="mr-2" />
              Artistas Destacados
            </h3>
            <button className="text-xs text-blue-500 flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {recommendedArtists.map((artist) => (
              <div key={artist.id} className="flex items-center p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden mr-3">
                  <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium truncate">{artist.name}</h4>
                  <p className="text-xs text-gray-400 truncate">{artist.category}</p>
                </div>
                <button className="ml-2 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-full transition-colors">
                  Seguir
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Eventos Próximos */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <Calendar size={18} className="mr-2" />
              Eventos Próximos
            </h3>
            <button className="text-xs text-blue-500 flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
                <h4 className="font-medium text-sm mb-1">{event.name}</h4>
                <div className="flex items-center text-xs text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span className="mr-3">{event.date}</span>
                  <MapPin size={12} className="mr-1" />
                  <span className="truncate">{event.location}</span>
                </div>
                <button className="mt-2 w-full text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-full transition-colors flex items-center justify-center">
                  Ver detalles <ArrowRight size={14} className="ml-1" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Sitios Recomendados */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg flex items-center">
              <MapPin size={18} className="mr-2" />
              Sitios Recomendados
            </h3>
            <button className="text-xs text-blue-500 flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {recommendedVenues.map((venue) => (
              <div key={venue.id} className="p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors">
                <h4 className="font-medium text-sm">{venue.name}</h4>
                <p className="text-xs text-gray-400 mb-2">{venue.type}</p>
                <button className="w-full text-xs font-medium bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-full transition-colors">
                  Ver más
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
