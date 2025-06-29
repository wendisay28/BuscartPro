import { useEffect, useRef } from 'react';

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generative Art Footer
    const startGenerativeArt = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        color: string;
      }> = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          color: ['#8A2BE2', '#FF1493', '#DA70D6', '#FF69B4'][Math.floor(Math.random() * 4)]
        });
      }

      const animateGenerativeArt = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + '40';
          ctx.fill();
        });

        // Connect nearby particles
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = '#8A2BE2' + '20';
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        requestAnimationFrame(animateGenerativeArt);
      };
      animateGenerativeArt();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    };

    startGenerativeArt();
  }, []);

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Sección CTA */}
      <div className="relative bg-gradient-to-r from-purple-900/80 to-pink-900/80 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para vivir una experiencia <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">única</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Únete a nuestra comunidad de artistas y descubre eventos increíbles cerca de ti.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30">
              Comenzar ahora
            </button>
            <button className="px-8 py-4 border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Ver eventos
            </button>
          </div>
        </div>
      </div>

      {/* Canvas para el arte generativo */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-overlay opacity-30"
      />
      
      {/* Fondo con patrón sutil */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, rgba(124, 29, 165, 0.1) 90%)',
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-orbitron text-2xl font-bold gradient-text mb-6">BuscArt</h3>
            <p className="text-gray-400 mb-4">La plataforma definitiva para artistas y creativos</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-700 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">ig</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                <span className="text-white font-bold">tw</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-600">Artistas</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-600 transition-colors">Crear Perfil</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Comisiones</a></li>
              <li><a href="#" className="hover:text-purple-600 transition-colors">Eventos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-pink-600">Clientes</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-600 transition-colors">Buscar Artistas</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Proyectos</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Soporte</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-700">Empresa</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-purple-700 transition-colors">Acerca de</a></li>
              <li><a href="#" className="hover:text-purple-700 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-purple-700 transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-purple-700 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            2024 BuscArt. Creando el futuro del arte digital. Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Hecho con y mucha magia por artistas para artistas
          </p>
        </div>
      </div>
    </footer>
  );
}
