import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ComparisonItem } from "./ComparisonItem";

interface ComparisonDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comparisonTab: string;
  comparisonData: any[];
}

export function ComparisonDialog({ 
  open, 
  onOpenChange, 
  comparisonTab, 
  comparisonData 
}: ComparisonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle>Comparar {comparisonTab.charAt(0).toUpperCase() + comparisonTab.slice(1)}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {comparisonData.map(item => (
            <ComparisonItem key={item.id} item={item} type={comparisonTab} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
