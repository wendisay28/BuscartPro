import { useState, useEffect } from 'react';
import { Plus, X, ExternalLink, Star } from 'lucide-react';
import { 
  getMyFeaturedItems, 
  getUserFeaturedItems,
  createFeaturedItem as createFeaturedItemService,
  updateFeaturedItem as updateFeaturedItemService,
  deleteFeaturedItem as deleteFeaturedItemService,
  type FeaturedItem as FeaturedItemType
} from '../../../../../services/featured.service';
import Button from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Usaremos un toast personalizado simple
const useToast = () => ({
  toast: (options: any) => {
    console.log('Toast:', options);
    // Implementación simple para desarrollo
    if (options.variant === 'destructive') {
      console.error('Error:', options.description);
    } else {
      console.log('Success:', options.description);
    }
  }
});

export interface FeaturedItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'youtube' | 'spotify' | 'vimeo' | 'soundcloud' | 'other';
  thumbnailUrl?: string;
  createdAt: string;
}

interface FeaturedSectionProps {
  userId?: string; // ID del usuario del perfil que se está viendo
  items?: FeaturedItem[];
  onAddContent?: (item: Omit<FeaturedItem, 'id' | 'createdAt'>) => Promise<void>;
  onRemoveContent?: (id: string) => Promise<void>;
}

const getEmbedUrl = (url: string): { url: string; type: FeaturedItemType['type'] } => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.replace('www.', '');
    
    // YouTube
    if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
      let videoId = '';
      if (urlObj.hostname.includes('youtu.be')) {
        videoId = urlObj.pathname.slice(1);
      } else {
        videoId = urlObj.searchParams.get('v') || '';
      }
      return { 
        url: `https://www.youtube.com/embed/${videoId}`,
        type: 'youtube' as const
      };
    }
    
    // Vimeo
    if (hostname.includes('vimeo.com')) {
      const videoId = urlObj.pathname.split('/').pop() || '';
      return { 
        url: `https://player.vimeo.com/video/${videoId}`,
        type: 'vimeo' as const
      };
    }
    
    // Spotify
    if (hostname.includes('spotify.com')) {
      // Convertir URL de Spotify a URL de incrustación
      const pathParts = urlObj.pathname.split('/');
      const type = pathParts[1]; // album, track, playlist, etc.
      const id = pathParts[2]?.split('?')[0];
      
      if (type && id) {
        return { 
          url: `https://open.spotify.com/embed/${type}/${id}`,
          type: 'spotify' as const
        };
      }
    }
    
    // SoundCloud
    if (hostname.includes('soundcloud.com')) {
      // SoundCloud requiere su propio widget, pero podemos usar la URL original
      return { 
        url: `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}`,
        type: 'soundcloud' as const
      };
    }
    
    // Para otros tipos de enlaces
    return { url, type: 'other' as const };
    
  } catch (error) {
    console.error('Error al procesar la URL:', error);
    return { url, type: 'other' as const };
  }
};

export const FeaturedSection = ({ userId }: FeaturedSectionProps) => {
  const [items, setItems] = useState<FeaturedItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<FeaturedItemType | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: ''
  });
  
  const [previewData, setPreviewData] = useState<{
    url: string;
    type: FeaturedItemType['type'];
  } | null>(null);
  
  const { toast } = useToast();
  
  // Cargar elementos destacados al montar el componente
  useEffect(() => {
    const loadFeaturedItems = async () => {
      try {
        setIsLoading(true);
        // Si hay un userId, cargar los elementos de ese usuario
        // De lo contrario, cargar los del usuario actual
        const data = userId 
          ? await getUserFeaturedItems(userId)
          : await getMyFeaturedItems();
        setItems(data);
      } catch (error) {
        console.error('Error al cargar elementos destacados:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'No se pudieron cargar los elementos destacados. Intenta de nuevo más tarde.'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFeaturedItems();
  }, [userId]);
  
  // Mostrar indicador de carga
  if (isLoading) {
    return <div className="flex justify-center p-8">Cargando...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Si es la URL, intentar generar una vista previa
    if (name === 'url' && value) {
      try {
        const embedInfo = getEmbedUrl(value);
        setPreviewData(embedInfo);
      } catch (error) {
        setPreviewData(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.url) {
      toast({
        title: 'Error',
        description: 'Por favor ingresa una URL válida',
        variant: 'destructive',
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      const embedInfo = getEmbedUrl(formData.url);
      
      const itemData = {
        title: formData.title || 'Contenido destacado',
        description: formData.description,
        url: embedInfo.url,
        type: embedInfo.type,
        thumbnailUrl: embedInfo.type === 'youtube' 
          ? `https://img.youtube.com/vi/${embedInfo.url.split('/').pop()}/hqdefault.jpg` 
          : undefined,
      };
      
      if (editingItem && editingItem.id) {
        // Actualizar elemento existente
        const updatedItem = await updateFeaturedItemService(editingItem.id, itemData);
        setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
        toast({
          title: '¡Listo!',
          description: 'El contenido destacado se ha actualizado correctamente',
        });
      } else {
        // Crear nuevo elemento
        const newItem = await createFeaturedItemService(itemData);
        setItems([...items, newItem]);
        toast({
          title: '¡Listo!',
          description: 'El contenido destacado se ha agregado correctamente',
        });
      }
      
      // Resetear formulario
      setFormData({ title: '', description: '', url: '' });
      setPreviewData(null);
      setEditingItem(null);
      setIsDialogOpen(false);
      
    } catch (error: any) {
      console.error('Error al guardar contenido destacado:', error);
      const errorMessage = error.message || 'No se pudo guardar el contenido destacado. Intenta de nuevo.';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      
      // Si hay un error de autenticación, redirigir al login
      if (errorMessage.includes('No autorizado') || errorMessage.includes('401')) {
        // Aquí podrías redirigir al login si lo deseas
        console.log('Redirigiendo a login...');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditItem = (item: FeaturedItemType) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || '',
      url: item.url
    });
    
    // Configurar vista previa
    setPreviewData({
      url: item.url,
      type: item.type
    });
    
    setIsDialogOpen(true);
  };
  
  const handleDeleteItem = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este elemento destacado?')) {
      return;
    }
    
    try {
      await deleteFeaturedItemService(id);
      setItems(items.filter(item => item.id !== id));
      toast({
        title: 'Eliminado',
        description: 'El elemento destacado se ha eliminado correctamente',
      });
    } catch (error) {
      console.error('Error al eliminar elemento destacado:', error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el elemento destacado. Intenta de nuevo.',
        variant: 'destructive',
      });
    }
  };
  
  const getEmbedComponent = (item: FeaturedItemType) => {
    const commonClasses = 'w-full aspect-video bg-gray-100 rounded-lg overflow-hidden';
    
    switch (item.type) {
      case 'youtube':
      case 'vimeo':
        return (
          <div className={commonClasses}>
            <iframe
              src={item.url}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={item.title}
            />
          </div>
        );
      
      case 'spotify':
        return (
          <div className={`${commonClasses} bg-black`}>
            <iframe
              src={item.url}
              className="w-full h-full"
              frameBorder="0"
              allow="encrypted-media"
              title={item.title}
            />
          </div>
        );
      
      case 'soundcloud':
        return (
          <div className={commonClasses}>
            <iframe
              width="100%"
              height="166"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={item.url}
              title={item.title}
            />
          </div>
        );
      
      default:
        return (
          <div className={`${commonClasses} flex items-center justify-center p-4 bg-gray-50`}>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Ver enlace externo
            </a>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contenido Destacado</h2>
          <p className="text-sm text-gray-500">
            Comparte tus mejores trabajos, presentaciones o contenido multimedia
          </p>
        </div>
        <Button 
          onClick={() => {
            setEditingItem(null);
            setFormData({ title: '', description: '', url: '' });
            setPreviewData(null);
            setIsDialogOpen(true);
          }}
          className="bg-[#e74f05] hover:bg-[#d14704]"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Destacado
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No hay contenido destacado</h3>
          <p className="mt-1 text-sm text-gray-500 mb-4">
            Agrega enlaces a tus trabajos más destacados para mostrarlos en tu perfil.
          </p>
          <Button 
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar mi primer destacado
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                {getEmbedComponent(item)}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white"
                    aria-label="Editar destacado"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                      <path d="m15 5 4 4"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white"
                    aria-label="Eliminar destacado"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                {item.description && (
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setEditingItem(null);
          setFormData({ title: '', description: '', url: '' });
          setPreviewData(null);
        }
        setIsDialogOpen(open);
      }}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Editar contenido destacado' : 'Agregar contenido destacado'}
            </DialogTitle>
            <DialogDescription>
              Comparte enlaces de YouTube, Vimeo, Spotify o cualquier otro contenido que quieras destacar.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título (opcional)
              </label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ej: Mi último sencillo"
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (opcional)
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Añade una descripción para este contenido"
                rows={3}
                className="w-full"
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL del contenido <span className="text-red-500">*</span>
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Soporta: YouTube, Vimeo, Spotify, SoundCloud y más
              </p>
            </div>

            {previewData && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Vista previa:</p>
                <div className="border rounded-lg overflow-hidden">
                  {getEmbedComponent({
                    ...previewData,
                    id: 'preview',
                    title: formData.title || 'Vista previa',
                    description: formData.description || '',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    userId: 'preview',
                    thumbnailUrl: undefined
                  })}
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-[#e74f05] hover:bg-[#d14704]"
                disabled={!formData.url || isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : (editingItem ? 'Actualizar' : 'Agregar destacado')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
