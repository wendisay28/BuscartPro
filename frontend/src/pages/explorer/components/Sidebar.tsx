import { Home, Bookmark, Users, BookOpen, Calendar, Settings, User } from 'lucide-react';

const Sidebar = () => {
  // Datos del perfil del usuario (puedes reemplazarlos con datos reales)
  const userProfile = {
    name: 'Ana García',
    profession: 'Artista Visual',
    city: 'Bogotá',
    avatar: '/images/avatar-placeholder.jpg',
  };

  const quickLinks = [
    { name: 'Elementos Guardados', icon: Bookmark },
    { name: 'Grupos', icon: Users },
    { name: 'Blog', icon: BookOpen },
    { name: 'Tienda', icon: Home },
    { name: 'Eventos', icon: Calendar },
    { name: 'Ajustes', icon: Settings },
  ];

  return (
    <div className="hidden md:flex flex-col w-72 fixed left-8 top-32 bottom-8 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 overflow-y-auto z-50 shadow-xl">
      {/* Sección de perfil */}
      <div className="flex flex-col items-center py-4 border-b border-gray-800">
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
          <img 
            src={userProfile.avatar} 
            alt={userProfile.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI2ZmZiI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJzNC40NzcgMTAgMTAgMTAgMTAtNC40NzcgMTAtMTBTMTcuNTIzIDIgMTIgMnptMCAyYzQuNDE8L3N2Zz4=';
            }}
          />
        </div>
        <h3 className="text-white font-semibold text-center">{userProfile.name}</h3>
        <p className="text-gray-400 text-sm text-center">{userProfile.profession}</p>
        <p className="text-gray-500 text-xs flex items-center mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {userProfile.city}
        </p>
        <button className="mt-3 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-xs font-medium transition-colors">
          Ver Perfil
        </button>
      </div>

      {/* Sección de accesos rápidos */}
      <div className="py-3">
        <h4 className="text-gray-400 uppercase text-xs font-semibold mb-2 px-2">Accesos Rápidos</h4>
        <nav className="space-y-1">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href="#"
                className="flex items-center px-2 py-1.5 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition-colors group"
              >
                <Icon className="h-4 w-4 text-gray-400 group-hover:text-pink-500 mr-2" />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;