
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, Filter } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExplorerHeaderProps {
  filters: {
    search: string;
  };
  setFilters: (filters: any) => void;
  setShowFilters: (show: boolean) => void;
  showFilters: boolean;
}

export function ExplorerHeader({ filters, setFilters, setShowFilters, showFilters }: ExplorerHeaderProps) {
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="max-w-2xl mx-auto mb-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar artistas, eventos, sitios..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-4 pr-12 py-3 text-lg border-2 border-orange-200 focus:border-orange-500 rounded-xl bg-white"
            />
            {!isMobile ? (
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:bg-orange-100"
              >
                <Settings className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-orange-600 hover:bg-orange-100"
              >
                <Filter className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
