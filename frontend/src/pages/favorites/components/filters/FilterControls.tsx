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
    <div className="flex items-center justify-end gap-2 w-full">
      {selectedForComparison.length >= 2 && (
        <Button 
          onClick={onShowComparison}
          className="bg-[#bb00aa] hover:bg-[#9b0089] h-10 px-4 text-sm whitespace-nowrap flex-shrink-0"
        >
          <Scale className="w-4 h-4 mr-2" />
          <span>Comparar ({selectedForComparison.length})</span>
        </Button>
      )}
      <Button 
        variant="outline" 
        onClick={onShowFilters}
        className={`h-10 px-4 ${showFilters ? 'bg-gray-800 border-[#bb00aa]' : ''} hover:bg-[#bb00aa]/10 hover:border-[#bb00aa] hover:text-[#bb00aa]`}
      >
        <Sliders className="w-4 h-4 mr-2" />
        <span className="text-sm">Filtros</span>
      </Button>
    </div>
  );
}
