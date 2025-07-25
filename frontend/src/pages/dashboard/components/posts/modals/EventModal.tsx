"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, MapPin, Users, Globe, Mic, Paintbrush, BookOpen, Handshake, PartyPopper, Trophy, Theater, CalendarDays, Clock } from "lucide-react";
import { EventData, EventType } from "./types";

type EventModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventData) => void;
};

const eventTypes: { value: EventType; label: string; icon: JSX.Element }[] = [
  { value: 'conferencia', label: 'Conferencia', icon: <Mic className="w-4 h-4" /> },
  { value: 'taller', label: 'Taller', icon: <Paintbrush className="w-4 h-4" /> },
  { value: 'seminario', label: 'Seminario', icon: <BookOpen className="w-4 h-4" /> },
  { value: 'networking', label: 'Networking', icon: <Handshake className="w-4 h-4" /> },
  { value: 'social', label: 'Evento Social', icon: <PartyPopper className="w-4 h-4" /> },
  { value: 'deportivo', label: 'Deportivo', icon: <Trophy className="w-4 h-4" /> },
  { value: 'cultural', label: 'Cultural', icon: <Theater className="w-4 h-4" /> },
  { value: 'otro', label: 'Otro', icon: <CalendarDays className="w-4 h-4" /> },
];

const currencies = [
  { value: 'USD', label: 'USD ($)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'MXN', label: 'MXN ($)' },
  { value: 'COP', label: 'COP ($)' },
  { value: 'PEN', label: 'PEN (S/)' },
];

export const EventModal = ({ isOpen, onClose, onSubmit }: EventModalProps) => {
  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState<EventType>('otro');
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [location, setLocation] = useState("");
  const [isVirtual, setIsVirtual] = useState(false);
  const [virtualLink, setVirtualLink] = useState("");
  const [maxAttendees, setMaxAttendees] = useState<number | undefined>(undefined);
  const [isFree, setIsFree] = useState(true);
  const [price, setPrice] = useState({ amount: 0, currency: 'USD' });
  const [organizer, setOrganizer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [registrationDeadline, setRegistrationDeadline] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Establecer fechas por defecto
  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const today = now.toISOString().split('T')[0];
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      setStartDate(today);
      setEndDate(tomorrowStr);
      setStartTime("10:00");
      setEndTime("12:00");
      
      // Establecer fecha límite de registro para el día anterior al evento
      const deadline = new Date(today);
      deadline.setDate(deadline.getDate() - 1);
      setRegistrationDeadline(deadline.toISOString().split('T')[0]);
      
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  }, [isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setImage(null);
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
    
    if (!title.trim() || !startDate || !startTime || !location) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    if (isVirtual && !virtualLink) {
      alert("Por favor ingresa el enlace para el evento virtual");
      return;
    }

    if (!isFree && price.amount <= 0) {
      alert("Por favor ingresa un monto válido para el evento de pago");
      return;
    }

    setIsSubmitting(true);

    // Simular envío
    setTimeout(() => {
      const eventData: EventData = {
        title: title.trim(),
        type: eventType,
        description: description.trim(),
        startDate,
        endDate: endDate || startDate,
        startTime: isAllDay ? '' : startTime,
        endTime: isAllDay ? '' : (endTime || startTime),
        isAllDay,
        location: location.trim(),
        isVirtual,
        virtualLink: isVirtual ? virtualLink.trim() : undefined,
        maxAttendees: maxAttendees && maxAttendees > 0 ? maxAttendees : undefined,
        price: !isFree ? {
          amount: price.amount,
          currency: price.currency,
          isFree: false
        } : undefined,
        organizer: organizer.trim() || 'Anónimo',
        tags,
        registrationDeadline: registrationDeadline || undefined,
        image: image || undefined
      };
      
      console.log("Datos del evento:", eventData);
      onSubmit(eventData);
      
      // Resetear formulario (parcialmente)
      setTitle("");
      setDescription("");
      setOrganizer("");
      setTags([]);
      setVirtualLink("");
      setMaxAttendees(undefined);
      setIsFree(true);
      setPrice({ amount: 0, currency: 'USD' });
      setImage(null);
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const isFormValid = title.trim() && startDate && (!isVirtual || virtualLink) && 
                     (isFree || price.amount > 0);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="inline-block w-5 h-5 mr-2" /> Crear Evento
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Columna 1: Información básica */}
            <div className="space-y-4 md:col-span-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Título del evento <span className="text-red-500">*</span>
                </label>
                <Input
                  id="title"
                  ref={titleInputRef}
                  placeholder="Ej: Taller de React Avanzado"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full"
                  maxLength={100}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de evento
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {eventTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setEventType(type.value)}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg border ${
                        eventType === type.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      } transition-colors`}
                    >
                      <span className="text-xl mb-1">{type.icon}</span>
                      <span className="text-xs">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe tu evento con detalle..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px]"
                  maxLength={2000}
                />
                <p className="text-xs text-gray-500 mt-1 text-right">
                  {description.length}/2000 caracteres
                </p>
              </div>
              
              {/* Fechas y horarios */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" /> Fechas y horarios
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de inicio <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="pl-10"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de finalización
                    </label>
                    <div className="relative">
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="pl-10"
                        min={startDate || new Date().toISOString().split('T')[0]}
                      />
                      <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  {!isAllDay && (
                    <>
                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Hora de inicio <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Input
                            id="startTime"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="pl-10"
                            required
                          />
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Hora de finalización
                        </label>
                        <div className="relative">
                          <Input
                            id="endTime"
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="pl-10"
                            min={startTime}
                          />
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allDay"
                      checked={isAllDay}
                      onChange={(e) => setIsAllDay(e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
                      Todo el día
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Ubicación */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Ubicación
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="inPerson"
                      name="eventLocation"
                      checked={!isVirtual}
                      onChange={() => setIsVirtual(false)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="inPerson" className="text-sm font-medium text-gray-700">
                      En persona
                    </label>
                    
                    <input
                      type="radio"
                      id="virtual"
                      name="eventLocation"
                      checked={isVirtual}
                      onChange={() => setIsVirtual(true)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 ml-4"
                    />
                    <label htmlFor="virtual" className="text-sm font-medium text-gray-700">
                      Virtual
                    </label>
                  </div>
                  
                  {isVirtual ? (
                    <div>
                      <label htmlFor="virtualLink" className="block text-sm font-medium text-gray-700 mb-1">
                        Enlace del evento <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="virtualLink"
                          type="url"
                          placeholder="https://ejemplo.com/sala-de-reunion"
                          value={virtualLink}
                          onChange={(e) => setVirtualLink(e.target.value)}
                          className="pl-10"
                          required={isVirtual}
                        />
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Dirección <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Input
                          id="location"
                          type="text"
                          placeholder="Ej: Av. Principal #123, Ciudad, País"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10"
                          required={!isVirtual}
                        />
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Columna 2: Configuración adicional */}
            <div className="space-y-4">
              {/* Imagen del evento */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen del evento
                </label>
                {image ? (
                  <div className="relative group">
                    <img 
                      src={URL.createObjectURL(image)} 
                      alt="Vista previa del evento" 
                      className="w-full h-48 object-cover rounded-md border"
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
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
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
                      <div className="text-sm text-gray-600">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Subir una imagen
                        </span>{' '}
                        o arrastrar y soltar
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
              
              {/* Configuración del evento */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Configuración
                </h3>
                
                <div>
                  <label htmlFor="maxAttendees" className="block text-sm font-medium text-gray-700 mb-1">
                    Límite de asistentes (opcional)
                  </label>
                  <div className="relative">
                    <Input
                      id="maxAttendees"
                      type="number"
                      min="1"
                      value={maxAttendees || ""}
                      onChange={(e) => setMaxAttendees(e.target.value ? parseInt(e.target.value) : undefined)}
                      placeholder="Ilimitado"
                      className="pl-10"
                    />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Precio
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="mr-2 text-sm font-medium text-gray-700">Gratis</span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={!isFree}
                              onChange={(e) => setIsFree(!e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-700">De pago</span>
                        </label>
                      </div>
                      
                      {!isFree && (
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          <div className="col-span-2">
                            <div className="relative">
                              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                              <Input
                                type="number"
                                min="0"
                                step="0.01"
                                value={price.amount || ""}
                                onChange={(e) => setPrice({...price, amount: parseFloat(e.target.value) || 0})}
                                className="pl-6"
                                placeholder="0.00"
                              />
                            </div>
                          </div>
                          <div>
                            <select
                              value={price.currency}
                              onChange={(e) => setPrice({...price, currency: e.target.value})}
                              className="w-full h-10 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {currencies.map((curr) => (
                                <option key={curr.value} value={curr.value}>
                                  {curr.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="organizer" className="block text-sm font-medium text-gray-700 mb-1">
                        Organizador
                      </label>
                      <Input
                        id="organizer"
                        type="text"
                        placeholder="Tu nombre o nombre de la organización"
                        value={organizer}
                        onChange={(e) => setOrganizer(e.target.value)}
                        className="w-full"
                        maxLength={100}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="registrationDeadline" className="block text-sm font-medium text-gray-700 mb-1">
                        Fecha límite de registro (opcional)
                      </label>
                      <div className="relative">
                        <Input
                          id="registrationDeadline"
                          type="date"
                          value={registrationDeadline}
                          onChange={(e) => setRegistrationDeadline(e.target.value)}
                          className="pl-10"
                          min={new Date().toISOString().split('T')[0]}
                          max={startDate}
                        />
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
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
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t">
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
                      Creando evento...
                    </span>
                  ) : (
                    'Crear evento'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      );
    };
