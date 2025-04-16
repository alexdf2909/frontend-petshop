import { useQuery } from '@tanstack/react-query';
import { fetchProductos } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductList() {
  const { data: products, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductos,
  });
  
  if (isLoading) return <div>Cargando productos...</div>;
  if (isError) {
    toast.error('Error al cargar los productos: ' + error.message);
    return <div>Hubo un problema al cargar los productos.</div>;
  }

  return (
    <div className="">
      {products.map((product) => (
        <div key={product.id} className="">
          <h2 className="">{product.name}</h2>
          <p>Precio: ${product.price}</p>
          <Link to={`/producto/${product.id}`} className="">
            Ver Detalles
          </Link>
        </div>
      ))}
    </div>
  );
}
