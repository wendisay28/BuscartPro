'use client';

import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MapPin, CheckCircle, Mic2, DollarSign } from "lucide-react";

interface MapPoint {
  id: number;
  top: string;
  left: string;
  title: string;
  description: string;
  type: string;
}

const InteractiveMapSection = () => {
  const [showForm, setShowForm] = useState(true);
  const [showOffer, setShowOffer] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Datos de la contraoferta
  const counterOffer = {
    id: 1,
    name: "Carlos Baladista",
    price: 250000,
    timeLeft: timeLeft,
    type: "artista"
  };

  useEffect(() => {
    // Mostrar la oferta después de 3 segundos
    const offerTimer = setTimeout(() => {
      setShowOffer(true);
      setTimeLeft(30);
    }, 3000);

    // Temporizador de la oferta
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - (100 / 30 / 10) : 0));
    }, 100);

    const timeInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowOffer(false);
          clearInterval(timeInterval);
          clearInterval(progressInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(offerTimer);
      clearInterval(progressInterval);
      clearInterval(timeInterval);
    };
  }, []);

  const points: MapPoint[] = [
    // Punto morado principal (oferta activa)
    {
      id: 1,
      top: "45%",
      left: "40%",
      title: "Carlos Baladista",
      description: `Cantante de balada - $${counterOffer.price.toLocaleString()} COP`,
      type: "artista",
    },
    // Otras ofertas (puntos rosados)
    ...Array.from({ length: 8 }, (_, i) => ({
      id: i + 2,
      top: `${20 + Math.random() * 60}%`,
      left: `${20 + Math.random() * 60}%`,
      title: `Artista ${i + 1}`,
      description: `Oferta - $${(200000 + Math.random() * 100000).toFixed(0)} COP`,
      type: "oferta",
    }))
  ];

  // Renderizar puntos en el mapa
  const renderMapPoints = () => {
    return points.map((point) => (
      <div
        key={point.id}
        className="absolute group cursor-pointer transition-transform hover:scale-125 z-10"
        style={{ 
          top: point.top, 
          left: point.left,
          transform: 'translate(-50%, -50%)',
          filter: point.type === "artista" ? 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.7))' : 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))'
        }}
      >
        <div
          className={`w-4 h-4 rounded-full animate-pulse relative ${
            point.type === "artista" ? "bg-purple-500" : "bg-pink-500"
          }`}
        >
          <div
            className={`absolute -top-2 -left-2 w-8 h-8 rounded-full blur-sm ${
              point.type === "artista"
                ? "bg-purple-500/40"
                : "bg-pink-500/40"
            }`}
          />
        </div>
        <div className="absolute left-6 top-1 hidden group-hover:block w-48 bg-black border border-white/20 text-white text-xs p-2 rounded shadow-lg z-50">
          <strong>{point.title}</strong>
          <p className="text-gray-300 mt-1">{point.description}</p>
        </div>

        {point.id === 1 && showOffer && (
          <div className="absolute -top-20 left-8 bg-purple-700 text-white text-xs px-4 py-2 rounded-lg shadow-lg animate-fade-out z-50 w-64 space-y-2">
            <p className="font-semibold">Carlos Baladista</p>
            <p>Acepta tu oferta: $250.000</p>
            <div className="w-full h-1 bg-white/20 rounded overflow-hidden">
              <div
                className="h-full bg-pink-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Button className="w-full mt-1 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-xs py-1 rounded-full transition-all duration-300 hover:scale-105">
              Aceptar Oferta
            </Button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <section
      className="relative min-h-screen pt-8 bg-black text-white overflow-hidden"
      role="region"
      aria-label="Contratación de artistas en tiempo real"
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center md:text-left mb-4 md:mb-8">
          <span className="text-white">Tu Evento, Tu Artista, en</span>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text"> Minutos</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center translate-y-8">
          {/* Columna izquierda - Mapa */}
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-2xl overflow-hidden w-full h-[600px] bg-gray-900 translate-x-16 -translate-y-8 shadow-lg shadow-purple-500/30 border border-white/10">
              {/* Contenedor de la imagen del mapa */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src="/images/Map/map1.jpg" 
                  alt="Mapa de la ciudad"
                  className="w-full h-full object-cover opacity-90"
                />
                {/* Capa de superposición para oscurecer la imagen */}
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Puntos en el mapa */}
              {renderMapPoints()}

              {/* Notificación de artistas cercanos */}
              <div className="absolute bottom-6 left-6 bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-sm flex items-center gap-3 shadow-xl backdrop-blur-md">
                <MapPin className="text-pink-500 w-5 h-5 animate-bounce" style={{ animationDuration: '0.8s' }} />
                <div>
                  <p className="font-medium text-white">Se detectaron 10 artistas cerca</p>
                  <p className="text-gray-300 text-xs">Disponibles en tiempo real</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Mockup del celular */}
          <div className="flex-1 relative z-10 translate-x-48 -translate-y-8">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-pink-500/30 w-[360px] h-[680px] rounded-3xl shadow-lg shadow-purple-500/30 relative overflow-hidden">
              <div className="absolute inset-0 rounded-[2rem] border-8 border-black z-0"></div>
              <div className="relative z-10 flex flex-col space-y-6">
                {/* Sección de solicitud */}
                <div className="bg-gradient-to-br from-pink-600 to-purple-700 rounded-xl p-4">
                  <div className="space-y-3">
                    {/* Título */}
                    <div className="text-center">
                      <p className="text-sm font-semibold text-white">Tú has solicitado</p>
                      <div className="w-12 h-0.3 bg-white/20 mx-auto rounded-full mt-1" />
                    </div>

                    {/* Información de la solicitud */}
                    <div className="space-y-2">
                      {/* Tipo de artista */}
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <Mic2 className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">Cantante de Balada</p>
                          <p className="text-xs text-white/80">Para hoy a las 7:00 pm</p>
                        </div>
                      </div>

                      {/* Ubicación */}
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-white/80" />
                        <p className="text-white/90">Parque Lleras, Medellín</p>
                      </div>

                      {/* Presupuesto */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4 text-white/80" />
                          <p className="text-lg font-semibold text-white">200.000</p>
                          <span className="text-sm text-white/80">COP</span>
                        </div>
                        <div className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80">
                          Por hora
                        </div>
                      </div>

                      {/* Estado */}
                      <div className="flex justify-center">
                        <div className="flex items-center gap-1.5 text-green-400">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm">Enviado</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sección de contraoferta */}
                {showOffer && (
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-medium">Contraoferta recibida</h4>
                      <div className="flex items-center text-yellow-400 text-xs">
                        <span className="animate-pulse">●</span>
                        <span className="ml-1">{timeLeft}s</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                        CB
                      </div>
                      <div>
                        <p className="font-medium text-xs">Carlos Baladista</p>
                        <p className="text-xs text-purple-300">$450.000</p>
                      </div>
                    </div>
                    <div className="w-full h-1 bg-white/20 rounded-full mb-2">
                      <div className="h-full bg-pink-500 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 text-xs py-2">
                        Aceptar oferta
                      </Button>
                      <Button className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-xs py-2">
                        Rechazar
                      </Button>
                    </div>
                  </div>
                )}

                {/* Formulario */}
                {showForm && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Descripción</label>
                      <textarea 
                        className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={3}
                        placeholder="Describe el tipo de artista que buscas..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Presupuesto (COP)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input 
                          type="number" 
                          className="w-full bg-black/30 border border-white/10 rounded-xl pl-8 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          placeholder="Ej: 500000"
                        />
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 mt-2 text-sm"
                      onClick={() => setShowForm(false)}
                    >
                      Publicar solicitud
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapSection;