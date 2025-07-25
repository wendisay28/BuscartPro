import { useState, useMemo, useEffect } from "react";
// Eliminamos useQuery ya que no lo estamos usando
// La navegación ahora se maneja globalmente

// Componentes de la barra lateral
import { NavigationTabs } from "./components/sidebar/navigation-tabs";
import { FiltersDropdown } from "./components/sidebar/filters-dropdown";
import { LaunchOfferButton } from "./components/sidebar/launch-offer-button";

// Componentes del mapa
import { InteractiveMap } from "./components/map/interactive-map";

// Componentes de modales
import { LaunchOfferModal } from "./components/modals/launch-offer-modal";
import { ProfileDetailModal } from "./components/modals/profile-detail-modal";
import { OfferConfirmationModal } from "./components/modals/offer-confirmation-modal";

// Componentes de UI
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Hooks personalizados
import { useIsMobile } from "@/hooks/use-mobile";
import { useFilters } from "./hooks/use-filters";
import { useMap } from "./hooks/use-map";
import { Calendar, DollarSign, Zap, Heart, MapPin as MapPinIcon, Building } from "lucide-react";

// Datos de ejemplo
import { mockVenues, mockJobOffers, getMapPins, getVenueById, Venue, JobOffer } from "./data/mock-data";

export default function Home() {
  // Hooks
  const isMobile = useIsMobile();
  const { filters, updateFilter, clearFilters } = useFilters();
  const { selectedPin, selectPin, zoomIn, zoomOut, centerOnMedellin } = useMap();
  
  // State for modals
  const [launchOfferModalOpen, setLaunchOfferModalOpen] = useState(false);
  const [profileDetailModalOpen, setProfileDetailModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(null);

  // Usar datos mock en lugar de la API
  const [allProfiles, setAllProfiles] = useState<Venue[]>([]);
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar datos mock al montar el componente
  useEffect(() => {
    // Simular carga de datos
    const loadMockData = () => {
      setAllProfiles(mockVenues);
      setOffers(mockJobOffers);
      setIsLoading(false);
    };

    loadMockData();
  }, []);

  // Filter profiles based on active filters
  const filteredProfiles = useMemo(() => {
    return allProfiles.filter((venue) => {
      // Filtrar por tipo de pestaña
      if (filters.activeTab === 'artists') return false; // Por ahora no manejamos artistas
      
      // Filtrar por categoría si está activo
      if (filters.category && venue.type !== filters.category) return false;
      
      // Filtrar por rango de precio
      const priceRanges = {
        'económico': { min: 0, max: 100000 },
        'medio': { min: 100001, max: 500000 },
        'alto': { min: 500001, max: 2000000 },
        'premium': { min: 2000001, max: Infinity }
      };
      
      const venuePriceRange = priceRanges[venue.priceRange] || { min: 0, max: Infinity };
      
      if (filters.priceMin !== null && venuePriceRange.max < filters.priceMin) return false;
      if (filters.priceMax !== null && venuePriceRange.min > filters.priceMax) return false;
      
      return true;
    });
  }, [filters, allProfiles]);

  // Generar pines del mapa a partir de los perfiles filtrados
  const mapPins = useMemo(() => {
    // Usar los pines de los lugares (venues) como base
    const venuePins = getMapPins();
    
    // Asegurarse de que cada pin tenga un color
    return venuePins.map(pin => ({
      ...pin,
      color: pin.color || '#6366f1', // Color por defecto si no hay
      type: 'venue' as const, // Todos los pines son de tipo 'venue' por ahora
    }));
  }, [allProfiles]);
  
  const handleProfileClick = (profileId: number) => {
    setSelectedProfileId(profileId);
    setProfileDetailModalOpen(true);
  };

  const handlePinClick = (pinId: number) => {
    selectPin(pinId);
    setSelectedProfileId(pinId);
    setProfileDetailModalOpen(true);
  };

  const handleOfferSuccess = () => {
    setConfirmationModalOpen(true);
  };

  // Event handlers
  // const handleNotificationClick = () => {
  //   console.log("Notifications clicked");
  // };

  // const handleSearch = (query: string) => {
  //   console.log("Search query:", query);
  // };

  // Formatear fecha de oferta
  const formatOfferDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (e) {
      return dateString; // Devolver el string original si hay un error
    }
  };

  const renderTabContent = () => {
    if (filters.activeTab === 'offers') {
      if (isLoading) {
        return (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-24 bg-muted rounded-xl"></div>
              </div>
            ))}
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {offers.map((offer) => {
            const venue = getVenueById(offer.venueId);
            return (
              <Card key={offer.id} className="p-4 border-l-4 border-l-yellow-500">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                    <Zap className="text-white" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{offer.title}</h3>
                      {venue && (
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {venue.name}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{offer.description}</p>
                    <div className="mt-2 flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      <span>Inicia: {formatOfferDate(offer.startDate)}</span>
                      {offer.endDate && (
                        <span className="ml-2">- Finaliza: {formatOfferDate(offer.endDate)}</span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center text-sm text-muted-foreground">
                      <DollarSign size={14} className="mr-1" />
                      <span>{offer.salary}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {offer.type}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-semibold text-yellow-600">
                        {offer.salary}
                      </span>
                      <button 
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => handleProfileClick(offer.venueId)}
                      >
                        Ver detalles del lugar
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          {offers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Zap size={48} className="mx-auto mb-4 opacity-50" />
              <p>No hay ofertas activas en este momento</p>
            </div>
          )}
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-24 bg-muted rounded-xl"></div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {filteredProfiles.map((venue) => (
          <Card key={venue.id} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleProfileClick(venue.id)}>
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{venue.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{venue.type}</p>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{venue.neighborhood}</span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{venue.priceRange}</span>
                  </div>
                </div>
                <Badge variant="outline" className="shrink-0 ml-2">
                  Lugar
                </Badge>
              </div>
              {venue.amenities && venue.amenities.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {venue.amenities.slice(0, 3).map((amenity, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {amenity}
                    </Badge>
                  ))}
                  {venue.amenities.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{venue.amenities.length - 3} más</span>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Building size={48} className="mx-auto mb-4 opacity-50" />
            <p>No se encontraron lugares con los filtros aplicados</p>
          </div>
        )}
      </div>
    );
  };

  // Render mobile carousel
  const renderMobileCarousel = () => {
    if (filters.activeTab === 'offers') {
      return offers.map((offer) => (
        <div key={offer.id} className="flex-shrink-0 w-72 snap-start">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105 overflow-hidden">
            {/* Offer Header */}
            <div className="h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="text-white" size={20} />
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Badge className="bg-yellow-500 text-white text-xs px-2 py-1">Activa</Badge>
              </div>
            </div>

            {/* Offer Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                {offer.title}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {offer.description}
              </p>

              {/* Date */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                <Calendar size={16} className="mr-2 flex-shrink-0" />
                <span>Inicia: {formatOfferDate(offer.startDate)}</span>
                {offer.endDate && (
                  <span className="ml-2">- Finaliza: {formatOfferDate(offer.endDate)}</span>
                )}
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <DollarSign size={16} className="mr-1 text-yellow-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {offer.salary}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="capitalize bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                    {offer.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ));
    }

    return filteredProfiles.map((profile) => {
      const pin = mapPins.find(p => p.id === profile.id);
      const pinColor = pin?.color || '#6366f1';
      
      return (
        <div key={profile.id} className="flex-shrink-0 w-72 snap-start">
          <div 
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl cursor-pointer transition-all duration-200 hover:shadow-2xl hover:scale-105 overflow-hidden"
            onClick={() => handleProfileClick(profile.id)}
          >
            {/* Profile Image/Header */}
            <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br opacity-20" style={{ backgroundColor: pinColor }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-gray-800"
                  style={{ backgroundColor: pinColor }}
                >
                  <span className="text-xl font-bold">
                    {profile.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
              </div>
              {/* Heart/Favorite button */}
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-900/90 rounded-full flex items-center justify-center shadow-md hover:bg-white dark:hover:bg-gray-800 transition-colors">
                <Heart size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="p-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate mb-1">
                {profile.name}
              </h3>
              
              {/* Location */}
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="truncate">{profile.neighborhood}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <span className="text-lg font-bold text-gray-900 dark:text-white mr-2">
                  {profile.rating}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = typeof profile.rating === 'string' ? parseFloat(profile.rating) : Number(profile.rating);
                    return (
                      <svg 
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(ratingValue) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  ({Math.floor(Math.random() * 200 + 50)} reviews)
                </span>
              </div>

              {/* Price and Category */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  <span className="text-lg font-bold text-primary mr-1">$</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {profile.priceRange}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="capitalize bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                    {profile.type}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="h-screen flex flex-col max-w-[1200px] mx-auto">
          <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar */}
            <div className="w-full lg:w-2/5 bg-gray-900 border-r border-gray-800 flex flex-col">
              {/* Navigation and Filters */}
              <div className="p-4 border-b border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <NavigationTabs
                    activeTab={filters.activeTab}
                    onTabChange={(tab) => updateFilter('activeTab', tab)}
                  />
                  
                  <FiltersDropdown
                    filters={filters}
                    onFilterChange={updateFilter}
                    onClearFilters={clearFilters}
                  />
                </div>
              </div>

              {/* Launch Offer Button */}
              <div className="p-4 border-b border-gray-800">
                <LaunchOfferButton onClick={() => setLaunchOfferModalOpen(true)} />
              </div>

              {/* Content List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {renderTabContent()}
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative">
              <InteractiveMap
                pins={mapPins}
                selectedPin={selectedPin}
                onPinClick={handlePinClick}
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onCenter={centerOnMedellin}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout - Map as full background */}
      {isMobile && (
        <>
          {/* Full screen map background */}
          <div className="fixed inset-0 pb-20">
            <InteractiveMap
              pins={mapPins}
              selectedPin={selectedPin}
              onPinClick={handlePinClick}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              onCenter={centerOnMedellin}
            />
          </div>

          {/* Navigation Tabs - Fixed below header */}
          <div className="fixed top-16 left-0 right-0 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
            <div className="px-4 py-3">
              <NavigationTabs
                activeTab={filters.activeTab}
                onTabChange={(tab) => updateFilter('activeTab', tab)}
              />
            </div>
          </div>

          {/* Filters Button - Top right */}
          <div className="fixed top-32 right-4 z-30">
            <FiltersDropdown
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Profile Cards Carousel - Bottom floating */}
          <div className="fixed bottom-24 left-0 right-0 z-30">
            <div className="px-4">
              <div 
                className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {renderMobileCarousel()}
              </div>
            </div>
          </div>

          {/* Floating Launch Offer Button */}
          <div className="fixed bottom-28 right-4 z-50">
            <button
              onClick={() => setLaunchOfferModalOpen(true)}
              className="w-16 h-16 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-all duration-200 border-4 border-white"
            >
              <span className="text-3xl font-bold">+</span>
            </button>
          </div>

        </>
      )}

      {/* Modals */}
      <LaunchOfferModal
        isOpen={launchOfferModalOpen}
        onClose={() => setLaunchOfferModalOpen(false)}
        onSuccess={handleOfferSuccess}
      />

      <ProfileDetailModal
        isOpen={profileDetailModalOpen}
        onClose={() => setProfileDetailModalOpen(false)}
        profileId={selectedProfileId}
      />

      <OfferConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
      />
    </>
  );
}
