import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Star, Users, Building } from "lucide-react";

const stats = [
  { label: "Eventos organizados", value: 45, icon: Calendar },
  { label: "Artistas contratados", value: 89, icon: Users },
  { label: "Rating", value: 4.9, icon: Star },
  { label: "Capacidad", value: "200", icon: Building }
];

const services = ["Sala de conciertos", "Espacio para eventos", "Alquiler equipos", "Catering"];
const upcomingEvents = [
  { title: "Concierto Jazz Quartet", date: "2024-05-30", attendees: 150 },
  { title: "Exposición Arte Local", date: "2024-06-05", attendees: 80 },
  { title: "Festival Folk", date: "2024-06-15", attendees: 200 }
];

export function CompanyView() {
  return (
    <div className="space-y-6">
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

      {/* Servicios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-500" />
            Nuestros Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {services.map((service, index) => (
              <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-gray-900">{service}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eventos próximos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <div className="text-right text-sm text-gray-600 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
