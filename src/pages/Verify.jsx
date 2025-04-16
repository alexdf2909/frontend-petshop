import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { verifyUser } from '../services/auth'; // Importa la función de verificación

// Definimos el esquema de validación con Yup
const schema = Yup.object({
  correo: Yup.string().email('Correo inválido').required('Correo es obligatorio'),
  codigo: Yup.string().required('Código es obligatorio'),
});

export default function Verify() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Configuramos React Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Mutación de React Query para hacer la verificación
  const mutation = useMutation({
    mutationFn: verifyUser,
    onSuccess: () => {
      toast.success('¡Cuenta verificada con éxito!');
      navigate('/login');
    },
    onError: (err) => {
      toast.error('Error al verificar la cuenta: ' + (err.response?.data?.message || err.message));
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Llamamos a la mutación de React Query para verificar el código
    mutation.mutate({
      correo: data.correo,
      codigo: data.codigo,
    });
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="">Verificar Cuenta</h2>

        {/* Campo de correo */}
        <div>
          <input
            type="email"
            placeholder="Correo electrónico"
            {...register('correo')}
            className=""
          />
          <p className="">{errors.correo?.message}</p>
        </div>

        {/* Campo de código */}
        <div>
          <input
            type="text"
            placeholder="Código de verificación"
            {...register('codigo')}
            className=""
          />
          <p className="">{errors.codigo?.message}</p>
        </div>

        {/* Botón de submit */}
        <button
          type="submit"
          className=""
          disabled={isSubmitting || mutation.isLoading}
        >
          {mutation.isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
}