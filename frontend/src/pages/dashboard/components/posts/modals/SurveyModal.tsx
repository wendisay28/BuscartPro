"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Plus, Check, Trash2, CheckSquare, Square } from "lucide-react";
import { SurveyData, PollOption } from "./types";

type SurveyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SurveyData) => void;
};

export const SurveyModal = ({ isOpen, onClose, onSubmit }: SurveyModalProps) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: crypto.randomUUID(), text: "" },
    { id: crypto.randomUUID(), text: "" },
  ]);
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [durationDays, setDurationDays] = useState<number | undefined>(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionInputRef = useRef<HTMLInputElement>(null);

  // Enfocar el campo de pregunta cuando se abre el modal
  useEffect(() => {
    if (isOpen && questionInputRef.current) {
      questionInputRef.current.focus();
    }
  }, [isOpen]);

  const addOption = () => {
    if (options.length >= 10) return;
    setOptions([...options, { id: crypto.randomUUID(), text: "" }]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) return; // Mínimo 2 opciones
    setOptions(options.filter((opt) => opt.id !== id));
  };

  const updateOption = (id: string, text: string) => {
    setOptions(
      options.map((opt) => (opt.id === id ? { ...opt, text } : opt))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación
    if (!question.trim()) {
      alert("Por favor ingresa una pregunta");
      return;
    }
    
    const validOptions = options.filter((opt) => opt.text.trim() !== "");
    if (validOptions.length < 2) {
      alert("Debes ingresar al menos dos opciones");
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío
    setTimeout(() => {
      onSubmit({
        question: question.trim(),
        options: validOptions,
        isMultipleChoice,
        durationDays: durationDays || undefined,
      });
      
      // Resetear formulario
      setQuestion("");
      setOptions([
        { id: crypto.randomUUID(), text: "" },
        { id: crypto.randomUUID(), text: "" },
      ]);
      setIsMultipleChoice(false);
      setDurationDays(7);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const isFormValid = question.trim() && options.filter(opt => opt.text.trim()).length >= 2;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Crear encuesta</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Pregunta <span className="text-red-500">*</span>
            </label>
            <Input
              id="question"
              ref={questionInputRef}
              placeholder="Ej: ¿Cuál es tu lenguaje de programación favorito?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full"
              maxLength={200}
              required
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Opciones <span className="text-red-500">*</span>
                <span className="text-xs text-gray-500 ml-2">
                  (mín. 2, máx. 10)
                </span>
              </label>
              <Button
                type="button"
                onClick={addOption}
                disabled={options.length >= 10}
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Añadir opción
              </Button>
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {options.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`Opción ${index + 1}`}
                      value={option.text}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      className="pl-8"
                      maxLength={100}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      {isMultipleChoice ? (
                        <Square className="w-4 h-4" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-400" />
                      )}
                    </span>
                  </div>
                  {options.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeOption(option.id)}
                      title="Eliminar opción"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                Permitir múltiples respuestas
              </label>
              <button
                type="button"
                onClick={() => setIsMultipleChoice(!isMultipleChoice)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  isMultipleChoice ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isMultipleChoice ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                Duración:
              </label>
              <select
                id="duration"
                value={durationDays || ''}
                onChange={(e) => setDurationDays(e.target.value ? Number(e.target.value) : undefined)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="1">1 día</option>
                <option value="3">3 días</option>
                <option value="7">1 semana</option>
                <option value="14">2 semanas</option>
                <option value="30">1 mes</option>
                <option value="">Sin límite</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
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
                  Creando...
                </span>
              ) : (
                'Crear encuesta'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
