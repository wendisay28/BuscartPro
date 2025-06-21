import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EditProfileDialog({ open, onClose }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log("Datos enviados:", formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            placeholder="Nombre"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            placeholder="Apellido"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            placeholder="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            placeholder="Biografía"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-orange-500 hover:bg-orange-600">
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
