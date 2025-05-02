import styles from './styles/Carrito.module.css';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext'; // Ajusta la ruta si es diferente

export default function Carrito() {
  const navigate = useNavigate();
  const { carrito, quitarDelCarrito } = useCarrito();

  const subtotal = carrito.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

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
                  <p>Precio unitario: S/ {item.precioUnitario.toFixed(2)}</p>
                  <p>Subtotal: S/ {(item.precioUnitario * item.cantidad).toFixed(2)}</p>
                  <button onClick={() => quitarDelCarrito(item.varianteId)}>Eliminar</button>
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
