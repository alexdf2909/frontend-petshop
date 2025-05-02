// Pago.jsx
import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { generarPreferencia } from '../../services/clienteApi';
import styles from './styles/Pago.module.css';

export default function Pago() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { carrito, subtotal } = state || { carrito: [], subtotal: 0 };

  const [preferenceId, setPreferenceId] = useState(null);
  const token = localStorage.getItem('accessToken');
  const brickControllerRef = useRef(null); // ← referencia para controlar el Brick

  useEffect(() => {
    if (!preferenceId) return;

    const scriptId = 'mercadoPagoScript';
    const existingScript = document.getElementById(scriptId);

    console.log("Creando brick con preferenceId:", preferenceId);

    const loadBrick = () => {
      const mp = new window.MercadoPago('TEST-438b7a5e-8dc6-4fb1-bfb5-0eb5c9cecfe6', { locale: 'es-PE' });
      const bricksBuilder = mp.bricks();

      // Desmontar el brick anterior si existe
      if (brickControllerRef.current) {
        brickControllerRef.current.unmount();
      }

      // Crear nuevo brick
      bricksBuilder.create("payment", "paymentBrick_container", {
        mercadoPago: mp,
        preferenceId,
        initialization: {
          amount: subtotal,
          
          payer: {
            firstName: "",
            lastName: "",
            email: "",
            entityType: "individual"
          },
          
        },
        customization: {
          visual: {
            style: {
              theme: "default",
            },
          },
          paymentMethods: {
            creditCard: "all",
						debitCard: "all",
            maxInstallments: 1
          },
        },
        callbacks: {
          onReady: () => console.log("Brick listo"),
          onSubmit: ({ formData }) => {
            console.log(formData)
            return fetch("http://localhost:8080/pago/procesar", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(formData)
            })
            .then(async res => {
              if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
              }
              return res.text(); // ← backend retorna String plano
            })
            .then(text => {
              alert(text); // "Pago approved" o similar
            })
              .then(res => {
                alert("Pago procesado correctamente");
              })
              .catch(err => {
                alert("Ocurrió un error al procesar el pago: " + err.message);
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

    // Limpieza al desmontar el componente
    return () => {
      if (brickControllerRef.current) {
        brickControllerRef.current.unmount();
      }
    };
  }, [preferenceId, subtotal]);

  useEffect(() => {
    if (!carrito || carrito.length === 0) return;

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
      <h2>Formulario de Pago</h2>
      <h3>Total: S/ {subtotal.toFixed(2)}</h3>
      <div id="paymentBrick_container"></div>
      <button onClick={() => navigate('/carrito')}>Cancelar</button>
    </div>
  );
}
