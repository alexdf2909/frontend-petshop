import { createContext, useContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
  const handleLogout = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  window.addEventListener('logout', handleLogout);
  return () => window.removeEventListener('logout', handleLogout);
}, []);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const quitarDelCarrito = (varianteId) => {
  setCarrito((prevCarrito) =>
    prevCarrito.filter(item => item.varianteId !== varianteId)
  );
};

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito, agregarAlCarrito, quitarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// ✅ Este hook es necesario para que funcione tu importación en ProductDetail.jsx
export const useCarrito = () => useContext(CarritoContext);
