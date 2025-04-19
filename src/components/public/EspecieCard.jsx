// 📁 src/components/EspecieCard.jsx
import './EspecieCard.css';

export default function EspecieCard({ especie, activa, onClick }) {
  return (
    
    <div
      className={`especie-card ${activa ? 'activa' : ''}`}
      onClick={() => onClick(especie.especieId)}
    >
        <div className='image-background'>

            <img
                src={especie.imagenUrl}
                alt={especie.nombre}
                className="especie-imagen"
            />
      
        </div>
        <h4 className="especie-nombre">{especie.nombre}</h4>
    </div>
  );
}