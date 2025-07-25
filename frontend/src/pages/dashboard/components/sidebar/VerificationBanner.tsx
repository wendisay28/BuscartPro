import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

export const VerificationBanner = () => {
  return (
    <Card className="bg-gradient-to-br from-primary via-purple-600 to-[#bb00aa] text-white border-0 w-full">
      <CardContent className="p-6 text-center">
        <Award className="h-8 w-8 mx-auto mb-3 text-white" />
        <h3 className="font-semibold mb-2">
          ¡Únete a nuestro programa de artistas verificados!
        </h3>
        <p className="text-sm mb-4 text-white/90">
          Más visibilidad y credibilidad en la plataforma.
        </p>
        <Button
          variant="secondary"
          size="sm"
          className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
        >
          Saber más
        </Button>
      </CardContent>
    </Card>
  );
};
