import styles from './styles/Carrito.module.css';
import { useNavigate } from 'react-router-dom';

export default function Carrito({ carrito = [], setCarrito }) {
  const navigate = useNavigate();

  const eliminarDelCarrito = (varianteId) => {
    setCarrito(carrito.filter(item => item.varianteId !== varianteId));
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0); // carrito siempre es un array ahora

  const irAPagar = () => {
    navigate('/pago', { state: { carrito, subtotal } });
  };

  return (
    <div className={styles.carritoContainer}>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className={styles.listaCarrito}>
            {carrito.map(item => (
              <li key={item.varianteId} className={styles.itemCarrito}>
                <img src={item.imagen} alt={item.nombre} />
                <div>
                  <h4>{item.nombre}</h4>
                  <p>Cantidad: {item.cantidad}</p>
                  <p>Precio unitario: S/ {item.precio.toFixed(2)}</p>
                  <p>Subtotal: S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                  <button onClick={() => eliminarDelCarrito(item.varianteId)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.totalSection}>
            <h3>Total: S/ {subtotal.toFixed(2)}</h3>
            <button onClick={irAPagar}>Ir a Pagar</button>
          </div>
        </>
      )}
    </div>
  );
}
