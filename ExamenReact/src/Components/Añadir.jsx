import React, { useState } from 'react';
import ProductsDataService from '../service/service.product.js';
import { useNavigate } from 'react-router-dom';

function Añadir() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value,checked } = e.target;
    if (name === 'name') setName(value);
    if (name === 'stock') setStock(value);
    if (name === 'price') setPrice(value);
    if (name === 'active') setActive(checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      active: active,
      name: name,
      stock: stock,
      price: price,
    };

    try {
      ProductsDataService.create(formData);
      alert('Producto añadido correctamente');
    } catch (error) {
      console.log(error);
      alert('Error al añadir el bolso');
    }
    navigate('/productos');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Añadir Bolso</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Stock */}
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={stock}
            onChange={handleChange}
            required
          />
        </div>

        {/* Precio */}
        <div className="mb-3">
          <label className="form-label">Precio (€)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="active"
              checked={active}
              onChange={handleChange}
           />
          <label className="form-check-label">Activar producto</label>
          </div>
        </div>


        {/* Botón de Enviar */}
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
}

export default Añadir;