import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Palette, 
  Search, 
  Heart, 
  Bell, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  MessageCircle,
  Home,
  Compass,
  Zap,
  Sun,
  Moon,
  Menu,
  Bookmark,
  Users,
  Newspaper,
  Store,
  Calendar,
  Ticket
} from "lucide-react";
import { Link, useLocation } from "wouter";

// Definición de tipos mejorada
type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

// Tipo User corregido con todas las propiedades necesarias
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string;
  userType?: 'artist' | 'user';
};

interface NavigationHeaderProps {
  hideSearch?: boolean;
}

export default function NavigationHeader({ hideSearch = false }: NavigationHeaderProps) {
  const { user, isAuthenticated, logout } = useAuth() as any; // Usamos 'as any' temporalmente si el tipo de useAuth no incluye logout
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: notifications } = useQuery<Notification[]>({
    queryKey: ["/api/notifications"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/notifications`, {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error al cargar notificaciones');
      }
      return response.json();
    },
    enabled: isAuthenticated,
    retry: 1,
  });

  const notificationCount = notifications?.filter((n) => !n.isRead)?.length || 0;

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  const navigationItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/explorer", label: "Explorar", icon: Compass },
    { href: "/hiring", label: "Contratar", icon: Zap },
    { href: "/favorites", label: "Favoritos", icon: Heart },
  ];

  const quickAccessItems = [
    { href: "/saved", label: "Elementos Guardados", icon: Bookmark },
    { href: "/groups", label: "Grupos", icon: Users },
    { href: "/blog", label: "Blog", icon: Newspaper },
    { href: "/store", label: "Tienda", icon: Store },
    { href: "/events", label: "Eventos", icon: Calendar },
    { href: "/subscriptions", label: "Suscripciones", icon: Ticket },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white dark:bg-black/80 dark:backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo and Search */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Palette className="text-white h-4 w-4" />
                </div>
                <span className="font-heading font-bold text-lg text-gray-800 dark:text-white">
                  Busc<span className="text-orange-500">Art</span>
                </span>
              </Link>
              {!hideSearch && (
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Buscar..."
                    className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white pl-10 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Right Side: Navigation and User Actions */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-white bg-orange-500"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">


                {isAuthenticated ? (
                  <>
                    {/* Notifications */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative">
                          <Bell className="h-5 w-5" />
                          {notificationCount > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-4 w-4 justify-center p-1 text-xs" variant="destructive">
                              {notificationCount}
                            </Badge>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-80">
                        <div className="p-2 font-bold">Notificaciones</div>
                        <DropdownMenuSeparator />
                        {notifications && notifications.length > 0 ? (
                          notifications.slice(0, 5).map((n) => (
                            <DropdownMenuItem key={n.id} className={`flex items-start p-2 ${!n.isRead ? 'bg-blue-500/10' : ''}`}>
                              <div className={`h-2 w-2 rounded-full mr-3 mt-1.5 ${!n.isRead ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                              <div>
                                <p className="text-sm">{n.message}</p>
                                <p className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</p>
                              </div>
                            </DropdownMenuItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-sm text-gray-500">No tienes notificaciones</div>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Messages */}
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/messages">
                        <MessageCircle className="h-5 w-5" />
                      </Link>
                    </Button>

                    {/* User Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.profileImageUrl} alt="Usuario" />
                            <AvatarFallback>{getInitials(user?.firstName || '', user?.lastName || '')}</AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href="/user/profile">
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Mi Perfil</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/user/settings">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Configuración</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Cerrar Sesión</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/login">Iniciar Sesión</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Registrarse</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Top Bar */}
      <nav className="bg-background border-b shadow-sm sticky top-0 z-50 md:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Palette className="text-white h-4 w-4" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                Busc<span className="text-orange-500">Art</span>
              </span>
            </Link>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              {isAuthenticated && (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/messages">
                      <MessageCircle className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href="/notifications" className="relative">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">{notificationCount}</Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(true)}>
                    <Menu className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && isAuthenticated && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Menu Content */}
          <div className="fixed top-0 left-0 h-full w-72 bg-background p-4 animate-fadeIn">
            <div className="flex flex-col h-full">
              {/* User Info */}
              <div className="flex items-center space-x-3 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user?.profileImageUrl} alt="Usuario" />
                  <AvatarFallback>{getInitials(user?.firstName || '', user?.lastName || '')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-base">{user?.firstName} {user?.lastName}</p>
                  <Link href="/user/profile" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-orange-500">Ver Perfil</Link>
                </div>
              </div>

              {/* Quick Access Links */}
              <nav className="flex-grow">
                <p className="text-sm font-semibold text-muted-foreground px-3 mb-2">Accesos Rápidos</p>
                <ul className="space-y-2">
                  {quickAccessItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center p-3 rounded-lg text-base transition-colors text-foreground hover:bg-muted`}
                      >
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Tema</span>
                  <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
                <Button variant="ghost" className="w-full justify-start p-3" onClick={() => { /* Lógica de ajustes */ }}>
                  <Settings className="mr-3 h-5 w-5" />
                  <span>Ajustes</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start p-3" onClick={logout}>
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Cerrar Sesión</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && user && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden">
          <div className="grid grid-cols-5 h-16">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center pt-2 text-xs font-medium transition-colors ${
                    isActive(item.href)
                    ? "text-orange-500"
                    : "text-muted-foreground hover:text-orange-500"
                  }`}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            ))}
            <Link
              href="/user/profile"
              className={`flex flex-col items-center justify-center pt-2 text-xs font-medium transition-colors ${
                  isActive("/user/profile")
                  ? "text-orange-500"
                  : "text-muted-foreground hover:text-orange-500"
                }`}
            >
              <Avatar className="h-6 w-6 mb-1">
                <AvatarImage src={user?.profileImageUrl} alt="Usuario" />
                <AvatarFallback>{getInitials(user?.firstName || '', user?.lastName || '')}</AvatarFallback>
              </Avatar>
              <span className="text-[10px]">Perfil</span>
            </Link>
          </div>
        </div>
      )}


    </>
  );
}