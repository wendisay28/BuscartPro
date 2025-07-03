import { useEffect, useRef, useState } from 'react';

export default function Gallery() {
  const [products] = useState([
    {
      name: "Pintura al Óleo - Amanecer Andino",
      category: "Pintura",
      artist: "María González",
      image: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.8,
      price: 1200000,
      color: "purple",
      stock: 1,
      description: "Obra original en óleo sobre lienzo que captura la belleza de los Andes al amanecer."
    },
    {
      name: "Libro de Arte - Técnicas Mixtas",
      category: "Libro",
      artist: "Editorial Artística",
      image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.5,
      price: 85000,
      color: "pink",
      stock: 15,
      description: "Guía completa de técnicas mixtas para artistas contemporáneos."
    },
    {
      name: "Guitarra Acústica Artesanal",
      category: "Instrumento Musical",
      artist: "Luthier Andino",
      image: "https://images.pexels.com/photos/1648359/pexels-photo-1648359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 5.0,
      price: 1850000,
      color: "purple-700",
      stock: 3,
      description: "Guitarra acústica fabricada a mano con maderas seleccionadas."
    },
    {
      name: "Colección de Bocetos",
      category: "Dibujos",
      artist: "Carlos Méndez",
      image: "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.7,
      price: 320000,
      color: "pink-500",
      stock: 1,
      description: "Serie de 5 bocetos originales a lápiz y carbón."
    },
    {
      name: "Fotografía de Paisaje",
      category: "Fotografía",
      artist: "Ana Torres",
      image: "https://images.pexels.com/photos/2694037/pexels-photo-2694037.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.9,
      price: 450000,
      color: "purple",
      stock: 5,
      description: "Edición limitada, impresión en papel de algodón con certificado de autenticidad."
    },
    {
      name: "Set de Acuarelas Profesional",
      category: "Materiales de Arte",
      artist: "Artesanías Creativas",
      image: "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 4.6,
      price: 280000,
      color: "pink",
      stock: 8,
      description: "Set completo de 24 colores profesionales de alta pigmentación."
    }
  ]);

  const priceRefs = useRef<HTMLDivElement[]>([]);

  const addToPriceRefs = (el: HTMLDivElement | null) => {
    if (el && !priceRefs.current.includes(el)) {
      priceRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Price Counter Animation
    const animatePrices = () => {
      const prices = priceRefs.current;
      
      const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const price = parseInt(target.getAttribute('data-price') || '0');
            let current = 0;
            const increment = price / 80;
            
            const timer = setInterval(() => {
              current += increment;
              if (current >= price) {
                current = price;
                clearInterval(timer);
              }
              target.textContent = '$' + Math.floor(current).toLocaleString();
            }, 25);
          }
        });
      }, { threshold: 0.5 });
      
      prices.forEach((price: HTMLDivElement) => {
        if (price) priceObserver.observe(price);
      });
    };

    animatePrices();

    // GSAP VR Card Animations
    if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
      const vrCards = window.gsap.utils.toArray('.vr-card') as HTMLElement[];
      vrCards.forEach((card: HTMLElement, i: number) => {
        window.gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          duration: 0.6,
          y: 60,
          rotationY: 15,
          opacity: 0,
          delay: i * 0.1,
          ease: 'power2.out'
        });
      });
    }
  }, []);

  return (
    <section 
      id="gallery" 
      className="relative w-full py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-800/50 to-black/80"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-6">
            Tienda de Artistas
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre y adquiere obras únicas, materiales de arte y más, directamente de los artistas
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div key={index} className="product-card group bg-gray-900/50 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-pink-500/10">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`${product.name} - ${product.artist}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                    onError={(e) => {
                      console.error('Error loading image:', product.image);
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiB2aWV3Qm94PSIwIDAgNDAwIDUwMCI+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMWIxZSIgLz4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii0yIj5JbWFnZW4gbm8gZGlzcG9uaWJsZTwvdGV4dD4KICA8dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOGM4ZThlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMTQiPlByb2R1Y3RvIGRlIGFydGU8L3RleHQ+Cjwvc3ZnPg==';
                      e.currentTarget.alt = 'Imagen no disponible';
                      e.currentTarget.className = 'w-full h-full object-contain p-8';
                    }}
                  />
                </div>
                <div className="absolute top-3 right-3 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {product.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-white line-clamp-2">{product.name}</h3>
                  <div className="bg-pink-900/50 text-pink-300 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {product.stock} {product.stock === 1 ? 'disponible' : 'disponibles'}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <div 
                      ref={addToPriceRefs}
                      data-price={product.price}
                      className="text-pink-400 font-bold text-xl"
                    >
                      ${product.price.toLocaleString('es-CO')}
                    </div>
                    <div className="flex items-center text-yellow-400 text-sm">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                      <span className="text-gray-500 ml-1">({product.rating})</span>
                    </div>
                  </div>
                  <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Añadir al carrito
                  </button>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  <span>Por: </span>
                  <span className="text-pink-300">{product.artist}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}