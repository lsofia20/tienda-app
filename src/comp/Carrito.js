import React from "react";
import '../App.css';
import { useCarrito } from '../CarritoContext';

const Carrito = () => {
    const { carrito, eliminarDelCarrito, calcularPrecioTotal } = useCarrito(); 

    // Función para calcular el precio total
    const formatearPrecio = (precio) => {
        return precio.toFixed(2);
    };

    return (
        <div className="CarritoContainer">
            <h2>Carrito de compras</h2>
            {carrito.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <ul>
                    {carrito.map((item) => (
                        <li key={item.producto.id}>
                            <div className="carrito-item">
                                <div className="carrito-item-info">
                                    <h3>{item.producto.title}</h3>
                                    <p>Precio: ${formatearPrecio(item.producto.price)}</p>
                                    <p>Cantidad: {item.cantidad}</p>
                                    <p>Total: ${formatearPrecio(item.producto.price * item.cantidad)}</p>
                                </div>
                                <button onClick={() => eliminarDelCarrito(item.producto.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                    <p>Precio Total: ${formatearPrecio(calcularPrecioTotal(carrito))}</p>
                </ul>
            )}
        </div>
    );
}

export default Carrito;