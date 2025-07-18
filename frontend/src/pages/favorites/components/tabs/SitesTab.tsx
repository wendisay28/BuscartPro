import { SiteCard } from "../items/SiteCard";

interface SitesTabProps {
  sites: any[];
  selectedForComparison: number[];
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function SitesTab({ 
  sites, 
  selectedForComparison, 
  onToggleSelect, 
  onToggleFavorite 
}: SitesTabProps) {
  if (sites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No hay sitios en tus favoritos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sites.map(site => (
        <SiteCard
          key={site.id}
          site={site}
          isSelected={selectedForComparison.includes(site.id)}
          onToggleSelect={onToggleSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
