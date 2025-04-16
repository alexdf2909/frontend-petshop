import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // 👈 Espera a que termine de cargar
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
