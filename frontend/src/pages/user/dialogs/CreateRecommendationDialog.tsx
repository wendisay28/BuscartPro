import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateRecommendationDialog({ open, onClose }: Props) {
  const [recData, setRecData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRecData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Recomendación publicada:", recData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Recomendación</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Título o pregunta"
            name="title"
            value={recData.title}
            onChange={handleChange}
          />
          <Textarea
            placeholder="¿Qué estás buscando o recomendando?"
            name="content"
            value={recData.content}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Publicar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
