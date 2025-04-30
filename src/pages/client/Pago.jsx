import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generarPreferencia } from '../../services/clienteApi'; // <== Importamos acá
import styles from './styles/Pago.module.css';

export default function Pago() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { carrito, subtotal } = state || { carrito: [], subtotal: 0 };

  const [preferenceId, setPreferenceId] = useState(null);
  const [direccion, setDireccion] = useState('');
  const [retiroTienda, setRetiroTienda] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initMercadoPago('TU_PUBLIC_KEY'); // tu Public Key de MercadoPago
  }, []);

  useEffect(() => {
    if (!carrito || carrito.length === 0) return;

    const crearPreferencia = async () => {
      try {
        const id = await generarPreferencia(carrito); // <== Usamos la función de services
        setPreferenceId(id);
      } catch (error) {
        console.error('Error generando preferencia:', error);
      } finally {
        setLoading(false);
      }
    };

    crearPreferencia();
  }, [carrito]);

  if (!carrito || carrito.length === 0) {
    return <div>No hay productos para pagar.</div>;
  }

  return (
    <div className={styles.pagoContainer}>
      <h2>Formulario de Pago</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Dirección de envío:</label>
        <input 
          type="text" 
          value={direccion} 
          onChange={(e) => setDireccion(e.target.value)} 
          disabled={retiroTienda}
        />

        <div className={styles.retiroOption}>
          <input 
            type="checkbox"
            checked={retiroTienda}
            onChange={() => setRetiroTienda(!retiroTienda)}
          />
          <label>¿Retirar en tienda?</label>
        </div>

        <h3>Total a pagar: S/ {subtotal.toFixed(2)}</h3>
      </form>

      {loading ? (
        <p>Cargando método de pago...</p>
      ) : (
        preferenceId && (
          <div className={styles.checkoutContainer}>
            <Wallet initialization={{ preferenceId }} />
          </div>
        )
      )}

      <button onClick={() => navigate('/carrito')}>Cancelar</button>
    </div>
  );
}
