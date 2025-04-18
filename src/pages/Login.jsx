import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { loginUser } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode'; // 👈 Importa esto

const schema = Yup.object({
  correo: Yup.string().email('Correo inválido').required('Correo es obligatorio'),
  contrasena: Yup.string().required('Contraseña es obligatoria'),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // Ya no necesitamos leer el role desde el context aquí

  const onSubmit = async (data) => {
    try {
      const token = await loginUser(data); // Llamada al backend
      login(token); // Actualiza el contexto global

      const decoded = jwtDecode(token); // 👈 Decodificamos el token aquí mismo
      const rol = decoded.rol;

      toast.success('Inicio de sesión exitoso');

      // Redirigimos de inmediato sin esperar al context
      if (rol === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;

      if (errorMsg === 'Cuenta no verificada') {
        toast.error('Por favor, verifica tu cuenta.');
        navigate('/verificar', { state: { correo: data.correo } });
      } else {
        toast.error('Error al iniciar sesión: ' + errorMsg);
      }

    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <h2 className="">Iniciar sesión</h2>

        <div>
          <input {...register('correo')} placeholder="Correo" className="" />
          <p className="">{errors.correo?.message}</p>
        </div>

        <div>
          <input {...register('contrasena')} type="password" placeholder="Contraseña" className="" />
          <p className="">{errors.contrasena?.message}</p>
        </div>

        <button type="submit" className="">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
