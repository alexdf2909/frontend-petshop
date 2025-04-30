import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductoById, fetchVariantesByProducto, fetchLotesByVariante } from '../../services/api';
import { useState, useEffect } from 'react';
import styles from './styles/ProductDetail.module.css';
import Banner from '../../components/public/Banner';
import ImagenesModal from '../../components/public/ImagenesModal';
import { useCarrito } from '../../context/CarritoContext';

export default function ProductDetail() {
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

  const { data: variantes, isLoading: cargandoVariantes } = useQuery({
    queryKey: ['variantes', productoId],
    queryFn: () => fetchVariantesByProducto(productoId),
  });

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

const handleAgregarAlCarrito = () => {
  if (varianteActual && cantidad > 0 && cantidad <= stockDisponible) {
    if (!productoEnCarrito) {  // Solo agregar si no está en el carrito
      agregarAlCarrito({
        productoId: producto.productoId,
        varianteId: varianteActual.varianteId,
        nombre: producto.nombre,
        imagen: varianteActual.imagenes[0],
        precioUnitario: varianteActual.precioOferta,
        cantidad
      });
    }
  }
};
  
  const handleQuitarDelCarrito = () => {
    if (varianteActual) {
      quitarDelCarrito(varianteActual.varianteId);
    }
  };

  const handleCantidadChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) value = 1;
    if (value > stockDisponible) value = stockDisponible;
    setCantidad(value);
  };
  
  

  useEffect(() => {
    if (variantes && variantes.length > 0) {
      setSeleccion({ peso: '', talla: '', color: '' });
      const primeraImagen = variantes.find(v => v.imagenes?.length > 0)?.imagenes[0]?.imagenUrl || null;
      setImagenSeleccionada(primeraImagen);

      if (variantes.length === 1) {
        const unica = variantes[0];
        setSeleccion({
          peso: unica.peso?.valor || '',
          talla: unica.talla?.valor || '',
          color: unica.color?.valor || ''
        });
        setVarianteActual(unica);
        setImagenSeleccionada(unica.imagenes?.[0]?.imagenUrl || null);
      }
    }
  }, [variantes]);

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
        onChange={(e) => setCantidad(Math.min(Math.max(1, Number(e.target.value)), stockDisponible))}
      />
    </div>
    <p><strong>Total:</strong> S/ {(varianteActual.precioOferta * cantidad).toFixed(2)}</p>

    {productoEnCarrito ? (
      <button className={styles.botonQuitar} onClick={handleQuitarDelCarrito}>
        Quitar del Carrito
      </button>
    ) : (
      <button className={styles.botonAgregar} onClick={handleAgregarAlCarrito}>
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