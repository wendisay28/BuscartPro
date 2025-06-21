import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, MessageCircle, CheckCircle, TrendingUp } from "lucide-react";
import Badge from "@/components/ui/badge";

const stats = [
  { label: "Favoritos", value: 24, icon: Heart },
  { label: "Eventos creados", value: 3, icon: Calendar },
  { label: "Recomendaciones", value: 12, icon: MessageCircle },
  { label: "Contrataciones", value: 8, icon: CheckCircle },
];

const interests = ["Música", "Arte Visual", "Teatro", "Fotografía"];

const recentActivity = [
  { type: "favorite", text: "Agregó a María Elena Vásquez a favoritos", time: "2h" },
  { type: "recommendation", text: "Publicó: ¿Conocen saxofonista en Madrid?", time: "1d" },
  { type: "contract", text: "Contrató a Carlos Mendoza para evento", time: "3d" },
];

export function GeneralView() {
  return (
    <div className="space-y-6">
      {/* Estadísticas */}
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

      {/* Intereses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-orange-500" />
            Mis Intereses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                {interest}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actividad reciente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-500" />
            Actividad Reciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
