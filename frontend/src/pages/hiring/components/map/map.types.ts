export interface MapPin {
  id: number;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  category: string;
  type: 'music' | 'camera' | 'palette' | 'person' | 'video' | 'pen' | 'building' | 'image' | 'mic' | 'water' | 'user';
  color?: string;
  icon: string;
  selected?: boolean;
}

// Position pins based on real coordinates when used with SVG map
export const getPinPosition = (pinId: number) => {
  const positions = [
    { top: "33%", left: "25%" }, // El Poblado
    { top: "40%", left: "60%" }, // Laureles
    { top: "60%", left: "40%" }, // Centro
    { top: "25%", left: "75%" }, // Envigado
    { top: "80%", left: "80%" }, // Sabaneta
    { top: "20%", left: "45%" }, // Bello
    { top: "45%", left: "25%" }, // Las Palmas
    { top: "35%", left: "70%" }, // Estadio
    { top: "55%", left: "65%" }, // La América
    { top: "30%", left: "35%" }, // Robledo
  ];
  
  return positions[pinId % positions.length];
};
