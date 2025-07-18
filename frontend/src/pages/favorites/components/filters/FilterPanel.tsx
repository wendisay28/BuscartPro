import { Button } from "@/components/ui/button";
import { Sliders } from "lucide-react";

interface FilterPanelProps {
  showFilters: boolean;
  selectedFilter: 'recent' | 'today' | 'custom' | null;
  customDate: string;
  selectedProfession: string;
  sortByPrice: 'free' | 'price_asc' | 'price_desc' | '';
  professions: string[];
  onFilterChange: (filter: 'recent' | 'today' | 'custom' | null) => void;
  onCustomDateChange: (date: string) => void;
  onProfessionChange: (profession: string) => void;
  onSortByPrice: (sort: 'free' | 'price_asc' | 'price_desc' | '') => void;
  onClearFilters: () => void;
  onClose: () => void;
}

export function FilterPanel({
  showFilters,
  selectedFilter,
  customDate,
  selectedProfession,
  sortByPrice,
  professions,
  onFilterChange,
  onCustomDateChange,
  onProfessionChange,
  onSortByPrice,
  onClearFilters,
  onClose
}: FilterPanelProps) {
  if (!showFilters) return null;

  return (
    <div className="fixed md:right-64 md:top-48 right-12 top-32 md:w-72 w-64 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg z-50 flex flex-col max-h-[80vh] overflow-y-auto" style={{ transform: 'none', left: 'auto' }}>
      <div 
        className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-800/50 border-b border-gray-700"
        onClick={onClose}
      >
        <h2 className="flex items-center gap-2 text-sm font-medium text-white">
          <Sliders className="w-4 h-4" />
          Filtro Avanzado
        </h2>
        <span className="text-xs text-gray-400">Cerrar</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-gray-300">
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Filtrar por fecha</h3>
          <div className="space-y-2">
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${selectedFilter === 'recent' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => onFilterChange('recent')}
            >
              <span>Agregados recientemente</span>
            </div>
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${selectedFilter === 'today' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => onFilterChange('today')}
            >
              <span>Agregados hoy</span>
            </div>
            <div className="space-y-2">
              <div 
                className={`flex items-center p-2 rounded cursor-pointer ${selectedFilter === 'custom' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => onFilterChange('custom')}
              >
                <span>Fecha específica</span>
              </div>
              {selectedFilter === 'custom' && (
                <div className="pl-2">
                  <input
                    type="date"
                    className="w-full bg-gray-700 p-2 rounded text-sm focus:ring-2 focus:ring-[#bb00aa]"
                    value={customDate}
                    onChange={(e) => onCustomDateChange(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Filtrar por profesión</h3>
          <select
            value={selectedProfession}
            onChange={(e) => onProfessionChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-sm text-white focus:ring-2 focus:ring-[#bb00aa] focus:border-transparent"
          >
            <option value="">Todas las profesiones</option>
            {professions.map((profession) => (
              <option 
                key={profession} 
                value={profession}
                className="bg-gray-800 text-white"
              >
                {profession}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-3">Ordenar por precio</h3>
          <div className="space-y-2">
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${sortByPrice === 'price_asc' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => onSortByPrice('price_asc')}
            >
              <span>Menor precio</span>
            </div>
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${sortByPrice === 'price_desc' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => onSortByPrice('price_desc')}
            >
              <span>Mayor precio</span>
            </div>
            <div 
              className={`flex items-center p-2 rounded cursor-pointer ${sortByPrice === 'free' ? 'bg-[#bb00aa]/20 text-[#bb00aa]' : 'text-gray-300 hover:bg-gray-800'}`}
              onClick={() => onSortByPrice('free')}
            >
              <span>Entrada libre</span>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <div className="flex justify-between space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 bg-transparent border-gray-600 hover:border-[#bb00aa] hover:bg-[#bb00aa]/10 hover:text-[#bb00aa]"
              onClick={onClearFilters}
            >
              Limpiar filtros
            </Button>
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1 bg-[#bb00aa] hover:bg-[#9b0089]"
              onClick={onClose}
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
