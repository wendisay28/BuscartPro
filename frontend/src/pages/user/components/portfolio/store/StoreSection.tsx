import { Product } from '../../../data/portfolio.mock';
import { Plus, ShoppingCart, Star, Clock } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => (
  <div className="group bg-[#141b2a] rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full hover:border-blue-500/50">
    <div className="flex flex-col h-[400px]">
      {/* Imagen con acciones en esquina superior derecha - 60% de altura */}
      <div className="relative h-[60%] overflow-hidden">
        <img 
          src={product.imageUrl || product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/400x400/1e293b/94a3b8?text=Imagen+no+disponible';
            target.classList.add('object-contain', 'p-4');
            target.classList.remove('object-cover');
          }}
        />
        
        {/* Etiqueta de destacado si está en oferta */}
        {product.isOnSale && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-md">
            OFERTA
          </div>
        )}
        
        {/* Acciones rápidas */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-transform hover:scale-110">
            <ShoppingCart className="w-4 h-4 text-gray-800" />
          </button>
          <button className="p-2 bg-white/90 hover:bg-white rounded-full shadow-md transition-transform hover:scale-110">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </button>
        </div>
        
        {/* Precio */}
        <div className="absolute bottom-3 right-3 bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-blue-500">
          <div className="relative">
            <span className="font-bold text-base tracking-wide relative z-10 drop-shadow-[0_2px_4px_rgba(30,64,175,0.5)]">
              ${product.price}
            </span>
            <span className="font-medium text-xs opacity-90 ml-0.5 relative z-10">
              COP
            </span>
            {product.originalPrice && (
              <span className="absolute -top-4 right-0 text-xs text-gray-300 line-through">
                ${product.originalPrice}
              </span>
            )}
            <div className="absolute inset-0 bg-blue-600/70 rounded-full blur-[2px] -z-0"></div>
          </div>
        </div>
      </div>
      
      {/* Contenido de la tarjeta - 40% de altura */}
      <div className="p-3 flex flex-col h-[40%] overflow-hidden">
        {/* Fila 1: Nombre del producto con valoración */}
        <div className="flex flex-col space-y-1.5 mb-1.5">
          <h3 className="font-bold text-white text-[15px] leading-tight truncate">{product.title}</h3>
          
          {/* Valoración */}
          <div className="flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-3.5 h-3.5 ${star <= (product.rating || 0) ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 ml-1">({product.reviews || 0})</span>
          </div>
        </div>
        
        {/* Fila 2: Breve descripción */}
        <p className="text-[12px] text-gray-300 line-clamp-2 mb-2.5 leading-tight">
          {product.description}
        </p>
        
        {/* Fila 3: Acciones */}
        <div className="flex items-center justify-between text-gray-400 mt-auto pt-1.5 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-[11px] text-gray-300 ml-1">Envío {product.shippingTime || '3-5 días'}</span>
            </div>
          </div>
          
          <button className="bg-[#e74f05] hover:bg-[#d14704] text-white text-xs font-medium py-1.5 px-4 rounded-lg transition-colors whitespace-nowrap hover:shadow-md hover:shadow-[#e74f05]/30">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  </div>
);

interface StoreSectionProps {
  products: Product[];
  onAddProduct: () => void;
}

export const StoreSection = ({ products, onAddProduct }: StoreSectionProps) => (
  <div className="space-y-4 p-2">
    <div className="flex justify-between items-center px-2">
      <h2 className="text-xl font-bold text-white">Tienda de Arte Digital</h2>
      <button 
        onClick={onAddProduct}
        className="flex items-center bg-[#e74f05] hover:bg-[#d14704] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors hover:shadow-md hover:shadow-[#e74f05]/30 hover:-translate-y-0.5"
      >
        <Plus className="w-4 h-4 mr-1" />
        Agregar Producto
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);
