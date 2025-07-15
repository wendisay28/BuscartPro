"use client";

import { useState, useEffect } from "react";
import { Music, PartyPopper, Camera, Video, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const artistCategories = [
  { id: "music", name: "Música", icon: Music },
  { id: "dance", name: "Baile", icon: PartyPopper },
  { id: "photo", name: "Fotografía", icon: Camera },
  { id: "video", name: "Video", icon: Video },
  { id: "design", name: "Diseño", icon: Brush },
];

const subcategories = {
  music: [
    { id: "dj", name: "DJ" },
    { id: "singer", name: "Cantante" },
    { id: "band", name: "Banda" },
    { id: "musician", name: "Músico" },
  ],
  dance: [
    { id: "salsa", name: "Salsa" },
    { id: "bachata", name: "Bachata" },
    { id: "urban", name: "Urbano" },
    { id: "folkloric", name: "Folclórico" },
  ],
  photo: [
    { id: "portrait", name: "Retrato" },
    { id: "event", name: "Eventos" },
    { id: "product", name: "Producto" },
    { id: "fashion", name: "Moda" },
  ],
  video: [
    { id: "event", name: "Eventos" },
    { id: "commercial", name: "Comercial" },
    { id: "music-video", name: "Videoclip" },
    { id: "documentary", name: "Documental" },
  ],
  design: [
    { id: "graphic", name: "Gráfico" },
    { id: "web", name: "Web" },
    { id: "interior", name: "Interiores" },
    { id: "fashion", name: "Moda" },
  ],
};

const experienceLevels = [
  { id: 'beginner', name: 'Principiante' },
  { id: 'intermediate', name: 'Intermedio' },
  { id: 'professional', name: 'Profesional' },
  { id: 'expert', name: 'Experto' },
];

type FilterValues = {
  category: string;
  subcategory: string;
  priceRange: [number, number];
  rating: number | null;
  experience: string[];
};

export function AdvancedFilters({ 
  onFilterChange
}: { 
  onFilterChange: (filters: FilterValues) => void
}) {
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    subcategory: "",
    priceRange: [0, 1000000],
    rating: null,
    experience: [],
  });

  const availableSubcategories = filters.category 
    ? subcategories[filters.category as keyof typeof subcategories] || []
    : [];

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryChange = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: categoryId,
      subcategory: "",
    }));
  };

  const handleSubcategoryChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      subcategory: value,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value as [number, number],
    }));
  };

  const handleRatingChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      rating: value === prev.rating ? null : value,
    }));
  };

  const toggleFilter = (filterType: 'experience', value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((v: string) => v !== value)
        : [...prev[filterType], value],
    }));
  };

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        {/* Categorías */}
        <div>
          <Label className="text-xs font-medium block mb-2">Categorías</Label>
          <div className="flex space-x-2 overflow-x-auto pb-1 -mx-1 px-1">
            {artistCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = filters.category === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors min-w-[70px] h-16 text-center",
                    isSelected 
                      ? "bg-[#bb00aa] text-white" 
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  )}
                >
                  <Icon className="h-4 w-4 mb-0.5" />
                  <span className="text-[10px] leading-tight">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subcategorías */}
        {filters.category && availableSubcategories.length > 0 && (
          <div>
            <Label className="text-xs font-medium block mb-2">Subcategorías</Label>
            <div className="flex space-x-2 overflow-x-auto pb-1 -mx-1 px-1">
              {availableSubcategories.map((subcategory) => (
                <button
                  key={subcategory.id}
                  type="button"
                  onClick={() => handleSubcategoryChange(subcategory.id)}
                  className={cn(
                    "px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors",
                    filters.subcategory === subcategory.id
                      ? "bg-[#bb00aa] text-white"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  )}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Rango de precios */}
        <div className="pt-1">
          <Label className="text-xs font-medium block mb-2">Rango de precios</Label>
          <div className="px-1">
            <Slider
              value={filters.priceRange}
              onValueChange={handlePriceChange}
              min={0}
              max={1000000}
              step={50000}
              minStepsBetweenThumbs={1}
              className="[&>span:first-child]:bg-gray-200 [&>span:first-child]:h-1"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Calificación Mínima */}
        <div>
          <Label className="text-xs font-medium block mb-2">Calificación Mínima</Label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={cn(
                  "text-2xl",
                  star <= (filters.rating || 0) 
                    ? "text-yellow-400" 
                    : "text-gray-300"
                )}
              >
                ★
              </button>
            ))}
            {filters.rating && (
              <span className="text-xs text-gray-500 ml-2">
                {filters.rating}+ estrellas
              </span>
            )}
          </div>
        </div>

        {/* Nivel de Experiencia */}
        <div>
          <Label className="text-xs font-medium block mb-2">Nivel de Experiencia</Label>
          <div className="flex flex-wrap gap-2">
            {experienceLevels.map((level) => (
              <button
                key={level.id}
                type="button"
                onClick={() => toggleFilter('experience', level.id)}
                className={cn(
                  "px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors font-medium",
                  filters.experience.includes(level.id)
                    ? "bg-[#bb00aa] text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                )}
              >
                {level.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          className="flex-1"
          onClick={() => {
            setFilters({
              category: "",
              subcategory: "",
              priceRange: [0, 1000000],
              rating: null,
              experience: [],
            });
          }}
        >
          Limpiar
        </Button>
        <Button 
          type="button" 
          className="flex-1 bg-[#bb00aa] hover:bg-[#a00090]"
          onClick={() => onFilterChange(filters)}
        >
          Aplicar
        </Button>
      </div>
    </div>
  );
}
