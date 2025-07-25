"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FileImage,
  FileText,
  Calendar,
  ThumbsUp,
  BarChart2,
  X,
  Pencil,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import DocumentModal from "./modals/DocumentModal";
import { EventModal } from "./modals/EventModal";
import { SurveyModal } from "./modals/SurveyModal";
import { RecommendationModal } from "./modals/RecommendationModal";

import type {
  DocumentData,
  EventData,
  SurveyData,
  RecommendationData,
} from "./modals/types";

type CreatePostModalProps = {
  open: boolean;
  onClose: () => void;
  onPostCreated: (content: string, file?: File) => void;
};

export const CreatePostModal = ({
  open,
  onClose,
  onPostCreated,
}: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [openEventModal, setOpenEventModal] = useState(false);
  const [openPollModal, setOpenPollModal] = useState(false);
  const [openRecommendationModal, setOpenRecommendationModal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_CHARACTERS = 280;
  const remainingCharacters = MAX_CHARACTERS - content.length;
  const isOverLimit = remainingCharacters < 0;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !selectedFile) return;
    if (isOverLimit) return;

    onPostCreated(content, selectedFile || undefined);
    setContent("");
    removeFile();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DialogContent className="bg-white text-gray-900 max-w-2xl w-full p-10 rounded-3xl shadow-2xl border-l-4 border-[#bb00aa] space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14">
              <AvatarImage src="/avatar.jpg" />
              <AvatarFallback>WN</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-bold text-base">Wendy Nieto</h4>
              <span className="text-sm text-gray-500">Publicar para Cualquiera</span>
            </div>
          </div>

          <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-200">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="¿Qué quieres compartir hoy?"
              className="min-h-[180px] w-full border-none bg-transparent focus:ring-0 text-base p-0 resize-none"
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
              <Pencil className="h-4 w-4 text-gray-400" />
              <span className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
                {remainingCharacters} restantes
              </span>
            </div>
          </div>

          {selectedFile && (
            <div className="relative border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-full max-h-80 object-contain"
              />
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 right-2 bg-gray-800 bg-opacity-60 rounded-full p-1"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-5 flex-wrap">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,video/*"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-1 text-sm hover:text-[#bb00aa] cursor-pointer"
                >
                  <FileImage className="h-5 w-5" />
                  <span>Foto/Video</span>
                </label>

                <button
                  type="button"
                  onClick={() => setOpenDocumentModal(true)}
                  className="flex items-center gap-1 text-sm hover:text-[#bb00aa]"
                >
                  <FileText className="h-5 w-5" />
                  <span>Documento</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenEventModal(true)}
                  className="flex items-center gap-1 text-sm hover:text-[#bb00aa]"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Evento</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenPollModal(true)}
                  className="flex items-center gap-1 text-sm hover:text-[#bb00aa]"
                >
                  <BarChart2 className="h-5 w-5" />
                  <span>Encuesta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOpenRecommendationModal(true)}
                  className="flex items-center gap-1 text-sm hover:text-[#bb00aa]"
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>Recomendación</span>
                </button>
              </div>

            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-sm"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="sm"
                onClick={handleSubmit}
                disabled={isOverLimit || (!content.trim() && !selectedFile)}
                className="bg-[#bb00aa] hover:bg-[#d400c0] text-white text-sm"
              >
                Publicar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DocumentModal
        isOpen={openDocumentModal}
        onClose={() => setOpenDocumentModal(false)}
        onSave={(data: DocumentData) => {
          console.log("Documento subido:", data);
          setOpenDocumentModal(false);
        }}
      />

      <EventModal
        isOpen={openEventModal}
        onClose={() => setOpenEventModal(false)}
        onSubmit={(data: EventData) => {
          console.log("Evento creado:", data);
          setOpenEventModal(false);
        }}
      />

      <SurveyModal
        isOpen={openPollModal}
        onClose={() => setOpenPollModal(false)}
        onSubmit={(data: SurveyData) => {
          console.log("Encuesta creada:", data);
          setOpenPollModal(false);
        }}
      />

      <RecommendationModal
        isOpen={openRecommendationModal}
        onClose={() => setOpenRecommendationModal(false)}
        onSubmit={(data: RecommendationData) => {
          console.log("Recomendación solicitada:", data);
          setOpenRecommendationModal(false);
        }}
      />
    </>
  );
};
