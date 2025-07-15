"use client";

import { useState, useEffect } from "react";
import { Music, PartyPopper, Camera, Video, Brush } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Tag, Star, DollarSign, Award } from "lucide-react";

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
  { id: "beginner", name: "Principiante" },
  { id: "intermediate", name: "Intermedio" },
  { id: "professional", name: "Profesional" },
  { id: "expert", name: "Experto" },
];

type FilterValues = {
  category: string;
  subcategory: string;
  priceRange: [number, number];
  rating: number | null;
  experience: string[];
};

export function AdvancedFilters({
  onFilterChange,
}: {
  onFilterChange: (filters: FilterValues) => void;
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
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
      subcategory: "",
    }));
  };

  const handleSubcategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      subcategory: value,
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: value as [number, number],
    }));
  };

  const handleRatingChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: value === prev.rating ? null : value,
    }));
  };

  const toggleFilter = (filterType: "experience", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((v: string) => v !== value)
        : [...prev[filterType], value],
    }));
  };

  return (
    <div
      className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden flex flex-col transition-all duration-300"
      style={{ maxHeight: "90vh", minHeight: "400px" }}
    >
      {/* Layout base: header scrollable + footer fijo */}
      <div className="flex flex-col h-full">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {/* Categorías */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
              <Tag className="w-4 h-4" /> Categorías
            </h3>
            <div className="flex space-x-2 overflow-x-auto pb-1 -mx-0.5">
              {artistCategories.map((category) => {
                const Icon = category.icon;
                const isSelected = filters.category === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-1.5 rounded-md transition-colors min-w-[70px] h-16 text-center flex-shrink-0",
                      isSelected
                        ? "bg-[#bb00aa] text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    )}
                  >
                    <Icon className="h-4 w-4 mb-1" />
                    <span className="text-xs leading-tight">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategorías */}
          {filters.category && availableSubcategories.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
                <Star className="w-4 h-4" /> Subcategorías
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSubcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    type="button"
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={cn(
                      "px-3 py-1 text-xs rounded-full whitespace-nowrap transition-colors",
                      filters.subcategory === subcategory.id
                        ? "bg-[#bb00aa] text-white"
                        : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                    )}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rango de precios */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
              <DollarSign className="w-4 h-4" /> Precio (COP)
            </h3>
            <div className="bg-gray-800/50 p-1.5 rounded-lg">
              <div className="flex justify-between items-center text-[11px] text-gray-400 mb-0.5">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
              <div className="h-6 flex items-center px-1">
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  min={0}
                  max={1000000}
                  step={50000}
                  minStepsBetweenThumbs={1}
                  className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Calificación */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
              <Star className="w-4 h-4" /> Calificación
            </h3>
            <div className="bg-gray-800/50 p-2 rounded-lg">
              <div className="flex items-center justify-center h-8">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={cn(
                        "text-xl transition-transform hover:scale-110",
                        star <= (filters.rating || 0)
                          ? "text-yellow-400"
                          : "text-gray-600"
                      )}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              {filters.rating && (
                <span className="text-xs text-center text-gray-400 mt-0.5 block">
                  {filters.rating}+ estrellas
                </span>
              )}
            </div>
          </div>

          {/* Nivel de experiencia */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-medium text-gray-300 border-b border-gray-700 pb-2 mb-2">
              <Award className="w-4 h-4" /> Nivel de experiencia
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => toggleFilter("experience", level.id)}
                  className={cn(
                    "text-xs px-2 py-1 rounded transition-colors whitespace-nowrap",
                    filters.experience.includes(level.id)
                      ? "bg-[#bb00aa] text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  )}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="border-t border-gray-700 p-3">
          <div className="flex justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFilters({
                  category: "",
                  subcategory: "",
                  priceRange: [0, 1000000],
                  rating: null,
                  experience: [],
                });
              }}
              className="flex-1 bg-transparent hover:bg-gray-800 border-gray-600 text-gray-300 hover:text-white"
            >
              Limpiar
            </Button>
            <Button
              type="button"
              onClick={() => onFilterChange(filters)}
              className="flex-1 bg-[#bb00aa] hover:bg-[#a00090] text-white"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
