import { useState } from "react";
import { motion } from "framer-motion";
import { Building, User, Palette } from "lucide-react";

const profiles = [
  {
    id: "artista",
    label: "Soy Artista",
    icon: <Palette className="w-8 h-8 text-white" />, 
    color: "from-purple-600 to-pink-500",
    href: "/soy-artista",
  },
  {
    id: "empresa",
    label: "Soy Empresa",
    icon: <Building className="w-8 h-8 text-white" />, 
    color: "from-blue-600 to-cyan-400",
    href: "/empresa",
  },
  {
    id: "comprador",
    label: "Busco Artistas",
    icon: <User className="w-8 h-8 text-white" />, 
    color: "from-green-500 to-teal-400",
    href: "/busco-artistas",
  }
];

export default function ChooseYourPath() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="bg-black min-h-screen flex flex-col justify-center items-center px-4 py-24 text-white">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Elige tu camino
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {profiles.map((profile) => (
          <motion.a
            key={profile.id}
            href={profile.href}
            onMouseEnter={() => setHovered(profile.id)}
            onMouseLeave={() => setHovered(null)}
            initial={{ rotateY: 0 }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`relative bg-gradient-to-br ${profile.color} rounded-2xl p-8 cursor-pointer shadow-lg transform-style-3d`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-white/10 p-4 rounded-full">
                {profile.icon}
              </div>
              <h3 className="text-2xl font-semibold">{profile.label}</h3>
              <p className="text-gray-200 text-sm max-w-xs">
                {profile.id === 'artista' && 'Publica tu portafolio, encuentra oportunidades y crea conexiones.'}
                {profile.id === 'empresa' && 'Busca talento artístico, organiza eventos y promueve tu institución.'}
                {profile.id === 'comprador' && 'Contrata artistas fácilmente y vive experiencias únicas.'}
              </p>
            </div>

            {hovered === profile.id && (
              <motion.div
                layoutId="glow"
                className="absolute inset-0 rounded-2xl border-2 border-white/30 pointer-events-none"
                animate={{ opacity: [0, 1, 0.7], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            )}
          </motion.a>
        ))}
      </div>
    </section>
  );
}
