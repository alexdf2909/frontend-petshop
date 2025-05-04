//src/pages/public/Home
import Banner from "../../components/public/Banner";
import styles from './styles/Home.module.css';
import { fetchCategorias, fetchEspecies, fetchMarcas, fetchProductos } from '../../services/api';
import { useQuery } from '@tanstack/react-query';
import CategoriaCard from "../../components/public/CategoriaCard";
import ProductoCard from "../../components/public/ProductoCard";
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";


export default function Home() {

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

  const { data: productos, isLoading: loadingProductos, isError: errorProductos} = useQuery({
    queryKey: ['productos'],
    queryFn: fetchProductos,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriasPorPagina = 4;

  const totalCategorias = categorias?.length || 0;
  const maxIndex = Math.max(0, totalCategorias - categoriasPorPagina);

  const handleNext = () => {
    if (currentIndex + categoriasPorPagina < totalCategorias) {
      setCurrentIndex(currentIndex + categoriasPorPagina);
    }
  };

  const handlePrev = () => {
    if (currentIndex - categoriasPorPagina >= 0) {
      setCurrentIndex(currentIndex - categoriasPorPagina);
    }
  };

  const categoriasVisibles = categorias?.slice(currentIndex, currentIndex + categoriasPorPagina);


  if (loadingCategorias || loadingEspecies || loadingMarcas || loadingProductos) return <div>Cargando Datos...</div>;
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
    if (errorProductos) {
      toast.error('Error al cargar los productos: ' + error.message);
      return <div>Hubo un problema al cargar los productos.</div>;
    }

    return (
      <div>
        <Banner></Banner>
        <div className={styles.contenedor}>
           {/* CATEGORÍAS */}
        <div className={styles.contenedorCategorias}>
          <div className={styles.categoriasHeader}>
            <h2>Buscar por categoría</h2>
            <div className={styles.categoriasNav}>
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                <FaChevronLeft />
              </button>
              <button onClick={handleNext} disabled={currentIndex + categoriasPorPagina >= totalCategorias}>
                <FaChevronRight />
              </button>
            </div>
          </div>

          <div className={styles.grillaCategorias}>
            {categoriasVisibles?.map((cat) => (
              <CategoriaCard
                key={cat.categoriaId}
                categoria={cat}
                productos={productos.filter(pro => pro.categoria.categoriaId === cat.categoriaId).length}
              />
            ))}
          </div>
        </div>
          
          {/*NUEVOS PRODUCTOS  */}
          <div className={styles.contenedorNuevos}>
            <h2>Nuevos Productos</h2>
            <div className={styles.grillaNuevos}>
              {productos?.slice(0, 3).map((producto) => (
                <Link
                  key={producto.productoId}
                  to={`/producto/${producto.productoId}`}
                  className="product-link"
                >
                  <ProductoCard producto={producto} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }