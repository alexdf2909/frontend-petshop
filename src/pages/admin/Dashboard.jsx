// Dashboard.jsx
import { Outlet } from "react-router-dom";
import NavbarAdmin from "../../components/admin/ui/NavbarAdmin";
import "./styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="admin-layout">
      <NavbarAdmin />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}