import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";

export function OffersView() {
  // Datos de ejemplo de ofertas
  const offers = [
    { id: 1, title: "Diseño de logotipo", company: "Empresa XYZ", amount: "$500", status: "Pendiente" },
    { id: 2, title: "Desarrollo web", company: "Startup ABC", amount: "$1,200", status: "En revisión" },
    { id: 3, title: "Fotografía de producto", company: "Tienda 123", amount: "$300", status: "Aceptada" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mis Ofertas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {offers.map((offer) => (
            <div key={offer.id} className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-medium">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.company} • {offer.amount}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  offer.status === 'Aceptada' ? 'bg-green-100 text-green-800' :
                  offer.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {offer.status}
                </span>
                <Button variant="outline" size="sm">Ver detalles</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-4">¿No ves todas tus ofertas?</p>
          <Button variant="outline">Cargar más ofertas</Button>
        </div>
      </CardContent>
    </Card>
  );
}
