import React, { useEffect, useState } from "react";
import '../App.css';

const Productos = () => {
    const [estado, establecerEstado] = useState("");
    const [datos, establecerDatos] = useState([]);

    useEffect(() => {
        // Usamos la función fetch para obtener datos de la API
        fetch("https://fakestoreapi.com/products")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener la información de la API");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                establecerDatos(data);
                establecerEstado(""); // Cambiamos el estado a vacío después de obtener los datos
            })
            .catch((error) => {
                console.error(error);
                establecerEstado("Error al cargar los productos");
            });
    }, []);

    return (
        <div className="Productos">
            {estado}
            {datos.map((producto) => (
                <div key={producto.id} className="producto">
                    <div><img src={producto.image} alt="#" /></div>
                    <div className="descripcion">
                        <h6>{producto.title}</h6>
                        <h6>{`Precio: ${producto.price}`}</h6>
                        <h6>{`Descripción: ${producto.description}`}</h6>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Productos;