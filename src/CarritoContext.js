import React, { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

// Proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find((item) => item.producto.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      const nuevoCarrito = carrito.map((item) => {
        if (item.producto.id === producto.id) {
          return { ...item, cantidad: item.cantidad + 1 };
        }
        return item;
      });
      setCarrito(nuevoCarrito);
    } else {
      // Si el producto no está en el carrito, agregarlo con cantidad 1
      setCarrito([...carrito, { producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((item) => item.producto.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const calcularPrecioTotal = () => {
    let total = 0;
    for (const item of carrito) {
      total += item.producto.price * item.cantidad;
    }
    return total;
  };

  return (
    <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, calcularPrecioTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useCarrito = () => {
  return useContext(CarritoContext);
};