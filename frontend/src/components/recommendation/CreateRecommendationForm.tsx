import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const recommendationSchema = z.object({
  title: z.string().min(5, "El título es muy corto").max(100, "El título es muy largo"),
  description: z.string().min(10, "La descripción es muy corta").max(300, "Máximo 300 caracteres"),
  location: z.string().optional(),
  date: z.date().optional(),
  category: z.string().min(1, "Selecciona una categoría"),
  tags: z.array(z.string()).max(2, "Máximo 2 etiquetas").optional(),
});

type RecommendationFormValues = z.infer<typeof recommendationSchema>;

const categories = [
  "Música",
  "Artes escénicas",
  "Artes visuales",
  "Eventos",
  "Talleres",
  "Otros"
];

const popularTags = [
  "Música en vivo",
  "Bodas",
  "Eventos corporativos",
  "Fiestas",
  "Talleres",
  "Cursos",
  "Exposiciones",
  "Teatro"
];

interface CreateRecommendationFormProps {
  onSubmit: (data: any) => void;
}

export function CreateRecommendationForm({ onSubmit }: CreateRecommendationFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      category: "",
      tags: [],
    },
  });

  const handleSubmit = (data: RecommendationFormValues) => {
    // Aquí iría la lógica para enviar la recomendación
    const formData = {
      ...data,
      tags: selectedTags,
      date: date,
    };
    onSubmit(formData);
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() && selectedTags.length < 2) {
      e.preventDefault();
      if (!selectedTags.includes(tagInput.trim())) {
        setSelectedTags([...selectedTags, tagInput.trim()]);
        form.setValue('tags', [...selectedTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = selectedTags.filter(tag => tag !== tagToRemove);
    setSelectedTags(newTags);
    form.setValue('tags', newTags);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Título */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿Qué estás buscando?</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Ej: Busco percusionista para boda en Medellín" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción detallada</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="¿Qué tipo de artista / evento / lugar necesitas?, ¿qué características debe tener?, ¿cuándo?"
                  className="min-h-[100px]"
                  maxLength={300}
                  {...field}
                />
              </FormControl>
              <div className="text-xs text-gray-500 text-right">
                {field.value?.length || 0}/300 caracteres
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación (ciudad / barrio opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Medellín, El Poblado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fecha estimada */}
        <FormField
          control={form.control}
          name="date"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha estimada o rango (opcional)</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? (
                        format(date, "PPP")
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
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categoría */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría sugerida</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Etiquetas */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel>Etiquetas opcionales (máx 2)</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <FormControl>
                <Input
                  placeholder="Escribe y presiona Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  disabled={selectedTags.length >= 2}
                />
              </FormControl>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground mb-1">Sugerencias:</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-accent"
                        onClick={() => {
                          if (selectedTags.length < 2 && !selectedTags.includes(tag)) {
                            const newTags = [...selectedTags, tag];
                            setSelectedTags(newTags);
                            form.setValue('tags', newTags);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Publicar recomendación
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CreateRecommendationForm;
