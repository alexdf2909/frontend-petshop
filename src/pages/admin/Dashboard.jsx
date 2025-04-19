// DashboardPage.js
import NavbarAdmin from '../../components/admin/ui/NavbarAdmin';
import { Outlet } from 'react-router-dom'; // Outlet es donde se cargará el contenido de las rutas secundarias

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <NavbarAdmin /> {/* Aquí se muestra el NavbarAdmin */}

      <div className="main-content">
        {/* Outlet es el espacio donde se cargará el contenido de las rutas definidas en App.jsx */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
