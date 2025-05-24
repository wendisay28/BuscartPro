import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  User, 
  Heart, 
  Star, 
  MapPin, 
  Calendar,
  Camera,
  Edit,
  Settings,
  MessageCircle,
  Users,
  TrendingUp,
  Award,
  Clock,
  DollarSign,
  Play,
  Image as ImageIcon,
  Building,
  Music,
  Palette,
  Video,
  Grid3X3,
  Eye,
  ThumbsUp,
  CheckCircle
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Datos del perfil según tipo de usuario
  const profileData = {
    general: {
      stats: [
        { label: "Favoritos", value: 24, icon: Heart },
        { label: "Eventos creados", value: 3, icon: Calendar },
        { label: "Recomendaciones", value: 12, icon: MessageCircle },
        { label: "Contrataciones", value: 8, icon: CheckCircle }
      ],
      interests: ["Música", "Arte Visual", "Teatro", "Fotografía"],
      recentActivity: [
        { type: "favorite", text: "Agregó a María Elena Vásquez a favoritos", time: "2h" },
        { type: "recommendation", text: "Publicó: ¿Conocen saxofonista en Madrid?", time: "1d" },
        { type: "contract", text: "Contrató a Carlos Mendoza para evento", time: "3d" }
      ]
    },
    artist: {
      stats: [
        { label: "Fans", value: 156, icon: Users },
        { label: "Contrataciones", value: 23, icon: Award },
        { label: "Rating", value: 4.8, icon: Star },
        { label: "Este mes", value: "$2.400", icon: DollarSign }
      ],
      skills: ["Flamenco Tradicional", "Danza Contemporánea", "Coreografía"],
      portfolio: [
        { type: "video", url: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=400&h=400&fit=crop", title: "Presentación Flamenco" },
        { type: "image", url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop", title: "Show Barcelona" },
        { type: "image", url: "https://images.unsplash.com/photo-1594736797933-d0a93ed9614f?w=400&h=400&fit=crop", title: "Evento Corporativo" },
        { type: "image", url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=400&fit=crop", title: "Taller Danza" }
      ],
      availability: true,
      pricing: { from: 300, to: 500, currency: "€" }
    },
    company: {
      stats: [
        { label: "Eventos organizados", value: 45, icon: Calendar },
        { label: "Artistas contratados", value: 89, icon: Users },
        { label: "Rating", value: 4.9, icon: Star },
        { label: "Capacidad", value: "200", icon: Building }
      ],
      services: ["Sala de conciertos", "Espacio para eventos", "Alquiler equipos", "Catering"],
      upcomingEvents: [
        { title: "Concierto Jazz Quartet", date: "2024-05-30", attendees: 150 },
        { title: "Exposición Arte Local", date: "2024-06-05", attendees: 80 },
        { title: "Festival Folk", date: "2024-06-15", attendees: 200 }
      ]
    }
  };

  const currentUserType = user?.userType || "general";
  const currentData = profileData[currentUserType as keyof typeof profileData];

  const renderGeneralProfile = () => (
    <div className="space-y-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentData.stats.map((stat, index) => (
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
            {(currentData as any).interests.map((interest: string, index: number) => (
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
            {(currentData as any).recentActivity.map((activity: any, index: number) => (
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

  const renderArtistProfile = () => (
    <div className="space-y-6">
      {/* Video/Imagen de presentación */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-orange-400 to-orange-600 rounded-t-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-2 opacity-80" />
                <p className="text-lg font-semibold">Video de Presentación</p>
                <p className="text-sm opacity-90">Mostrar mis habilidades</p>
              </div>
            </div>
            <Button
              size="icon"
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas de artista */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentData.stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado de disponibilidad */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${(currentData as any).availability ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="font-semibold text-gray-900">
                  {(currentData as any).availability ? 'Disponible para contrataciones' : 'No disponible'}
                </p>
                <p className="text-sm text-gray-600">
                  Desde {(currentData as any).pricing.from}{(currentData as any).pricing.currency}/hora
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Especialidades */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-orange-500" />
            Mis Especialidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(currentData as any).skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="bg-orange-100 text-orange-700">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio estilo Instagram */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-orange-500" />
            Mi Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(currentData as any).portfolio.map((item: any, index: number) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Video className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
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

  const renderCompanyProfile = () => (
    <div className="space-y-6">
      {/* Estadísticas de empresa */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {currentData.stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Servicios ofrecidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5 text-orange-500" />
            Nuestros Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {(currentData as any).services.map((service: string, index: number) => (
              <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                <p className="text-sm font-medium text-gray-900">{service}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Próximos eventos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-500" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(currentData as any).upcomingEvents.map((event: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 ${isMobile ? 'pb-20' : ''}`}>
      {/* Header del perfil */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20 md:w-24 md:h-24">
              <AvatarImage src={user?.profileImageUrl || ""} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                {user?.firstName?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                  {currentUserType === 'artist' ? 'Carlos Mendoza' : 
                   currentUserType === 'company' ? 'Centro Cultural Arte' :
                   user?.firstName + ' ' + (user?.lastName || '')}
                </h1>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 capitalize">
                  {currentUserType === 'general' ? 'Usuario' : 
                   currentUserType === 'artist' ? 'Artista' : 'Empresa'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user?.city || 'Madrid, España'}</span>
                </div>
                {currentUserType === 'artist' && (
                  <div className="flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    <span>Danza Flamenco</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 text-sm md:text-base">
                {currentUserType === 'artist' ? 
                  'Especialista en flamenco tradicional y contemporáneo. 10 años de experiencia en eventos especiales.' :
                 currentUserType === 'company' ?
                  'Espacio cultural dedicado a promover el arte local. Salas de eventos y exposiciones.' :
                  'Amante de la cultura y las artes. Siempre buscando nuevas experiencias artísticas.'}
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button onClick={() => setShowEditDialog(true)} className="bg-orange-500 hover:bg-orange-600">
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </Button>
              {currentUserType === 'artist' && (
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Ofertas
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-4 w-full mb-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
            <TabsTrigger value="settings">Config</TabsTrigger>
            {currentUserType === 'artist' && (
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview">
            {currentUserType === 'general' && renderGeneralProfile()}
            {currentUserType === 'artist' && renderArtistProfile()}
            {currentUserType === 'company' && renderCompanyProfile()}
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Historial de actividades y interacciones...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Opciones de configuración y privacidad...</p>
              </CardContent>
            </Card>
          </TabsContent>

          {currentUserType === 'artist' && (
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Gestionar Portfolio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Editar y organizar tu portfolio profesional...</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Modal de edición */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <Input placeholder="Tu nombre" />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea placeholder="Cuéntanos sobre ti..." rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Ciudad</label>
              <Input placeholder="Tu ciudad" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={() => setShowEditDialog(false)} variant="outline" className="flex-1">
                Cancelar
              </Button>
              <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                Guardar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}