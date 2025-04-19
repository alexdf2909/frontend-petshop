import React from 'react'
import { useQuery } from '@tanstack/react-query';
import './ProductoCard.css';
import { fetchVariantesByProducto } from '../../services/api';

const ProductoCard = ({ producto }) => {

    const { data: variantes, isLoading: loadingVariantes, isError: errorVariantes } = useQuery({
        queryKey: ['variantes', producto.productoId], // Clave de la consulta con el productoId
        queryFn: () => fetchVariantesByProducto(producto.productoId), // Función que obtiene las variantes
    });

    if (loadingVariantes) return <div>Cargando variantes...</div>;
    if (errorVariantes) {
        console.error(errorVariantes);
        return <div>Hubo un problema al cargar las variantes.</div>;
    }

     // Calcular el menor y mayor precio de las variantes
     const precios = variantes.map(variante => variante.precioOferta);
     const precioMinimo = Math.min(...precios);
     const precioMaximo = Math.max(...precios);

  return (
    <div className="product-card">
        <img src={variantes[0].imagenes[0].imagenUrl} alt={producto.nombre} />
        <div className='product-data'>
        <p className="product-brand">{producto.marca.nombre || 'Sin marca'}</p>
        <h3>{producto.nombre} <i class="fa-regular fa-heart"></i></h3>
        <p className='product-precio'>
                S/. {precioMinimo === precioMaximo ? precioMinimo : `${precioMinimo} - ${precioMaximo}`}
            </p>
        </div>
        
    </div>
  )
}

export default ProductoCard