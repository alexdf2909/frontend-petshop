import { useState } from 'react';
import { Link } from 'react-router-dom';
import './admin.css';

const DashboardPage = () => {

  return (
    <div className='container'>
      <div className="header">
        <div className="statsCard">
          <div className="statItem">
            <i className="fas fa-box"></i>
            <div>
              <span className="statNumber">152</span>
              <span className="statLabel">Productos</span>
            </div>
          </div>
          <div className="statItem">
            <i className="fas fa-shopping-bag"></i>
            <div>
              <span className="statNumber">89</span>
              <span className="statLabel">Pedidos Activos</span>
            </div>
          </div>
          <div className="statItem">
            <i className="fa-solid fa-user"></i>
            <div>
              <span className="statNumber">89</span>
              <span className="statLabel">Usuarios</span>
            </div>
          </div>
        </div>
      </div>
      <div className='grid'>
        <Link to="/dashboard/categorias" className='card'>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Categorias</h3>
          <span className="cardLink">Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>
        <Link to="/dashboard/marcas" className='card'>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Marcas</h3>
          <span className="cardLink">Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>
        <Link to="/dashboard/especies" className='card'>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Especies</h3>
          <span className="cardLink">Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/dashboard/etiquetas" className='card'>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Etiquetas</h3>
          <span className="cardLink">Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>

        <Link to="/dashboard/tallas" className='card'>
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Tallas</h3>
          <span className="cardLink">Ver detalles <i className="fas fa-arrow-right"></i></span>
        </Link>
      </div>

    </div>
  );
};

export default DashboardPage;