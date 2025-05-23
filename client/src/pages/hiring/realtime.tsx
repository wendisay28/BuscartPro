import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import RealTimeHiringModal from "@/components/real-time-hiring-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Users, 
  Zap, 
  Search,
  Filter,
  Plus,
  MessageCircle,
  AlertCircle,
  CheckCircle
} from "lucide-react";

export default function RealTimeHiring() {
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const { data: activeRequests, isLoading } = useQuery({
    queryKey: ["/api/hiring/active"],
  });

  const { data: myRequests } = useQuery({
    queryKey: ["/api/hiring/my-requests"],
  });

  const { data: categories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Pasto'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-heading font-bold text-4xl text-dark mb-2">
                Contratación en Tiempo Real
              </h1>
              <p className="text-gray-600 text-lg">
                Solicitudes urgentes y ofertas inmediatas para artistas disponibles
              </p>
            </div>
            <Button 
              onClick={() => setShowCreateRequest(true)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Solicitud
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-yellow-500">23</h3>
              <p className="text-gray-600">Solicitudes Activas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-blue-500">4.2min</h3>
              <p className="text-gray-600">Tiempo Promedio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-green-500">89%</h3>
              <p className="text-gray-600">Tasa de Éxito</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-8 w-8 text-purple-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-purple-500">156</h3>
              <p className="text-gray-600">Ofertas Enviadas</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Buscar solicitudes por descripción..."
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-3 lg:flex-nowrap">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {categories?.map((category: any) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todas</SelectItem>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Requests */}
          <div className="lg:col-span-2">
            <h2 className="font-heading font-semibold text-2xl text-dark mb-6">
              Solicitudes Activas
            </h2>

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardContent className="p-6 space-y-3">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {/* Example Active Request */}
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Card key={index} className="card-hover border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-heading font-semibold text-lg text-dark">
                              Guitarrista para evento corporativo
                            </h3>
                            <Badge className={`${getStatusColor('active')}`}>
                              Activa
                            </Badge>
                            <Badge variant="outline" className="text-red-500 border-red-500">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Urgente
                            </Badge>
                          </div>
                          
                          <p className="text-gray-700 mb-3">
                            Necesitamos un guitarrista experimentado para amenizar un evento corporativo este viernes. 
                            Repertorio variado, ambiente profesional.
                          </p>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>Hace 15 min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>Bogotá</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              <span>$200.000 - $300.000</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>3 respuestas</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-dark">Carlos Empresario</p>
                            <p className="text-xs text-gray-500">Empresa verificada</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Contactar
                          </Button>
                          <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                            Enviar Oferta
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mis Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ofertas enviadas</span>
                  <span className="font-semibold text-primary">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasa de respuesta</span>
                  <span className="font-semibold text-green-500">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Contratos cerrados</span>
                  <span className="font-semibold text-blue-500">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Calificación promedio</span>
                  <span className="font-semibold text-yellow-500">4.8 ⭐</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'offer', message: 'Oferta enviada para evento de jazz', time: '5 min' },
                  { type: 'response', message: 'Respuesta recibida de María López', time: '1 hora' },
                  { type: 'completed', message: 'Contrato completado exitosamente', time: '2 horas' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {activity.type === 'offer' && <MessageCircle className="h-4 w-4 text-blue-500" />}
                      {activity.type === 'response' && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      {activity.type === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-dark">{activity.message}</p>
                      <p className="text-xs text-gray-500">hace {activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-gradient-to-br from-secondary to-accent text-white">
              <CardContent className="p-6">
                <Zap className="h-8 w-8 mb-3" />
                <h3 className="font-heading font-semibold mb-2">
                  Consejo Rápido
                </h3>
                <p className="text-white/90 text-sm">
                  Responde rápido a las solicitudes urgentes. Los clientes valoran la prontitud en situaciones de último minuto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Real Time Hiring Modal */}
      <RealTimeHiringModal 
        open={showCreateRequest} 
        onOpenChange={setShowCreateRequest}
      />
    </div>
  );
}