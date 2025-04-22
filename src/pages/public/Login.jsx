//src/pages/public/Login.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validations/schemas';
import { loginUser } from '../../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import './styles/Login.css'; // 👈 Importa el CSS

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const { accessToken, refreshToken } = await loginUser(data);
      login(accessToken, refreshToken);
      const decoded = jwtDecode(accessToken);
      const rol = decoded.rol;

      toast.success('Inicio de sesión exitoso');
      navigate('/');
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
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2 className="login-title">Iniciar sesión</h2>

        <div className="form-group">
          <input
            {...register('correo')}
            placeholder="Correo"
            className="form-input"
          />
          <p className="form-error">{errors.correo?.message}</p>
        </div>

        <div className="form-group">
          <input
            {...register('contrasena')}
            type="password"
            placeholder="Contraseña"
            className="form-input"
          />
          <p className="form-error">{errors.contrasena?.message}</p>
        </div>

        <button type="submit" className="form-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}