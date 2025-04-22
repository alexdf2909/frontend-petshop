// src/components/public/FiltrosSidebar.jsx
import styles from './styles/FiltrosSidebar.module.css';

export default function FiltrosSidebar({
  categorias = [],
  marcas = [],
  etiquetas = [],
  filtrosSeleccionados,
  onFiltroChange,
  rangoPrecio,
  precioSeleccionado,
  onPrecioChange
}) {
  const toggleEtiqueta = (etiquetaId) => {
    onFiltroChange('etiquetas', etiquetaId);
  };

  return (
    <aside className={styles.sidebarFiltros}>
      {/* CATEGORÍAS */}
      <div className={styles.filtroSeccion}>
        <h4>Categorías</h4>
        {categorias.map((cat) => (
          <label key={cat.categoriaId} className={styles.checkboxLabel}>
            <div className={styles.opciones}>
            <input
              type="checkbox"
              checked={filtrosSeleccionados.categorias.includes(cat.categoriaId)}
              onChange={() => onFiltroChange('categorias', cat.categoriaId)}
  
            />
            {cat.nombre} 
            </div>
            <span className={styles.cantidad}>{cat.cantidadProductos}</span>
          </label>
        ))}
      </div>

      {/* PRECIO */}
{rangoPrecio[0] !== rangoPrecio[1] && (
  <div className={styles.filtroSeccion}>
    <h4>Precio</h4>
    <div className={styles.sliderContainer}>
      <div className={styles.sliderLabels}>
        <span>S/. {precioSeleccionado[0]}</span>
        <span>S/. {precioSeleccionado[1]}</span>
      </div>

      {/* Rango mínimo */}
      <input
        type="range"
        min={rangoPrecio[0]}
        max={rangoPrecio[1]}
        step={1}
        value={precioSeleccionado[0]}
        onChange={(e) =>
          onPrecioChange([Number(e.target.value), precioSeleccionado[1]])
        }
      />

      {/* Rango máximo */}
      <input
        type="range"
        min={rangoPrecio[0]}
        max={rangoPrecio[1]}
        step={1}
        value={precioSeleccionado[1]}
        onChange={(e) =>
          onPrecioChange([precioSeleccionado[0], Number(e.target.value)])
        }
      />
    </div>
  </div>
)}

      {/* MARCAS */}
      <div className={styles.filtroSeccion}>
        <h4>Marcas</h4>
        
        {marcas.map((marca) => (
          <label key={marca.marcaId} className={styles.checkboxLabel}>
            <div className={styles.opciones}>
            <input
              type="checkbox"
              checked={filtrosSeleccionados.marcas.includes(marca.marcaId)}
              onChange={() => onFiltroChange('marcas', marca.marcaId)}
            />
            {marca.nombre} 
            </div>
            <span className={styles.cantidad}>{marca.cantidadProductos}</span>
          </label>
        ))}
        </div>
      

      {/* ETIQUETAS */}
      <div className={styles.filtroSeccion}>
        <h4>Etiquetas</h4>
        <div className={styles.tagsContainer}>
          {etiquetas.map((etiqueta) => (
            <span
              key={etiqueta.etiquetaId}
              className={`${styles.tag}  ${filtrosSeleccionados.etiquetas.includes(etiqueta.etiquetaId) ? styles.tagActiva : ''}`}
              onClick={() => toggleEtiqueta(etiqueta.etiquetaId)}
            >
              {etiqueta.nombre}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
