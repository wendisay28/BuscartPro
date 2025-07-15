import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Phone, User, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

interface AcceptedOfferData {
  offerId: number;
  artistLocation: [number, number];
  eventLocation: string;
  artistName: string;
  artistPhone: string;
  estimatedArrival: string;
  proposedPrice: number;
}

interface AcceptedOfferProps {
  acceptedData: AcceptedOfferData;
  onClose: () => void;
}

export default function AcceptedOffer({ acceptedData, onClose }: AcceptedOfferProps) {
  const isMobile = useIsMobile();

  const containerClass = isMobile
    ? "fixed bottom-20 left-4 right-4 z-40"
    : "fixed left-6 top-20 w-96 z-30";

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 50 : 0, x: isMobile ? 0 : -50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={containerClass}
    >
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-green-800 dark:text-green-200">
                ¡Oferta Aceptada!
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200"
            >
              ×
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {acceptedData.artistName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Artista confirmado
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Llegada estimada: {acceptedData.estimatedArrival}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  El artista está en camino
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  ${acceptedData.proposedPrice.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Precio acordado
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-green-600 dark:text-green-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {acceptedData.eventLocation}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ubicación del evento
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-green-200 dark:border-green-800">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-green-300 text-green-700 hover:bg-green-100 dark:border-green-600 dark:text-green-300 dark:hover:bg-green-800"
              >
                <Phone className="w-4 h-4 mr-2" />
                Llamar al artista
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}