export interface Artist {
  id: number;
  name: string;
  profession: string;
  location: string;
  price: string;
  image: string;
}

export const featuredArtists: Artist[] = [
  {
    id: 1,
    name: "Ana Martínez",
    profession: "Cantante de Jazz",
    location: "Bogotá, Colombia",
    price: "$1,200,000 - $2,500,000 COP",
    image: "/images/artists/artist1.jpg"
  },
  {
    id: 2,
    name: "La Gaita López",
    profession: "Cantante",
    location: "Medellín, Colombia",
    price: "$1,500,000 - $3,000,000 COP",
    image: "/images/artists/artist2.jpg"
  },
  {
    id: 3,
    name: "María Gómez",
    profession: "Cantante",
    location: "Cali, Colombia",
    price: "$1,000,000 - $2,000,000 COP",
    image: "/images/artists/artist3.jpg"
  },
  {
    id: 4,
    name: "Carolina San Miguel",
    profession: "Modelo",
    location: "Barranquilla, Colombia",
    price: "$800,000 - $1,800,000 COP",
    image: "/images/artists/artist4.jpg"
  },
  {
    id: 5,
    name: "Fernando Balta",
    profession: "Fotógrafo",
    location: "Cartagena, Colombia",
    price: "$900,000 - $2,200,000 COP",
    image: "/images/artists/artist5.jpg"
  },
  {
    id: 6,
    name: "Diego Mendoza",
    profession: "DJ",
    location: "Bucaramanga, Colombia",
    price: "$1,100,000 - $2,300,000 COP",
    image: "/images/artists/artist6.jpg"
  },
  {
    id: 7,
    name: "Frank Rey",
    profession: "DJ",
    location: "Pereira, Colombia",
    price: "$1,500,000 - $3,200,000 COP",
    image: "/images/artists/artist7.jpg"
  }
];
