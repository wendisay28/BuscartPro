import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Home, 
  Heart, 
  Zap, 
  Search, 
  User, 
  Settings,
  Bell,
  MessageCircle,
  Calendar,
  Palette
} from "lucide-react";

export default function GlobalNavigation() {
  const [location] = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();

  const navigationItems = [
    { href: "/", label: "Home", icon: Home, mobile: true },
    { href: "/favorites", label: "Favoritos", icon: Heart, mobile: true },
    { href: "/hiring/realtime", label: "Contratar", icon: Zap, mobile: true },
    { href: "/explorer", label: "Explorar", icon: Search, mobile: true },
    { href: "/user/profile", label: "Perfil", icon: User, mobile: true },
    { href: "/events", label: "Eventos", icon: Calendar, mobile: false },
    { href: "/community/blog", label: "Blog", icon: Palette, mobile: false },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return location === "/";
    }
    return location.startsWith(href);
  };

  // Versión móvil - barra inferior
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-around px-2 py-3">
          {navigationItems.filter(item => item.mobile).map((item) => (
            <Link key={item.href} href={item.href}>
              <div className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? "text-orange-600 bg-orange-50"
                  : "text-gray-600 hover:text-orange-600 hover:bg-orange-50"
              }`}>
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Versión desktop - barra superior
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación principal */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Palette className="text-white h-4 w-4" />
              </div>
              <span className="font-heading font-bold text-lg text-gray-900">
                Busc<span className="text-orange-500">Art</span>
              </span>
            </Link>

            <div className="flex items-center space-x-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 transition-colors ${
                    isActive(item.href)
                      ? "text-orange-500 font-medium"
                      : "text-gray-700 hover:text-orange-500"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Área de usuario */}
          <div className="flex items-center space-x-4">
            {/* Notificaciones */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>

            {/* Mensajes */}
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-orange-500 text-white text-xs flex items-center justify-center">
                2
              </Badge>
            </Button>

            {/* Perfil */}
            <Link href="/user/profile">
              <div className="flex items-center space-x-3 hover:bg-orange-50 rounded-lg p-2 transition-colors">
                {user?.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={user.firstName || "Usuario"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-orange-600" />
                  </div>
                )}
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || "Usuario"}
                  </p>
                  <p className="text-xs text-gray-600 capitalize">
                    {user?.userType || "General"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}