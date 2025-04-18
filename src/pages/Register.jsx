import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { registerUser } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  correo: Yup.string().email().required('El correo electrónico es obligatorio'),
  contrasena: Yup.string().min(4).required('La contraseña es obligatoria'),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await registerUser(data);  // Enviamos los datos al backend

      toast.success('Registro exitoso. ¡Bienvenido!');

      // Redirigir a la página de login o home después del registro exitoso
      navigate('/verificar', { state: { correo: data.correo } });
    } catch (err) {
        toast.error('Error al registrar el usuario: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="">Registro</h2>

        <div>
          <input {...register('nombre')} placeholder="Nombre" className="" />
          <p className="">{errors.name?.message}</p>
        </div>

        <div>
          <input {...register('correo')} placeholder="Correo" className="" />
          <p className="">{errors.email?.message}</p>
        </div>

        <div>
          <input {...register('contrasena')} type="password" placeholder="Contraseña" className="" />
          <p className="">{errors.password?.message}</p>
        </div>

        <button type="submit" className="">
          Registrar
        </button>
      </form>
    </div>
  );
}
