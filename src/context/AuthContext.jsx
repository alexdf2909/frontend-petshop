import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(); // 👈 ESTE es el contexto

// 👇 Este hook debe exportarse, es el que usas con `useAuth()`
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setRole(decoded.rol || null);
      } catch (err) {
        console.error("Token inválido");
        setIsLoggedIn(false);
        setRole(null);
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
    } catch {
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
