import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CreateEventDialog({ open, onClose }: Props) {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Nuevo evento:", eventData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Evento</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Título del evento"
            name="title"
            value={eventData.title}
            onChange={handleChange}
          />
          <Input
            placeholder="Fecha (YYYY-MM-DD)"
            name="date"
            value={eventData.date}
            onChange={handleChange}
          />
          <Input
            placeholder="Lugar"
            name="location"
            value={eventData.location}
            onChange={handleChange}
          />
          <Input
            placeholder="Descripción"
            name="description"
            value={eventData.description}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Crear Evento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
