import axios from 'axios';
import { HiringRequest } from '@/types/hiring';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const createRequest = async (data: HiringRequest): Promise<HiringRequest> => {
  const response = await axios.post<HiringRequest>(`${API_URL}/hiring/requests`, data);
  return response.data;
};

export const respondToOffer = async (data: {
  offerId: string;
  status: 'accept' | 'reject';
  price?: number;
  message: string;
  userId: string;
}): Promise<any> => {
  const response = await axios.post(`${API_URL}/hiring/offers/${data.offerId}/respond`, data);
  return response.data;
};
