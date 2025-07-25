"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Image, FileText, Smile, MapPin, Calendar } from "lucide-react";

type PostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  onFileSelect?: (file: File | null) => void;
  selectedFile?: File | null;
  title?: string;
  placeholder?: string;
  isBlogPost?: boolean;
};

export const PostModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onFileSelect,
  selectedFile: externalSelectedFile,
  title = 'Crear Publicación',
  placeholder = '¿En qué estás pensando?',
  isBlogPost = false
}: PostModalProps) => {
  const [internalSelectedFile, setInternalSelectedFile] = useState<File | null>(null);
  const selectedFile = externalSelectedFile !== undefined ? externalSelectedFile : internalSelectedFile;
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_CHARACTERS = 3000;
  const remainingCharacters = MAX_CHARACTERS - content.length;
  const isSubmitDisabled = !content.trim() && !selectedFile;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (onFileSelect) {
      onFileSelect(file);
    } else {
      setInternalSelectedFile(file);
    }
  };

  const removeFile = () => {
    if (onFileSelect) {
      onFileSelect(null);
    } else {
      setInternalSelectedFile(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;
    
    setIsUploading(true);
    
    // Call the onSubmit with just the content
    // The parent component will handle the file if needed
    onSubmit(content);
    
    // Reset form
    setContent("");
    if (!onFileSelect) {
      setInternalSelectedFile(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsUploading(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-600 font-medium">TU</span>
            </div>
            <div className="flex-1">
              <Textarea
                placeholder={placeholder}
                className={`border-0 text-base focus-visible:ring-0 focus-visible:ring-offset-0 p-0 ${isBlogPost ? 'min-h-[200px]' : 'min-h-[100px]'}`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={MAX_CHARACTERS}
              />
              
              {/* Contador de caracteres */}
              <div className="text-right text-xs text-gray-500 mt-1">
                {remainingCharacters} caracteres restantes
              </div>
              
              {/* Vista previa del archivo */}
              {selectedFile && (
                <div className="mt-4 relative border rounded-lg p-3">
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1 z-10"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  {selectedFile.type.startsWith('image/') ? (
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      className="max-h-60 w-auto rounded-md mx-auto"
                    />
                  ) : selectedFile.type.startsWith('video/') ? (
                    <video 
                      src={URL.createObjectURL(selectedFile)}
                      controls
                      className="max-h-60 w-auto rounded-md mx-auto"
                    />
                  ) : (
                    <div className="flex items-center space-x-3 p-3 border rounded">
                      <FileText className="w-6 h-6 text-blue-500" />
                      <div className="truncate flex-1">
                        <p className="font-medium truncate">{selectedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Barra de herramientas */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <div className="flex space-x-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="hidden"
                    id="media-upload"
                  />
                  <label
                    htmlFor="media-upload"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer"
                    title="Subir imagen o video"
                  >
                    <Image className="w-5 h-5" />
                  </label>
                  
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    title="Añadir emoji"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    title="Añadir ubicación"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                  
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    title="Programar publicación"
                  >
                    <Calendar className="w-5 h-5" />
                  </button>
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitDisabled || isUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publicando...
                    </span>
                  ) : (
                    'Publicar'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
