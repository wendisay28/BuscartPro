"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, FileText, Upload } from "lucide-react";

// ✅ PDF + Swiper
import { Document as PDFDocument, Page, pdfjs } from "react-pdf";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

// ✅ Config PDF.js worker - Versión compatible con react-pdf 5.7.2
if (typeof window !== 'undefined') {
  const pdfjsVersion = '2.16.105';
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;
  console.log(`PDF.js ${pdfjsVersion} configurado correctamente para react-pdf 5.7.2`);
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

type DocumentData = {
  title: string;
  description: string;
  file: File | null;
};

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: DocumentData) => void;
}

const DocumentModal: React.FC<DocumentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("El archivo es demasiado grande. Máximo 10MB.");
        return;
      }
      
      // Verificar que el archivo sea un PDF
      if (file.type !== 'application/pdf') {
        setError("Por favor, sube un archivo PDF válido.");
        return;
      }
      
      setError(null);
      setSelectedFile(file);
      
      // Establecer el título por defecto si no hay uno
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Por favor, selecciona un archivo PDF.");
      return;
    }
    
    if (!title.trim()) {
      setError("Por favor, ingresa un título para el documento.");
      return;
    }
    
    onSave({
      title: title.trim(),
      description: description.trim(),
      file: selectedFile
    });
    
    // Resetear el formulario
    setTitle("");
    setDescription("");
    setSelectedFile(null);
    setNumPages(null);
    setError(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setNumPages(null);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Compartir documento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título del documento <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Ej: Informe Anual 2023"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción (opcional)
              </label>
              <Textarea
                placeholder="Añade una descripción del documento..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Archivo PDF <span className="text-red-500">*</span>
              </label>

              {!selectedFile ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="flex justify-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Sube un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".pdf"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">o arrástralo aquí</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF hasta 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-1">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Vista previa del PDF */}
                  <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-700">Vista previa</h3>
                    <div className="h-64 overflow-auto rounded bg-white p-2">
                      <PDFDocument
                        file={selectedFile}
                        onLoadSuccess={({ numPages }) => {
                          console.log('PDF cargado correctamente. Número de páginas:', numPages);
                          setNumPages(numPages);
                        }}
                        onLoadError={(error) => {
                          console.error('Error al cargar el PDF:', error);
                          setError("No se pudo cargar la vista previa del PDF. Verifica que el archivo no esté dañado.");
                        }}
                        loading={
                          <div className="flex h-full flex-col items-center justify-center text-gray-500">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                            <p className="mt-2">Cargando vista previa...</p>
                          </div>
                        }
                        error={
                          <div className="flex h-full flex-col items-center justify-center text-red-500">
                            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mt-2 text-center">
                              No se pudo cargar la vista previa del PDF.<br />
                              <button
                                type="button"
                                onClick={() => setSelectedFile(selectedFile)}
                                className="mt-2 text-sm text-blue-600 hover:underline"
                              >
                                Reintentar
                              </button>
                            </p>
                          </div>
                        }
                      >
                        <Swiper
                          modules={[Navigation, Pagination]}
                          navigation
                          pagination={{ clickable: true }}
                          spaceBetween={20}
                          slidesPerView={1}
                          className="w-full"
                        >
                          {Array.from(new Array(numPages || 0), (_, index) => (
                            <SwiperSlide key={`page_${index + 1}`} className="flex justify-center">
                              <div className="shadow">
                                <Page
                                  pageNumber={index + 1}
                                  width={500}
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  loading={
                                    <div className="flex h-64 items-center justify-center">
                                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-blue-500"></div>
                                      <span className="ml-2">Cargando página {index + 1}...</span>
                                    </div>
                                  }
                                />
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </PDFDocument>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={!selectedFile}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || !title.trim()}
              className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              Subir documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentModal;
