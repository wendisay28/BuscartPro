import { useState } from 'react';
import { storageService } from '@/services/storage';

interface FileUploadProps {
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: Error) => void;
  acceptedTypes?: string;
  maxSize?: number; // en bytes
}

export function FileUpload({
  onUploadSuccess,
  onUploadError,
  acceptedTypes = 'image/*',
  maxSize = 5 * 1024 * 1024 // 5MB por defecto
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.match(acceptedTypes)) {
      setError('Tipo de archivo no permitido');
      return;
    }

    // Validar tamaño
    if (file.size > maxSize) {
      setError(`El archivo excede el tamaño máximo de ${maxSize / 1024 / 1024}MB`);
      return;
    }

    setError('');
    setUploading(true);

    try {
      const result = await storageService.uploadFile(file);
      onUploadSuccess?.(result.publicUrl);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Error al subir el archivo');
      setError(error.message);
      onUploadError?.(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
        <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          {uploading ? 'Subiendo...' : 'Seleccionar archivo'}
        </span>
        <input
          type="file"
          className="sr-only"
          onChange={handleFileChange}
          accept={acceptedTypes}
          disabled={uploading}
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
