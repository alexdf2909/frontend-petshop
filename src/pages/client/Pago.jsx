//src/pages/client/pago.jsx
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generarPreferencia, completarPago  } from '../../services/clienteApi';
import styles from './styles/Pago.module.css';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';

export default function Pago() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { setCarrito } = useCarrito();


  const {
    carrito = [],
    subtotal = 0,
  } = state || {};

  const [preferenceId, setPreferenceId] = useState(null);
  const [modoEntrega, setModoEntrega] = useState('RETIRO');
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const token = localStorage.getItem('accessToken');
  const brickControllerRef = useRef(null);

 useEffect(() => {
  if (!preferenceId) return;

  const scriptId = 'mercadoPagoScript';
  const existingScript = document.getElementById(scriptId);

  const loadBrick = () => {
    const mp = new window.MercadoPago('TEST-438b7a5e-8dc6-4fb1-bfb5-0eb5c9cecfe6', { locale: 'es-PE' });
    const bricksBuilder = mp.bricks();

    const container = document.getElementById("paymentBrick_container");
    if (container) container.innerHTML = "";

    if (brickControllerRef.current) {
      brickControllerRef.current.unmount();
    }

    // Crear el nuevo brick
    bricksBuilder.create("payment", "paymentBrick_container", {
      initialization: {
        amount: subtotal,
      },
      customization: {
        paymentMethods: {
          creditCard: "all",
          debitCard: "all",
          maxInstallments: 1
        },
      },
      callbacks: {
        onReady: () => console.log("Brick listo"),
        onSubmit: ({ formData }) => {
          const dto = {
            carrito,
            montoTotal: subtotal,
            usuarioId: userId,
            direccionEnvio: modoEntrega === 'ENVIO' ? direccionEnvio : null,
            modoEntrega,
            pago: formData
          };

          return completarPago(dto)
            .then(text => {
              alert(text);
              setCarrito([]);
              navigate('/pedido');
            })
            .catch(err => {
              alert("Error al procesar el pago: " + err.message);
            });
        },
        onError: (error) => {
          console.error("Error en el Brick:", error);
        }
      }
    }).then(controller => {
      brickControllerRef.current = controller;
    });
  };

  if (existingScript) {
    loadBrick();
  } else {
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = loadBrick;
    document.body.appendChild(script);
  }

  return () => {
    if (brickControllerRef.current) {
      brickControllerRef.current.unmount();
    }
  };
}, [preferenceId, subtotal]);



  useEffect(() => {
    if (!carrito.length) return;

    const crearPreferencia = async () => {
      try {
        const id = await generarPreferencia(carrito);
        setPreferenceId(id);
      } catch (error) {
        console.error('Error generando preferencia:', error);
      }
    };

    crearPreferencia();
  }, [carrito]);

  return (
    <div className={styles.pagoContainer}>
      <h2>Resumen del Pedido</h2>

      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {item.nombre} x {item.cantidad} — S/ {item.precioUnitario}
          </li>
        ))}
      </ul>

      <p className={styles.total}><strong>Total:</strong> S/ {subtotal}</p>

      <div>
        <label>
          <input
            type="radio"
            value="RETIRO"
            checked={modoEntrega === 'RETIRO'}
            onChange={() => setModoEntrega('RETIRO')}
          />
          Retiro en tienda
        </label>
        <label>
          <input
            type="radio"
            value="ENVIO"
            checked={modoEntrega === 'ENVIO'}
            onChange={() => setModoEntrega('ENVIO')}
          />
          Envío a domicilio
        </label>
      </div>

      {modoEntrega === 'ENVIO' && (
        <div>
          <label>Dirección de envío:</label>
          <input
            type="text"
            value={direccionEnvio}
            onChange={(e) => setDireccionEnvio(e.target.value)}
            required
          />
        </div>
      )}

      <div id="paymentBrick_container" />
    </div>
  );
} 