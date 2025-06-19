import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EventForm } from "@/components/event/event-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useIsMobile } from "@/hooks/use-mobile";
import { CreateRecommendationForm } from "@/components/recommendation/CreateRecommendationForm";
import { RecommendationCard } from "@/components/recommendation/RecommendationCard";

// Definir los tipos de usuario permitidos
type ProfileUserType = 'general' | 'artist' | 'company';

import { 
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
  DollarSign,
  Building,
  CheckCircle,
  Play,
  Grid3X3,
  Video,
  Eye,
  Music,
  Plus,
  Calendar as CalendarIcon
} from "lucide-react";

export default function Profile() {
  const { user, updateUserType } = useAuth();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRecommendationDialog, setShowRecommendationDialog] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [showChangeTypeDialog, setShowChangeTypeDialog] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<ProfileUserType>('general');
  const currentUserType = (user?.userType || 'general') as ProfileUserType;

  // Datos de ejemplo para recomendaciones
  const [recommendations, setRecommendations] = useState([
    {
      id: '1',
      title: 'Necesito músico para boda',
      description: 'Buscamos un músico acústico para nuestra boda el próximo mes. Debe tener repertorio romántico y poder tocar durante la ceremonia y el cóctel.',
      location: 'Medellín, El Poblado',
      date: new Date('2025-07-15'),
      category: 'Música',
      tags: ['Bodas', 'Música en vivo'],
      user: {
        id: 'user1',
        name: 'Ana Pérez',
        avatar: undefined
      },
      likes: 8,
      comments: 3
    },
    {
      id: '2',
      title: 'Buscamos artista para mural en restaurante',
      description: 'Estamos buscando un artista para pintar un mural en la pared principal de nuestro restaurante. El estilo que buscamos es urbano/grafiti con toques de color.',
      location: 'Bogotá, Chapinero',
      date: new Date('2025-06-30'),
      category: 'Artes visuales',
      tags: ['Mural', 'Arte público'],
      user: {
        id: 'user2',
        name: 'Carlos Gómez',
        avatar: undefined
      },
      likes: 12,
      comments: 5
    }
  ]);

  const handleCreateRecommendation = (data: any) => {
    const newRecommendation = {
      id: `rec-${Date.now()}`,
      ...data,
      user: {
        id: user?.id || 'current-user',
        name: user?.displayName || 'Usuario Anónimo',
        avatar: user?.photoURL || '/default-avatar.png',
      },
      likes: 0,
      comments: [],
      createdAt: new Date().toISOString(),
    };
    
    setRecommendations([newRecommendation, ...recommendations]);
    setShowRecommendationDialog(false);
  };

  const handleUserTypeChange = async (newType: ProfileUserType) => {
    try {
      await updateUserType(newType);
      // Actualizar la pestaña activa según el nuevo tipo de usuario
      if (newType === 'artist') {
        setActiveTab('portfolio');
      } else if (newType === 'company') {
        setActiveTab('events');
      } else {
        setActiveTab('overview');
      }
      setShowChangeTypeDialog(false);
      
      // Aquí podrías agregar una notificación de éxito
      console.log('Tipo de usuario actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el tipo de usuario:', error);
      // Aquí podrías agregar una notificación de error
    }
  };

  const handleDeleteRecommendation = (id: string) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  const handleLikeRecommendation = (id: string) => {
    setRecommendations(recommendations.map(rec => 
      rec.id === id ? { ...rec, likes: rec.likes + 1 } : rec
    ));
  };

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
          <TabsList className="flex overflow-x-auto pb-2 mb-6">
            <TabsTrigger value="overview" className="whitespace-nowrap">Resumen</TabsTrigger>
            <TabsTrigger value="blog" className="whitespace-nowrap">Mi Blog</TabsTrigger>
            <TabsTrigger value="events" className="whitespace-nowrap">Mis Eventos</TabsTrigger>
            {currentUserType === 'artist' && (
              <TabsTrigger value="portfolio" className="whitespace-nowrap">Portfolio</TabsTrigger>
            )}
            <TabsTrigger value="recommendations" className="whitespace-nowrap">Recomendaciones</TabsTrigger>
            <TabsTrigger value="activity" className="whitespace-nowrap">Actividad</TabsTrigger>
            <TabsTrigger value="settings" className="whitespace-nowrap">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {currentUserType === 'general' && renderGeneralProfile()}
            {currentUserType === 'artist' && renderArtistProfile()}
            {currentUserType === 'company' && renderCompanyProfile()}
          </TabsContent>

          {/* Pestaña de Blog */}
          <TabsContent value="blog">
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
          </TabsContent>

          {/* Pestaña de Eventos */}
          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mis Eventos</CardTitle>
                <Button 
                  size="sm" 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => setShowEventDialog(true)}
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Crear Evento
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2].map((event) => (
                    <Card key={event} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/3 bg-gray-100 h-40 flex items-center justify-center">
                          <Calendar className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className="p-4 md:w-2/3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">Nombre del Evento {event}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {new Date().toLocaleDateString()} - {new Date(Date.now() + 86400000).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-800">
                              Activo
                            </Badge>
                          </div>
                          <p className="mt-2 text-gray-700 line-clamp-2">
                            Descripción del evento. Aquí iría un resumen de la información del evento...
                          </p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="w-4 h-4 mr-1" /> 24 asistentes
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Editar
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600">
                                Cancelar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pestaña de Recomendaciones */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mis Recomendaciones</CardTitle>
                <Button 
                  size="sm" 
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={() => setShowRecommendationDialog(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Recomendación
                </Button>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Aún no has publicado ninguna recomendación</p>
                    <Button 
                      onClick={() => setShowRecommendationDialog(true)}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Crear mi primera recomendación
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations
                      .filter(rec => rec.user.id === user?.id)
                      .map((recommendation) => (
                        <RecommendationCard
                          key={recommendation.id}
                          {...recommendation}
                          isOwner={recommendation.user.id === user?.id}
                          onDelete={handleDeleteRecommendation}
                          onLike={handleLikeRecommendation}
                        />
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones de la comunidad</CardTitle>
              </CardHeader>
              <CardContent>
                {recommendations.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No hay recomendaciones disponibles en este momento
                  </p>
                ) : (
                  <div className="space-y-4">
                    {recommendations
                      .filter(rec => rec.user.id !== user?.id)
                      .map((recommendation) => (
                        <RecommendationCard
                          key={recommendation.id}
                          {...recommendation}
                          isOwner={recommendation.user.id === user?.id}
                          onDelete={handleDeleteRecommendation}
                          onLike={handleLikeRecommendation}
                        />
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-medium">Tipo de Cuenta</h3>
                      <p className="text-sm text-gray-500">
                        Actualmente eres:{' '}
                        <span className="font-medium capitalize">
                          {currentUserType === 'general' 
                            ? 'Usuario General' 
                            : currentUserType === 'artist' 
                              ? 'Artista' 
                              : 'Empresa'
                          }
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedUserType(currentUserType);
                        setShowChangeTypeDialog(true);
                      }}
                    >
                      Cambiar Tipo
                    </Button>
                  </div>
                </div>
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

      {/* Diálogo para crear recomendación */}
      <Dialog open={showRecommendationDialog} onOpenChange={setShowRecommendationDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear nueva recomendación</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CreateRecommendationForm onSubmit={handleCreateRecommendation} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para cambiar tipo de usuario */}
      <Dialog open={showChangeTypeDialog} onOpenChange={setShowChangeTypeDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cambiar tipo de cuenta</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <p className="text-sm text-gray-600">
              Selecciona el tipo de cuenta que mejor se ajuste a tus necesidades. 
              Cada tipo tiene características específicas.
            </p>
            
            <div className="space-y-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedUserType === 'general' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedUserType('general')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Usuario General</h4>
                    <p className="text-sm text-gray-600">
                      Para explorar, guardar favoritos y contratar artistas.
                    </p>
                  </div>
                  {selectedUserType === 'general' && (
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  )}
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedUserType === 'artist' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedUserType('artist')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Artista</h4>
                    <p className="text-sm text-gray-600">
                      Para mostrar tu trabajo, recibir contrataciones y gestionar eventos.
                    </p>
                  </div>
                  {selectedUserType === 'artist' && (
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  )}
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedUserType === 'company' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-200 hover:border-orange-300'
                }`}
                onClick={() => setSelectedUserType('company')}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Empresa / Espacio Cultural</h4>
                    <p className="text-sm text-gray-600">
                      Para publicar eventos, gestionar espacios y contratar artistas.
                    </p>
                  </div>
                  {selectedUserType === 'company' && (
                    <CheckCircle className="h-5 w-5 text-orange-500" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowChangeTypeDialog(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => handleUserTypeChange(selectedUserType)}
                disabled={selectedUserType === currentUserType}
              >
                {selectedUserType === currentUserType ? 'Tipo actual' : 'Cambiar a ' + 
                  (selectedUserType === 'artist' ? 'Artista' : 
                   selectedUserType === 'company' ? 'Empresa' : 'Usuario General')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Diálogo para crear evento */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Evento</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <EventForm 
              onSuccess={() => {
                setShowEventDialog(false);
                // Aquí podrías agregar una recarga de los eventos si es necesario
              }} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};