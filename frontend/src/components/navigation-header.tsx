import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Heart,
  Bell,
  User as UserIcon,
  LogOut,
  LogIn,
  UserPlus,
  MessageCircle,
  Home,
  Compass,
  Zap,
  Menu,
} from "lucide-react";
import { LocationSelector } from "./location-selector";
import { Link, useLocation } from "wouter";

// Definición de tipos
type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function NavigationHeader() {
  const { user, isAuthenticated, logout } = useAuth() as any;
  const [location] = useLocation();

  const [endpointAvailable, setEndpointAvailable] = useState<boolean | null>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notificationsEndpointAvailable");
      return saved !== null ? JSON.parse(saved) : null;
    }
    return null;
  });

  const { data: notifications = [] } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async (): Promise<Notification[]> => {
      if (endpointAvailable === false || !isAuthenticated) {
        return [];
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:3000/api"}/notifications`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        if (response.status === 404) {
          localStorage.setItem("notificationsEndpointAvailable", "false");
          setEndpointAvailable(false);
          return [];
        }

        if (!response.ok) throw new Error("Error al cargar notificaciones");

        localStorage.setItem("notificationsEndpointAvailable", "true");
        setEndpointAvailable(true);
        return response.json();
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.error(error);
        localStorage.setItem("notificationsEndpointAvailable", "false");
        setEndpointAvailable(false);
        return [];
      }
    },
    enabled: isAuthenticated && endpointAvailable !== false,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    select: (data) => (Array.isArray(data) ? data : []),
  });

  const notificationCount = notifications.filter((n) => !n.isRead).length;

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "U";

  const navigationItems = [
    { href: "/dashboard", label: "Inicio", icon: <Home className="h-4 w-4 mr-2" /> },
    { href: "/explorer", label: "Explorar", icon: <Compass className="h-4 w-4 mr-2" /> },
    { href: "/hiring", label: "Contratar", icon: <Zap className="h-4 w-4 mr-2" /> },
    { href: "/favorites", label: "Favoritos", icon: <Heart className="h-4 w-4 mr-2" /> },
  ];

  return (
    <>
      {/* Mobile nav */}
      <div className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 z-40 md:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center">
            <img src="/images/logo3.svg" alt="BuscartPro Logo" className="h-8 w-auto" />
          </Link>

          <div className="flex-1 max-w-[140px] mx-2">
            <LocationSelector onLocationSelect={() => {}} className="w-full" />
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <MessageCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#bb00aa] text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="p-2 font-bold">Notificaciones</div>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((n) => (
                    <DropdownMenuItem key={n.id} className={`flex items-start p-2 ${!n.isRead ? "bg-blue-500/10" : ""}`}>
                      <div className={`h-2 w-2 rounded-full mr-3 mt-1.5 ${!n.isRead ? "bg-blue-500" : "bg-transparent"}`}></div>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/user/profile" className="flex items-center">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Mi Perfil
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar Sesión
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Registrarse
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img src="/images/logo4.svg" alt="BuscartPro" className="h-10 w-auto" />
            </Link>

            <div className="ml-10 flex items-center space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location === item.href || (item.href !== "/dashboard" && location.startsWith(item.href))
                      ? "text-white bg-gray-900"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-4">
              <LocationSelector onLocationSelect={() => {}} />
            </div>

            <Button variant="ghost" size="icon" className="text-gray-300 hover:bg-gray-700 hover:text-white">
              <MessageCircle className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-300 hover:bg-gray-700 hover:text-white">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#bb00aa] text-white text-xs flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <div className="p-2 font-bold">Notificaciones</div>
                <DropdownMenuSeparator />
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((n) => (
                    <DropdownMenuItem key={n.id} className={`flex items-start p-2 ${!n.isRead ? "bg-blue-500/10" : ""}`}>
                      <div className={`h-2 w-2 rounded-full mr-3 mt-1.5 ${!n.isRead ? "bg-blue-500" : "bg-transparent"}`}></div>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2">
                  {isAuthenticated ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.profileImageUrl} alt="Usuario" />
                      <AvatarFallback>{getInitials(user?.firstName || "", user?.lastName || "")}</AvatarFallback>
                    </Avatar>
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
                </Button>
              </DropdownMenuTrigger>
              {isAuthenticated && (
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/user/profile" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
