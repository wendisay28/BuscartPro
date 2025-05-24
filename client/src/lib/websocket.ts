import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface WebSocketMessage {
  type: string;
  data?: any;
  message?: string;
}

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private messageHandlers: Map<string, ((data: any) => void)[]> = new Map();
  private isConnecting = false;
  private userId: string | null = null;

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.isConnecting || this.ws?.readyState === WebSocket.OPEN) {
      return;
    }

    this.isConnecting = true;

    try {
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const host = process.env.NODE_ENV === 'production' ? window.location.host : '0.0.0.0:5000';
      const wsUrl = `${protocol}//${host}/ws`;
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        
        // Authenticate with user ID if available
        if (this.userId) {
          this.authenticate(this.userId);
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          this.handleMessage(message);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      this.ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        this.isConnecting = false;
        this.ws = null;
        
        // Attempt to reconnect if not a clean close
        if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnect();
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnecting = false;
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      this.isConnecting = false;
    }
  }

  private reconnect() {
    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts}) in ${delay}ms`);
    
    setTimeout(() => {
      this.connect();
    }, delay);
  }

  private handleMessage(message: WebSocketMessage) {
    const handlers = this.messageHandlers.get(message.type) || [];
    handlers.forEach(handler => {
      try {
        handler(message.data || message);
      } catch (error) {
        console.error('Error handling WebSocket message:', error);
      }
    });
  }

  public authenticate(userId: string) {
    this.userId = userId;
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.send({
        type: 'auth',
        userId: userId
      });
    }
  }

  public send(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }

  public subscribe(messageType: string, handler: (data: any) => void) {
    if (!this.messageHandlers.has(messageType)) {
      this.messageHandlers.set(messageType, []);
    }
    this.messageHandlers.get(messageType)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.messageHandlers.get(messageType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  public disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnect');
    }
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

// Global WebSocket client instance
let wsClient: WebSocketClient | null = null;

export function getWebSocketClient(): WebSocketClient {
  if (!wsClient) {
    wsClient = new WebSocketClient();
  }
  return wsClient;
}

// React hook for using WebSocket
export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const clientRef = useRef<WebSocketClient | null>(null);

  useEffect(() => {
    clientRef.current = getWebSocketClient();

    const checkConnection = () => {
      setIsConnected(clientRef.current?.isConnected() || false);
    };

    // Check connection status periodically
    const intervalId = setInterval(checkConnection, 1000);
    checkConnection();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (user?.id && clientRef.current) {
      clientRef.current.authenticate(user.id);
    }
  }, [user?.id]);

  // Set up notification handlers
  useEffect(() => {
    if (!clientRef.current) return;

    const unsubscribeHiringRequest = clientRef.current.subscribe('hiring_request', (data) => {
      toast({
        title: "Nueva solicitud de contratación",
        description: `Solicitud para: ${data.data?.description || 'Servicio artístico'}`,
      });
    });

    const unsubscribeHiringResponse = clientRef.current.subscribe('hiring_response', (data) => {
      toast({
        title: "Nueva respuesta",
        description: `${data.artist?.artistName} respondió a tu solicitud`,
      });
    });

    const unsubscribeNewMessage = clientRef.current.subscribe('new_message', (data) => {
      toast({
        title: "Nuevo mensaje",
        description: "Tienes un nuevo mensaje",
      });
    });

    const unsubscribeAuthSuccess = clientRef.current.subscribe('auth_success', (data) => {
      console.log('WebSocket authenticated successfully');
    });

    return () => {
      unsubscribeHiringRequest();
      unsubscribeHiringResponse();
      unsubscribeNewMessage();
      unsubscribeAuthSuccess();
    };
  }, [toast]);

  const sendMessage = (message: any) => {
    clientRef.current?.send(message);
  };

  const subscribe = (messageType: string, handler: (data: any) => void) => {
    return clientRef.current?.subscribe(messageType, handler);
  };

  return {
    isConnected,
    sendMessage,
    subscribe,
    client: clientRef.current
  };
}

// Utility functions for common WebSocket operations
export const webSocketUtils = {
  // Send a hiring request notification
  sendHiringRequest: (requestData: any) => {
    const client = getWebSocketClient();
    client.send({
      type: 'hiring_request_created',
      data: requestData
    });
  },

  // Send a hiring response notification
  sendHiringResponse: (responseData: any) => {
    const client = getWebSocketClient();
    client.send({
      type: 'hiring_response_created',
      data: responseData
    });
  },

  // Send a message notification
  sendMessage: (messageData: any) => {
    const client = getWebSocketClient();
    client.send({
      type: 'message_sent',
      data: messageData
    });
  },

  // Send user status update
  updateUserStatus: (status: 'online' | 'offline' | 'away') => {
    const client = getWebSocketClient();
    client.send({
      type: 'user_status_update',
      data: { status }
    });
  }
};
