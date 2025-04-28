// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from '../services/auth';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setRole(null);
    setUserId(null);
    setNombre('');
  }, []);

  const handleTokenRefresh = useCallback(async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      const decoded = jwtDecode(newAccessToken);
      setRole(decoded.rol);
      setUserId(decoded.id);
      setNombre(decoded.nombre);
    } catch (err) {
      toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', {
        position: 'top-center',
        autoClose: 4000,
      });
      logout(); // cerramos sesión
    }
  }, [logout]);
  

  const checkTokenAndRefresh = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const decoded = jwtDecode(token);
    const expTime = decoded.exp * 1000;
    const now = Date.now();
    const inactive = now - lastActivity > 60 * 60 * 1000; // 1 hora
    const timeUntilExpire = expTime - now - 10 * 1000; // 10s de margen

    if (timeUntilExpire <= 0) {
      if (inactive) {
        logout();
      } else {
        handleTokenRefresh();
      }
    } else {
      setTimeout(checkTokenAndRefresh, timeUntilExpire);
    }
  }, [lastActivity, handleTokenRefresh, logout]);

  // ⏱ Inactividad
  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    const resetTimer = () => setLastActivity(Date.now());

    events.forEach((event) => window.addEventListener(event, resetTimer));

    checkTokenAndRefresh();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [checkTokenAndRefresh]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setRole(decoded.rol || null);
        setUserId(decoded.id || null);
        setNombre(decoded.nombre || '');
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const decoded = jwtDecode(accessToken);
    setIsLoggedIn(true);
    setRole(decoded.rol || null);
    setUserId(decoded.id || null);
    setNombre(decoded.nombre || '');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, loading, userId, nombre }}>
      {children}
    </AuthContext.Provider>
  );
};
