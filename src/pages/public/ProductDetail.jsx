import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductoById, fetchVariantesByProducto, fetchLotesByVariante } from '../../services/api';
import { useState, useEffect } from 'react';
import './styles/ProductDetail.css';

export default function ProductDetail() {
  const { productoId } = useParams();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [seleccion, setSeleccion] = useState({ peso: '', talla: '', color: '' });
  const [varianteActual, setVarianteActual] = useState(null);

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

  useEffect(() => {
    if (variantes && variantes.length > 0) {
      setSeleccion({ peso: '', talla: '', color: '' });
      setVarianteActual(null);

      const primeraImagen = variantes.find(v => v.imagenes?.length > 0)?.imagenes[0]?.imagenUrl || null;
    setImagenSeleccionada(primeraImagen);
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
    <div className="product-detail-container containerPage">
      <div className="images-section">
        <div className="thumbnails">
          {imagenesPorMostrar.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="miniatura"
              className={`thumbnail ${imagenSeleccionada === url ? 'active' : ''}`}
              onClick={() => setImagenSeleccionada(url)}
            />
          ))}
        </div>
        <div className="main-image">
          {imagenSeleccionada ? (
            <img src={imagenSeleccionada} alt="principal" />
          ) : (
            <div className="no-image">Selecciona una combinación para ver imagen</div>
          )}
        </div>
      </div>

      <div className="info-section">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <img src={producto.marca?.imagenUrl} alt={producto.marca?.nombre} className='imagen-marca'/>
        <div className='info-contain-tag'>
        
            <p className='label-categoria'> {producto.categoria?.nombre}</p>
            <p className='label-especie'>{producto.especie?.nombre}</p>
        </div>
        
        {varianteActual ? (
          <>
            
            {varianteActual?.peso && <p><strong>Peso:</strong> {varianteActual.peso.valor}</p>}
            {varianteActual?.talla && <p><strong>Talla:</strong> {varianteActual.talla.valor}</p>}
            {varianteActual?.color && <p><strong>Color:</strong> {varianteActual.color.valor}</p>}
          </>
        ) : (
          <>
            
          </>
        )}
        <div className="variant-buttons">
          {['color', 'talla', 'peso'].map((campo) => {
            const opciones = generarOpciones(campo);
            if (opciones.length === 0) return null;

            return (
              <div key={campo} className="variant-group">
                <label>{campo.charAt(0).toUpperCase() + campo.slice(1)}</label>
                <div className="variant-options">
                  {opciones.map(({ valor, habilitado }) => (
                    <button
                    key={valor}
                    disabled={!habilitado && seleccion[campo] !== valor}
                    className={`variant-button ${seleccion[campo] === valor ? 'selected' : ''}`}
                    onClick={() =>
                      actualizarSeleccion(seleccion[campo] === valor ? '' : valor, campo)
                    }
                  >
                    {campo === 'color' ? (
                      <span
                        className="color-square"
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

            <p><strong>Stock:</strong> {stockDisponible}</p>
            <p className='precio-original'> S/ {varianteActual?.precioOriginal?.toFixed(2)}</p>
            <p className='precio-oferta'> S/ {varianteActual?.precioOferta?.toFixed(2)}</p>
          </>
        ) : <>
        <p className='precio-oferta'>S/ {precioMin.toFixed(2)} - S/ {precioMax.toFixed(2)}</p>
        </>}
      </div>
    </div>
  );
}
