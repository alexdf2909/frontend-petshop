import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductoById, fetchVariantesByProducto, fetchLotesByVariante } from '../../services/api';
import { useState, useEffect } from 'react';
import styles from './styles/ProductDetail.module.css';
import Banner from '../../components/public/Banner';
import ImagenesModal from '../../components/public/ImagenesModal';
import { useCarrito } from '../../context/CarritoContext';
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { createHistorial } from '../../services/adminApi';

export default function ProductDetail() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { productoId } = useParams();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [seleccion, setSeleccion] = useState({ peso: '', talla: '', color: '' });
  const [varianteActual, setVarianteActual] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [cantidad, setCantidad] = useState(1);
const { carrito, agregarAlCarrito, quitarDelCarrito } = useCarrito(); // Hook del carrito

  const { data: producto, isLoading: cargandoProducto } = useQuery({
    queryKey: ['producto', productoId],
    queryFn: () => fetchProductoById(productoId),
  });

  const { data: variantesRaw, isLoading: cargandoVariantes } = useQuery({
    queryKey: ['variantes', productoId],
    queryFn: () => fetchVariantesByProducto(productoId),
  });

  const variantes = (variantesRaw || []).filter(v => !v.deleted && !v.producto?.deleted);

  const { data: lotes } = useQuery({
    queryKey: ['lotes', varianteActual?.varianteId],
    queryFn: () => fetchLotesByVariante(varianteActual.varianteId),
    enabled: !!varianteActual,
  });

  const variantesFiltradas = (filtros) => {
    return variantes.filter(v => {
      return (!filtros.peso || v.peso?.valor === filtros.peso) &&
             (!filtros.talla || v.talla?.valor === filtros.talla) &&
             (!filtros.color || v.color?.valor === filtros.color);
    });
  };

  const actualizarSeleccion = (nuevoValor, campo) => {
    const nuevoSeleccion = { ...seleccion, [campo]: nuevoValor };
    setSeleccion(nuevoSeleccion);

    const compatibles = variantesFiltradas(nuevoSeleccion);
    if (compatibles.length === 1) {
      const variante = compatibles[0];
      setVarianteActual(variante);
      setImagenSeleccionada(variante.imagenes?.[0]?.imagenUrl || null);
    } else {
      setVarianteActual(null);
      const primeraImagen = variantes.find(v => v.imagenes?.length > 0)?.imagenes[0]?.imagenUrl || null;
      setImagenSeleccionada(primeraImagen);
    }
  };

  const generarOpciones = (campo) => {
    if (!variantes) return [];
    const valoresUnicos = [...new Set(variantes.map(v => v[campo]?.valor).filter(Boolean))];
    return valoresUnicos.map(valor => {
      const posibleSeleccion = { ...seleccion, [campo]: valor };
      const compatibles = variantesFiltradas(posibleSeleccion);
      return { valor, habilitado: compatibles.length > 0 };
    });
  };

  const getTodasImagenes = () => {
    const imagenesSet = new Set();
    variantes.forEach(v => v.imagenes?.forEach(img => imagenesSet.add(img.imagenUrl)));
    return Array.from(imagenesSet);
  };

  const getRangoPrecios = () => {
    const precios = variantes.map(v => v.precioOferta);
    const min = Math.min(...precios);
    const max = Math.max(...precios);
    return { min, max };
  };

  const productoEnCarrito = carrito.find(item => item.varianteId === varianteActual?.varianteId);

const handleAgregarAlCarrito = async () => {
  if (!isLoggedIn) {
    toast.info('Debes iniciar sesión para agregar productos al carrito');
    navigate('/login');
    return;
  }

  if (varianteActual && cantidad > 0 && cantidad <= stockDisponible) {
    if (!productoEnCarrito) {
      agregarAlCarrito({
        productoId: producto.productoId,
        varianteId: varianteActual.varianteId,
        nombre: producto.nombre,
        imagen: varianteActual.imagenes[0]?.imagenUrl || '',
        precioUnitario: varianteActual.precioOferta,
        cantidad
      });

      toast.success(`Producto ${producto.nombre} agregado al carrito`);

      // 👇 Registrar interacción tipo "CARRITO"
      try {
        await createHistorial({
          productoId: producto.productoId,
          tipoInteraccion: 'CARRITO'
        });
      } catch (error) {
        console.error('Error al registrar interacción tipo CARRITO:', error.message);
      }

    } else {
      toast.info(`El producto "${producto.nombre}" ya está en el carrito`);
    }
  } else {
    toast.error('Cantidad inválida o stock insuficiente');
  }
};


const handleQuitarDelCarrito = () => {
  if (varianteActual) {
    quitarDelCarrito(varianteActual.varianteId);
    toast.warn(`Producto ${producto.nombre} removido del carrito`);
  }
};

  const handleCantidadChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > stockDisponible) value = stockDisponible;
    setCantidad(value);
  };
  
  

const isSeleccionInicializada = useRef(false);

useEffect(() => {
  if (!isSeleccionInicializada.current && variantes && variantes.length > 0) {
    if (seleccion.peso || seleccion.talla || seleccion.color || varianteActual) {
      isSeleccionInicializada.current = true; // Ya está inicializado
      return;
    }

    if (variantes.length === 1) {
      const unica = variantes[0];
      setSeleccion({
        peso: unica.peso?.valor || '',
        talla: unica.talla?.valor || '',
        color: unica.color?.valor || ''
      });
      setVarianteActual(unica);
      setImagenSeleccionada(unica.imagenes?.[0]?.imagenUrl || null);
    } else {
      setSeleccion({ peso: '', talla: '', color: '' });
      const primeraImagen = variantes.find(v => v.imagenes?.length > 0)?.imagenes[0]?.imagenUrl || null;
      setImagenSeleccionada(primeraImagen);
    }
    isSeleccionInicializada.current = true;
  }
}, [variantes, seleccion, varianteActual]);

useEffect(() => {
  const registrarVista = async () => {
    if (isLoggedIn && productoId) {
      try {
        await createHistorial({
          productoId: parseInt(productoId),
          tipoInteraccion: 'VISTA'
        });
      } catch (error) {
        console.error('Error al registrar interaccion:', error.message);
      }
    }
  };

  registrarVista();
}, [isLoggedIn, productoId]);


  const stockDisponible = (lotes || [])
    .filter(l => new Date(l.fechaVencimiento) > new Date())
    .reduce((acc, lote) => acc + lote.stock, 0);

  if (cargandoProducto || cargandoVariantes) return <div>Cargando...</div>;

  const imagenesPorMostrar = varianteActual
    ? varianteActual.imagenes?.map(img => img.imagenUrl)
    : getTodasImagenes();

  const { min: precioMin, max: precioMax } = getRangoPrecios();

  return (
    <div className={styles.containerPage}>
      <Banner />
      <div className={styles.contenedor}>
        <div className={styles.contenedorProducto}>
        <div className={styles.imagesSection}>
          <div className={styles.thumbnails}>
            {imagenesPorMostrar.slice(0, 4).map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt="miniatura"
                className={`${styles.thumbnail} ${imagenSeleccionada === url ? styles.active : ''}`}
                onClick={() => setImagenSeleccionada(url)}
              />
            ))}
            {imagenesPorMostrar.length > 4 && (
              <button className={styles.verMasBtn} onClick={() => setModalAbierto(true)}>Ver más</button>
            )}
          </div>

          {modalAbierto && (
            <ImagenesModal
              imagenes={imagenesPorMostrar}
              onClose={() => setModalAbierto(false)}
              onSelect={(url) => setImagenSeleccionada(url)}
            />
          )}
          <div className={styles.mainImage}>
            {imagenSeleccionada ? (
              <img src={imagenSeleccionada} alt="principal" />
            ) : (
              <div className={styles.noImage}>Selecciona una combinación para ver imagen</div>
            )}
          </div>
        </div>

      <div className={styles.infoSection}>
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <img src={producto.marca?.imagenUrl} alt={producto.marca?.nombre} className={styles.imagenMarca} />

        <div className={styles.infoContainTag}>
          <p className={styles.labelCategoria}>{producto.categoria?.nombre}</p>
          <p className={styles.labelEspecie}>{producto.especie?.nombre}</p>
          {producto.etiquetas?.map((etiqueta, index) => (
            <p key={index} className={styles.labelEtiqueta}>
              {etiqueta.nombre}
            </p>
          ))}
        </div>


        <div className={styles.variantButtons}>
          {['color', 'talla', 'peso'].map((campo) => {
            const opciones = generarOpciones(campo);
            if (opciones.length === 0) return null;

            return (
              <div key={campo} className={styles.variantGroup}>
                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                <div className={styles.variantOptions}>
                  {opciones.map(({ valor, habilitado }) => (
                    <button
                      key={valor}
                      disabled={!habilitado && seleccion[campo] !== valor}
                      className={`${styles.variantButton} ${seleccion[campo] === valor ? styles.selected : ''}`}
                      onClick={() =>
                        actualizarSeleccion(seleccion[campo] === valor ? '' : valor, campo)
                      }
                    >
                      {campo === 'color' ? (
                        <span
                          className={styles.colorSquare}
                          style={{ backgroundColor: valor }}
                          title={valor}
                        />
                      ) : (
                        valor
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {varianteActual ? (
          <>
          <p className={styles.precioOriginal}>S/ {varianteActual?.precioOriginal?.toFixed(2)}</p>
          <p className={styles.precioOferta}>S/ {varianteActual?.precioOferta?.toFixed(2)}</p>
            <p><strong>Stock:</strong> {stockDisponible}</p>
            {varianteActual && stockDisponible > 0 && (
  <div className={styles.compraSection}>
    <div className={styles.cantidadControl}>
      <label>Cantidad:</label>
      <input
  type="number"
  min="1"
  max={stockDisponible}
  value={cantidad}
  onChange={(e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > stockDisponible) val = stockDisponible;
    setCantidad(val);
  }}
  disabled={!varianteActual || cantidad < 1 || cantidad > stockDisponible}
/>
    </div>
    <p><strong>Total:</strong> S/ {(varianteActual.precioOferta * cantidad).toFixed(2)}</p>

    {productoEnCarrito ? (
      <button className={styles.botonQuitar} onClick={handleQuitarDelCarrito}>
        Quitar del Carrito
      </button>
    ) : (
      <button
  className={styles.botonAgregar}
  onClick={handleAgregarAlCarrito}
  disabled={cantidad < 1 || cantidad > stockDisponible}
>
  Agregar al Carrito
</button>
    )}
  </div>
)}
{varianteActual && stockDisponible === 0 && (
  <p className={styles.sinStock}>Sin stock disponible</p>
)}
            
            
          </>
        ) : (
          <p className={styles.precioOferta}>S/ {precioMin.toFixed(2)} - S/ {precioMax.toFixed(2)}</p>
        )}
      </div>
        </div>
      
    </div>
    </div>
  
  );
}