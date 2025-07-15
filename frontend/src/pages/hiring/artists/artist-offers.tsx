import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, CheckCircle, X, Wifi, WifiOff } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useWebSocket } from "../hooks/use-websocket";
import { apiRequest } from "@/lib/queryClient";
import { ArtistResponse, ArtistResponseWithArtist, Offer, ResponseStatus } from "../lib/types";
import { motion, AnimatePresence } from "framer-motion";

interface ArtistOffersProps {
  offerId: number | null;
  onOfferAccepted?: (acceptedData: {
    offerId: number;
    artistLocation: [number, number];
    eventLocation: any;
    artistName: string;
    artistPhone: string;
    estimatedArrival: string;
    proposedPrice: number;
  }) => void;
}

export default function ArtistOffers({ offerId, onOfferAccepted }: ArtistOffersProps) {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [animateCards, setAnimateCards] = useState(false);

  const { data: responses = [], isLoading } = useQuery<ArtistResponseWithArtist[]>({
    queryKey: ["offers", offerId, "responses"],
    enabled: !!offerId,
    refetchInterval: false, // Deshabilitamos el polling ya que usamos WebSocket
  });

  // Integración con WebSocket para actualizaciones en tiempo real
  const { connected: wsConnected } = useWebSocket({
    offerId,
    onNewResponse: (newResponse: ArtistResponse) => {
      // Aseguramos que el status sea del tipo correcto
      const responseWithCorrectStatus: ArtistResponseWithArtist = {
        ...newResponse,
        status: newResponse.status as ResponseStatus
      };

      // Actualizamos la caché con la nueva respuesta
      queryClient.setQueryData<ArtistResponseWithArtist[]>(
        ["offers", offerId, "responses"],
        (old = []) => {
          // Verificamos si la respuesta ya existe
          const exists = old.some((r) => r.id === newResponse.id);
          if (!exists) {
            return [...old, responseWithCorrectStatus];
          }
          return old;
        }
      );

      // Mostramos notificación toast
      toast({
        title: "Nueva propuesta recibida",
        description: `${newResponse.artist.name} ha enviado una propuesta de $${newResponse.proposedPrice.toLocaleString()}`,
      });
    },
    onStatusUpdate: (responseId: number, status: ResponseStatus) => {
      // Actualizamos la caché con el cambio de estado
      queryClient.setQueryData<ArtistResponseWithArtist[]>(
        ["offers", offerId, "responses"],
        (old = []) =>
          old.map((r) => 
            r.id === responseId 
              ? { ...r, status } 
              : r
          )
      );
    },
  });

  // Filtramos las respuestas rechazadas
  const activeResponses = responses.filter(
    (response: ArtistResponseWithArtist) => response.status !== "rejected"
  );

  const updateResponseMutation = useMutation({
    mutationFn: async ({
      responseId,
      status,
    }: {
      responseId: number;
      status: string;
    }): Promise<{ id: number; status: string }> => {
      // Use the generic type parameter to specify the expected response type
      return apiRequest<{ id: number; status: string }>(
        "PATCH", 
        `responses/${responseId}`, 
        { status }
      );
    },
    onSuccess: (data, variables) => {
      const action =
        variables.status === "accepted"
          ? "aceptada"
          : variables.status === "rejected"
          ? "rechazada"
          : "en negociación";

      toast({
        title: `Respuesta ${action}`,
        description: `Has ${action} la propuesta del artista.`,
      });
      queryClient.invalidateQueries({
        queryKey: ["offers", offerId, "responses"],
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "No se pudo actualizar la respuesta.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (activeResponses.length > 0 && !animateCards) {
      setAnimateCards(true);
    }
  }, [activeResponses.length, animateCards]);

  // Obtenemos los detalles de la oferta para la ubicación del evento
  const { data: offer } = useQuery<Offer>({
    queryKey: ["offers", offerId],
    enabled: !!offerId,
  });

  const handleAccept = (responseId: number) => {
    const response = activeResponses.find((r) => r.id === responseId);
    if (response && onOfferAccepted && offer) {
      // Calculamos el tiempo estimado de llegada (5-15 minutos)
      const estimatedMinutes = Math.floor(Math.random() * 10) + 5;
      const arrivalTime = new Date(Date.now() + estimatedMinutes * 60000);

      const acceptedData = {
        offerId: response.offerId,
        artistLocation: [
          parseFloat(response.artist.latitude),
          parseFloat(response.artist.longitude),
        ] as [number, number],
        eventLocation: offer.eventLocation,
        artistName: response.artist.name,
        artistPhone: "+57 300 123 4567", // Teléfono de ejemplo
        estimatedArrival: arrivalTime.toLocaleTimeString("es-CO", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        proposedPrice: response.proposedPrice,
      };

      onOfferAccepted(acceptedData);
      updateResponseMutation.mutate({ 
        responseId, 
        status: 'accepted' as const 
      });
    }
  };

  const handleReject = (responseId: number) => {
    updateResponseMutation.mutate({ 
      responseId, 
      status: 'rejected' as const 
    });
  };

  const handleNegotiate = (responseId: number) => {
    updateResponseMutation.mutate({ 
      responseId, 
      status: 'negotiating' as const 
    });
  };

  if (!offerId || isLoading) {
    return null;
  }

  if (activeResponses.length === 0) {
    return null;
  }

  const containerClass = isMobile
    ? "fixed top-4 left-4 right-4 z-30 space-y-3 max-h-[50vh] overflow-y-auto scrollbar-thin"
    : "fixed right-6 top-20 w-80 z-20 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin";

  return (
    <div className={containerClass}>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Propuestas recibidas ({activeResponses.length})
          </h3>
          <div className="flex items-center space-x-2">
            {wsConnected ? (
              <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                <Wifi className="w-4 h-4" />
                <span className="text-xs">En vivo</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1 text-gray-400">
                <WifiOff className="w-4 h-4" />
                <span className="text-xs">Desconectado</span>
              </div>
            )}
          </div>
        </div>
        <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${Math.min(activeResponses.length * 25, 100)}%` }}
          />
        </div>
      </div>

      <AnimatePresence>
        {activeResponses.map((response, index) => (
          <motion.div
            key={response.id}
            initial={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? -50 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : 100, y: isMobile ? -50 : 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card className="artist-card bg-white/90 dark:bg-black/90 backdrop-blur-custom border-gray-200 dark:border-gray-700 shadow-lg">
              <CardContent className={isMobile ? "p-3" : "p-4"}>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={
                      response.artist.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        response.artist.name
                      )}&background=C084FC&color=fff`
                    }
                    alt={response.artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {response.artist.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {response.artist.type}
                    </p>
                    {response.artist.specialties &&
                      response.artist.specialties.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {response.artist.specialties
                            .slice(0, 2)
                            .map((specialty, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                        </div>
                      )}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {response.artist.rating}
                      </span>
                    </div>
                    <p className="text-sm text-primary font-semibold">
                      ${response.proposedPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {response.message && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {response.message}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs text-gray-500">
                    Estado: {response.status}
                  </div>
                  <div
                    className={`flex ${
                      isMobile ? "space-x-1" : "space-x-2"
                    }`}
                  >
                    {response.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleAccept(response.id)}
                          disabled={updateResponseMutation.isPending}
                          className={`flex-1 bg-primary hover:bg-primary/90 text-white font-medium ${
                            isMobile ? "py-2 px-2" : "py-2 px-4"
                          } rounded-xl ${isMobile ? "text-xs" : "text-sm"}`}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Aceptar
                        </Button>
                        <Button
                          onClick={() => handleNegotiate(response.id)}
                          disabled={updateResponseMutation.isPending}
                          variant="outline"
                          className={`flex-1 border-primary text-primary hover:bg-primary hover:text-white font-medium ${
                            isMobile ? "py-2 px-2" : "py-2 px-4"
                          } rounded-xl ${isMobile ? "text-xs" : "text-sm"}`}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Negociar
                        </Button>
                        <Button
                          onClick={() => handleReject(response.id)}
                          disabled={updateResponseMutation.isPending}
                          variant="outline"
                          size="icon"
                          className={`border-red-300 text-red-500 hover:bg-red-500 hover:text-white rounded-xl ${
                            isMobile ? "w-8 h-8" : ""
                          }`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {response.status === "accepted" && (
                      <div className="flex-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-medium py-2 px-4 rounded-xl text-sm text-center">
                        ✅ Aceptado
                      </div>
                    )}
                    {response.status === "rejected" && (
                      <div className="flex-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-medium py-2 px-4 rounded-xl text-sm text-center">
                        ❌ Rechazado
                      </div>
                    )}
                    {response.status === "negotiating" && (
                      <div className="flex-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 font-medium py-2 px-4 rounded-xl text-sm text-center">
                        💬 Negociando
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
