import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";

type Props = {
  open: boolean;
  onClose: () => void;
  currentUserType: "general" | "artist" | "company";
};

export function UserTypeDialog({ open, onClose, currentUserType }: Props) {
  const [selectedType, setSelectedType] = useState(currentUserType);

  const handleChange = (value: string) => {
    setSelectedType(value as Props["currentUserType"]);
  };

  const { updateUserType } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      // Actualizar el tipo de usuario en el contexto de autenticación
      await updateUserType(selectedType);
      
      // Actualizar la URL para reflejar el nuevo tipo de usuario
      const url = new URL(window.location.href);
      url.searchParams.set('type', selectedType);
      setLocation(url.pathname + url.search, { replace: true });
      
      // Cerrar el diálogo
      onClose();
      
      // Recargar la página para aplicar los cambios
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el tipo de cuenta:', error);
      // Mostrar mensaje de error
      alert('No se pudo actualizar el tipo de cuenta. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Tipo de Cuenta</DialogTitle>
        </DialogHeader>

        <RadioGroup value={selectedType} onValueChange={handleChange} className="space-y-4">
          <div className="flex items-center gap-3">
            <RadioGroupItem value="general" id="general" />
            <label htmlFor="general" className="text-sm">General</label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="artist" id="artist" />
            <label htmlFor="artist" className="text-sm">Artista</label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="company" id="company" />
            <label htmlFor="company" className="text-sm">Empresa</label>
          </div>
        </RadioGroup>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button 
            onClick={handleSubmit} 
            className="bg-orange-500 hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
