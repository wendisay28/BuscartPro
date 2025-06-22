import Button from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[100vh] bg-black text-white overflow-hidden flex items-center py-16"
      role="region"
      aria-label="Hero section"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-24 left-10 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-24 right-10 w-56 h-56 bg-purple-700 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col lg:flex-row items-center">
        {/* Left column (text) */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-8">
              Busca, <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">compara</span>, contrata y vive el{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">arte</span> en tu ciudad
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-sans tracking-wide max-w-3xl">
              BuscArt te conecta con artistas, eventos y espacios culturales. Contrata en tiempo real, publica ofertas, proyectos, convocatorias y descubre experiencias cerca de ti de forma rápida y segura.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
              <a href="/busco-artistas" aria-label="Busco artistas" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-lg py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Busco artistas
                </Button>
              </a>

              <a href="/soy-artista" aria-label="Soy artista" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-white text-lg py-4 rounded-xl shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  Soy artista
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Right column (image) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="relative w-full max-w-3xl h-[600px] lg:h-[700px]">
            <img 
              src="/images/landing/tango.png" 
              alt="Arte y cultura" 
              className="w-full h-full object-contain"
            />
            {/* Efecto de brillo en la imagen */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
