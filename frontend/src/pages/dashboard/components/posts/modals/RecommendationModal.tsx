"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, MapPin, Tag, DollarSign, Mail, Phone, MessageSquare, AlertTriangle, Utensils, Hotel, Factory, Wrench, ShoppingBag, Calendar, Plane, HelpCircle, Check } from "lucide-react";
import { RecommendationData, RecommendationCategory } from "./types";

type RecommendationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RecommendationData) => void;
};

const categories: { value: RecommendationCategory; label: string; icon: JSX.Element }[] = [
  { value: 'restaurante', label: 'Restaurante', icon: <Utensils className="w-4 h-4" /> },
  { value: 'hotel', label: 'Hotel/Hospedaje', icon: <Hotel className="w-4 h-4" /> },
  { value: 'proveedor', label: 'Proveedor', icon: <Factory className="w-4 h-4" /> },
  { value: 'servicio', label: 'Servicio', icon: <Wrench className="w-4 h-4" /> },
  { value: 'producto', label: 'Producto', icon: <ShoppingBag className="w-4 h-4" /> },
  { value: 'evento', label: 'Evento', icon: <Calendar className="w-4 h-4" /> },
  { value: 'destino', label: 'Destino de viaje', icon: <Plane className="w-4 h-4" /> },
  { value: 'otro', label: 'Otro', icon: <HelpCircle className="w-4 h-4" /> },
];

const contactPreferences = [
  { value: 'mensaje', label: 'Mensaje', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'llamada', label: 'Llamada', icon: <Phone className="w-4 h-4" /> },
  { value: 'correo', label: 'Correo', icon: <Mail className="w-4 h-4" /> },
  { value: 'cualquiera', label: 'Cualquiera', icon: <Check className="w-4 h-4" /> },
];

export const RecommendationModal = ({ isOpen, onClose, onSubmit }: RecommendationModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<RecommendationCategory>('otro');
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [hasBudget, setHasBudget] = useState(false);
  const [budget, setBudget] = useState({ min: 0, max: 0, currency: 'USD' });
  const [contactPreference, setContactPreference] = useState<'mensaje' | 'llamada' | 'correo' | 'cualquiera'>('mensaje');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [exampleImage, setExampleImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Enfocar el campo de título cuando se abre el modal
  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setExampleImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setExampleImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentTag.trim() && tags.length < 5) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim().toLowerCase())) {
        setTags([...tags, currentTag.trim().toLowerCase()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      const recommendationData: RecommendationData = {
        title: title.trim(),
        category,
        location: location.trim(),
        description: description.trim(),
        isUrgent,
        contactPreference,
        tags,
        exampleImage: exampleImage || undefined,
        ...(hasBudget && { budget })
      };
      
      console.log("Datos de recomendación:", recommendationData);
      onSubmit(recommendationData);
      
      // Resetear formulario
      setTitle("");
      setCategory('otro');
      setLocation("");
      setDescription("");
      setIsUrgent(false);
      setHasBudget(false);
      setBudget({ min: 0, max: 0, currency: 'USD' });
      setContactPreference('mensaje');
      setTags([]);
      removeImage();
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const isFormValid = title.trim() && description.trim();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="inline-block w-5 h-5 mr-2" /> Solicitar Recomendación
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {/* Título */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  ¿Qué estás buscando? <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  ref={titleInputRef}
                  placeholder="Ej: Restaurante con terraza en el centro"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  maxLength={100}
                  required
                />
              </div>
              
              {/* Categoría */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.value)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                        category === cat.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      } transition-colors`}
                    >
                      <span className="text-xl mb-1">{cat.icon}</span>
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Ubicación */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Ubicación (opcional)
                </label>
                <Input
                  id="location"
                  placeholder="Ciudad, barrio o dirección"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                  maxLength={100}
                />
              </div>
              
              {/* Presupuesto */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Presupuesto (opcional)
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasBudget}
                      onChange={(e) => setHasBudget(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {hasBudget && (
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Mínimo</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          type="number"
                          value={budget.min || ""}
                          onChange={(e) => setBudget({...budget, min: Number(e.target.value) || 0})}
                          className="pl-6"
                          min={0}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Máximo</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                        <Input
                          type="number"
                          value={budget.max || ""}
                          onChange={(e) => setBudget({...budget, max: Number(e.target.value) || 0})}
                          className="pl-6"
                          min={budget.min || 0}
                          placeholder="Sin límite"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Moneda</label>
                      <select
                        value={budget.currency}
                        onChange={(e) => setBudget({...budget, currency: e.target.value})}
                        className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="MXN">MXN ($)</option>
                        <option value="COP">COP ($)</option>
                        <option value="PEN">PEN (S/)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Preferencia de contacto */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prefiero que me contacten por:
                </label>
                <div className="flex flex-wrap gap-2">
                  {contactPreferences.map((pref) => (
                    <button
                      key={pref.value}
                      type="button"
                      onClick={() => setContactPreference(pref.value as any)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
                        contactPreference === pref.value
                          ? 'bg-blue-100 text-blue-700 border border-blue-300'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-transparent'
                      } transition-colors`}
                    >
                      {pref.icon}
                      {pref.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Etiquetas (opcional)
                </label>
                <div className="border rounded-md p-2 min-h-[42px]">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-flex items-center bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="ml-1.5 text-blue-400 hover:text-blue-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <Input
                    type="text"
                    placeholder="Presiona Enter para agregar etiquetas"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyDown={addTag}
                    className="text-sm border-0 p-0 h-6 focus-visible:ring-0"
                    disabled={tags.length >= 5}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {tags.length}/5 etiquetas máx. (sin espacios, minúsculas)
                  </p>
                </div>
              </div>
              
              {/* Urgente */}
              <div className="flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                <div>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <span className="text-sm font-medium text-yellow-800">
                      Es urgente
                    </span>
                  </label>
                  <p className="text-xs text-yellow-700 mt-1">
                    Marca si necesitas recomendaciones lo antes posible
                  </p>
                </div>
              </div>
            </div>
            
            {/* Columna derecha */}
            <div className="space-y-4">
              {/* Descripción */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción detallada <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe con detalle lo que estás buscando. Cuanta más información proporciones, mejores serán las recomendaciones."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px]"
                  maxLength={1000}
                  required
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {description.length}/1000 caracteres
                </p>
              </div>
              
              {/* Imagen de ejemplo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen de ejemplo (opcional)
                </label>
                {exampleImage ? (
                  <div className="relative group">
                    <img 
                      src={URL.createObjectURL(exampleImage)} 
                      alt="Ejemplo" 
                      className="w-full h-40 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Eliminar imagen"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="space-y-1">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <span className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          Sube una imagen
                        </span>
                        <p className="pl-1">o arrástrala aquí</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF hasta 5MB
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publicando...
                </span>
              ) : (
                'Publicar solicitud'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
