// NavbarAdmin.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavbarAdmin = () => {
  const [comprasExpanded, setComprasExpanded] = useState(true);
  const [productosExpanded, setProductosExpanded] = useState(true);
  const [variantesExpanded, setVariantesExpanded] = useState(true);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <Link to="/dashboard/usuarios" className='soloPage'>Usuarios</Link>
      </div>
      
      <div className="sidebar-item" >
        <h3 onClick={() => setComprasExpanded(!comprasExpanded)}>Compras</h3>
        {comprasExpanded && (
          <div className="sub-menu">
            <Link to="/dashboard/compras">Compras</Link>
            <Link to="/dashboard/lotes">Lotes</Link>
          </div>
        )}
      </div>
      
      <div className="sidebar-item">
        <h3  onClick={() => setProductosExpanded(!productosExpanded)}>Productos</h3>
        {productosExpanded && (
          <div className="sub-menu">
            <Link to="/dashboard/productos">Productos</Link>
            <Link to="/dashboard/categorias">Categorías</Link>
            <Link to="/dashboard/especies">Especies</Link>
            <Link to="/dashboard/marcas">Marcas</Link>
            <Link to="/dashboard/etiquetas">Etiquetas</Link>
          </div>
        )}
      </div>

      <div className="sidebar-item" >
        <h3 onClick={() => setVariantesExpanded(!variantesExpanded)}>Variantes</h3>
        {variantesExpanded && (
          <div className="sub-menu">
            <Link to="/dashboard/variantes">Variantes</Link>
            <Link to="/dashboard/tallas">Tallas</Link>
            <Link to="/dashboard/colores">Colores</Link>
            <Link to="/dashboard/pesos">Pesos</Link>
          </div>
        )}
      </div>

      <div className="sidebar-item">
        <Link to="/dashboard/servicios" className='soloPage'>Servicios</Link>
      </div>
    </div>
  );
};

export default NavbarAdmin;
