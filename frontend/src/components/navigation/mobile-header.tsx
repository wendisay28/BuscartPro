import { Menu, X, Search, Bell, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type MobileHeaderProps = {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
};

export function MobileHeader({ onMenuToggle, isMenuOpen }: MobileHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 md:hidden">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="p-2 -ml-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
        <Link to="/" className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">
          BuscArt
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
        
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Messages">
          <MessageCircle className="w-5 h-5" />
        </button>
        
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-label="Notifications">
          <Bell className="w-5 h-5" />
        </button>
      </div>
      
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 px-4 py-2 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artistas, servicios..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
