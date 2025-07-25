"use client";

import { useState, useCallback, useRef, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  Image as ImageIcon,
  Code,
  Heading,
  Eye,
  Underline,
  Feather,
  Upload,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Crop,
  Check,
  X,
} from "lucide-react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/utils";

type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  userName: string;
};

export const CreateBlogPost = ({ open, onClose, userName }: Props) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [coverModalOpen, setCoverModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log("Publicar:", { title, subtitle, content, coverImage });
    onClose();
  };

  const handleSaveDraft = () => {
    console.log("Borrador:", { title, subtitle, content, coverImage });
    onClose();
  };

  const insertAtCursor = (text: string) => {
    const textarea = document.getElementById("content-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = content.substring(0, start);
    const after = content.substring(end);
    setContent(before + text + after);
  };

  const handleBold = () => insertAtCursor("**negrita**");
  const handleItalic = () => insertAtCursor("_cursiva_");
  const handleUnderline = () => insertAtCursor("<u>subrayado</u>");
  const handleLink = () => insertAtCursor("[texto del enlace](https://)");
  const handleList = () => insertAtCursor("- elemento de lista");
  const handleImage = () => insertAtCursor("![alt](url-de-imagen)");
  const handleCode = () => insertAtCursor("`código`");
  const handleHeading = () => insertAtCursor("# Encabezado");

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const uploadImageToServer = async (imageBlob: Blob, fileName: string) => {
    const formData = new FormData();
    formData.append('image', imageBlob, fileName);
    
    try {
      const response = await fetch('/api/v1/storage/blog/cover', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al subir la imagen');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      if (!imageSrc || !croppedAreaPixels) return;
      
      setIsUploading(true);
      setUploadProgress(0);
      
      // Get the cropped image as a blob
      const croppedImageBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      
      // Convert data URL to blob
      const response = await fetch(croppedImageBlob);
      const blob = await response.blob();
      
      // Upload to server
      const result = await uploadImageToServer(blob, `cover-${Date.now()}.jpg`);
      
      // Update the cover image with the server URL
      setCoverImage(result.imageUrl);
      setIsEditing(false);
    } catch (error) {
      console.error('Error processing image:', error);
      // Show error to user
      alert(error instanceof Error ? error.message : 'Error al procesar la imagen');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [croppedAreaPixels, imageSrc, rotation]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
        setCoverImage(imageUrl);
        setIsEditing(true);
      };
      
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setZoom(1);
    setRotation(0);
    setCrop({ x: 0, y: 0 });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-white text-gray-900 w-full max-w-4xl p-8 shadow-xl rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Feather className="w-5 h-5" /> Nueva entrada de blog
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-4">
            {/* Título y subtítulo */}
            <div className="flex flex-col space-y-1 border-b border-gray-200 pb-3">
              <Input
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-none border-b border-gray-300 rounded-none text-2xl font-serif font-bold placeholder-gray-400 focus:ring-0 focus:border-black px-0"
              />

              <Input
                placeholder="Subtítulo (opcional)"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="border-none border-b border-gray-100 rounded-none text-sm font-light placeholder-gray-400 focus:ring-0 focus:border-black px-0"
              />
            </div>

            {/* Barra de herramientas */}
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3 flex-wrap">
              <Button variant="ghost" size="icon" onClick={handleBold}>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleItalic}>
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleUnderline}>
                <Underline className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLink}>
                <LinkIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleList}>
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleImage}>
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleCode}>
                <Code className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleHeading}>
                <Heading className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCoverModalOpen(true)}
                className="ml-auto"
              >
                <Upload className="w-4 h-4 mr-1" />
                Imagen de portada
              </Button>
            </div>

            {/* Contenido */}
            <Textarea
              id="content-textarea"
              placeholder="Empieza a escribir aquí..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-none text-base placeholder-gray-500 min-h-[300px] focus:ring-0 focus:border-0 px-0"
            />

            {/* Acciones */}
            <div className="flex justify-between items-center pt-4 flex-wrap gap-2 border-t border-gray-200 mt-4">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-gray-500 hover:text-black"
                >
                  Cancelar
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="border-gray-300"
                >
                  Guardar borrador
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setPreviewOpen(true)}
                  className="flex items-center gap-1"
                >
                  <Eye className="w-4 h-4" /> Vista previa
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  Publicar
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de portada con edición */}
      <Dialog open={coverModalOpen} onOpenChange={(open) => {
        if (!open) {
          setCoverModalOpen(false);
          handleCancelEdit();
        }
      }}>
        <DialogContent className="bg-white text-gray-900 w-full max-w-3xl p-6 rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-700 mb-4">
              {isEditing ? 'Editar imagen de portada' : 'Selecciona imagen de portada'}
            </DialogTitle>
          </DialogHeader>

          <div className="relative aspect-video border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
            {coverImage ? (
              isEditing ? (
                <div className="relative w-full h-full">
                  <Cropper
                    image={imageSrc || ''}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    cropShape="rect"
                    showGrid={false}
                    objectFit="horizontal-cover"
                    classes={{
                      containerClassName: "bg-gray-900",
                      mediaClassName: "max-h-none"
                    }}
                  />
                </div>
              ) : (
                <img
                  src={coverImage}
                  alt="Portada"
                  className="w-full h-full object-cover"
                />
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No hay imagen cargada</span>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Zoom</span>
                    <span>{Math.round(zoom * 100)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ZoomOut className="w-4 h-4 text-gray-500" />
                    <Slider
                      value={[zoom]}
                      min={1}
                      max={3}
                      step={0.1}
                      onValueChange={(value) => setZoom(value[0])}
                      className="flex-1"
                    />
                    <ZoomIn className="w-4 h-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Rotación</span>
                    <span>{rotation}°</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCw className="w-4 h-4 text-gray-500" />
                    <Slider
                      value={[rotation]}
                      min={0}
                      max={360}
                      step={1}
                      onValueChange={(value) => setRotation(value[0])}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                <div className="flex justify-between pt-2">
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isUploading}
                    className="text-gray-700 border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <X className="w-4 h-4 mr-2" /> Cancelar
                  </Button>
                  <Button
                    onClick={showCroppedImage}
                    disabled={isUploading}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4 mr-2" /> Aplicar cambios
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Pegar URL de la imagen"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="flex-1"
                  />
                  {coverImage && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditImage}
                      className="whitespace-nowrap"
                    >
                      <Crop className="w-4 h-4 mr-1" /> Editar
                    </Button>
                  )}
                </div>
                <label className="block">
                  <span className="text-sm text-gray-600">o subir imagen:</span>
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    className="mt-1"
                  />
                </label>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => {
                    setCoverModalOpen(false);
                    handleCancelEdit();
                  }}
                  className="bg-black text-white hover:bg-gray-900"
                >
                  Guardar portada
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de vista previa */}
      <Dialog open={previewOpen} onOpenChange={() => setPreviewOpen(false)}>
        <DialogContent className="w-full max-w-sm h-[80vh] overflow-y-auto p-6 bg-white text-gray-900 rounded-lg shadow-xl">
          {coverImage && (
            <img
              src={coverImage}
              alt="Portada"
              className="w-full h-40 object-cover mb-4 rounded"
            />
          )}
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          {subtitle && <h2 className="text-md text-gray-600 mb-1">{subtitle}</h2>}
          <div className="text-sm text-gray-500 mb-4">
            {userName} • {new Date().toLocaleDateString()}
          </div>
          <div className="prose prose-sm text-gray-800 whitespace-pre-wrap">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
