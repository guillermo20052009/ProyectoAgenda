import React, { useState, useEffect, useContext } from 'react';
import ProductsDataService from '../service/service.product';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ProgressContext } from '../Context/ProgressContext.jsx';

function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const [productoActual, setProductoActual] = useState(null);
    const [indiceActual, setIndiceActual] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const { setProgress } = useContext(ProgressContext);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        ProductsDataService.getAll()
            .then(response => {
                const productosActivos = response.data.filter(producto => producto.active).length; // Cuenta los activos
                setProductos(response.data);
                setProgress(productosActivos); // Actualiza el progreso con la cantidad de productos activos
                console.log("Productos activos:", productosActivos);
            })
            .catch(error => console.error(error));
    };
    

    const setActiveProduct = (product, index) => {
        setProductoActual(product);
        setIndiceActual(index);
    };

    const HandleDelete = () => {
        ProductsDataService.delete(productoActual.id)
            .then(() => {
                obtenerProductos();
                setProductoActual(null);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const cambiarCantidad = (e) => {
        const cantidad = e.target.value;
        setCantidad(cantidad);
    };

    const HandleComprar = () => {
        if (productoActual.stock - cantidad >= 0) {
            const formData = {
                id: productoActual.id,
                name: productoActual.name,
                stock: productoActual.stock - cantidad, // Resta cantidad al stock
                price: productoActual.price,
                active: productoActual.active
            };
    
            // Llamada asíncrona correctamente estructurada
            ProductsDataService.update(productoActual.id, formData)
                .then(() => {
                    obtenerProductos(); // Refresca la lista de productos
                    setProductoActual(null); // Resetea el producto actual
                    setCantidad(''); // Resetea la cantidad
                    alert("Producto actualizado correctamente");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al actualizar el producto");
                });
        } else {
            alert("No hay suficiente stock disponible");
        }
    };
    

    return (
        <div className="container">
            <div className="row">
                {/* Tabla de Productos (Arriba a la Izquierda) */}
                <div className="col-md-5 position-absolute start-0 top-0 mt-3 ms-3 py-5">
                    <h5>Lista Productos</h5>
                    <table className="table table-dark table-striped w-100">
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos && productos.length > 0 ? (
                                productos.filter(producto => producto.active)
                                    .map((producto, index) => (
                                        <tr key={index} onClick={() => setActiveProduct(producto, index)} className={`${index === indiceActual ? 'table-primary' : ''}`}>
                                            <td>{producto.name}</td>
                                        </tr>
                                    ))
                            ) : (
                                <tr>
                                    <td className="text-center">No hay productos</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Detalles del Producto (A la derecha) */}
                <div className="col-md-5 position-absolute end-0 top-0  mt-5 me-5   py-5">
                    {productoActual ? (
                        <>
                            <h4 className="text-center">Detalles del Producto</h4>
                            <p><strong>Stock:</strong> {productoActual.stock}</p>
                            <p><strong>Price:</strong> {productoActual.price} €</p>
                            <div className="mb-3">
                                 <label className="form-label">Cantidad a comprar</label>
                                <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={cantidad}
                                onChange={cambiarCantidad}
                                />
                            </div>

                            <button className="btn btn-primary me-2" onClick={() => setProductoActual(null)}>
                                Volver a la lista
                            </button>
                            <Link to={"/editar/" + productoActual.id} className="btn btn-warning me-2">
                                Editar
                            </Link>
                            <button className="btn btn-danger me-2" onClick={() => HandleDelete()}>
                                Eliminar
                            </button>
                            <button className="btn btn-success me-2" onClick={() => HandleComprar()}>
                                Comprar
                            </button>
                        </>
                    ) : (
                        <h4 className="text-center">Pulsa en un Producto</h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListaProductos;
