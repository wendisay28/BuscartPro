import { Button } from "@/components/ui/button";
import { Sliders, Scale } from "lucide-react";

interface FilterControlsProps {
  showFilters: boolean;
  selectedForComparison: number[];
  onShowFilters: () => void;
  onShowComparison: () => void;
}

export function FilterControls({
  showFilters,
  selectedForComparison,
  onShowFilters,
  onShowComparison
}: FilterControlsProps) {
  return (
    <div className="flex gap-3">
      {selectedForComparison.length >= 2 && (
        <Button 
          onClick={onShowComparison}
          className="bg-[#bb00aa] hover:bg-[#9b0089]"
        >
          <Scale className="w-4 h-4 mr-2" />
          Comparar ({selectedForComparison.length})
        </Button>
      )}
      <div className="relative">
        <Button 
          variant="outline" 
          onClick={onShowFilters}
          className={`w-32 justify-center ${showFilters ? 'bg-gray-800 border-[#bb00aa]' : ''} hover:bg-[#bb00aa]/10 hover:border-[#bb00aa] hover:text-[#bb00aa]`}
        >
          <div className="flex items-center justify-center w-full">
            <Sliders className="w-4 h-4 mr-2" />
            <span className="w-20 text-left">Filtros</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
