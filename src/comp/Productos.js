import React, { useEffect, useState } from "react";
import '../App.css';
import { useCarrito } from '../CarritoContext';

const Productos = () => {
    const { agregarAlCarrito } = useCarrito();
    const [estado, establecerEstado] = useState("");
    const [datos, establecerDatos] = useState([]);
    const [mostrarProductos, setMostrarProductos] = useState(12); 
    const productosPorPagina = 12; 
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos"); 

    useEffect(() => {
        // Obtener datos de la API
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
                establecerEstado(""); 
            })
            .catch((error) => {
                console.error(error);
                establecerEstado("Error al cargar los productos");
            });
    }, []);

    const cargarMasProductos = () => {
        setMostrarProductos(mostrarProductos + productosPorPagina);
    };

    const filtrarProductosPorCategoria = (producto) => {
        if (categoriaSeleccionada === "todos") {
            return true; // Mostrar todos los productos si "todos" está seleccionado
        } else {
            return producto.category === categoriaSeleccionada;
        }
    };

    return (
        <div className="Productos">
            <div className="filtro-categorias">
                <label>Filtrar por categoría:</label>
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                >
                    <option value="todos">Todos</option>
                    <option value="electronics">Electrónicos</option>
                    <option value="clothing">Ropa</option>
                    <option value="jewelery">Joyería</option>
                    {/**/}
                </select>
            </div>

            {estado}
            {datos
                .filter(filtrarProductosPorCategoria)
                .slice(0, mostrarProductos)
                .map((producto) => (
                    <div key={producto.id} className="producto">
                        <div><img src={producto.image} alt="#" /></div>
                        <div className="descripcion">
                            <h4>{producto.title}</h4>
                            <h5>{`Precio: $${producto.price}`}</h5>
                            <h6>{`Descripción: ${producto.description}`}</h6>
                            <button className="boton_añadir" onClick={() => agregarAlCarrito(producto)}>
                                Añadir al carro
                            </button>
                        </div>
                    </div>
                ))}
            {mostrarProductos < datos.length && (
                <button className="cargar-mas" onClick={cargarMasProductos}>
                    Ver más
                </button>
            )}
        </div>
    )
}

export default Productos;