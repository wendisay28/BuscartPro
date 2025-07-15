import { useEffect, useRef, useState } from "react";
import { ArtistResponse, ResponseStatus } from "../lib/types";

interface UseWebSocketOptions {
  offerId: number | null;
  onNewResponse?: (response: ArtistResponse) => void;
  onStatusUpdate?: (responseId: number, status: ResponseStatus) => void;
}

export function useWebSocket({ offerId }: UseWebSocketOptions) {
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000; // 3 segundos

  const connect = () => {
    if (!offerId || wsRef.current) return;

    try {
      // En desarrollo, simulamos la conexión
      if (process.env.NODE_ENV === 'development') {
        console.log('WebSocket: Simulando conexión en desarrollo');
        setConnected(true);
        return;
      }

      // Código de conexión WebSocket real comentado
      // const wsUrl = `wss://tu-api.com/ws/offers/${offerId}`;
      // wsRef.current = new WebSocket(wsUrl);
      
      // wsRef.current.onopen = () => {
      //   console.log('WebSocket: Conexión establecida');
      //   setConnected(true);
      //   reconnectAttemptsRef.current = 0;
      // };

      // wsRef.current.onclose = () => {
      //   console.log('WebSocket: Conexión cerrada');
      //   setConnected(false);
      //   handleReconnect();
      // };

      // wsRef.current.onerror = (error) => {
      //   console.error('WebSocket error:', error);
      //   setConnected(false);
      // };
      
    } catch (error) {
      console.error('Error al conectar WebSocket:', error);
      setConnected(false);
      handleReconnect();
    }
  };

  const handleReconnect = () => {
    if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
      console.warn('Máximo número de reconexiones alcanzado');
      return;
    }

    reconnectAttemptsRef.current += 1;
    console.log(`Intentando reconectar (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
    
    setTimeout(() => {
      connect();
    }, reconnectInterval);
  };

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [offerId]);

  return { connected };
}