import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchServicioById} from '../../services/api';
import styles from './styles/ServicioDetail.module.css';
import Banner from '../../components/public/Banner';

export default function ProductDetail() {
  const { servicioId } = useParams();

  const { data: servicio, isLoading: cargandoServicio } = useQuery({
    queryKey: ['servicio', servicioId],
    queryFn: () => fetchServicioById(servicioId),
  });


  if (cargandoServicio ) return <div>Cargando...</div>;



  return (
    <div className={styles.containerPage}>
      <Banner />
      <div className={styles.contenedor}>
        <div className={styles.contenedorProducto}>
  <div className={styles.imagenesComparacion}>
    <div className={styles.imagenEnvuelta}>
      <span className={styles.etiqueta}>Antes</span>
      <img src={servicio.imagenAntes} alt="Antes del servicio" />
    </div>
    <div className={styles.imagenEnvuelta}>
      <span className={styles.etiqueta}>Después</span>
      <img src={servicio.imagenDespues} alt="Después del servicio" />
    </div>
  </div>

  <div className={styles.infoSection}>
    <h2>{servicio.nombre}</h2>
    <p>{servicio.descripcion}</p>
    <p>Horario: {servicio.horario}</p>
  </div>
</div>


      
    </div>
    </div>
  
  );
}