import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { OfferFormData } from "@/types/offer";

interface LaunchOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const categories = [
  "Música",
  "Arte Visual", 
  "Fotografía",
  "Danza",
  "Video",
  "Diseño"
];

export function LaunchOfferModal({ isOpen, onClose, onSuccess }: LaunchOfferModalProps) {
  const [formData, setFormData] = useState<OfferFormData>({
    title: "",
    category: "",
    description: "",
    budget: "0",
    budgetMin: "0",
    budgetMax: "0",
    modality: "presencial",
    eventDate: "",
    eventTime: "",
    location: "",
    duration: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: createOffer, isPending } = useMutation<unknown, Error, OfferFormData>({
    mutationFn: async (data: OfferFormData) => {
      const offerData = {
        title: `${data.category} - ${data.description.slice(0, 30)}...`,
        description: data.description,
        category: data.category,
        budgetMin: data.budgetMin,
        budgetMax: data.budgetMax,
        modality: data.modality,
        location: data.location,
        eventDate: new Date(`${data.eventDate}T${data.eventTime}`),
        eventTime: data.eventTime,
      };
      
      const response = await apiRequest("POST", "/api/offers", offerData) as Response;
      return await response.json() as Record<string, unknown>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/offers"] });
      toast({
        title: "¡Oferta enviada!",
        description: "Tu oferta ha sido distribuida a todos los artistas que coinciden con tus criterios.",
      });
      onSuccess();
      handleClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo enviar la oferta. Intenta nuevamente.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description || !formData.eventDate) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa todos los campos obligatorios.",
        variant: "destructive",
      });
      return;
    }

    createOffer(formData);
  };

  const handleClose = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      budget: "0",
      budgetMin: "0",
      budgetMax: "0",
      modality: "presencial",
      eventDate: "",
      eventTime: "",
      location: "",
      duration: ""
    });
    onClose();
  };

  const updateFormData = <K extends keyof OfferFormData>(
    key: K,
    value: string | number
  ) => {
    // Convert number values to strings to match the OfferFormData type
    const stringValue = typeof value === 'number' ? value.toString() : value;
    setFormData((prev: OfferFormData) => ({ ...prev, [key]: stringValue }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Crear Nueva Oferta</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-4 right-4 p-2"
          >
            <X size={16} />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-sm font-medium mb-2 block">Categoría Requerida *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => updateFormData('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar categoría..." />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Descripción de la Oferta *</Label>
            <Textarea
              rows={3}
              placeholder="Describe qué necesitas..."
              value={formData.description}
              onChange={(e) => updateFormData('description', e.target.value)}
              className="resize-none"
            />
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Presupuesto (COP)</Label>
            <div className="flex space-x-3">
              <Input
                type="number"
                placeholder="Mínimo"
                value={formData.budgetMin || ""}
                onChange={(e) => updateFormData('budgetMin', parseInt(e.target.value) || 0)}
              />
              <Input
                type="number"
                placeholder="Máximo"
                value={formData.budgetMax || ""}
                onChange={(e) => updateFormData('budgetMax', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Modalidad</Label>
            <RadioGroup 
              value={formData.modality} 
              onValueChange={(value) => updateFormData('modality', value as any)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="presencial" id="presencial" />
                <Label htmlFor="presencial" className="text-sm">Presencial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="text-sm">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ambas" id="ambas" />
                <Label htmlFor="ambas" className="text-sm">Ambas</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Fecha y Hora *</Label>
            <div className="flex space-x-3">
              <Input
                type="date"
                value={formData.eventDate}
                onChange={(e) => updateFormData('eventDate', e.target.value)}
              />
              <Input
                type="time"
                value={formData.eventTime}
                onChange={(e) => updateFormData('eventTime', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-2 block">Ubicación (si es presencial)</Label>
            <Input
              type="text"
              placeholder="Ej: El Poblado, Medellín"
              value={formData.location}
              onChange={(e) => updateFormData('location', e.target.value)}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              disabled={isPending}
            >
              <Send className="mr-2" size={16} />
              {isPending ? "Enviando..." : "Enviar Oferta"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
