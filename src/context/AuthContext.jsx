import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setRole(decoded.rol || null);
        setUserId(decoded.id || null);         // 👈 asegúrate que exista
        setNombre(decoded.nombre || '');       // 👈 asegúrate que exista
      } catch (err) {
        console.error("Token inválido");
        setIsLoggedIn(false);
        setRole(null);
        setUserId(null);
        setNombre('');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
      setRole(decoded.rol || null);
      setUserId(decoded.id || null);
      setNombre(decoded.nombre || '');
    } catch {
      setIsLoggedIn(false);
      setRole(null);
      setUserId(null);
      setNombre('');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRole(null);
    setUserId(null);
    setNombre('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, loading, userId, nombre }}>
      {children}
    </AuthContext.Provider>
  );
};