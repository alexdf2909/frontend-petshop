// src/components/public/FiltrosSidebar.jsx
import './FiltrosSidebar.css';

export default function FiltrosSidebar({
  categorias = [],
  marcas = [],
  etiquetas = [],
  filtrosSeleccionados,
  onFiltroChange
}) {
  const toggleEtiqueta = (etiquetaId) => {
    onFiltroChange('etiquetas', etiquetaId);
  };

  return (
    <aside className="sidebar-filtros">
      {/* CATEGORÍAS */}
      <div className="filtro-seccion">
        <h4>Categorías</h4>
        {categorias.map((cat) => (
          <label key={cat.categoriaId} className="checkbox-label">
            <div className='opciones'>
            <input
              type="checkbox"
              checked={filtrosSeleccionados.categorias.includes(cat.categoriaId)}
              onChange={() => onFiltroChange('categorias', cat.categoriaId)}
            />
            {cat.nombre} 
            </div>
            <span className="cantidad">{cat.cantidadProductos}</span>
          </label>
        ))}
      </div>

      {/* MARCAS */}
      <div className="filtro-seccion">
        <h4>Marcas</h4>
        
        {marcas.map((marca) => (
          <label key={marca.marcaId} className="checkbox-label">
            <div className='opciones'>
            <input
              type="checkbox"
              checked={filtrosSeleccionados.marcas.includes(marca.marcaId)}
              onChange={() => onFiltroChange('marcas', marca.marcaId)}
            />
            {marca.nombre} 
            </div>
            <span className="cantidad">{marca.cantidadProductos}</span>
          </label>
        ))}
        </div>
      

      {/* ETIQUETAS */}
      <div className="filtro-seccion">
        <h4>Etiquetas</h4>
        <div className="tags-container">
          {etiquetas.map((etiqueta) => (
            <span
              key={etiqueta.etiquetaId}
              className={`tag ${filtrosSeleccionados.etiquetas.includes(etiqueta.etiquetaId) ? 'activa' : ''}`}
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
