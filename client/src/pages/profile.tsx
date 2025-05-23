import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NavigationHeader from "@/components/navigation-header";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  Camera, 
  Star, 
  Heart, 
  MessageCircle, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Edit3,
  Save,
  X,
  Plus,
  Music,
  Users,
  Award,
  BarChart3
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
  });

  const { data: userArtist } = useQuery({
    queryKey: ["/api/artists", { userId: user?.id }],
    enabled: !!user?.id,
  });

  const { data: userStats } = useQuery({
    queryKey: ["/api/users/stats", user?.id],
    enabled: !!user?.id,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest('PUT', '/api/auth/user', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setIsEditing(false);
      toast({
        title: "Perfil actualizado",
        description: "Tus cambios han sido guardados exitosamente.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar el perfil. Inténtalo de nuevo.",
        variant: "destructive",
      });
    },
  });

  const handleSaveProfile = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    updateProfileMutation.mutate(data);
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  const mockStats = {
    totalViews: 1247,
    totalLikes: 340,
    totalBookings: 28,
    averageRating: 4.8,
    totalReviews: 45,
    responseRate: 95,
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-warm-gray flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="font-heading font-semibold text-xl text-dark mb-2">
            Acceso requerido
          </h2>
          <p className="text-gray-600 mb-6">
            Necesitas iniciar sesión para ver tu perfil
          </p>
          <Button asChild>
            <a href="/api/login">Iniciar Sesión</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gray">
      <NavigationHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="text-2xl">
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div>
                    <h1 className="font-heading font-bold text-3xl text-dark">
                      {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant={user.userType === 'artist' ? 'default' : 'secondary'}>
                      {user.userType === 'artist' ? 'Artista' : 
                       user.userType === 'company' ? 'Empresa' : 'General'}
                    </Badge>
                    {user.isVerified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Award className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {user.city && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.city}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Miembro desde {new Date(user.createdAt).getFullYear()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </>
                  ) : (
                    <>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Editar Perfil
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configuración
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        {user.userType === 'artist' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-primary">{mockStats.totalViews}</p>
                <p className="text-xs text-gray-600">Visualizaciones</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-500">{mockStats.totalLikes}</p>
                <p className="text-xs text-gray-600">Me gusta</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-2xl font-bold text-secondary">{mockStats.totalBookings}</p>
                <p className="text-xs text-gray-600">Contrataciones</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-500">{mockStats.averageRating}</p>
                <p className="text-xs text-gray-600">Calificación</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <MessageCircle className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-500">{mockStats.totalReviews}</p>
                <p className="text-xs text-gray-600">Reseñas</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Mail className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-500">{mockStats.responseRate}%</p>
                <p className="text-xs text-gray-600">Respuesta</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vista General</TabsTrigger>
            <TabsTrigger value="artist">Perfil Artístico</TabsTrigger>
            <TabsTrigger value="activity">Actividad</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información Personal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        handleSaveProfile(formData);
                      }} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">Nombre</Label>
                            <Input id="firstName" name="firstName" defaultValue={user.firstName || ''} />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" name="lastName" defaultValue={user.lastName || ''} />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" type="email" defaultValue={user.email || ''} />
                        </div>
                        <div>
                          <Label htmlFor="city">Ciudad</Label>
                          <Input id="city" name="city" defaultValue={user.city || ''} />
                        </div>
                        <div>
                          <Label htmlFor="bio">Biografía</Label>
                          <Textarea id="bio" name="bio" defaultValue={user.bio || ''} rows={3} />
                        </div>
                        <Button type="submit" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Guardar Cambios
                        </Button>
                      </form>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm text-gray-600">Nombre</Label>
                            <p className="font-medium">{user.firstName || 'No especificado'}</p>
                          </div>
                          <div>
                            <Label className="text-sm text-gray-600">Apellido</Label>
                            <p className="font-medium">{user.lastName || 'No especificado'}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Email</Label>
                          <p className="font-medium">{user.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Ciudad</Label>
                          <p className="font-medium">{user.city || 'No especificada'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Biografía</Label>
                          <p className="font-medium">{user.bio || 'Sin biografía'}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Heart className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-dark">Nuevo favorito añadido</p>
                          <p className="text-xs text-gray-500">hace 2 horas</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-dark">Nueva reseña recibida</p>
                          <p className="text-xs text-gray-500">hace 1 día</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-dark">Perfil actualizado</p>
                          <p className="text-xs text-gray-500">hace 3 días</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Estadísticas del Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Visualizaciones</span>
                        <span className="font-medium">234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Nuevos seguidores</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Contrataciones</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Calificación promedio</span>
                        <span className="font-medium">4.8 ⭐</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="artist">
            {user.userType === 'artist' ? (
              <Card>
                <CardHeader>
                  <CardTitle>Perfil Artístico</CardTitle>
                </CardHeader>
                <CardContent>
                  {userArtist ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-sm text-gray-600">Nombre Artístico</Label>
                          <p className="font-medium text-lg">{userArtist.artistName}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Categoría</Label>
                          <p className="font-medium">{userArtist.category?.name || 'Sin categoría'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Tipo de Artista</Label>
                          <p className="font-medium">{userArtist.artistType || 'No especificado'}</p>
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Precio por Hora</Label>
                          <p className="font-medium text-primary">${userArtist.pricePerHour || 'No especificado'}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label className="text-sm text-gray-600">Descripción</Label>
                        <p className="font-medium mt-1">{userArtist.description || 'Sin descripción'}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-gray-600">Servicios Ofrecidos</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userArtist.serviceTypes?.map((service: string, index: number) => (
                            <Badge key={index} variant="secondary">{service}</Badge>
                          )) || <span className="text-gray-500">Sin servicios especificados</span>}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-gray-600">Etiquetas</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userArtist.tags?.map((tag: string, index: number) => (
                            <Badge key={index} variant="outline">{tag}</Badge>
                          )) || <span className="text-gray-500">Sin etiquetas</span>}
                        </div>
                      </div>
                      
                      <Button className="w-full md:w-auto">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Editar Perfil Artístico
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Music className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                        Crea tu Perfil Artístico
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Completa tu perfil artístico para empezar a recibir contrataciones
                      </p>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Perfil Artístico
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                    Perfil Artístico no disponible
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Esta sección está disponible solo para usuarios con perfil de artista
                  </p>
                  <Button variant="outline">
                    Cambiar a Perfil de Artista
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Actividad</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Activity timeline would go here */}
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="font-heading font-semibold text-xl text-dark mb-2">
                      Actividad Reciente
                    </h3>
                    <p className="text-gray-600">
                      Tu historial de actividad aparecerá aquí
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de Cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notificaciones por Email</Label>
                      <p className="text-sm text-gray-600">Recibir actualizaciones por correo</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Perfil Público</Label>
                      <p className="text-sm text-gray-600">Hacer visible tu perfil a otros usuarios</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Disponibilidad Automática</Label>
                      <p className="text-sm text-gray-600">Mostrar automáticamente tu disponibilidad</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label>Tipo de Usuario</Label>
                    <Select defaultValue={user.userType || 'general'}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Usuario General</SelectItem>
                        <SelectItem value="artist">Artista</SelectItem>
                        <SelectItem value="company">Empresa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Cambiar Contraseña
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Verificar Perfil
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    Descargar Datos
                  </Button>
                  
                  <Separator />
                  
                  <Button variant="destructive" className="w-full">
                    Eliminar Cuenta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
