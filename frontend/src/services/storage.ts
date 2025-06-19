import { api } from './api';
import { auth } from '@/lib/firebase';

export interface UploadResponse {
  message: string;
  fileName: string;
  publicUrl: string;
}

export const storageService = {
  async uploadFile(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('No authenticated user found');
    }
    
    const token = await currentUser.getIdToken();

    const response = await api.post<UploadResponse>('/storage/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  }
};
