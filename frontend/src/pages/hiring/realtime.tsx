import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  Users, 
  Zap, 
  Search,
  Plus,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Send,
  Calendar,
  Star,
  Timer,
  TrendingUp,
  ArrowRight,
  UserCheck,
  Music,
  Camera,
  Palette,
  Mic
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { apiRequest } from "@/lib/queryClient";

export default function RealTimeHiring() {
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [messageText, setMessageText] = useState('');
  
  const [requestData, setRequestData] = useState({
    category: '',
    subcategory: '',
    city: '',
    date: '',
    time: '',
    duration: '2',
    description: '',
    maxPrice: 500,
    requirements: '',
    urgency: 'normal'
  });

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isMobile = useIsMobile();

  // Queries para obtener datos
  const { data: activeRequests, isLoading } = useQuery({
    queryKey: ["/api/hiring/active"],
  });

  const { data: myRequests } = useQuery({
    queryKey: ["/api/hiring/my-requests"],
  });

  const { data: responses } = useQuery({
    queryKey: ["/api/hiring/responses", selectedRequest?.id],
    enabled: !!selectedRequest,
  });

  // Mutation para crear solicitud
  const createRequestMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/hiring/create', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      toast({
        title: "¡Solicitud creada!",
        description: "Tu solicitud de contratación está activa. Los artistas comenzarán a responder pronto.",
      });
      setShowCreateRequest(false);
      setCurrentStep(1);
      queryClient.invalidateQueries({ queryKey: ["/api/hiring/my-requests"] });
    }
  });

  // Mutation para responder a oferta
  const respondToOfferMutation = useMutation({
    mutationFn: ({ requestId, action, price, message }: any) => 
      apiRequest(`/api/hiring/respond`, {
        method: 'POST',
        body: JSON.stringify({ requestId, action, price, message })
      }),
    onSuccess: () => {
      toast({
        title: "Respuesta enviada",
        description: "Tu respuesta ha sido enviada al cliente.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/hiring/responses"] });
    }
  });

  // Categorías y subcategorías mock realistas
  const categories = [
    {
      id: 'musica',
      name: 'Música',
      icon: Music,
      subcategories: ['Mariachi', 'Vallenato', 'Jazz', 'Rock', 'Pop', 'Clásica', 'Folk', 'Reggaeton']
    },
    {
      id: 'fotografia',
      name: 'Fotografía',
      icon: Camera,
      subcategories: ['Bodas', 'Eventos', 'Retratos', 'Producto', 'Social', 'Deportiva']
    },
    {
      id: 'arte',
      name: 'Arte Visual',
      icon: Palette,
      subcategories: ['Pintura en vivo', 'Caricaturista', 'Face painting', 'Muralista', 'Escultura']
    },
    {
      id: 'entretenimiento',
      name: 'Entretenimiento',
      icon: Users,
      subcategories: ['DJ', 'Animador', 'Mago', 'Payaso', 'Mimo', 'Bailarín']
    }
  ];

  const cities = [
    'Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 
    'Bucaramanga', 'Pereira', 'Santa Marta', 'Manizales', 'Pasto'
  ];

  // Requests activos mock con datos realistas
  const mockActiveRequests = [
    {
      id: '1',
      title: 'Mariachi urgente para serenata',
      category: 'Música',
      subcategory: 'Mariachi',
      city: 'Bogotá',
      date: '2024-05-24',
      time: '20:00',
      maxPrice: 400000,
      urgency: 'urgent',
      description: 'Necesito mariachi esta noche para serenata sorpresa. 4-5 canciones.',
      responseCount: 3,
      status: 'active',
      timeLeft: '2h 15m',
      client: { name: 'Carlos M.', rating: 4.8 }
    },
    {
      id: '2',
      title: 'Fotógrafo para evento corporativo',
      category: 'Fotografía',
      subcategory: 'Eventos',
      city: 'Medellín',
      date: '2024-05-25',
      time: '14:00',
      maxPrice: 300000,
      urgency: 'normal',
      description: 'Evento empresarial, 100 personas, 4 horas de cobertura.',
      responseCount: 7,
      status: 'active',
      timeLeft: '1d 6h',
      client: { name: 'Ana L.', rating: 4.9 }
    },
    {
      id: '3',
      title: 'DJ para cumpleaños mañana',
      category: 'Entretenimiento',
      subcategory: 'DJ',
      city: 'Cali',
      date: '2024-05-25',
      time: '19:00',
      maxPrice: 250000,
      urgency: 'urgent',
      description: 'Cumpleaños 18 años, música variada, equipo incluido.',
      responseCount: 5,
      status: 'active',
      timeLeft: '18h 30m',
      client: { name: 'María R.', rating: 4.7 }
    }
  ];

  const handleCreateRequest = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }

    const finalData = {
      ...requestData,
      clientId: user?.id,
      status: 'active'
    };

    createRequestMutation.mutate(finalData);
  };

  const handleRespondToOffer = (action: string, price?: number) => {
    if (!selectedRequest) return;

    respondToOfferMutation.mutate({
      requestId: selectedRequest.id,
      action,
      price,
      message: messageText
    });

    setMessageText('');
    setShowChat(false);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100">
        {/* Header móvil estilo InDriver */}
        <div className="bg-white shadow-sm p-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Contrata Ahora</h1>
            <Button
              onClick={() => setShowCreateRequest(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Nueva
            </Button>
          </div>
        </div>

        {/* Contenido principal móvil */}
        <div className="p-4 space-y-4">
          {/* Solicitudes activas */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Ofertas Activas</h2>
            {mockActiveRequests.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900">{request.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{request.city}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{request.date} {request.time}</span>
                      </div>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency === 'urgent' ? 'URGENTE' : 'Normal'}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{request.description}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-orange-600">
                        ${request.maxPrice.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MessageCircle className="w-3 h-3" />
                        <span>{request.responseCount} ofertas</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowChat(true);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      size="sm"
                    >
                      Ofertar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal de crear solicitud móvil */}
        <Dialog open={showCreateRequest} onOpenChange={setShowCreateRequest}>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-center">
                Solicitud Rápida - Paso {currentStep}/3
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div>
                    <Label>¿Qué tipo de artista necesitas?</Label>
                    <Select 
                      value={requestData.category} 
                      onValueChange={(value) => setRequestData({...requestData, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {requestData.category && (
                    <div>
                      <Label>Especialidad</Label>
                      <Select 
                        value={requestData.subcategory} 
                        onValueChange={(value) => setRequestData({...requestData, subcategory: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona especialidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.find(c => c.id === requestData.category)?.subcategories.map((sub) => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label>Ciudad</Label>
                    <Select 
                      value={requestData.city} 
                      onValueChange={(value) => setRequestData({...requestData, city: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona ciudad" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Fecha</Label>
                      <Input
                        type="date"
                        value={requestData.date}
                        onChange={(e) => setRequestData({...requestData, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>Hora</Label>
                      <Input
                        type="time"
                        value={requestData.time}
                        onChange={(e) => setRequestData({...requestData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Duración (horas)</Label>
                    <Select 
                      value={requestData.duration} 
                      onValueChange={(value) => setRequestData({...requestData, duration: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hora</SelectItem>
                        <SelectItem value="2">2 horas</SelectItem>
                        <SelectItem value="3">3 horas</SelectItem>
                        <SelectItem value="4">4 horas</SelectItem>
                        <SelectItem value="6">6 horas</SelectItem>
                        <SelectItem value="8">Todo el día</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Presupuesto máximo</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        type="number"
                        value={requestData.maxPrice}
                        onChange={(e) => setRequestData({...requestData, maxPrice: parseInt(e.target.value)})}
                        placeholder="Ej: 300000"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Los artistas pueden hacer contraofertas</p>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <Label>Describe tu evento</Label>
                    <Textarea
                      value={requestData.description}
                      onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                      placeholder="Ej: Cumpleaños 30 años, música variada, ambiente familiar..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Requerimientos especiales (opcional)</Label>
                    <Textarea
                      value={requestData.requirements}
                      onChange={(e) => setRequestData({...requestData, requirements: e.target.value})}
                      placeholder="Ej: Equipo de sonido incluido, repertorio específico..."
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label>Urgencia</Label>
                    <Select 
                      value={requestData.urgency} 
                      onValueChange={(value) => setRequestData({...requestData, urgency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgente (hoy/mañana)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-4">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Anterior
                  </Button>
                )}
                <Button
                  onClick={handleCreateRequest}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  disabled={createRequestMutation.isPending}
                >
                  {currentStep === 3 ? 'Publicar Solicitud' : 'Siguiente'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal de chat/oferta móvil */}
        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Hacer Oferta</DialogTitle>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold">{selectedRequest.title}</h3>
                  <p className="text-sm text-gray-600">{selectedRequest.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <DollarSign className="w-3 h-3" />
                    <span>Hasta ${selectedRequest.maxPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <Label>Tu oferta</Label>
                  <Input
                    type="number"
                    placeholder="Ingresa tu precio"
                    className="mb-2"
                  />
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Mensaje al cliente (opcional)..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRespondToOffer('accept')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Aceptar Precio
                  </Button>
                  <Button
                    onClick={() => handleRespondToOffer('counter')}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
                  >
                    Contraofertar
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Versión Desktop
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100">
      {/* Header Desktop */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contratación en Tiempo Real</h1>
              <p className="text-gray-600">Encuentra artistas disponibles ahora mismo</p>
            </div>
            <Button
              onClick={() => setShowCreateRequest(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Nueva Solicitud Urgente
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel principal - Solicitudes activas */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Ofertas Activas</h2>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  {mockActiveRequests.length} solicitudes
                </Badge>
              </div>

              <div className="space-y-4">
                {mockActiveRequests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{request.title}</h3>
                            <Badge className={getUrgencyColor(request.urgency)}>
                              {request.urgency === 'urgent' ? (
                                <>
                                  <AlertCircle className="w-3 h-3 mr-1" />
                                  URGENTE
                                </>
                              ) : 'Normal'}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{request.city}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{request.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{request.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Timer className="w-4 h-4" />
                              <span className="text-red-600 font-medium">{request.timeLeft}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">{request.description}</p>

                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <UserCheck className="w-4 h-4" />
                            <span>Cliente: {request.client.name}</span>
                            <div className="flex items-center gap-1 ml-2">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{request.client.rating}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600 mb-2">
                            ${request.maxPrice.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                            <MessageCircle className="w-4 h-4" />
                            <span>{request.responseCount} ofertas recibidas</span>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowChat(true);
                            }}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                          >
                            Hacer Oferta
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Panel lateral - Estadísticas y filtros */}
          <div className="space-y-6">
            {/* Estadísticas rápidas */}
            <Card className="border border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Actividad en Tiempo Real</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Solicitudes activas</span>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {mockActiveRequests.length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Promedio respuesta</span>
                  <span className="text-sm font-medium">15 min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasa de éxito</span>
                  <span className="text-sm font-medium text-green-600">92%</span>
                </div>
              </CardContent>
            </Card>

            {/* Mis solicitudes */}
            <Card className="border border-orange-100">
              <CardHeader>
                <CardTitle className="text-lg">Mis Solicitudes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Fotógrafo evento</div>
                      <div className="text-xs text-gray-600">3 ofertas recibidas</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Activa</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modal de crear solicitud Desktop */}
      <Dialog open={showCreateRequest} onOpenChange={setShowCreateRequest}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Nueva Solicitud de Contratación - Paso {currentStep}/3
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {currentStep === 1 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoría del artista</Label>
                  <Select 
                    value={requestData.category} 
                    onValueChange={(value) => setRequestData({...requestData, category: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <cat.icon className="w-4 h-4" />
                            {cat.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {requestData.category && (
                  <div>
                    <Label>Especialidad</Label>
                    <Select 
                      value={requestData.subcategory} 
                      onValueChange={(value) => setRequestData({...requestData, subcategory: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.find(c => c.id === requestData.category)?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label>Ciudad</Label>
                  <Select 
                    value={requestData.city} 
                    onValueChange={(value) => setRequestData({...requestData, city: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona ciudad" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Urgencia</Label>
                  <Select 
                    value={requestData.urgency} 
                    onValueChange={(value) => setRequestData({...requestData, urgency: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="urgent">Urgente (hoy/mañana)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha del evento</Label>
                  <Input
                    type="date"
                    value={requestData.date}
                    onChange={(e) => setRequestData({...requestData, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Hora de inicio</Label>
                  <Input
                    type="time"
                    value={requestData.time}
                    onChange={(e) => setRequestData({...requestData, time: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Duración estimada</Label>
                  <Select 
                    value={requestData.duration} 
                    onValueChange={(value) => setRequestData({...requestData, duration: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 hora</SelectItem>
                      <SelectItem value="2">2 horas</SelectItem>
                      <SelectItem value="3">3 horas</SelectItem>
                      <SelectItem value="4">4 horas</SelectItem>
                      <SelectItem value="6">6 horas</SelectItem>
                      <SelectItem value="8">Todo el día</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Presupuesto máximo</Label>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">$</span>
                    <Input
                      type="number"
                      value={requestData.maxPrice}
                      onChange={(e) => setRequestData({...requestData, maxPrice: parseInt(e.target.value)})}
                      placeholder="Ej: 300000"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Los artistas pueden hacer contraofertas</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Descripción del evento</Label>
                  <Textarea
                    value={requestData.description}
                    onChange={(e) => setRequestData({...requestData, description: e.target.value})}
                    placeholder="Describe tu evento, ambiente, número de personas, etc."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Requerimientos especiales (opcional)</Label>
                  <Textarea
                    value={requestData.requirements}
                    onChange={(e) => setRequestData({...requestData, requirements: e.target.value})}
                    placeholder="Equipo de sonido, repertorio específico, vestimenta, etc."
                    rows={3}
                  />
                </div>
              </div>
            )}

            <Separator />

            <div className="flex justify-between">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Anterior
                </Button>
              )}
              <Button
                onClick={handleCreateRequest}
                className="bg-orange-500 hover:bg-orange-600 text-white ml-auto"
                disabled={createRequestMutation.isPending}
              >
                {currentStep === 3 ? (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Publicar Solicitud
                  </>
                ) : (
                  'Siguiente'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de oferta Desktop */}
      <Dialog open={showChat} onOpenChange={setShowChat}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Hacer Oferta</DialogTitle>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900">{selectedRequest.title}</h3>
                <p className="text-sm text-gray-700 mt-1">{selectedRequest.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold">Hasta ${selectedRequest.maxPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Timer className="w-4 h-4 text-red-600" />
                    <span className="text-red-600">{selectedRequest.timeLeft}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Tu oferta de precio</Label>
                  <Input
                    type="number"
                    placeholder={`Máximo $${selectedRequest.maxPrice.toLocaleString()}`}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label>Mensaje al cliente</Label>
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Explica tu propuesta, experiencia o cualquier detalle relevante..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleRespondToOffer('accept')}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aceptar Precio
                </Button>
                <Button
                  onClick={() => handleRespondToOffer('counter')}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Contraofertar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}