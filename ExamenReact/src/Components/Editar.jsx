import React, { useState, useEffect, use, act } from 'react';
import ProductsDataService from '../service/service.product.js';
import { useParams, useNavigate } from 'react-router-dom';
function Editar() {
    const [name, setname] = useState('');
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [active, setActive] = useState(true);
    const { id } = useParams();
      const navigate = useNavigate();
    
      useEffect(() => {
        ProductsDataService.getAll() 
            .then((response) => {
                const filteredProduct = response.data.find(product => product.id.toString() === id); 
                
                if (filteredProduct) {
                    setname(filteredProduct.name);
                    setPrice(filteredProduct.price);
                    setStock(filteredProduct.stock);
                } else {
                    console.log(`No se encontró un producto con el ID: ${id}`);
                }
            })
            .catch((e) => {
                console.log("Error al obtener los productos:", e);
            });
    }, [id]);

        const handleChange = (e) => {
            const { name, value,checked } = e.target;
            if (name === "name") setname(value);
            if (name === "stock") setStock(value);
            if (name === "price") setPrice(value);
            if (name === "active") setActive(checked);
          };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = {
            id: id,
            name: name,
            stock: stock,
            price: price,
            active: active
          };
        
        try { 
          ProductsDataService.update(id, formData);
            alert("Producto actualizado correctamente");
        } catch (error) {
            console.log(error);
            alert("Error al actualizar el bolso");
        }
        navigate('/productos');
    
        
       
      };
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Actualizar Producto</h2>
      <form onSubmit={handleSubmit}>
  
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

 
  <button type="submit" className="btn btn-primary">Actualizar</button>
</form>
    </div>
  )
}

export default Editar