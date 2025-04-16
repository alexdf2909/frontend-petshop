import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductoById } from '../services/api';
import { toast } from 'react-toastify';

export default function ProductDetail() {
  const { productId } = useParams();
  
  const { data: product, isLoading, isError, error } = useQuery(
    ['product', productId],
    () => fetchProductoById(productId),
    {
      enabled: !!productId,  // Solo ejecuta la consulta si productId está disponible
    }
  );

  if (isLoading) return <div>Cargando detalles del producto...</div>;
  if (isError) {
    toast.error('Error al cargar los detalles del producto: ' + error.message);
    return <div>Hubo un problema al cargar el producto.</div>;
  }

  return (
    <div className="">
      <h2 className="">{product.name}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.categoria.nombre}</p>
      <button className="">Agregar al carrito</button>
    </div>
  );
}
