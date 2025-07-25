"use client";

import { useState } from "react";
import { MobilePostFAB } from "./MobilePostFAB";
import { PostModal } from "./modals/PostModal";

// Type for the content creation handler
type ContentHandler = (content: string, file?: File) => void;

type MobilePostComposerProps = {
  onPostCreated: ContentHandler;
  onNoteCreated: ContentHandler;
  onBlogCreated: ContentHandler;
};

export const MobilePostComposer = ({
  onPostCreated,
  onNoteCreated,
  onBlogCreated,
}: MobilePostComposerProps) => {
  const [activeModal, setActiveModal] = useState<"post" | "note" | "blog" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (content: string) => {
    if (!content.trim()) return;
    
    switch (activeModal) {
      case "post":
        onPostCreated(content, selectedFile || undefined);
        break;
      case "note":
        onNoteCreated(content, selectedFile || undefined);
        break;
      case "blog":
        onBlogCreated(content, selectedFile || undefined);
        break;
    }
    
    setSelectedFile(null);
    setActiveModal(null);
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  return (
    <>
      <MobilePostFAB
        onPostClick={() => setActiveModal("post")}
        onNoteClick={() => setActiveModal("note")}
        onBlogClick={() => setActiveModal("blog")}
      />

      {/* Single Modal for all post types */}
      <PostModal
        isOpen={activeModal !== null}
        onClose={() => {
          setActiveModal(null);
          setSelectedFile(null);
        }}
        onSubmit={handleSubmit}
        title={
          activeModal === "post" 
            ? "Crear Publicación" 
            : activeModal === "note" 
            ? "Crear Nota" 
            : "Escribir Artículo"
        }
        placeholder={
          activeModal === "post" 
            ? "¿Qué estás pensando?" 
            : activeModal === "note" 
            ? "Escribe tu nota aquí..." 
            : "Escribe tu artículo aquí..."
        }
        isBlogPost={activeModal === "blog"}
        onFileSelect={handleFileSelect}
        selectedFile={selectedFile}
      />
    </>
  );
};
