import { Home, Bookmark, Users, BookOpen, Calendar, Settings, User, MapPin, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";

const Sidebar = () => {
  // Datos del perfil del usuario (puedes reemplazarlos con datos reales)
  const userProfile = {
    name: 'Ana García',
    profession: 'Artista Visual',
    city: 'Bogotá',
    avatar: '/images/avatar-placeholder.jpg',
  };

  const quickLinks = [
    { name: 'Mi red', icon: Users },
    { name: 'Grupos', icon: Users },
    { name: 'Páginas', icon: BookOpen },
    { name: 'Guardados', icon: Bookmark },
    { name: 'Blog', icon: BookOpen },
    { name: 'Configuración', icon: Settings },
  ];

  return (
    <div className="hidden lg:flex lg:flex-col w-72 space-y-6 pr-6 h-full">
      {/* Tarjeta de perfil */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold">
            {userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
          <h3 className="font-semibold text-lg text-white">
            {userProfile.name}
          </h3>
          <p className="text-pink-400 text-sm mb-4">
            {userProfile.profession}
          </p>
          <div className="flex items-center justify-center text-gray-400 text-sm mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{userProfile.city}</span>
          </div>
          <Button variant="outline" size="sm" className="w-full bg-gray-800 hover:bg-gray-700 border-gray-700 text-white flex items-center justify-center">
            <Edit3 className="h-4 w-4 mr-2" />
            <span>Ver Perfil</span>
          </Button>
        </CardContent>
      </Card>

      {/* Menú de navegación */}
      <div className="flex-1 flex flex-col">
        <Card className="bg-gray-900 border-gray-800 h-full flex flex-col">
          <CardContent className="p-4 flex-1 flex flex-col">
            <h4 className="text-gray-400 uppercase text-xs font-semibold tracking-wider mb-4 px-2">Accesos Rápidos</h4>
            <nav className="flex-1 flex flex-col justify-center">
              <div className="space-y-2">
                {quickLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:bg-gray-800/60 rounded-lg transition-all duration-200 group"
                    >
                      <div className="p-1.5 rounded-md group-hover:bg-pink-500/10 transition-colors">
                        <Icon className="h-4 w-4 text-gray-400 group-hover:text-pink-500 transition-colors" />
                      </div>
                      <span className="ml-3 group-hover:text-white transition-colors">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </nav>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;