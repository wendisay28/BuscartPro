
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiltersSidebar } from "./FiltersSidebar";

interface FiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: any;
  setFilters: (filters: any) => void;
}

export function FiltersDialog({ open, onOpenChange, filters, setFilters }: FiltersDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>
        <FiltersSidebar filters={filters} setFilters={setFilters} />
      </DialogContent>
    </Dialog>
  );
}
