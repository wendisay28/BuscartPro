"use client";

import { useState } from "react";
import { Plus, FileText, FileTextIcon, PenSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MobilePostFABProps = {
  onPostClick: () => void;
  onNoteClick: () => void;
  onBlogClick: () => void;
};

export const MobilePostFAB = ({
  onPostClick,
  onNoteClick,
  onBlogClick,
}: MobilePostFABProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 md:hidden">
      <div className="flex flex-col items-end gap-3">
        {isOpen && (
          <>
            <Button
              onClick={() => {
                onBlogClick();
                setIsOpen(false);
              }}
              className="rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg animate-in slide-in-from-bottom-2"
              title="Crear blog"
            >
              <FileTextIcon className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => {
                onNoteClick();
                setIsOpen(false);
              }}
              className="rounded-full w-12 h-12 p-0 bg-green-600 hover:bg-green-700 text-white shadow-lg animate-in slide-in-from-bottom-2"
              title="Crear nota"
            >
              <FileText className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => {
                onPostClick();
                setIsOpen(false);
              }}
              className="rounded-full w-12 h-12 p-0 bg-purple-600 hover:bg-purple-700 text-white shadow-lg animate-in slide-in-from-bottom-2"
              title="Crear post"
            >
              <PenSquare className="w-5 h-5" />
            </Button>
          </>
        )}
        <Button
          onClick={toggleMenu}
          className={cn(
            "rounded-full w-14 h-14 p-0 bg-[#bb00aa] hover:bg-[#d400c0] text-white shadow-xl transition-all duration-200 flex items-center justify-center",
            isOpen ? "rotate-45" : ""
          )}
          aria-label={isOpen ? "Cerrar menú" : "Crear publicación"}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};
