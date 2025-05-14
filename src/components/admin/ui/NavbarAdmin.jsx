import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'; // Importamos los íconos
import './styles/navbar.css';

const NavbarAdmin = ({ visible, onClose }) => {
  const [comprasExpanded, setComprasExpanded] = useState(true);
  const [productosExpanded, setProductosExpanded] = useState(true);
  const [variantesExpanded, setVariantesExpanded] = useState(true);
  
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${visible ? "visible" : ""}`}>
      <div className="close-button" onClick={onClose}>✕</div>
      <div className="sidebar-item">
        <Link 
          to="/dashboard/usuarios" 
          className={`soloPage ${isActive("/dashboard/usuarios") ? 'active' : ''}`}
        >
         <h3>Usuarios</h3>
        </Link>
      </div>

      <div className="sidebar-item">
        <Link 
          to="/dashboard/servicios" 
          className={`soloPage ${isActive("/dashboard/servicios") ? 'active' : ''}`}
        >
           <h3>Servicios</h3>
        </Link>
      </div>

      <div className="sidebar-item">
        <Link 
          to="/dashboard/razas" 
          className={`soloPage ${isActive("/dashboard/razas") ? 'active' : ''}`}
        >
           <h3>Razas</h3>
        </Link>
      </div>

      <div className="sidebar-item">
        <h3 onClick={() => setComprasExpanded(!comprasExpanded)}>
          Compras
          {comprasExpanded ? <FaCaretUp className="expand-icon" /> : <FaCaretDown className="expand-icon" />}
        </h3>
        {comprasExpanded && (
          <div className="sub-menu">
            <Link 
              to="/dashboard/compras" 
              className={isActive("/dashboard/compras") ? 'active' : ''}
            >
              Compras
            </Link>
            <Link 
              to="/dashboard/lotes" 
              className={isActive("/dashboard/lotes") ? 'active' : ''}
            >
              Lotes
            </Link>
          </div>
        )}
      </div>

      <div className="sidebar-item">
        <h3 onClick={() => setProductosExpanded(!productosExpanded)}>
          Productos
          {productosExpanded ? <FaCaretUp className="expand-icon" /> : <FaCaretDown className="expand-icon" />}
        </h3>
        {productosExpanded && (
          <div className="sub-menu">
            <Link 
              to="/dashboard/productos" 
              className={isActive("/dashboard/productos") ? 'active' : ''}
            >
              Productos
            </Link>
            <Link 
              to="/dashboard/categorias" 
              className={isActive("/dashboard/categorias") ? 'active' : ''}
            >
              Categorías
            </Link>
            <Link 
              to="/dashboard/especies" 
              className={isActive("/dashboard/especies") ? 'active' : ''}
            >
              Especies
            </Link>
            <Link 
              to="/dashboard/marcas" 
              className={isActive("/dashboard/marcas") ? 'active' : ''}
            >
              Marcas
            </Link>
            <Link 
              to="/dashboard/etiquetas" 
              className={isActive("/dashboard/etiquetas") ? 'active' : ''}
            >
              Etiquetas
            </Link>
          </div>
        )}
      </div>

      <div className="sidebar-item">
        <h3 onClick={() => setVariantesExpanded(!variantesExpanded)}>
          Variantes
          {variantesExpanded ? <FaCaretUp className="expand-icon" /> : <FaCaretDown className="expand-icon" />}
        </h3>
        {variantesExpanded && (
          <div className="sub-menu">
            <Link 
              to="/dashboard/variantes" 
              className={isActive("/dashboard/variantes") ? 'active' : ''}
            >
              Variantes
            </Link>
            <Link 
              to="/dashboard/tallas" 
              className={isActive("/dashboard/tallas") ? 'active' : ''}
            >
              Tallas
            </Link>
            <Link 
              to="/dashboard/colores" 
              className={isActive("/dashboard/colores") ? 'active' : ''}
            >
              Colores
            </Link>
            <Link 
              to="/dashboard/pesos" 
              className={isActive("/dashboard/pesos") ? 'active' : ''}
            >
              Pesos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarAdmin;
