// src/pages/public/Home.jsx
import Banner from "../../components/public/Banner";
import styles from './styles/Home.module.css';
import { fetchCategorias, fetchEspecies, fetchMarcas, fetchProductos } from '../../services/api';
import { mostrarMascotas, productosRecomendados } from '../../services/adminApi';
import { useQuery } from '@tanstack/react-query';
import CategoriaCard from "../../components/public/CategoriaCard";
import ProductoCard from "../../components/public/ProductoCard";
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

export default function Home() {
  const { isLoggedIn } = useAuth(); // cambio aquí
  const [mascotaSeleccionadaId, setMascotaSeleccionadaId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const categoriasPorPagina = 4;

  useEffect(() => {
    if (!isLoggedIn) {
      setMascotaSeleccionadaId(null); // Resetear selección de mascota en logout
    }
  }, [isLoggedIn]);

  const { data: especies, isLoading: loadingEspecies, isError: errorEspecies } = useQuery({
    queryKey: ['especies'],
    queryFn: fetchEspecies,
  });

  const { data: marcas, isLoading: loadingMarcas, isError: errorMarcas } = useQuery({
    queryKey: ['marcas'],
    queryFn: fetchMarcas,
  });

  // Categorías o Mascotas
  const {
    data: categorias,
    isLoading: loadingCategorias,
    isError: errorCategorias,
  } = useQuery({
    queryKey: ['categorias'],
    queryFn: isLoggedIn ? mostrarMascotas : fetchCategorias,
  });

  // Productos recomendados o recientes
  const {
    data: productos,
    isLoading: loadingProductos,
    isError: errorProductos,
  } = useQuery({
    queryKey: ['productos', isLoggedIn, mascotaSeleccionadaId],
    queryFn: async () => {
      if (isLoggedIn) {
        const mascotas = await mostrarMascotas();
        if (mascotaSeleccionadaId) {
          return productosRecomendados(mascotaSeleccionadaId);
        }
        const listas = await Promise.all(
          mascotas.map((m) => productosRecomendados(m.mascotaId))
        );
        return listas.flat();
      } else {
        return fetchProductos();
      }
    },
  });

  const totalCategorias = categorias?.length || 0;
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
    toast.error('Error al cargar las especies: ' + errorEspecies.message);
    return <div>Hubo un problema al cargar las especies.</div>;
  }
  if (errorMarcas) {
    toast.error('Error al cargar las marcas: ' + errorMarcas.message);
    return <div>Hubo un problema al cargar las marcas.</div>;
  }
  if (errorProductos) {
    toast.error('Error al cargar los productos: ' + errorProductos.message);
    return <div>Hubo un problema al cargar los productos.</div>;
  }

  return (
    <div>
      <Banner />
      <div className={styles.contenedor}>
        {/* CATEGORÍAS o MASCOTAS */}
        <div className={styles.contenedorCategorias}>
          <div className={styles.categoriasHeader}>
            <h2>{isLoggedIn ? 'Mis mascotas' : 'Buscar por categoría'}</h2>
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
              isLoggedIn ? (
                <div
                  key={cat.mascotaId}
                  onClick={() =>
                    setMascotaSeleccionadaId(prev =>
                      prev === cat.mascotaId ? null : cat.mascotaId
                    )
                  }
                  className={`${styles.categoriaItem} ${mascotaSeleccionadaId === cat.mascotaId ? styles.seleccionado : ''}`}
                >
                  <CategoriaCard categoria={cat} />
                </div>
              ) : (
                <CategoriaCard
                  key={cat.categoriaId}
                  categoria={cat}
                  productos={productos.filter(pro => pro.categoria.categoriaId === cat.categoriaId).length}
                />
              )
            ))}
          </div>
        </div>

        {/* PRODUCTOS NUEVOS o RECOMENDADOS */}
        <div className={styles.contenedorNuevos}>
          <h2>
            {isLoggedIn
              ? mascotaSeleccionadaId
                ? 'Productos Recomendados para esta mascota'
                : 'Productos Recomendados para tus mascotas'
              : 'Nuevos Productos'}
          </h2>
          <div className={styles.grillaNuevos}>
<<<<<<< Updated upstream
            {(isLoggedIn ? productos : productos?.slice(0, 4))?.map((producto) => (
              <Link
                key={producto.productoId}
                to={`/producto/${producto.productoId}`}
                className="product-link"
=======
            {(isLoggedIn ? productos : productos?.slice(0, 3))?.map((producto) => (
              <Link
                key={producto.productoId}
                to={`/producto/${producto.productoId}`}
>>>>>>> Stashed changes
              >
                <ProductoCard producto={producto} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
<<<<<<< Updated upstream
}
=======
}
>>>>>>> Stashed changes
