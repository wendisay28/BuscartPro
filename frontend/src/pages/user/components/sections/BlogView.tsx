import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Edit, Eye, MessageCircle } from "lucide-react";

export function BlogView() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Publicaciones</CardTitle>
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
          <Edit className="w-4 h-4 mr-2" />
          Nueva Publicación
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((post) => (
            <Card key={post} className="overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Título de la publicación {post}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Publicado el {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Eliminar
                    </Button>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">
                  Resumen de la publicación. Aquí iría un extracto del contenido...
                </p>
                <div className="flex items-center mt-3 text-sm text-gray-500">
                  <span className="flex items-center mr-4">
                    <Eye className="w-4 h-4 mr-1" /> 124
                  </span>
                  <span className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-1" /> 5
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
