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

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => [...prevCarrito, producto]);
  };

  const quitarDelCarrito = (varianteId) => {
    setCarrito((prevCarrito) => {
      const nuevoCarrito = prevCarrito.filter(item => item.varianteId !== varianteId);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
      return nuevoCarrito;
    });
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, quitarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// ✅ Este hook es necesario para que funcione tu importación en ProductDetail.jsx
export const useCarrito = () => useContext(CarritoContext);
