"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText, BarChart2, Lightbulb, Calendar } from "lucide-react";
import { PostModal } from "./modals/PostModal";
import DocumentModal from "./modals/DocumentModal";
import { SurveyModal } from "./modals/SurveyModal";
import { RecommendationModal } from "./modals/RecommendationModal";
import { EventModal } from "./modals/EventModal";
import { PostData, DocumentData, SurveyData, RecommendationData, EventData } from "./modals/types";

type ModalType = 'post' | 'document' | 'survey' | 'recommendation' | 'event' | null;

export const PostComposer = () => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const handlePostSubmit = (content: string) => {
    console.log("Publicación creada:", content);
    // Aquí iría la lógica para enviar la publicación al servidor
    closeModal();
  };

  const handleDocumentSubmit = (data: DocumentData) => {
    console.log("Documento subido:", data);
    // Lógica para subir el documento
    closeModal();
  };

  const handleSurveySubmit = (data: SurveyData) => {
    console.log("Encuesta creada:", data);
    // Aquí iría la lógica para guardar la encuesta
    closeModal();
  };

  const handleRecommendationSubmit = (data: RecommendationData) => {
    console.log("Solicitud de recomendación:", data);
    // Aquí iría la lógica para guardar la solicitud de recomendación
    closeModal();
  };

  const handleEventSubmit = (data: EventData) => {
    console.log("Evento creado:", data);
    // Aquí iría la lógica para guardar el evento
    closeModal();
  };


  const closeModal = () => {
    setCurrentModal(null);
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={() => setCurrentModal('post')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Plus className="w-4 h-4" />
        Crear publicación
      </Button>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentModal('document')}
          className="flex items-center gap-1"
        >
          <FileText className="w-4 h-4 text-blue-600" /> Documento
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentModal('survey')}
          className="flex items-center gap-1"
        >
          <BarChart2 className="w-4 h-4 text-green-600" /> Encuesta
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentModal('recommendation')}
          className="flex items-center gap-1"
        >
          <Lightbulb className="w-4 h-4 text-purple-600" /> Recomendación
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setCurrentModal('event')}
          className="flex items-center gap-1"
        >
          <Calendar className="w-4 h-4 text-red-500" /> Evento
        </Button>
      </div>

      {/* Modales */}
      <PostModal
        isOpen={currentModal === 'post'}
        onClose={closeModal}
        onSubmit={handlePostSubmit}
        title="Crear Publicación"
        placeholder="¿En qué estás pensando?"
      />
      
      <DocumentModal 
        isOpen={currentModal === 'document'} 
        onClose={closeModal} 
        onSave={handleDocumentSubmit} 
      />
      
      <SurveyModal 
        isOpen={currentModal === 'survey'} 
        onClose={closeModal} 
        onSubmit={handleSurveySubmit} 
      />
      
      <RecommendationModal 
        isOpen={currentModal === 'recommendation'} 
        onClose={closeModal} 
        onSubmit={handleRecommendationSubmit} 
      />
      
      <EventModal 
        isOpen={currentModal === 'event'} 
        onClose={closeModal} 
        onSubmit={handleEventSubmit} 
      />
    </div>
  );
};
