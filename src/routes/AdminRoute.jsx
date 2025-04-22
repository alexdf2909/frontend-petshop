//src/routes/AdminRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { isLoggedIn, role, loading } = useAuth();

  if (loading) return null; // 👈 Espera a que termine de cargar
  return isLoggedIn && role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
}