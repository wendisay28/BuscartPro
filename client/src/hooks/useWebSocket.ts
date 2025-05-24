
import { useEffect, useRef } from 'react';
import { WebSocketClient } from '@/lib/websocket';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';

/**
 * Hook para manejar conexiones WebSocket
 */
export function useWebSocket() {
  const { user } = useAuth();
  const { toast } = useToast();
  const wsRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    if (!wsRef.current) {
      wsRef.current = new WebSocketClient();
    }

    if (user?.id) {
      wsRef.current.authenticate(user.id);
    }

    return () => {
      wsRef.current?.disconnect();
    };
  }, [user?.id]);

  return wsRef.current;
}
