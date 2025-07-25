import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

interface LaunchOfferButtonProps {
  onClick: () => void;
}

export function LaunchOfferButton({ onClick }: LaunchOfferButtonProps) {
  return (
    <Button 
      onClick={onClick}
      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
      size="lg"
    >
      <Rocket className="mr-3" size={20} />
      Lanzar Oferta Ahora
    </Button>
  );
}
