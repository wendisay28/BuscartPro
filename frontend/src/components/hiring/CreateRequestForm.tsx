import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { HiringRequest } from '@/types/hiring';
import { 
  Music,
  Camera,
  Palette,
  Mic,
  ArrowRight
} from 'lucide-react';

interface CreateRequestFormProps {
  onSubmit: (data: HiringRequest) => void;
  currentStep: number;
  onStepChange: (step: number) => void;
}

// Tipo extendido para el formulario que incluye todos los campos necesarios
type RequestFormData = {
  title: string;
  category: string;
  subcategory: string;
  city: string;
  date: string;
  time: string;
  description: string;
  maxPrice: number;
  urgency: 'low' | 'normal' | 'high' | 'urgent';
  budget?: number; // Campo adicional solo para el formulario
};

export function CreateRequestForm({ onSubmit, currentStep, onStepChange }: CreateRequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    title: '',
    category: '',
    subcategory: '',
    city: '',
    date: '',
    time: '',
    description: '',
    maxPrice: 0,
    urgency: 'normal',
    budget: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convertimos los datos del formulario al tipo HiringRequest
    const hiringRequest: HiringRequest = {
      ...formData,
      id: '', // Se generará en el backend
      userId: '', // Se añadirá al enviar
      status: 'pending',
      responseCount: 0,
      timeLeft: '24h'
    };
    onSubmit(hiringRequest);
  };

  const updateField = <K extends keyof RequestFormData>(field: K, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (currentStep === 1) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="Título de tu solicitud"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Categoría</Label>
          <Select value={formData.category} onValueChange={(v) => updateField('category', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="music"><Music className="w-4 h-4 mr-2" /> Música</SelectItem>
              <SelectItem value="photo"><Camera className="w-4 h-4 mr-2" /> Fotografía</SelectItem>
              <SelectItem value="art"><Palette className="w-4 h-4 mr-2" /> Arte</SelectItem>
              <SelectItem value="voice"><Mic className="w-4 h-4 mr-2" /> Voz</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          className="w-full" 
          onClick={() => onStepChange(2)}
          disabled={!formData.title || !formData.category}
        >
          Siguiente <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Subcategoría</Label>
        <Input
          value={formData.subcategory}
          onChange={(e) => updateField('subcategory', e.target.value)}
          placeholder="Especifica la subcategoría"
        />
      </div>

      <div className="space-y-2">
        <Label>Ciudad</Label>
        <Input 
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value)}
          placeholder="¿Dónde necesitas el servicio?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Fecha</Label>
          <Input 
            type="date"
            value={formData.date}
            onChange={(e) => updateField('date', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Hora</Label>
          <Input 
            type="time"
            value={formData.time}
            onChange={(e) => updateField('time', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Presupuesto máximo</Label>
        <Input 
          type="number"
          value={formData.maxPrice}
          onChange={(e) => updateField('maxPrice', Number(e.target.value))}
          placeholder="Tu presupuesto máximo"
        />
      </div>

      <div className="space-y-2">
        <Label>Urgencia</Label>
        <Select value={formData.urgency} onValueChange={(v) => updateField('urgency', v)}>
          <SelectTrigger>
            <SelectValue placeholder="Nivel de urgencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Baja</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="urgent">Urgente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Descripción</Label>
        <Textarea 
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Describe los detalles de tu solicitud"
          rows={5}
        />
      </div>

      <div className="flex gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onStepChange(1)}
        >
          Atrás
        </Button>
        <Button 
          type="submit"
          className="flex-1"
          disabled={!formData.city || !formData.date || !formData.description}
        >
          Crear Solicitud
        </Button>
      </div>
    </form>
  );
}