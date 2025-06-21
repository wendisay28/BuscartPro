import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";

type Props = {
  onCreate: () => void;
};

export function EventsView({ onCreate }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Eventos</CardTitle>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={onCreate}>
          <Calendar className="w-4 h-4 mr-2" />
          Crear Evento
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2].map((event) => (
            <Card key={event}>
              <div className="md:flex">
                <div className="md:w-1/3 bg-gray-100 h-40 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <div className="p-4 md:w-2/3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Nombre del Evento {event}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date().toLocaleDateString()} - {new Date(Date.now() + 86400000).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm bg-green-100 text-green-800 rounded px-2 py-1">Activo</span>
                  </div>
                  <p className="mt-2 text-gray-700 line-clamp-2">
                    Descripción del evento. Aquí iría un resumen de la información del evento...
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" /> 24 asistentes
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Editar</Button>
                      <Button variant="outline" size="sm" className="text-red-600">Cancelar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
