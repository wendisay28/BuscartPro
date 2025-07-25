"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  FileImage,
  MapPin,
  Mic,
  BarChart,
  Smile,
  Clock,
  Paperclip,
  X
} from "lucide-react";
import { useUserData } from "../../hooks/useUserData";

type CreatePostProps = {
  onPostCreated: (content: string, file?: File) => void;
  openPostModal: () => void;
  openBlogModal: () => void;
};

export default function CreatePost({
  onPostCreated,
  openPostModal,
  openBlogModal
}: CreatePostProps) {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { getUserInitials } = useUserData();

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
  };

  return (
    <Card className="bg-[#0d0d0d] border border-gray-700 rounded-md w-full mt-2 sm:mt-4">
      <CardContent className="p-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">{getUserInitials()}</span>
            </div>
            <Textarea
              placeholder="¿Qué quieres contarnos?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent border-none resize-none text-base text-white placeholder-gray-500 focus:ring-0 min-h-[40px] sm:min-h-[32px]"
              rows={1}
              maxLength={MAX_CHARACTERS + 50}
            />
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between bg-gray-800/30 rounded p-2">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Paperclip className="w-4 h-4" />
                <span className="truncate max-w-[200px]">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,video/*"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-[#bb00aa]"
              >
                <FileImage className="w-4 h-4" />
              </button>

              <button type="button" className="text-gray-400 hover:text-[#bb00aa]">
                <Mic className="w-4 h-4" />
              </button>

              <button type="button" className="text-gray-400 hover:text-[#bb00aa]">
                <MapPin className="w-4 h-4" />
              </button>

              <button type="button" className="text-gray-400 hover:text-[#bb00aa]">
                <BarChart className="w-4 h-4" />
              </button>

              <button type="button" className="text-gray-400 hover:text-[#bb00aa]">
                <Smile className="w-4 h-4" />
              </button>

              <button type="button" className="text-gray-400 hover:text-[#bb00aa]">
                <Clock className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-xs ${
                  isOverLimit ? "text-red-500" : "text-gray-400"
                }`}
              >
                {remainingCharacters}
              </span>

              <Button
                type="button"
                size="sm"
                onClick={openPostModal}
                className="h-7 px-3 text-xs bg-gray-800 text-white hover:bg-gray-700"
              >
                Crear Post
              </Button>

              <Button
                type="button"
                size="sm"
                onClick={openBlogModal}
                className="h-7 px-3 text-xs bg-gray-800 text-white hover:bg-gray-700"
              >
                Crear Blog
              </Button>

              <Button
                type="submit"
                size="sm"
                className={`h-7 px-4 text-xs rounded-full bg-[#bb00aa] hover:bg-[#d400c0] text-white ${
                  isOverLimit || !content.trim()
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
              >
                Publicar
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
