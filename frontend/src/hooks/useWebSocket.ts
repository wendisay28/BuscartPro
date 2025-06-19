
import { useEffect, useRef } from 'react';
import { WebSocketClient } from '@/lib/websocket';
import { useAuth } from './useAuth';

/**
 * Hook para manejar conexiones WebSocket
 */
export function useWebSocket() {
  const { user } = useAuth();
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
