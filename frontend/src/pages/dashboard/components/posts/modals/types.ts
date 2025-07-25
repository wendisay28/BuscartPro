// Tipos para los archivos multimedia
export type MediaFile = {
  file: File;
  preview: string;
  type: 'image' | 'video' | 'document';
};

// Tipos para las opciones de encuesta
export type PollOption = {
  id: string;
  text: string;
};

export type SurveyData = {
  question: string;
  options: PollOption[];
  isMultipleChoice: boolean;
  durationDays?: number;
};

// Tipos para eventos
export type EventType = 
  | 'conferencia' 
  | 'taller' 
  | 'seminario' 
  | 'networking' 
  | 'social' 
  | 'deportivo' 
  | 'cultural' 
  | 'otro';

export type EventData = {
  title: string;
  type: EventType;
  description: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  isAllDay: boolean;
  location: string;
  virtualLink?: string;
  isVirtual: boolean;
  maxAttendees?: number;
  price?: {
    amount: number;
    currency: string;
    isFree: boolean;
  };
  image?: File | null;
  organizer: string;
  tags: string[];
  registrationDeadline?: string;
};

// Tipos para las recomendaciones
export type RecommendationCategory = 
  | 'restaurante' 
  | 'hotel' 
  | 'proveedor' 
  | 'servicio' 
  | 'producto' 
  | 'evento' 
  | 'destino' 
  | 'otro';

export type RecommendationData = {
  title: string;
  category: RecommendationCategory;
  location: string;
  description: string;
  isUrgent: boolean;
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  contactPreference: 'mensaje' | 'llamada' | 'correo' | 'cualquiera';
  tags: string[];
  exampleImage?: File | null;
};

// Tipos para los logros
export type AchievementData = {
  title: string;
  message: string;
  image?: File | null;
};

// Tipo para las publicaciones normales
export type PostData = {
  content: string;
  media?: File | null;
};

// Tipo para los documentos
export type DocumentData = {
  title: string;
  description: string;
  file: File | null;
};
