import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { registerUser } from '../../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css'; // 👈 Importa el CSS

const schema = Yup.object({
  nombre: Yup.string().required('El nombre es obligatorio'),
  correo: Yup.string().email('Correo inválido').required('El correo electrónico es obligatorio'),
  contrasena: Yup.string().min(4, 'La contraseña debe tener al menos 4 caracteres').required('La contraseña es obligatoria'),
});

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('Registro exitoso. ¡Bienvenido!');
      navigate('/verificar', { state: { correo: data.correo } });
    } catch (err) {
      toast.error('Error al registrar el usuario: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="register-container containerPage">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2 className="register-title">Registro</h2>

        <div className="form-group">
          <input {...register('nombre')} placeholder="Nombre" className="form-input" />
          <p className="form-error">{errors.nombre?.message}</p>
        </div>

        <div className="form-group">
          <input {...register('correo')} placeholder="Correo" className="form-input" />
          <p className="form-error">{errors.correo?.message}</p>
        </div>

        <div className="form-group">
          <input {...register('contrasena')} type="password" placeholder="Contraseña" className="form-input" />
          <p className="form-error">{errors.contrasena?.message}</p>
        </div>

        <button type="submit" className="form-button">
          Registrar
        </button>
      </form>
    </div>
  );
}