// frontend/src/components/landing/shared/artists-data.ts

export interface Artist {
  id?: string | number;
  name: string;
  profession: string;
  category: string;
  image: string;
  rating?: number;
  location?: string;
  price?: string;
  isVerified?: boolean;
  tags?: string[];
}

export const artistsByCategory: Record<string, Artist[]> = {
  musicos: [
    {
      name: "María Rodríguez",
      profession: "Cantante de Boleros",
      category: "musicos",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.8,
      location: "Bogotá",
      price: "$500.000",
      isVerified: true,
      tags: ["boleros", "baladas", "música romántica"]
    },
    {
      name: "Carlos Vives Tribute",
      profession: "Banda Tributo",
      category: "musicos",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.9,
      location: "Barranquilla",
      price: "$3'500.000",
      isVerified: true,
      tags: ["vallenato", "tributo", "música colombiana"]
    }
  ],
  dancers: [
    {
      name: "Salsa Brava",
      profession: "Grupo de Baile",
      category: "dancers",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.7,
      location: "Cali",
      price: "$2'000.000",
      isVerified: true,
      tags: ["salsa", "bachata", "show en vivo"]
    }
  ],
  actors: [
    {
      name: "Teatro Vivo",
      profession: "Compañía Teatral",
      category: "actors",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a82d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.9,
      location: "Medellín",
      price: "$4'000.000",
      isVerified: true,
      tags: ["teatro", "improvisación", "espectáculo familiar"]
    }
  ],
  visual: [
    {
      name: "Ana Galería",
      profession: "Pintora en Vivo",
      category: "visual",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.6,
      location: "Cartagena",
      price: "$1'200.000",
      isVerified: true,
      tags: ["pintura", "arte en vivo", "retratos"]
    }
  ],
  photo: [
    {
      name: "Fotografía Creativa",
      profession: "Fotógrafo de Eventos",
      category: "photo",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.8,
      location: "Bogotá",
      price: "$800.000",
      isVerified: true,
      tags: ["fotografía", "eventos", "sesiones"]
    }
  ],
  digital: [
    {
      name: "Estudio Digital",
      profession: "Diseñadores Gráficos",
      category: "digital",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.7,
      location: "Medellín",
      price: "$1'500.000",
      isVerified: true,
      tags: ["diseño", "marca", "identidad visual"]
    }
  ],
  others: [
    {
      name: "Magia y Más",
      profession: "Mago Profesional",
      category: "others",
      image: "https://images.unsplash.com/photo-1549065279-eb953a665020?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=500",
      rating: 4.9,
      location: "Bogotá",
      price: "$1'200.000",
      isVerified: true,
      tags: ["magia", "espectáculo", "animación"]
    }
  ]
};

// Añade IDs únicos a cada artista
Object.values(artistsByCategory).forEach(category => {
  category.forEach((artist, index) => {
    artist.id = `${artist.category}-${index + 1}`;
  });
});

export default artistsByCategory;