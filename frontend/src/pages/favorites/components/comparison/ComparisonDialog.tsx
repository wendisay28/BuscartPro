import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight, Maximize2, Minimize2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ComparisonItem } from "./ComparisonItem";
import { cn } from "@/lib/utils";

interface ComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comparisonData: any[];
  comparisonTab?: 'artists' | 'events' | 'sites' | 'gallery';
}

export function ComparisonDialog({ 
  open, 
  onOpenChange, 
  comparisonTab = 'artists', 
  comparisonData 
}: ComparisonDialogProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  
  // Calcular el número total de páginas
  const totalPages = Math.ceil(comparisonData.length / itemsPerPage);
  
  // Obtener los elementos de la página actual
  const currentItems = comparisonData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
  // Resetear a la primera página cuando cambian los datos
  useEffect(() => {
    setCurrentPage(0);
  }, [comparisonData]);
  
  // Manejar cambio de página
  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };
  
  // Alternar entre vista expandida y normal
  const toggleExpand = () => {
    const newExpanded = !isExpanded;
    setIsExpanded(newExpanded);
    setItemsPerPage(newExpanded ? 4 : 3);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-white rounded-xl",
          isExpanded ? "w-[95vw]" : "w-[90vw] md:w-[85vw]"
        )}
      >
        {/* Encabezado */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">
                Comparar {comparisonTab.charAt(0).toUpperCase() + comparisonTab.slice(1)}
              </DialogTitle>
              <p className="text-sm text-gray-500 mt-1">
                Comparando {comparisonData.length} {comparisonData.length === 1 ? 'elemento' : 'elementos'}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleExpand}
                className="h-9 w-9 p-0"
                title={isExpanded ? 'Contraer' : 'Expandir'}
              >
                {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-9 w-9 p-0 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="overflow-y-auto flex-1 p-6">
          {comparisonData.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-gray-500">
              <p className="text-lg font-medium mb-2">No hay elementos para comparar</p>
              <p className="text-sm">Selecciona al menos un elemento para comenzar la comparación</p>
            </div>
          ) : (
            <div className="relative">
              <div 
                className={cn(
                  "grid gap-6",
                  isExpanded 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                )}
              >
                {currentItems.map((item) => (
                  <ComparisonItem 
                    key={item.id} 
                    item={item} 
                    type={comparisonTab} 
                  />
                ))}
              </div>
              
              {/* La navegación se ha movido al pie del diálogo */}
            </div>
          )}
        </div>
        
        {/* Pie de página con navegación */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-3 flex items-center justify-between">
          {totalPages > 1 && (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Anterior</span>
              </Button>
              
              <span className="text-sm text-gray-600">
                Página {currentPage + 1} de {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="gap-1"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-[#9b0089] to-[#7a006c] hover:from-[#89007a] hover:to-[#68005c] text-white"
          >
            Cerrar comparación
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
