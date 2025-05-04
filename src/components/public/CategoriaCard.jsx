// 📁 src/components/public/CategoriaCard.jsx
import styles from './styles/CategoriaCard.module.css';

export default function CategoriaCard({ categoria}) {
  return (
    <div className={styles.categoriaCard}>
      <img
        src={categoria.imagenUrl}
        alt={categoria.nombre}
        className={styles.categoriaImagen}
      />
      <div className={styles.categoriaInfo}>
      <h4 className={styles.categoriaNombre}>{categoria.nombre} <i className="fa-solid fa-arrow-right"></i></h4>
      </div>
      

    </div>
  );
}
