import { Link, useLocation } from 'wouter';
import { Home, Compass, Zap, Heart, User } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: 'Home' | 'Compass' | 'Zap' | 'Heart' | 'User';
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
}

export default function MobileBottomNav() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard' && location === '/dashboard') return true;
    if (path !== '/dashboard' && location.startsWith(path)) return true;
    return false;
  };

  const navItems: NavItem[] = [
    { 
      href: '/dashboard', 
      label: 'Inicio', 
      icon: 'Home',
      iconClassName: 'h-5 w-5',
    },
    { 
      href: '/explorer', 
      label: 'Explorar', 
      icon: 'Compass',
      iconClassName: 'h-5 w-5',
    },
    { 
      href: '/hiring', 
      label: 'Contratar', 
      icon: 'Zap',
      className: 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-2 -mt-4 shadow-lg transform hover:scale-105 transition-transform',
      iconClassName: 'h-5 w-5',
      hideLabel: true
    },
    { 
      href: '/favorites', 
      label: 'Favoritos', 
      icon: 'Heart',
      iconClassName: 'h-5 w-5',
    },
    { 
      href: '/profile', 
      label: 'Perfil', 
      icon: 'User',
      iconClassName: 'h-5 w-5',
    },
  ];

  const getIcon = (icon: NavItem['icon']) => {
    switch (icon) {
      case 'Home': return <Home className="h-5 w-5" />;
      case 'Compass': return <Compass className="h-5 w-5" />;
      case 'Zap': return <Zap className="h-5 w-5" />;
      case 'Heart': return <Heart className="h-5 w-5" />;
      case 'User': return <User className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="w-full bg-black/90 backdrop-blur-sm border-t border-gray-800">
      <div className="flex justify-around items-center py-2 px-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center p-2 flex-1 ${
              isActive(item.href) ? 'text-purple-400' : 'text-gray-400 hover:text-white'
            } ${item.className || ''}`}
          >
            <div className={item.className || ''}>
              {getIcon(item.icon)}
            </div>
            {!item.hideLabel && (
              <span className="text-xs mt-1">{item.label}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
