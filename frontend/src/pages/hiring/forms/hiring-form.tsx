"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Music, PartyPopper, Camera, Video, Film, Brush, MapPin } from "lucide-react";

// Esquema de validación
const formSchema = z.object({
  artistType: z.string().min(1, "Selecciona un tipo de artista"),
  subCategory: z.string().min(1, "Selecciona una subcategoría"),
  eventLocation: z.string().min(1, "La ubicación es requerida"),
  eventTime: z.string().min(1, "La hora del evento es requerida"),
  budget: z.coerce.number().min(50000, "El presupuesto mínimo es $50,000"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface HiringFormProps {
  onOfferCreated?: (offerId: number) => void;
}

const artistCategories = [
  { name: "Música", icon: Music },
  { name: "Escena", icon: PartyPopper },
  { name: "Imagen", icon: Camera },
  { name: "Contenido", icon: Video },
  { name: "Foto", icon: Film },
  { name: "Diseño", icon: Brush },
];

const subCategories: Record<string, string[]> = {
  Música: ["DJs", "Solistas", "Bandas", "Mariachis", "Vallenato"],
  Escena: ["Danza", "Magos", "Payasos", "Mimos", "Animadores", "Cosplay", "Actores", "Presentadores"],
  Imagen: ["Fotografía", "Video", "Edición"],
  Contenido: ["Influencers", "UGC", "TikTokers", "Streamers", "Podcasters"],
  Foto: ["Social", "Comercial", "Moda", "Retratos", "Video", "Edición"],
  Diseño: ["Ilustración", "Graffiti", "Bodypaint", "Gráfico"],
};

export function HiringForm({ onOfferCreated }: HiringFormProps) {
  const [budget, setBudget] = useState(100000);
  const [selectedCategory, setSelectedCategory] = useState("Música");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistType: "Música",
      subCategory: "",
      eventLocation: "",
      eventTime: "",
      budget: 100000,
      notes: "",
    },
  });

  const { mutate: createOffer, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      // Simular llamada a la API
      return new Promise<{ id: number }>((resolve) => {
        setTimeout(() => {
          resolve({ id: Math.floor(Math.random() * 1000) });
        }, 1000);
      });
    },
    onSuccess: (data) => {
      if (onOfferCreated) {
        onOfferCreated(data.id);
      }
      form.reset();
    },
    onError: (error) => {
      console.error("Error al crear la oferta:", error);
    },
  });

  const onSubmit = (data: FormData) => {
    createOffer(data);
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-800">
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Crear Oferta</h2>
            
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="artistType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">Tipo de Artista</FormLabel>
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {artistCategories.map((cat) => (
                        <button
                          key={cat.name}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(cat.name);
                            field.onChange(cat.name);
                            form.setValue("subCategory", "");
                          }}
                          className={`flex flex-col items-center justify-center p-1.5 rounded-md text-xs min-w-[60px] ${
                            selectedCategory === cat.name
                              ? "bg-purple-600 text-white"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          <cat.icon className="w-3.5 h-3.5 mb-0.5" />
                          <span className="text-[11px]">{cat.name}</span>
                        </button>
                      ))}
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">Subcategoría</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Selecciona subcategoría" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCategories[selectedCategory]?.map((sub) => (
                          <SelectItem key={sub} value={sub} className="text-xs">
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">Ubicación</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-2.5 top-2 text-purple-500 w-3.5 h-3.5" />
                        <Input 
                          placeholder="Dirección del evento" 
                          className="pl-8 h-8 text-xs"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eventTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">Fecha y Hora</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input 
                          type="date" 
                          className="h-8 text-xs"
                          {...field} 
                        />
                      </FormControl>
                      <FormControl>
                        <Input 
                          type="time" 
                          className="h-8 text-xs"
                          {...field} 
                        />
                      </FormControl>
                    </div>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        Presupuesto: ${budget.toLocaleString()}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <div className="space-y-1">
                        <Input
                          type="range"
                          min="50000"
                          max="1000000"
                          step="50000"
                          value={budget}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            setBudget(value);
                            field.onChange(value);
                          }}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500">
                          <span>$50K</span>
                          <span>$1M</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700 dark:text-gray-300">Notas adicionales</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles adicionales del evento"
                        className="min-h-[80px] w-full text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium mt-2"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                    Creando...
                  </>
                ) : 'Crear Oferta'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
