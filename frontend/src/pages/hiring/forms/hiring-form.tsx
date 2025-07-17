"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useOpenStreetMap } from "@/hooks/useGoogleMaps";

// Interfaz para los resultados de búsqueda de OpenStreetMap
type PointTuple = [number, number];
type BoundsTuple = [PointTuple, PointTuple];

interface SuggestionResult {
  x: number;
  y: number;
  label: string;
  bounds: BoundsTuple;
  raw: any;
}

import {
  Loader2,
  MapPin,
  Tag,
  Star,
  DollarSign,
  MessageSquare,
  Clock,
  Calendar,
  Music,
  PartyPopper,
  Camera,
  Video,
  Film,
  Brush,
} from "lucide-react";

// Esquema de validación
const formSchema = z.object({
  artistType: z.string().min(1, "Selecciona un tipo de artista"),
  subCategory: z.string().min(1, "Selecciona una subcategoría"),
  eventLocation: z.string().min(1, "La ubicación es requerida"),
  eventDate: z.string().min(1, "La fecha es requerida"),
  eventTime: z.string().min(1, "La hora es requerida"),
  budget: z.coerce.number().min(50000, "El presupuesto mínimo es $50,000"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface HiringFormProps {
  onOfferCreated?: (offerId: number) => void;
  userLocation?: { city: string; country: string };
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
  Escena: [
    "Danza",
    "Magos",
    "Payasos",
    "Mimos",
    "Animadores",
    "Cosplay",
    "Actores",
    "Presentadores",
  ],
  Imagen: ["Fotografía", "Video", "Edición"],
  Contenido: ["Influencers", "UGC", "TikTokers", "Streamers", "Podcasters"],
  Foto: ["Social", "Comercial", "Moda", "Retratos", "Video", "Edición"],
  Diseño: ["Ilustración", "Graffiti", "Bodypaint", "Gráfico"],
};

export function HiringForm({ onOfferCreated, userLocation }: HiringFormProps) {
  const [selectedCategory, setSelectedCategory] = useState("Música");
  const locationInputRef = useRef<HTMLInputElement>(null);
  
  // Hook para el autocompletado de OpenStreetMap
  const { suggestions, handleSelectSuggestion } = useOpenStreetMap(
    locationInputRef,
    (place: SuggestionResult) => {
      form.setValue('eventLocation', place.label);
    },
    userLocation
  );

  // Inicializar el formulario
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistType: "Música",
      subCategory: "",
      eventLocation: "",
      eventDate: "",
      eventTime: "",
      budget: 50000,
      notes: "",
    },
  });

  const { mutate: createOffer, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      return new Promise<number>((resolve) => {
        setTimeout(() => {
          console.log("Datos del formulario:", data);
          resolve(Math.floor(Math.random() * 1000)); // Simular ID de oferta
        }, 1000);
      });
    },
    onSuccess: (data) => {
      console.log("Oferta creada con éxito:", data);
      onOfferCreated?.(data);
    },
    onError: (error) => {
      console.error("Error al crear la oferta:", error);
    },
  });

  const onSubmit = () => {
    createOffer(form.getValues());
  };

  return (
    <div className="flex justify-center w-full relative">
      <div
        className="w-full max-w-[350px] bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden transition-all duration-300 flex flex-col"
        style={{ maxHeight: "90vh", minHeight: "400px" }}
      >
        <div className="flex-1 overflow-y-auto p-3 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
              {/* ---- Campos ---- */}
              <FormField
                control={form.control}
                name="artistType"
                render={({ field }) => (
                  <FormItem>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
                      <Tag className="w-4 h-4" /> Tipo de Artista
                    </h3>
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-0.5">
                      {artistCategories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = field.value === category.name;
                        return (
                          <button
                            key={category.name}
                            type="button"
                            onClick={() => {
                              field.onChange(category.name);
                              setSelectedCategory(category.name);
                              form.setValue("subCategory", "");
                            }}
                            className={`flex flex-col items-center justify-center p-1.5 rounded-md transition-colors min-w-[70px] h-16 text-center flex-shrink-0 ${
                              isSelected
                                ? "bg-[#bb00aa] text-white"
                                : "bg-gray-800/90 text-gray-300 hover:bg-gray-700/90"
                            }`}
                          >
                            <Icon className="w-5 h-5 mb-1" />
                            <span className="text-[11px] font-medium">
                              {category.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <FormMessage className="text-[10px] text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-1.5 mb-2">
                      <Star className="w-4 h-4" /> Subcategoría
                    </h3>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-9 text-[10px] bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-[#bb00aa] focus-visible:ring-offset-0 [&>span]:text-[11px]">
                          <SelectValue
                            placeholder="Selecciona subcategoría"
                            className="text-gray-100"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border border-gray-600 [&_*]:text-[11px]">
                        {subCategories[selectedCategory]?.map((sub) => (
                          <SelectItem
                            key={sub}
                            value={sub}
                            className="text-[11px] text-gray-100 hover:bg-gray-700/80 focus:bg-gray-700/80"
                          >
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[8px] text-red-400" />
                  </FormItem>
                )}
              />

              {/* --- Ubicación --- */}
              <FormField
                control={form.control}
                name="eventLocation"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-1.5 mb-2">
                      <MapPin className="w-4 h-4 flex-shrink-0" /> Ubicación
                    </h3>
                    <div className="relative">
                      <Input
                        placeholder="Ubicación del evento"
                        className="pl-8 h-9 text-[11px] bg-gray-800 border border-gray-600 text-gray-100 w-full"
                        {...field}
                        ref={(e) => {
                          // Asignar la referencia al input
                          if (e) {
                            (locationInputRef as React.MutableRefObject<HTMLInputElement>).current = e;
                          }
                          // Asignar la referencia de react-hook-form
                          field.ref(e);
                        }}
                      />
                      <MapPin className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      {userLocation && (
                        <span className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                          {userLocation.city}, {userLocation.country}
                        </span>
                      )}
                    </div>
                    {Array.isArray(suggestions) && suggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg">
                        {suggestions.map((suggestion: SuggestionResult, index: number) => (
                          <div
                            key={`${suggestion.label}-${index}`}
                            className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSelectSuggestion?.(suggestion)}
                          >
                            {suggestion.label}
                          </div>
                        ))}
                      </div>
                    )}
                    <FormMessage className="text-[10px] text-red-400" />
                  </FormItem>
                )}
              />

              {/* --- Fecha y Hora --- */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-1.5">
                  <Calendar className="w-4 h-4 flex-shrink-0" /> Fecha y Hora
                </h3>
                <div className="flex gap-3">
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <div className="relative">
                          <Input
                            type="date"
                            className="pl-8 pr-2 h-9 text-[11px] bg-gray-800 border border-gray-600 text-gray-100 w-full [&::-webkit-calendar-picker-indicator]:hidden"
                            style={{
                              WebkitAppearance: 'none',
                              appearance: 'none',
                              paddingRight: '1.5rem',
                            }}
                            {...field}
                            onClick={(e) => {
                              const input = e.target as HTMLInputElement;
                              if (input.showPicker) {
                                input.showPicker();
                              }
                            }}
                          />
                          <Calendar 
                            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={() => {
                              const input = document.querySelector('input[type="date"]') as HTMLInputElement;
                              if (input?.showPicker) {
                                input.showPicker();
                              }
                            }}
                          />
                        </div>
                        <FormMessage className="text-[10px] text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="eventTime"
                    render={({ field }) => (
                      <FormItem className="w-1/2">
                        <div className="relative">
                          <Input
                            type="time"
                            className="pl-8 pr-2 h-9 text-[11px] bg-gray-800 border border-gray-600 text-gray-100 w-full [&::-webkit-calendar-picker-indicator]:hidden"
                            style={{
                              WebkitAppearance: 'none',
                              appearance: 'none',
                              paddingRight: '1.5rem',
                            }}
                            {...field}
                            onClick={(e) => {
                              const input = e.target as HTMLInputElement;
                              if ('showPicker' in HTMLInputElement.prototype) {
                                input.showPicker();
                              }
                            }}
                          />
                          <Clock 
                            className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer"
                            onClick={() => {
                              const input = document.querySelector('input[type="time"]') as HTMLInputElement;
                              if (input && 'showPicker' in HTMLInputElement.prototype) {
                                input.showPicker();
                              }
                            }}
                          />
                        </div>
                        <FormMessage className="text-[10px] text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* --- Presupuesto --- */}
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-1.5 mb-2">
                      <DollarSign className="w-4 h-4 flex-shrink-0" /> Presupuesto (COP)
                    </h3>
                    <div className="relative">
                      <DollarSign className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="number"
                        placeholder="500.000"
                        className="pl-8 h-9 text-[11px] bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-500 focus-visible:ring-1 focus-visible:ring-[#bb00aa] focus-visible:ring-offset-0 w-full"
                        min={50000}
                        value={field.value}
                        onChange={(e) => {
                          const value = parseInt(e.target.value) || 50000;
                          field.onChange(value);
                        }}
                      />
                    </div>
                    <FormMessage className="text-[10px] text-red-400" />
                  </FormItem>
                )}
              />

              {/* --- Notas --- */}
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="mb-0">
                    <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-1 mb-1.5">
                      <MessageSquare className="w-4 h-4" /> Notas adicionales
                    </h3>
                    <FormControl>
                      <Textarea
                        placeholder="Detalles adicionales del evento"
                        className="min-h-[60px] text-[11px] bg-gray-800 border border-gray-600 text-gray-100 placeholder-gray-400 focus-visible:ring-1 focus-visible:ring-[#bb00aa] focus-visible:ring-offset-0"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[8px] text-red-400" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>

        {/* Botón fijo */}
        <div className="sticky bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-1.5">
          <Button
            type="submit"
            className="w-full bg-[#bb00aa] hover:bg-[#a00090] text-white h-10 text-sm font-medium"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creando...
              </>
            ) : (
              "Crear Oferta"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}