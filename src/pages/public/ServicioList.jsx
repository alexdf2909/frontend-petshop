import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchServicios } from '../../services/api';
import { useState, useEffect } from 'react';
import styles from './styles/ServicioList.module.css';
import ServicioCard from '../../components/public/ServicioCard';
import Banner from '../../components/public/Banner';

export default function ServicioList() {

  const [paginaActual, setPaginaActual] = useState(1);
  const serviciosPorPagina = 12;

  const { data: servicios, isLoading: loadingServicios, isError: errorServicios, error } = useQuery({
    queryKey: ['servicios'],
    queryFn: fetchServicios,
  });



  const irPrimeraPagina = () => setPaginaActual(1);
  const irPaginaAnterior = () => setPaginaActual(prev => Math.max(prev - 1, 1));
  const irPaginaSiguiente = () => setPaginaActual(prev => Math.min(prev + 1, totalPaginas));
  const irUltimaPagina = () => setPaginaActual(totalPaginas);


  if (loadingServicios) return <div>Cargando servicios...</div>;
  if (errorServicios) {
    toast.error('Error al cargar los servicios: ' + error.message);
    return <div>Hubo un problema al cargar los servicios.</div>;
  }
  

  const totalPaginas = Math.ceil(servicios.length / serviciosPorPagina);

  const serviciosPaginados = servicios.slice(
    (paginaActual - 1) * serviciosPorPagina,
    paginaActual * serviciosPorPagina
  );


  return (
    <div className={styles.containerPage}>
      <Banner />
      <div className={styles.contenedor}>
        
        <div className={styles.contenedorProductos}>
          

          <div className={styles.servicioList}>
            <p className={styles.cantidadResultante}>
              Mostrando {serviciosPaginados.length} de {servicios.length} servicios
            </p>

            <div className={styles.grillaServicios}>
              {servicios.length === 0 ? (
                <p className={styles.noServicios}>No hay servicios que coincidan con los filtros.</p>
              ) : (
                serviciosPaginados.map((servicio) => (
                  <Link
                    key={servicio.servicioId}
                    to={`/servicio/${servicio.servicioId}`}
                    className={styles.productLink}
                  >
                    <ServicioCard servicio={servicio} />
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
