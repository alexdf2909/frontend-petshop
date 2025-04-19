import { useQuery } from '@tanstack/react-query';
import { fetchProductos, fetchCategorias, fetchEspecies, fetchMarcas, fetchEtiquetas } from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';
import './ProductList.css';
import ProductoCard from '../components/public/ProductoCard';
import EspecieCard from '../components/public/EspecieCard';
import FiltrosSidebar from '../components/public/FiltrosSidebar';

export default function ProductList() {
  const [especieSeleccionada, setEspecieSeleccionada] = useState('todas');
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({
    categorias: [],
    marcas: [],
    etiquetas: [],
  });

  const { data: productos, isLoading: loadingProductos, isError: errorProductos, error } = useQuery({
    queryKey: ['productos'],
    queryFn: fetchProductos,
  });

  const { data: categorias, isLoading: loadingCategorias, isError: errorCategorias } = useQuery({
    queryKey: ['categorias'],
    queryFn: fetchCategorias,
  });

  const { data: especies, isLoading: loadingEspecies, isError: errorEspecies } = useQuery({
    queryKey: ['especies'],
    queryFn: fetchEspecies,
  });

  const { data: marcas, isLoading: loadingMarcas, isError: errorMarcas} = useQuery({
    queryKey: ['marcas'],
    queryFn: fetchMarcas,
  });

  const { data: etiquetas, isLoading: loadingEtiquetas, isError: errorEtiquetas } = useQuery({
    queryKey: ['etiquetas'],
    queryFn: fetchEtiquetas,
  });

  if (loadingProductos || loadingCategorias || loadingEspecies || loadingEtiquetas || loadingMarcas) return <div>Cargando productos...</div>;
  if (errorProductos) {
    toast.error('Error al cargar los productos: ' + error.message);
    return <div>Hubo un problema al cargar los productos.</div>;
  }
  if (errorCategorias) {
    toast.error('Error al cargar las categorías');
    return <div>Hubo un problema al cargar las categorías.</div>;
  }
  if (errorEspecies) {
    toast.error('Error al cargar los especies: ' + error.message);
    return <div>Hubo un problema al cargar los especies.</div>;
  }
  if (errorMarcas) {
    toast.error('Error al cargar los marcas: ' + error.message);
    return <div>Hubo un problema al cargar los marcas.</div>;
  }
  if (errorEtiquetas) {
    toast.error('Error al cargar los etiquetas: ' + error.message);
    return <div>Hubo un problema al cargar los etiquetas.</div>;
  }

  // Contamos cuántos productos pertenecen a cada categoría y marca
  const categoriasConCantidad = categorias.map((categoria) => {
    const cantidadProductos = productos.filter(producto => producto.categoria?.categoriaId === categoria.categoriaId).length;
    return { ...categoria, cantidadProductos };
  });

  const marcasConCantidad = marcas.map((marca) => {
    const cantidadProductos = productos.filter(producto => producto.marca?.marcaId === marca.marcaId).length;
    return { ...marca, cantidadProductos };
  });

  const handleFiltroChange = (tipo, id) => {
    setFiltrosSeleccionados((prev) => {
      const actual = prev[tipo];
      const nuevo = actual.includes(id)
        ? actual.filter((x) => x !== id)
        : [...actual, id];
      return { ...prev, [tipo]: nuevo };
    });
  };

  // Filtrar productos según categoría seleccionada
  const productosFiltrados = productos.filter((producto) => {
    const coincideEspecie = especieSeleccionada === 'todas' || producto.especie?.especieId === especieSeleccionada;
    const coincideCategoria = filtrosSeleccionados.categorias.length === 0 || filtrosSeleccionados.categorias.includes(producto.categoria?.categoriaId);
    const coincideMarca = filtrosSeleccionados.marcas.length === 0 || filtrosSeleccionados.marcas.includes(producto.marca?.marcaId);
    const coincideEtiqueta = filtrosSeleccionados.etiquetas.length === 0 || (
      producto.etiquetas && producto.etiquetas.some(e => filtrosSeleccionados.etiquetas.includes(e.etiquetaId))
    );
    return coincideEspecie && coincideCategoria && coincideMarca && coincideEtiqueta;
  });

  return (
    <div className="product-list-container">
      {/* Sidebar lateral */}
      <FiltrosSidebar
        categorias={categoriasConCantidad}  
        marcas={marcasConCantidad}          
        etiquetas={etiquetas}
        filtrosSeleccionados={filtrosSeleccionados}
        onFiltroChange={handleFiltroChange}
        className="sidebar-filters"  // Agregamos la clase para el sidebar
      />

      <div className="product-list">
        {/* Selector de especie */}
        <div className="filtros-especies">
          {especies.map((esp) => (
            <EspecieCard
              key={esp.especieId}
              especie={esp}
              activa={especieSeleccionada === esp.especieId}
              onClick={() => setEspecieSeleccionada(esp.especieId)}
            />
          ))}
        </div>
        <div className='grilla-productos'>
        {/* Listado de productos filtrados */}
        {productosFiltrados.length === 0 ? (
          <p className="no-productos">No hay productos que coincidan con los filtros.</p>
        ) : (
          
          productosFiltrados.map((producto) => (
            <Link
              key={producto.productoId}
              to={`/producto/${producto.productoId}`}
              className="product-link"
            >
              <ProductoCard
              key={producto.productoId}
              producto={producto}
            />
              
            </Link>
          ))
          
        )
        
        }
        </div>
      </div>
    </div>
  );
}