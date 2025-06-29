export default function Navigation() {
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };
  
    return (
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="font-orbitron text-2xl font-bold gradient-text">BuscArt</div>
            <div className="hidden md:flex space-x-8">
              <a 
                href="#home" 
                className="hover:text-purple-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#home')}
              >
                Inicio
              </a>
              <a 
                href="#universe" 
                className="hover:text-purple-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#universe')}
              >
                Universo
              </a>
              <a 
                href="#process" 
                className="hover:text-purple-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#process')}
              >
                Proceso
              </a>
              <a 
                href="#gallery" 
                className="hover:text-purple-400 transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#gallery')}
              >
                Galería
              </a>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
              Únete
            </button>
          </div>
        </div>
      </nav>
    );
  }
  