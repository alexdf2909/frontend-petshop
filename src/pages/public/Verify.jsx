import { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { verifyUser } from '../../services/auth';
import "./styles/Verify.css";

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const correo = location.state?.correo || '';

  const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newCodigo = [...codigo];
    newCodigo[index] = value;
    setCodigo(newCodigo);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

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

  const onSubmit = (e) => {
    e.preventDefault();
    const codigoFinal = codigo.join('');
    if (codigoFinal.length !== 6) {
      toast.error('Ingresa el código completo');
      return;
    }

    mutation.mutate({ correo, codigo: codigoFinal });
  };

  return (
    <div className="verify-container containerPage">
      <form onSubmit={onSubmit} className="verify-form">
        <h2>Verificar Cuenta</h2>

        <p>Se ha enviado un código a <strong>{correo}</strong></p>

        <div className="codigo-inputs">
          {codigo.map((num, i) => (
            <input
              key={i}
              ref={el => inputsRef.current[i] = el}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className="codigo-box"
            />
          ))}
        </div>

        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
}
