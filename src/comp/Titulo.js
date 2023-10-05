import React, { useState } from "react";
import '../App.css';
import Carrito from './Carrito.js';

const Titulo = () => {
    const [carritoAbierto, setCarritoAbierto] = useState(false);

    const toggleCarrito = () => {
        setCarritoAbierto(!carritoAbierto);
    };

    return (
        <div className="titulo">
            <h1>Tienda app</h1>
            <div className="carrito">
                {/* Usar la función toggleCarrito al hacer clic en el botón */}
                <button onClick={toggleCarrito}>Carrito de compras</button>
            </div>
            <div className="iniciales">SN</div>

            {/* Renderizar el componente del carrito si carritoAbierto es true */}
            {carritoAbierto && <Carrito />}
        </div>
    )
}

export default Titulo;