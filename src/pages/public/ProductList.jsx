import { useQuery } from '@tanstack/react-query';
import { fetchVariantes, fetchCategorias, fetchEspecies, fetchMarcas, fetchEtiquetas } from '../../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import styles from './styles/ProductList.module.css';
import ProductoCard from '../../components/public/ProductoCard';
import EspecieCard from '../../components/public/EspecieCard';
import FiltrosSidebar from '../../components/public/FiltrosSidebar';
import Banner from '../../components/public/Banner';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProductList() {
  const [especieSeleccionada, setEspecieSeleccionada] = useState('todas');
  const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({
    categorias: [],
    marcas: [],
    etiquetas: [],
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const especiesPorPagina = 6;

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  const [rangoPrecio, setRangoPrecio] = useState([0, 0]);
  const [precioSeleccionado, setPrecioSeleccionado] = useState([0, 0]);

  const { data: variantes, isLoading: loadingVariantes, isError: errorVariantes, error } = useQuery({
    queryKey: ['variantes'],
    queryFn: fetchVariantes,
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

  const irPrimeraPagina = () => setPaginaActual(1);
  const irPaginaAnterior = () => setPaginaActual(prev => Math.max(prev - 1, 1));
  const irPaginaSiguiente = () => setPaginaActual(prev => Math.min(prev + 1, totalPaginas));
  const irUltimaPagina = () => setPaginaActual(totalPaginas);

  useEffect(() => {
    if (!variantes || variantes.length === 0) return;

    const todosPrecios = variantes.map(v => v.precioOferta);
    const min = Math.min(...todosPrecios);
    const max = Math.max(...todosPrecios);

    setRangoPrecio([min, max]);
    setPrecioSeleccionado([min, max]);
  }, [variantes]);

  if (loadingVariantes || loadingCategorias || loadingEspecies || loadingEtiquetas || loadingMarcas) return <div>Cargando productos...</div>;
  if (errorVariantes) {
    toast.error('Error al cargar los variantes: ' + error.message);
    return <div>Hubo un problema al cargar los variantes.</div>;
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

  const totalEspecies = especies?.length || 0;

  const handleNext = () => {
    if (currentIndex + especiesPorPagina < totalEspecies) {
      setCurrentIndex(currentIndex + especiesPorPagina);
    }
  };

  const handlePrev = () => {
    if (currentIndex - especiesPorPagina >= 0) {
      setCurrentIndex(currentIndex - especiesPorPagina);
    }
  };

  const especiesVisibles = (especies || []).slice(currentIndex, currentIndex + especiesPorPagina);

  const variantesPorProducto = variantes.reduce((acc, variante) => {
    const id = variante.producto.productoId;
    if (!acc[id]) acc[id] = [];
    acc[id].push(variante);
    return acc;
  }, {});

  const productosUnicos = Array.from(
    new Map(variantes.map(v => [v.producto.productoId, v.producto])).values()
  );

  const productosFiltrados = productosUnicos.filter((producto) => {
    const variantesDelProducto = variantesPorProducto[producto.productoId] || [];

    const coincideEspecie = especieSeleccionada === 'todas' || producto.especie?.especieId === especieSeleccionada;
    const coincideCategoria = filtrosSeleccionados.categorias.length === 0 || filtrosSeleccionados.categorias.includes(producto.categoria?.categoriaId);
    const coincideMarca = filtrosSeleccionados.marcas.length === 0 || filtrosSeleccionados.marcas.includes(producto.marca?.marcaId);
    const coincideEtiqueta = filtrosSeleccionados.etiquetas.length === 0 || (
      producto.etiquetas && producto.etiquetas.some(e => filtrosSeleccionados.etiquetas.includes(e.etiquetaId))
    );

    const aplicarFiltroPrecio = precioSeleccionado[0] !== rangoPrecio[0] || precioSeleccionado[1] !== rangoPrecio[1];
    const coincidePrecio = !aplicarFiltroPrecio || variantesDelProducto.some(v =>
      v.precioOferta >= precioSeleccionado[0] && v.precioOferta <= precioSeleccionado[1]
    );

    return coincideEspecie && coincideCategoria && coincideMarca && coincideEtiqueta && coincidePrecio;
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const categoriasConCantidad = categorias.map((categoria) => {
    const cantidadProductos = productosUnicos.filter(p => p.categoria?.categoriaId === categoria.categoriaId).length;
    return { ...categoria, cantidadProductos };
  });

  const marcasConCantidad = marcas.map((marca) => {
    const cantidadProductos = productosUnicos.filter(p => p.marca?.marcaId === marca.marcaId).length;
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

  return (
    <div className={styles.containerPage}>
      <Banner />
      <div className={styles.contenedor}>
        <div className={styles.contenedorEspecies}>
          <div className={styles.especiesHeader}>
            <h2>Buscar por Especie</h2>
            <div className={styles.especiesNav}>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                <FaChevronLeft />
              </button>
              <button onClick={handleNext} disabled={currentIndex + especiesPorPagina >= totalEspecies}>
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className={styles.filtroEspecies}>
            {especiesVisibles.map((esp) => (
              <EspecieCard
                key={esp.especieId}
                especie={esp}
                activa={especieSeleccionada === esp.especieId}
                onClick={() =>
                  setEspecieSeleccionada(prev => prev === esp.especieId ? 'todas' : esp.especieId)
                }
              />
            ))}
          </div>
        </div>

        <div className={styles.contenedorProductos}>
          <FiltrosSidebar
            categorias={categoriasConCantidad}
            marcas={marcasConCantidad}
            etiquetas={etiquetas}
            filtrosSeleccionados={filtrosSeleccionados}
            onFiltroChange={handleFiltroChange}
            rangoPrecio={rangoPrecio}
            precioSeleccionado={precioSeleccionado}
            onPrecioChange={setPrecioSeleccionado}
          />

          <div className={styles.productList}>
            <p className={styles.cantidadResultante}>
              Mostrando {productosPaginados.length} de {productosFiltrados.length} productos
            </p>

            <div className={styles.grillaProductos}>
              {productosFiltrados.length === 0 ? (
                <p className={styles.noProductos}>No hay productos que coincidan con los filtros.</p>
              ) : (
                productosPaginados.map((producto) => (
                  <Link
                    key={producto.productoId}
                    to={`/producto/${producto.productoId}`}
                    className={styles.productLink}
                  >
                    <ProductoCard producto={producto} />
                  </Link>
                ))
              )}
            </div>

            <div className={styles.paginacion}>
              <button onClick={irPrimeraPagina} disabled={paginaActual === 1}>« </button>
              <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>‹ </button>
              <span>Página {paginaActual} de {totalPaginas}</span>
              <button onClick={irPaginaSiguiente} disabled={paginaActual === totalPaginas}> ›</button>
              <button onClick={irUltimaPagina} disabled={paginaActual === totalPaginas}> »</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
