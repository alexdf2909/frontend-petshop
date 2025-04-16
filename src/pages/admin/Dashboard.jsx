import { useState } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {

  return (
    <div>

      <div>
        <Link to="/dashboard/categorias">
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Categorias</h3>
        </Link>
        <Link to="/dashboard/marcas">
          <i className="fa-solid fa-user"></i>
          <h3>Gestión de Marcas</h3>
        </Link>
      </div>

    </div>
  );
};

export default DashboardPage;