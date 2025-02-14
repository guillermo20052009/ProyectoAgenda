import React from 'react'
import { SiAmazonluna } from 'react-icons/si'; // Para iconos
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './BarraSuperior';
import { useState } from 'react';
import AgendaDataService from '../services/agenda.service';
import './componentes.css'
function AñadirContacto() {
    const [dni, setDni] = useState('');
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        if (name === "Dni") setDni(value);
        if (name === "Nombre") setNombre(value);
        if (name === "Apellido") setApellido(value);
        if (name === "edad") setEdad(value);
        if (name === "Telefono") setTelefono(value);
      };

      const handleSubmit = async (event) => {
        event.preventDefault(); // Evita que la página se recargue
      
        // Crea el objeto con los datos del formulario
        const contactData = {
          dni: dni,
          name: nombre,
          apellido: apellido,
          edad: edad,
          telefono: telefono,
        };
      
        try {
          // Llama al método de servicio para crear el nuevo contacto
          await AgendaDataService.create(contactData); // Asegúrate de tener ContactDataService configurado correctamente
      
          // Muestra mensaje de éxito
          alert('Contacto agregado con éxito');
          
          // Limpia el formulario si lo deseas
        
          navigate('/');
        } catch (error) {
          // Maneja cualquier error
          console.error('Error al agregar contacto:', error);
          alert('Error al agregar contacto');
        }
      };
      
return (
    <div className="container color1 text-light" style={{ fontFamily: 'Cursive' }}>
            <Navbar />
        <h2 className="mb-4 mt-5 text-center">Añadir Contacto</h2>
        <form>
            {[
                { label: "Dni", name: "Dni", type: "text" },
                { label: "Nombre", name: "Nombre", type: "text" },
                { label: "Apellido", name: "Apellido", type: "tel" },
                { label: "Edad", name: "edad", type: "number" },
                { label: "Telefono", name: "Telefono", type: "text" },
            ].map(({ label, name, type }) => (
                <div className="mb-3 w-75 mx-auto" key={name}>
                    <label className="form-label">{label}</label>
                    <input
                        type={type}
                        name={name}
                        className="form-control border-0 border-bottom bg-transparent text-light"
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div className="text-center">
                <button type="submit" className="btn color3 px-4 text-white mt-5" onClick={handleSubmit}>
                    Enviar
                </button>
            </div>
        </form>
    </div>
)
}

export default AñadirContacto