// 📁 src/components/CategoriaCard.jsx
import './CategoriaCard.css';

export default function CategoriaCard({ categoria, activa, onClick }) {
  return (
    <div
      className={`categoria-card ${activa ? 'activa' : ''}`}
      onClick={() => onClick(categoria.categoriaId)}
    >
      <img
        src={categoria.imagenUrl}
        alt={categoria.nombre}
        className="categoria-imagen"
      />
      <h4 className="categoria-nombre">{categoria.nombre}</h4>
    </div>
  );
}
