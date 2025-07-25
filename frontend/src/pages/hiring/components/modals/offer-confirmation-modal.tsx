import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface OfferConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OfferConfirmationModal({ isOpen, onClose }: OfferConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-2xl text-green-600 dark:text-green-400" size={32} />
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-2">¡Oferta Enviada!</h3>
        
        <p className="text-muted-foreground mb-6">
          Tu oferta ha sido distribuida a todos los artistas que coinciden con tus criterios. 
          Te notificaremos cuando recibas respuestas.
        </p>
        
        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cerrar
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            Ver Estado
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
