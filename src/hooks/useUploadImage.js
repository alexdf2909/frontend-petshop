import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import useTokenHeader from './useTokenHeader';

export const useUploadImage = () => {
  const { headers } = useTokenHeader();

  const mutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/imagen/upload`, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    },
    onSuccess: () => {
      toast.success('Imagen subida exitosamente');
    },
    onError: () => {
      toast.error('Error al subir la imagen');
    },
  });

  return mutation;
};
