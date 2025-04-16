import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";  // Importa el contexto de autenticación

export default function Header() {
  const { isLoggedIn, logout } = useAuth();  // Accede al estado y a la función logout desde el contexto

  return (
    <header className="bg-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo o título */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">PetShop</Link>
        </div>

        {/* Navegación */}
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/productos" className="text-white hover:text-gray-300">Productos</Link>

          {/* Si no está logueado, muestra Login y Registro */}
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/registro" className="text-white hover:text-gray-300">Registro</Link>
            
            </>
          ) : (
            // Si está logueado, muestra Logout
            <>
            
            <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
            <button
              onClick={logout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
