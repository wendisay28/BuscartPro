import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { HiringRequest, ChatMessage } from '@/types/hiring';

export const useHiring = () => {
  const queryClient = useQueryClient();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<HiringRequest | null>(null);
  const [showChat, setShowChat] = useState(false);

  const { data: requests, isLoading } = useQuery({
    queryKey: ['hiring-requests'],
    queryFn: () => apiRequest('GET', '/api/hiring-requests')
  });

  const createRequestMutation = useMutation({
    mutationFn: (data: HiringRequest) => 
      apiRequest('POST', '/api/hiring-requests', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hiring-requests'] });
    }
  });

  const respondToOfferMutation = useMutation({
    mutationFn: ({ offerId, status }: { offerId: string; status: string }) =>
      apiRequest('POST', `/api/offers/${offerId}/respond`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hiring-requests'] });
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: (message: Omit<ChatMessage, 'id' | 'timestamp'>) =>
      apiRequest('POST', '/api/messages', message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    }
  });

  return {
    requests,
    isLoading,
    currentStep,
    setCurrentStep,
    selectedRequest,
    setSelectedRequest,
    showChat,
    setShowChat,
    createRequest: createRequestMutation.mutate,
    respondToOffer: respondToOfferMutation.mutate,
    sendMessage: sendMessageMutation.mutate
  };
};