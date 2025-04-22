//src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from '../services/axiosConfig'; // 👈 nuevo axios con interceptor
import dayjs from 'dayjs';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // ⏱ Maneja inactividad
  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    const resetTimer = () => setLastActivity(Date.now());
  
    events.forEach((event) => window.addEventListener(event, resetTimer));
  
    let timeoutId;
  
    const checkTokenAndRefresh = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const decoded = jwtDecode(token);
        const expTime = decoded.exp * 1000;
        const now = Date.now();
        const inactive = now - lastActivity > 60 * 60 * 1000; // 1 hora
  
        const timeUntilExpire = expTime - now - 10 * 1000; // 10s de margen
  
        if (timeUntilExpire <= 0) {
          if (inactive) {
            logout();
          } else {
            refreshToken();
          }
        } else {
          timeoutId = setTimeout(checkTokenAndRefresh, timeUntilExpire);
        }
      }
    };
  
    checkTokenAndRefresh(); // ejecuta la primera vez
  
    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };
  }, [lastActivity]);
  

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
  }, []);

  const login = (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const decoded = jwtDecode(accessToken);
    setIsLoggedIn(true);
    setRole(decoded.rol || null);
    setUserId(decoded.id || null);
    setNombre(decoded.nombre || '');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setRole(null);
    setUserId(null);
    setNombre('');
  };

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const res = await axios.post('/auth/refresh', { refreshToken });
      localStorage.setItem('accessToken', res.data.token);
      const decoded = jwtDecode(res.data.token);
      setRole(decoded.rol);
      setUserId(decoded.id);
      setNombre(decoded.nombre);
    } catch (err) {
      logout(); // Si falla el refresh
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout, loading, userId, nombre }}>
      {children}
    </AuthContext.Provider>
  );
};
