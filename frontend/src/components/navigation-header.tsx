import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Palette, 
  Search, 
  Heart, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  MessageCircle,
  Calendar,
  MapPin,
  BookOpen,
  ChevronDown,
  Home,
  Compass,
  Zap,
  Users
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function NavigationHeader() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: isAuthenticated,
  });

  const { data: favorites } = useQuery({
    queryKey: ["/api/favorites"],
    enabled: isAuthenticated,
  });

  const notificationCount = notifications?.filter((n: any) => !n.isRead)?.length || 0;
  const favoritesCount = favorites?.length || 0;

  const getInitials = (firstName?: string, lastName?: string) => {
    return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U';
  };

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/explorer", label: "Explorador", icon: Compass },
    { href: "/hiring/realtime", label: "Tiempo Real", icon: Zap },
    { href: "/user/favorites", label: "Favoritos", icon: Heart },
  ];

  const isActive = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Palette className="text-white h-4 w-4" />
            </div>
            <span className="font-heading font-bold text-lg text-gray-900">
              Busc<span className="text-orange-500">Art</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/10"
                    : "text-gray-700 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar artistas, eventos, lugares..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                {/* Favorites */}
                <Button variant="ghost" size="sm" asChild className="relative">
                  <Link href="/user/favorites">
                    <Heart className="h-4 w-4" />
                    {favoritesCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                        {favoritesCount}
                      </Badge>
                    )}
                  </Link>
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="p-2">
                      <h4 className="font-semibold text-sm mb-2">Notificaciones</h4>
                      {notifications && notifications.length > 0 ? (
                        notifications.slice(0, 5).map((notification: any) => (
                          <div key={notification.id} className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-gray-500">{notification.createdAt}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">
                          No hay notificaciones nuevas
                        </p>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Messages */}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/messages">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 px-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.profileImageUrl} alt={`${user?.firstName} ${user?.lastName}`} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user?.firstName, user?.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:block font-medium text-dark max-w-24 truncate">
                        {user?.firstName || 'Usuario'}
                      </span>
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/user/profile">
                        <User className="h-4 w-4 mr-2" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user/favorites">
                        <Heart className="h-4 w-4 mr-2" />
                        Favoritos
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/messages">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Mensajes
                      </Link>
                    </DropdownMenuItem>
                    {user?.userType === 'artist' && (
                      <DropdownMenuItem asChild>
                        <Link href="/artist-dashboard">
                          <Calendar className="h-4 w-4 mr-2" />
                          Dashboard Artista
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Configuración
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/api/logout">
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <a href="/api/login">Iniciar Sesión</a>
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-2 mb-8">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Palette className="text-white h-4 w-4" />
                    </div>
                    <span className="font-heading font-bold text-xl text-dark">
                      Bus<span className="text-primary">Cart</span>
                    </span>
                  </div>

                  {/* Mobile Search */}
                  <div className="relative mb-6">
                    <Input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="space-y-2 mb-8">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                          isActive(item.href)
                            ? "text-primary bg-primary/10"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        {item.icon && <item.icon className="h-5 w-5" />}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile User Actions */}
                  {isAuthenticated ? (
                    <div className="mt-auto space-y-4">
                      <div className="flex items-center space-x-3 px-3 py-3 bg-gray-50 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.profileImageUrl} alt={`${user?.firstName} ${user?.lastName}`} />
                          <AvatarFallback className="text-sm">
                            {getInitials(user?.firstName, user?.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium text-dark">{user?.firstName} {user?.lastName}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href="/user/profile" onClick={() => setMobileMenuOpen(false)}>
                            <User className="h-4 w-4 mr-2" />
                            Mi Perfil
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start">
                          <Link href="/settings" onClick={() => setMobileMenuOpen(false)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Configuración
                          </Link>
                        </Button>
                        <Button asChild variant="outline" className="w-full justify-start">
                          <a href="/api/logout">
                            <LogOut className="h-4 w-4 mr-2" />
                            Cerrar Sesión
                          </a>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <Button asChild className="w-full">
                        <a href="/api/login">Iniciar Sesión</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50 md:hidden">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Palette className="text-white h-4 w-4" />
              </div>
              <span className="font-heading font-bold text-xl text-dark">
                Bus<span className="text-primary">Cart</span>
              </span>
            </Link>

            {/* Search and notifications for mobile */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5" />
              </Button>
              
              {isAuthenticated && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                          <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs">
                            {notificationCount}
                          </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <div className="p-2">
                        <h4 className="font-semibold text-sm mb-2">Notificaciones</h4>
                        <p className="text-sm text-gray-500 text-center py-4">
                          No hay notificaciones nuevas
                        </p>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/messages">
                      <MessageCircle className="h-5 w-5" />
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden">
          <div className="grid grid-cols-5 h-16">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                  isActive(item.href)
                    ? "text-primary bg-primary/5"
                    : "text-gray-600 hover:text-primary"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
                {item.href === "/user/favorites" && favoritesCount > 0 && (
                  <Badge className="absolute top-1 right-4 h-4 w-4 p-0 flex items-center justify-center text-xs">
                    {favoritesCount}
                  </Badge>
                )}
              </Link>
            ))}
            
            {/* Profile in mobile bottom nav */}
            <Link
              href="/user/profile"
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                isActive("/user/profile")
                  ? "text-primary bg-primary/5"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              <Avatar className="h-5 w-5">
                <AvatarImage src="" alt="Usuario" />
                <AvatarFallback className="text-xs">
                  U
                </AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">Perfil</span>
            </Link>
          </div>
        </div>
      )}


    </>
  );
}
