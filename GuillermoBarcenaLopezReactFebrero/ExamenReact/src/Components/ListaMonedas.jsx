import React, { useState, useEffect, useContext } from 'react';
import MonedaDataService from '../service/service.moneda.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { ProgressContext } from '../Context/ProgressContext.jsx';
import BarraProgreso from './BarraProgreso.jsx';
import Detalles from './Detalles.jsx';

function ListaMonedas() {
    const [moneda, setMoneda] = useState([]);
    const [monedaActual, setMonedaActual] = useState(null);
    const [indiceActual, setIndiceActual] = useState(null);
    const [cantidad, setCantidad] = useState('');
    const { setProgress } = useContext(ProgressContext);
    const [transform, setTransform] = useState('');
    const [error,setError] = useState('No hay monedas disponibles');

    useEffect(() => {
        obtenerMonedas();
    }, []);

    const obtenerMonedas = () => {
        MonedaDataService.getAll()
            .then(response => {
                const MonedasActivos = response.data.filter(moneda => moneda.active).length; // Cuenta los activos
                setMoneda(response.data);
                console.log("Monedas activas:", MonedasActivos);
            })
            .catch(error => console.error(error), setError('No se ha podido acceder correctamente a la api'))
           

    };
    

    const setActiveMoneda = (moneda, index) => {
        setMonedaActual(moneda);
        setProgress(moneda.stock)
        setIndiceActual(index);
        setCantidad('')
        setTransform('')
    };

 
    const cambiarCantidad = (e) => {
        const cantidad = e.target.value;
        setCantidad(cantidad);
        if ((cantidad>0 && cantidad<=monedaActual.stock ) || cantidad===''){
        const cambio = cantidad*monedaActual.price
        setTransform(cambio)
        } else{
            alert("La cantidad debe ser mayor de 0 y no puede superar el stock actual")
            setCantidad('');
            setTransform('')
        }
    };


    const HandleIncremento = () => {
        if (monedaActual.stock < 100) {
            const formData = {
                id: monedaActual.id,
                name: monedaActual.name,
                stock: monedaActual.stock + 10, // Resta cantidad al stock
                price: monedaActual.price,
                active: monedaActual.active,
                brand: monedaActual.brand
            };
    
            // Llamada asíncrona correctamente estructurada
            MonedaDataService.update(monedaActual.id, formData)
                .then(() => {
                    obtenerMonedas(); // Refresca la lista de moneda
                    setMonedaActual(null); // Resetea el moneda actual
                    setCantidad(''); // Resetea la cantidad
                    alert("Stock actualizado correctamente");
                })
                .catch((error) => {
                    console.log(error);
                    alert("Error al actualizar la moneda");
                });
        } else {
            alert("el incremento no se puede realizar despues de superar las 100 unidades de Stock");
        }
    };
    

    return (
        <div className="container">
            <div className="row">
                {/* Tabla de Monedas (Arriba a la Izquierda) */}
                <div className="col-md-5 position-absolute start-0 top-0 mt-3 ms-3 py-5">
                    <h5>Lista Monedas</h5>
                    <table className="table table-dark table-striped w-100">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Descripcion</th>
                                <th>Stock</th>
                            </tr>
                        </thead>
                        <tbody>
                            {moneda && moneda.length > 0 ? (
                                moneda.map((moneda, index) => (
                                        <tr key={index} onClick={() => setActiveMoneda(moneda, index)} className={`${index === indiceActual ? 'table-primary' : ''}`}>
                                            <td>{moneda.name}</td>
                                            <td>{moneda.brand}</td>
                                            <td>{moneda.stock}</td>
                                        </tr>
                                        
                                        
                                    ))
                            ) : (
                                <tr>
                                    <td className="text-center">{error}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Detalles de Moneda (A la derecha) */}
                <div className="col-md-5 position-absolute end-0 top-0  mt-5 me-5  mb-5 py-5">
                    {monedaActual ? (
                        <Detalles monedaActual={monedaActual} setMonedaActual={setMonedaActual} transform={transform} cantidad={cantidad} cambiarCantidad={cambiarCantidad} 
                        HandleIncremento={HandleIncremento}></Detalles>
                    ) : (
                        <h4 className="text-center">Pulsa en una Moneda</h4>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListaMonedas;
