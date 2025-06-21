import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import Button from "@/components/ui/button";
import { Play, Edit, Settings, Star, Grid3X3, Camera, Eye, Video } from "lucide-react";

const stats = [
  { label: "Fans", value: 156, icon: Star },
  { label: "Contrataciones", value: 23, icon: Star },
  { label: "Rating", value: 4.8, icon: Star },
  { label: "Este mes", value: "$2.400", icon: Star }
];

const skills = ["Flamenco Tradicional", "Danza Contemporánea", "Coreografía"];
const portfolio = [
  { type: "video", url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400", title: "Presentación Flamenco" },
  { type: "image", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400", title: "Show Barcelona" },
  { type: "image", url: "https://images.unsplash.com/photo-1594736797933-d0a93ed9614f?w=400", title: "Evento Corporativo" }
];

export function ArtistView() {
  const availability = true;
  const pricing = { from: 300, currency: "€" };

  return (
    <div className="space-y-6">
      {/* Banner video */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-lg">
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div>
                <Play className="w-16 h-16 mx-auto mb-2 opacity-80" />
                <p className="text-lg font-semibold">Video de Presentación</p>
                <p className="text-sm opacity-90">Mostrar mis habilidades</p>
              </div>
            </div>
            <Button size="icon" className="absolute top-4 right-4 bg-black/50 hover:bg-black/70">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disponibilidad */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${availability ? 'bg-green-500' : 'bg-red-500'}`} />
            <div>
              <p className="font-semibold text-gray-900">
                {availability ? "Disponible para contrataciones" : "No disponible"}
              </p>
              <p className="text-sm text-gray-600">
                Desde {pricing.from}{pricing.currency}/hora
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </CardContent>
      </Card>

      {/* Habilidades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-500" />
            Mis Especialidades
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <Badge key={i} className="bg-orange-100 text-orange-700">
              {skill}
            </Badge>
          ))}
        </CardContent>
      </Card>

      {/* Portfolio */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-orange-500" />
            Mi Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {portfolio.map((item, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center">
                  {item.type === "video" ? (
                    <Video className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                  ) : (
                    <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                  )}
                </div>
              </div>
            ))}
            <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange-400 transition-colors">
              <div className="text-center text-gray-500">
                <Camera className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Agregar</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
