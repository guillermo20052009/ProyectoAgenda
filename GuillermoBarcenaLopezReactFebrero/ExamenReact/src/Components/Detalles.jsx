import React from 'react'
import BarraProgreso from './BarraProgreso.jsx';

function Detalles(props) {
  return (
    <>
                            <h4 className="text-center">Detalles de la moneda</h4>
                            <p><strong>Stock:</strong> {props.monedaActual.stock}</p>
                            <p><strong>Price:</strong> {props.monedaActual.price} €</p>
                            <p><strong>Active:</strong> {props.monedaActual.active ? "Activado":"Desactivado"} </p>
                            <div className="mb-3">
                                 <label className="form-label">Cantidad a transformar</label>
                                <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={props.cantidad}
                                onChange={props.cambiarCantidad}
                                disabled={props.monedaActual.active ? false: true}
                                />
                            </div>
                            <div className="mb-3">
                                 <label className="form-label">Equivalencia en euros</label>
                                <input
                                type="number"
                                className="form-control"
                                name="stock"
                                value={props.transform}
                                disabled
                                />
                            </div>

                            <button className="btn btn-primary me-2" onClick={() => props.setMonedaActual(null)}>
                                Volver a la lista
                            </button>
                            <button  className={`${props.monedaActual.active ? 'btn btn-success me-2' : 'btn btn-success me-2 disabled'}`} onClick={() => props.HandleIncremento()}>
                                Incrementar
                            </button>
                            
                            { props.monedaActual.stock < 100 ? (
                                <>
                                    <p className='mt-3 text-success'>Reserva sin llenar</p>
                                </>

                            ) : (
                                <>
                                <p className='mt-3 text-danger'>Reserva llena</p>
                                </>
                            )}

                        
                            <BarraProgreso></BarraProgreso>
                        </>
  )
}

export default Detalles