import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useLocation } from 'wouter';

// Mock categories - replace with your actual categories data
const categories = [
  { id: "1", name: "Música" },
  { id: "2", name: "Arte" },
  { id: "3", name: "Teatro" },
  { id: "4", name: "Danza" },
  { id: "5", name: "Literatura" },
  { id: "6", name: "Cine" },
  { id: "7", name: "Gastronomía" },
  { id: "8", name: "Otros" },
];

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { createEvent, type CreateEventInput } from "@/services/event";

// Esquema de validación con Zod
const eventFormSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }),
  description: z.string().min(20, { message: "La descripción debe tener al menos 20 caracteres" }),
  shortDescription: z.string().min(10).max(200, { message: "La descripción corta debe tener entre 10 y 200 caracteres" }),
  startDate: z.date({
    required_error: "La fecha de inicio es requerida",
  }),
  endDate: z.date({
    required_error: "La fecha de finalización es requerida",
  }),
  location: z.string().min(5, { message: "La ubicación es requerida" }),
  city: z.string().min(2, { message: "La ciudad es requerida" }),
  country: z.string().min(2, { message: "El país es requerido" }),
  isOnline: z.boolean().default(false),
  isFree: z.boolean().default(false),
  price: z.coerce.number().min(0).optional(),
  currency: z.string().optional(),
  maxAttendees: z.coerce.number().min(1).optional(),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
  tags: z.array(z.string()).optional(),
  multimedia: z.instanceof(FileList).optional(),
}).refine(
  (data) => {
    if (data.endDate && data.startDate) {
      return data.endDate >= data.startDate;
    }
    return true;
  },
  {
    message: "La fecha de finalización debe ser posterior a la fecha de inicio",
    path: ["endDate"],
  }
).refine(
  (data) => {
    if (!data.isFree && data.price !== undefined) {
      return data.price > 0;
    }
    return true;
  },
  {
    message: "El precio debe ser mayor a 0 para eventos pagos",
    path: ["price"],
  }
);

type EventFormValues = z.infer<typeof eventFormSchema>;

// Valores por defecto
const defaultValues: Partial<EventFormValues> = {
  title: "",
  description: "",
  shortDescription: "",
  startDate: new Date(),
  endDate: new Date(),
  location: "",
  city: "Bogotá",
  country: "Colombia",
  isOnline: false,
  isFree: true,
  price: 0,
  currency: "COP",
  maxAttendees: 0,
  categoryId: "",
  tags: [],
};

interface EventFormProps {
  onSuccess?: () => void;
  initialData?: Partial<CreateEventInput>;
}

export function EventForm({ onSuccess, initialData }: EventFormProps) {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const form = useForm<EventFormValues>({
    mode: 'onChange',
    resolver: zodResolver(eventFormSchema as any),
    defaultValues: {
      ...defaultValues,
      ...(initialData ? {
        ...initialData,
        startDate: initialData.startDate ? new Date(initialData.startDate) : new Date(),
        endDate: initialData.endDate ? new Date(initialData.endDate) : new Date(),
        tags: initialData.tags || []
      } : {})
    } as EventFormValues,
  });

  const isFree = form.watch("isFree");
  // Remove unused isOnline since we're using it in the form

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        form.setValue('tags', newTags);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    form.setValue('tags', newTags);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Obtener los valores del formulario usando form.getValues()
    const formData = form.getValues();
    
    try {
      setIsLoading(true);
      
      // Convertir las fechas a ISO string y preparar los datos
      const formattedData: CreateEventInput = {
        ...formData,
        startDate: formData.startDate.toISOString(),
        endDate: formData.endDate.toISOString(),
        tags: formData.tags || [],
        // Convertir FileList a array de Files si existe
        multimedia: formData.multimedia ? Array.from(formData.multimedia) : [],
        // Asegurar que los números sean números
        price: formData.price ? Number(formData.price) : 0,
        maxAttendees: formData.maxAttendees ? Number(formData.maxAttendees) : undefined,
      };
      
      // Eliminar campos opcionales si no tienen valor
      if (formData.price === undefined) delete formattedData.price;
      if (formData.maxAttendees === undefined) delete formattedData.maxAttendees;

      // Crear el evento
      const newEvent = await createEvent(formattedData);
      
      // Mostrar mensaje de éxito
      toast({
        title: "¡Evento creado exitosamente!",
        description: `El evento "${newEvent.title}" ha sido creado.`,
      });

      // Redirigir o ejecutar callback
      if (onSuccess) {
        onSuccess();
      } else {
        // Usar replace en lugar de navigate para evitar problemas con el historial
        navigate(`/events/${newEvent.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Error al crear el evento:", error);
      toast({
        title: "Error al crear el evento",
        description: "Ocurrió un error al crear el evento. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Contenido del formulario */}
        <div className="space-y-6">
        {/* Título del evento */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del evento</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Concierto de Música Clásica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción corta */}
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción corta</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Una breve descripción de tu evento (máx. 200 caracteres)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción completa */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción completa</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe tu evento en detalle..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fecha de inicio */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de inicio</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      locale={es}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha de finalización */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de finalización</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">

      </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ubicación */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input placeholder="Dirección o lugar del evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ciudad */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ciudad</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* País */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>País</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Categoría */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

      <div className="space-y-4">
        {/* Evento en línea */}
        <FormField
          control={form.control}
          name="isOnline"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">¿Es un evento en línea?</FormLabel>
                <FormDescription>
                  Activa esta opción si el evento se realizará de forma virtual.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Evento gratuito */}
        <FormField
          control={form.control}
          name="isFree"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">¿Es un evento gratuito?</FormLabel>
                <FormDescription>
                  Desactiva esta opción si el evento tiene un costo de entrada.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {!isFree && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      className="pl-8"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Máximo de asistentes */}
          <FormField
            control={form.control}
            name="maxAttendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Máximo de asistentes</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Número máximo de asistentes"
                    value={field.value || ''}
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Moneda */}
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Moneda</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value || "COP"}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una moneda" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="COP">Peso colombiano (COP)</SelectItem>
                    <SelectItem value="USD">Dólar (USD)</SelectItem>
                    <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
      </div>
      )}

      {/* Etiquetas */}
      <div>
        <FormLabel>Etiquetas (opcional)</FormLabel>
        <div className="mt-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <div
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 text-primary/70 hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Presiona Enter para agregar una etiqueta"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
          />
        </div>
      </div>

      {/* Multimedia */}
      <div>
        <FormLabel>Multimedia (opcional)</FormLabel>
        <FormDescription>
          Sube imágenes o videos de tu evento (máx. 5 archivos, 5MB cada uno)
        </FormDescription>
        <div className="mt-2">
          <Input
            type="file"
            multiple
            accept="image/*,video/*"
            {...form.register('multimedia')}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Guardando...
            </>
          ) : (
            'Guardar evento'
          )}
        </Button>
      </div>
      </div>
      </form>
    </Form>
  );
}
