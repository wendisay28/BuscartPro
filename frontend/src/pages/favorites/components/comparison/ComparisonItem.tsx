import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface ComparisonItemProps {
  item: any;
  type: string;
}

export function ComparisonItem({ item, type }: ComparisonItemProps) {
  return (
    <Card key={item.id} className="border-2 border-[#f3e8ff]">
      <CardHeader className="pb-3">
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.name || item.title} 
            className="w-full h-32 object-cover rounded-lg" 
          />
        </div>
        <CardTitle className="text-lg">{item.name || item.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {type === 'artists' && (
            <>
              <div><span className="text-gray-400">Categoría:</span><p className="font-medium">{item.category}</p></div>
              <div><span className="text-gray-400">Tipo:</span><p className="font-medium">{item.type}</p></div>
              <div><span className="text-gray-400">Ciudad:</span><p className="font-medium">{item.city}</p></div>
              <div><span className="text-gray-400">Rating:</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#bb00aa] fill-current" />
                  <span className="font-medium">{item.rating}</span>
                </div>
              </div>
              <div><span className="text-gray-400">Precio/hora:</span><p className="font-medium text-[#9b0089]">${item.price * 1000}</p></div>
              <div><span className="text-gray-400">Fans:</span><p className="font-medium">{item.fans}</p></div>
              <div className="col-span-2">
                <span className="text-gray-400">Disponibilidad:</span>
                <Badge className={`ml-2 ${item.availability === "Disponible" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {item.availability}
                </Badge>
              </div>
            </>
          )}
          {/* Agregar más casos para otros tipos (events, sites, gallery) */}
        </div>
      </CardContent>
    </Card>
  );
}
