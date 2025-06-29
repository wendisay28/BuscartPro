export interface Event {
  id: string;
  title: string;
  type: string;
  location: string;
  city: string;
  image: string;
}

export const eventsData: Event[] = [
  // Conciertos (6 eventos) - Mantenidos iguales
  {
    id: 'concierto-1',
    title: 'Noche de Jazz en Vivo',
    type: 'concierto',
    location: 'Blue Note Club',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
  },
  {
    id: 'concierto-2',
    title: 'Rock Alternativo en Vivo',
    type: 'concierto',
    location: 'Arena Bogotá',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
  },
  {
    id: 'concierto-3',
    title: 'Festival de Música Electrónica',
    type: 'concierto',
    location: 'Parque Metropolitano',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  },
  {
    id: 'concierto-4',
    title: 'Noche de Salsa y Son',
    type: 'concierto',
    location: 'Quiebra Canto',
    city: 'Cali',
    image: 'https://images.pexels.com/photos/1762413/pexels-photo-1762413.jpeg'
  },
  {
    id: 'concierto-5',
    title: 'Pop Latino en Concierto',
    type: 'concierto',
    location: 'Estio Movistar Arena',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
  },
  {
    id: 'concierto-6',
    title: 'Noche de Boleros',
    type: 'concierto',
    location: 'Teatro Colón',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg'
  },

  // Teatro (6 eventos) - Con imágenes únicas
  {
    id: 'teatro-1',
    title: 'Romeo y Julieta: Versión Urbana',
    type: 'teatro',
    location: 'Teatro Colón',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2744223/pexels-photo-2744223.jpeg' // Teatro 1
  },
  {
    id: 'teatro-2',
    title: 'La Casa de Bernarda Alba',
    type: 'teatro',
    location: 'Teatro Nacional',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2744224/pexels-photo-2744224.jpeg' // Teatro 2
  },
  {
    id: 'teatro-3',
    title: 'El Quijote de la Mancha',
    type: 'teatro',
    location: 'Teatro Mayor',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/2744225/pexels-photo-2744225.jpeg' // Teatro 3
  },
  {
    id: 'teatro-4',
    title: 'La Celestina',
    type: 'teatro',
    location: 'Teatro Libre',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2744226/pexels-photo-2744226.jpeg' // Teatro 4
  },
  {
    id: 'teatro-5',
    title: 'Bodas de Sangre',
    type: 'teatro',
    location: 'Teatro Colsubsidio',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2744227/pexels-photo-2744227.jpeg' // Teatro 5
  },
  {
    id: 'teatro-6',
    title: 'La Casa de los Espíritus',
    type: 'teatro',
    location: 'Teatro Nacional',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2744229/pexels-photo-2744229.jpeg'
  },

  // Festivales (6 eventos) - Mantenidos iguales
  {
    id: 'festival-1',
    title: 'Festival de Jazz al Parque',
    type: 'festival',
    location: 'Parque Simón Bolívar',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  },
  {
    id: 'festival-2',
    title: 'Rock al Parque',
    type: 'festival',
    location: 'Parque Metropolitano',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
  },
  {
    id: 'festival-3',
    title: 'Festival de Verano',
    type: 'festival',
    location: 'Parque de los Novios',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg'
  },
  {
    id: 'festival-4',
    title: 'Festival de la Leyenda Vallenata',
    type: 'festival',
    location: 'Parque de la Leyenda Vallenata',
    city: 'Valledupar',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg'
  },
  {
    id: 'festival-5',
    title: 'Festival de Teatro de Manizales',
    type: 'festival',
    location: 'Teatro Los Fundadores',
    city: 'Manizales',
    image: 'https://images.pexels.com/photos/2744223/pexels-photo-2744223.jpeg'
  },
  {
    id: 'festival-6',
    title: 'Festival de Cine de Cartagena',
    type: 'festival',
    location: 'Teatro Heredia',
    city: 'Cartagena',
    image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'
  },

  // Cine (6 eventos nuevos)
  {
    id: 'cine-1',
    title: 'Estreno: La Ciudad Perdida',
    type: 'cine',
    location: 'Cine Colombia Andino',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/7991580/pexels-photo-7991580.jpeg'
  },
  {
    id: 'cine-2',
    title: 'Ciclo de Cine Francés',
    type: 'cine',
    location: 'Cinemateca Distrital',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/7991581/pexels-photo-7991581.jpeg'
  },
  {
    id: 'cine-3',
    title: 'Cine al Aire Libre',
    type: 'cine',
    location: 'Plaza de Bolívar',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/7991582/pexels-photo-7991582.jpeg'
  },
  {
    id: 'cine-4',
    title: 'Maratón de Películas de Terror',
    type: 'cine',
    location: 'Cine Tonalá',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/7991583/pexels-photo-7991583.jpeg'
  },
  {
    id: 'cine-5',
    title: 'Cine Documental',
    type: 'cine',
    location: 'Museo Nacional',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/7991584/pexels-photo-7991584.jpeg'
  },
  {
    id: 'cine-6',
    title: 'Cine Infantil',
    type: 'cine',
    location: 'Biblioteca Virgilio Barco',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/7991585/pexels-photo-7991585.jpeg'
  },

  // Exposiciones (6 eventos nuevos)
  {
    id: 'expo-1',
    title: 'Arte Contemporáneo',
    type: 'exposicion',
    location: 'Museo de Arte Moderno',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1572386/pexels-photo-1572386.jpeg'
  },
  {
    id: 'expo-2',
    title: 'Fotografía de Naturaleza',
    type: 'exposicion',
    location: 'Centro Cultural Gabriel García Márquez',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg'
  },
  {
    id: 'expo-3',
    title: 'Arte Precolombino',
    type: 'exposicion',
    location: 'Museo del Oro',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2254064/pexels-photo-2254064.jpeg'
  },
  {
    id: 'expo-4',
    title: 'Diseño Gráfico Contemporáneo',
    type: 'exposicion',
    location: 'Centro de Diseño',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg'
  },
  {
    id: 'expo-5',
    title: 'Esculturas en la Ciudad',
    type: 'exposicion',
    location: 'Parque de la 93',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg'
  },
  {
    id: 'expo-6',
    title: 'Pintura Latinoamericana',
    type: 'exposicion',
    location: 'Museo Nacional',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg'
  },

  // Talleres (6 eventos nuevos)
  {
    id: 'taller-1',
    title: 'Taller de Fotografía',
    type: 'taller',
    location: 'Centro de la Imagen',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg'
  },
  {
    id: 'taller-2',
    title: 'Taller de Pintura al Óleo',
    type: 'taller',
    location: 'Escuela de Bellas Artes',
    city: 'Medellín',
    image: 'https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg'
  },
  {
    id: 'taller-3',
    title: 'Taller de Escritura Creativa',
    type: 'taller',
    location: 'Biblioteca Luis Ángel Arango',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
  },
  {
    id: 'taller-4',
    title: 'Taller de Danza Contemporánea',
    type: 'taller',
    location: 'Centro Cultural del Este',
    city: 'Cali',
    image: 'https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg'
  },
  {
    id: 'taller-5',
    title: 'Taller de Cocina Italiana',
    type: 'taller',
    location: 'Escuela de Gastronomía',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg'
  },
  {
    id: 'taller-6',
    title: 'Taller de Música Andina',
    type: 'taller',
    location: 'Casa de la Cultura',
    city: 'Tunja',
    image: 'https://images.pexels.com/photos/1648359/pexels-photo-1648359.jpeg'
  },

  // Otros (6 eventos nuevos)
  {
    id: 'otro-1',
    title: 'Feria del Libro',
    type: 'otro',
    location: 'Corferias',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
  },
  {
    id: 'otro-2',
    title: 'Maratón de Stand-up Comedy',
    type: 'otro',
    location: 'Teatro Jorge Eliécer Gaitán',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg'
  },
  {
    id: 'otro-3',
    title: 'Feria de Empleo',
    type: 'otro',
    location: 'Ágora Bogotá',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
  },
  {
    id: 'otro-4',
    title: 'Mercado de Artesanías',
    type: 'otro',
    location: 'Plaza de Usaquén',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1578911/pexels-photo-1578911.jpeg'
  },
  {
    id: 'otro-5',
    title: 'Convención de Cómics',
    type: 'otro',
    location: 'Corferias',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
  },
  {
    id: 'otro-6',
    title: 'Feria Gastronómica',
    type: 'otro',
    location: 'Parque de la 93',
    city: 'Bogotá',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg'
  }
];