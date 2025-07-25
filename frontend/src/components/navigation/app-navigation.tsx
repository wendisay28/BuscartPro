import { Home, Search, Bell, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export function AppNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center h-16">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Inicio</span>
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <Search className="w-6 h-6" />
          <span className="text-xs mt-1">Buscar</span>
        </NavLink>
        <NavLink 
          to="/notifications" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <Bell className="w-6 h-6" />
          <span className="text-xs mt-1">Notificaciones</span>
        </NavLink>
        <NavLink 
          to="/messages" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Mensajes</span>
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => 
            `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-green-500' : 'text-gray-500'}`
          }
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}
