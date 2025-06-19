import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EventForm } from "@/components/event/event-form";

export default function CreateEventPage() {
  const { user, loading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!isAuthLoading && !user) {
      // Redirigir al login si no está autenticado
      toast({
        title: "Acceso requerido",
        description: "Debes iniciar sesión para crear un evento.",
        variant: "destructive",
      });
      navigate("/login", { state: { from: "/events/create" } });
    }
  }, [user, isAuthLoading, navigate, toast]);

  if (isAuthLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Crear nuevo evento</h1>
      <EventForm />
    </div>
  );
}
