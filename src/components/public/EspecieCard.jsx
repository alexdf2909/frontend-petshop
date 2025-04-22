// 📁 src/components/EspecieCard.jsx
import styles from './styles/EspecieCard.module.css';

export default function EspecieCard({ especie, activa, onClick }) {
  return (
    
    <div
      className={`${styles.especieCard} ${activa ? styles.activa : ''}`}
      onClick={() => onClick(especie.especieId)}
    >
        <div className={styles.imagenFondo}>

            <img
                src={especie.imagenUrl}
                alt={especie.nombre}
                className={styles.especieImagen}
            />
      
        </div>
        <h4 className={styles.especieNombre}>{especie.nombre}</h4>
    </div>
  );
}