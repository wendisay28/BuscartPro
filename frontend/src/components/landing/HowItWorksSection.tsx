import { Search, Filter, Zap, Check } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-4">
          Encuentra el talento perfecto para tu evento
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Conectamos organizadores con los mejores artistas y profesionales del entretenimiento
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Paso 1 */}
        <div className="group relative pl-4 border-l-2 border-pink-500">
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-pink-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Search className="text-pink-500 mr-3 w-5 h-5" />
            Busca
          </h3>
          <p className="text-gray-300 pl-8">
            Explora entre cientos de artistas y profesionales calificados. Filtra por categoría, ubicación y presupuesto.
          </p>
        </div>
        
        {/* Paso 2 */}
        <div className="group relative pl-4 border-l-2 border-purple-500">
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Filter className="text-purple-500 mr-3 w-5 h-5" />
            Compara
          </h3>
          <ul className="space-y-2 pl-8">
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Revisa portafolios y reseñas</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Compara presupuestos</span>
            </li>
            <li className="flex items-start">
              <Check className="text-green-400 w-4 h-4 mt-1 mr-2 flex-shrink-0" />
              <span className="text-gray-300">Guarda tus favoritos</span>
            </li>
          </ul>
        </div>
        
        {/* Paso 3 */}
        <div className="group relative pl-4 border-l-2 border-blue-500">
          <div className="absolute -left-[10px] top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
            <Zap className="text-blue-500 mr-3 w-5 h-5" />
            Contrata con confianza
          </h3>
          <p className="text-gray-300 pl-8">
            Realiza pagos seguros a través de nuestra plataforma. Tu dinero está protegido hasta que el servicio sea completado.
          </p>
        </div>
      </div>
      
      <div className="mt-10">
        <button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
          Comenzar a explorar
        </button>
      </div>
    </div>
  );
}
