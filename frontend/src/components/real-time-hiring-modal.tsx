import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CalendarDays, 
  Clock, 
  DollarSign, 
  Send, 
  User, 
  MapPin,
  AlertCircle,
  CheckCircle,
  X
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface RealTimeHiringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artist?: any;
}

export default function RealTimeHiringModal({ 
  open, 
  onOpenChange, 
  artist 
}: RealTimeHiringModalProps) {
  const [formData, setFormData] = useState({
    description: '',
    city: '',
    eventDate: null as Date | null,
    eventTime: '',
    minBudget: '',
    maxBudget: '',
    additionalDetails: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createHiringRequestMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/hiring-requests', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/hiring-requests"] });
      toast({
        title: "¡Solicitud enviada!",
        description: "Tu solicitud de contratación ha sido enviada a artistas disponibles.",
      });
      onOpenChange(false);
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "No se pudo enviar la solicitud. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      description: '',
      city: '',
      eventDate: null,
      eventTime: '',
      minBudget: '',
      maxBudget: '',
      additionalDetails: '',
    });
    setSelectedDate(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor describe el servicio que necesitas.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: "Campos requeridos", 
        description: "Por favor selecciona la fecha del evento.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.city) {
      toast({
        title: "Campos requeridos",
        description: "Por favor selecciona la ciudad.",
        variant: "destructive",
      });
      return;
    }

    const requestData = {
      description: formData.description,
      city: formData.city,
      eventDate: selectedDate.toISOString(),
      eventTime: formData.eventTime,
      minBudget: formData.minBudget ? parseFloat(formData.minBudget) : undefined,
      maxBudget: formData.maxBudget ? parseFloat(formData.maxBudget) : undefined,
      additionalDetails: formData.additionalDetails,
      categoryId: artist?.categoryId,
    };

    createHiringRequestMutation.mutate(requestData);
  };

  const cities = [
    "Bogotá",
    "Medellín", 
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Bucaramanga",
    "Pereira",
    "Manizales",
    "Cúcuta",
    "Ibagué"
  ];

  const timeSlots = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Contratación en Tiempo Real
          </DialogTitle>
          <DialogDescription>
            Envía una solicitud inmediata a artistas disponibles. Recibirás respuestas en tiempo real.
          </DialogDescription>
        </DialogHeader>

        {/* Artist Info */}
        {artist && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-dark">{artist.artistName}</h4>
                <p className="text-sm text-gray-600">{artist.category?.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {artist.pricePerHour ? `$${artist.pricePerHour}/hora` : 'Consultar precio'}
                  </Badge>
                  {artist.user?.city && (
                    <Badge variant="secondary" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {artist.user.city}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-dark">
              ¿Qué servicio necesitas? *
            </Label>
            <Textarea
              id="description"
              placeholder="Describe el tipo de presentación, duración, público objetivo..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="mt-2"
              rows={3}
              required
            />
          </div>

          {/* Location and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-dark">Ciudad *</Label>
              <Select 
                value={formData.city} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                required
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecciona la ciudad" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium text-dark">Fecha del evento *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-2"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Selecciona la fecha"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setFormData(prev => ({ ...prev, eventDate: date }));
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Time */}
          <div>
            <Label className="text-sm font-medium text-dark">Hora de inicio</Label>
            <Select 
              value={formData.eventTime} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, eventTime: value }))}
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Selecciona la hora" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Budget Range */}
          <div>
            <Label className="text-sm font-medium text-dark mb-2 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Presupuesto sugerido
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minBudget" className="text-xs text-gray-600">Mínimo</Label>
                <Input
                  id="minBudget"
                  type="number"
                  placeholder="Ej: 100000"
                  value={formData.minBudget}
                  onChange={(e) => setFormData(prev => ({ ...prev, minBudget: e.target.value }))}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="maxBudget" className="text-xs text-gray-600">Máximo</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  placeholder="Ej: 200000"
                  value={formData.maxBudget}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxBudget: e.target.value }))}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div>
            <Label htmlFor="additionalDetails" className="text-sm font-medium text-dark">
              Detalles adicionales (opcional)
            </Label>
            <Textarea
              id="additionalDetails"
              placeholder="Equipos necesarios, tipo de repertorio, duración específica..."
              value={formData.additionalDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalDetails: e.target.value }))}
              className="mt-2"
              rows={2}
            />
          </div>

          <Separator />

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <h4 className="font-medium text-blue-900 mb-1">¿Cómo funciona?</h4>
                <ul className="text-blue-700 space-y-1">
                  <li>• Tu solicitud se enviará a artistas disponibles en la categoría y ciudad seleccionadas</li>
                  <li>• Los artistas pueden aceptar, hacer una contraoferta o rechazar</li>
                  <li>• Recibirás notificaciones en tiempo real de las respuestas</li>
                  <li>• Podrás elegir al artista que mejor se adapte a tus necesidades</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
              disabled={createHiringRequestMutation.isPending}
            >
              {createHiringRequestMutation.isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Solicitud
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createHiringRequestMutation.isPending}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
