import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [imagenPerfil, setImagenPerfil] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const navigate = useNavigate();  // Declara el hook navigate

  const logout = useCallback(() => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('carrito');
  setIsLoggedIn(false);
  setRole(null);
  setUserId(null);
  setNombre('');
  setImagenPerfil('');
  window.dispatchEvent(new Event('logout')); // <--- evento para limpiar carrito
  navigate('/login');
}, [navigate]);
    

  const handleTokenRefresh = useCallback(async () => {
    try {
      const newAccessToken = await refreshAccessToken();
      const decoded = jwtDecode(newAccessToken);
      setRole(decoded.rol);
      setUserId(decoded.id);
      setNombre(decoded.nombre);
      setImagenPerfil(decoded.imagenPerfil || '');
    } catch (err) {
      toast.error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.', {
        position: 'top-center',
        autoClose: 4000,
      });
      logout();
    }
  }, [logout]);

  const checkTokenAndRefresh = useCallback(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    const decoded = jwtDecode(token);
    const expTime = decoded.exp * 1000;
    const now = Date.now();
    const inactive = now - lastActivity > 60 * 60 * 1000;
    const timeUntilExpire = expTime - now - 10 * 1000;

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
        setImagenPerfil(decoded.imagenPerfil || '');
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [logout]);

  // ✅ login actualizado para aceptar datos de usuario
  const login = (accessToken, refreshToken, userData = null) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    if (userData) {
      setNombre(userData.nombre || '');
      setUserId(userData.usuarioId || null);
      setRole(userData.rol || null);
      setImagenPerfil(userData.imagenPerfil || '');
    } else {
      const decoded = jwtDecode(accessToken);
      setNombre(decoded.nombre || '');
      setUserId(decoded.id || null);
      setRole(decoded.rol || null);
      setImagenPerfil(decoded.imagenPerfil || '');
    }

    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        role,
        login,
        logout,
        loading,
        userId,
        nombre,
        imagenPerfil,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
