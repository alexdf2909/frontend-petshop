const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
      // Intentar cargar el carrito desde localStorage
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
  
    const agregarAlCarrito = (producto) => {
        console.log('Producto agregado:', producto);
        setCarrito((prevCarrito) => {
          const nuevoCarrito = [...prevCarrito, producto];
          console.log('Carrito actualizado:', nuevoCarrito);
          return nuevoCarrito;
        });
      };
  
    const quitarDelCarrito = (varianteId) => {
      setCarrito((prevCarrito) => {
        const nuevoCarrito = prevCarrito.filter(item => item.varianteId !== varianteId);
        // Actualizar el carrito en localStorage
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
  