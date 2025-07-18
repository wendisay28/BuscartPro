import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ShoppingCart } from "lucide-react";

interface GalleryCardProps {
  item: any;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}

export function GalleryCard({ 
  item, 
  isSelected, 
  onToggleSelect, 
  onToggleFavorite 
}: GalleryCardProps) {
  return (
    <Card className="relative overflow-hidden border border-gray-700 bg-gray-800 hover:border-[#bb00aa] transition-colors flex flex-col h-full">
      <CardHeader className="p-0 flex-1 flex flex-col">
        <div className="relative flex-1 flex items-center justify-center bg-gray-900">
          <img 
            src={item.image} 
            alt={item.name}
            className="w-full h-48 object-contain p-4"
          />
          
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
            onClick={() => onToggleFavorite(item.id)}
          >
            <Heart className={`w-5 h-5 ${item.isFavorite ? 'fill-[#bb00aa] text-[#bb00aa]' : 'text-white'}`} />
          </Button>
          
          <div className="absolute top-2 left-2">
            <Checkbox 
              id={`compare-gallery-${item.id}`}
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(item.id)}
              className="border-gray-600 data-[state=checked]:bg-[#bb00aa] data-[state=checked]:border-[#bb00aa]"
            />
          </div>
          
          {item.discount && (
            <div className="absolute top-2 left-2 bg-[#bb00aa] text-white text-xs font-bold px-2 py-1 rounded">
              -{item.discount}%
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <CardTitle className="text-white text-lg">{item.name}</CardTitle>
            <p className="text-gray-400 text-sm">{item.category}</p>
          </div>
          
          <Badge variant="secondary" className="text-xs bg-[#1e1e1e] text-white">
            {item.stock > 0 ? `${item.stock} disponibles` : 'Agotado'}
          </Badge>
        </div>
        
        <div className="mt-2">
          {item.originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ${item.originalPrice.toLocaleString()}
            </p>
          )}
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-[#bb00aa]">
              ${item.price.toLocaleString()}
            </p>
            {item.originalPrice && (
              <span className="text-xs text-green-400">
                {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          
          {item.rating && (
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 ml-1">({item.reviewCount})</span>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <Button 
            size="sm" 
            variant="outline"
            className="bg-transparent border-[#bb00aa] text-[#bb00aa] hover:bg-[#bb00aa]/10 hover:border-[#bb00aa] hover:text-[#bb00aa]"
          >
            Ver detalles
          </Button>
          
          <Button 
            size="sm" 
            className="bg-[#bb00aa] hover:bg-[#9b0089] flex items-center gap-2"
            disabled={item.stock === 0}
          >
            <ShoppingCart className="w-4 h-4" />
            {item.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
