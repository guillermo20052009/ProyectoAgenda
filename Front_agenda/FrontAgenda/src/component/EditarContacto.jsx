import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SiAmazonluna } from 'react-icons/si'; // Para iconos
import Navbar from './BarraSuperior';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.Service';

function EditarContacto() {
  const { dni } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tutoriales, setTutoriales] = useState([]);
  const [selectedTutorials, setSelectedTutorials] = useState([]);

  useEffect(() => {
    if (dni) {
      AgendaDataService.get(dni)
        .then(response => {
          const contact = response.data;
          setNombre(contact.name);
          setApellido(contact.apellido);
          setEdad(contact.edad);
          setTelefono(contact.telefono);
          setSelectedTutorials(contact.tutoriales || []);
        })
        .catch(e => {
          console.log(e);
        });
      retrieveTutorials();
    }
  }, [dni]);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutoriales(response.data);
      })
      .catch(error => console.error('Error al obtener tutoriales:', error));
  };

  const handleTutorialChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedTutorials(options);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Nombre") setNombre(value);
    if (name === "Apellido") setApellido(value);
    if (name === "edad") setEdad(value);
    if (name === "Telefono") setTelefono(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Crea el objeto con los datos del formulario
    const contactData = {
      dni,
      name: nombre,
      apellido,
      edad,
      telefono,
      tutoriales: selectedTutorials
    };

    try {
      // Llama al método de servicio para actualizar el contacto
      await AgendaDataService.update(dni, contactData); // Asegúrate de tener AgendaDataService configurado correctamente

      // Muestra mensaje de éxito
      alert('Contacto actualizado con éxito');
      
      // Navega a la ruta base
      navigate('/Agenda');
    } catch (error) {
      // Maneja cualquier error
      console.error('Error al actualizar contacto:', error);
      alert('Error al actualizar contacto');
    }
  };

  return (
    <div className="container color1 text-light" style={{ fontFamily: 'Cursive' }}>
      <Navbar />
      <h2 className="mb-4 mt-5 text-center">Editar Contacto</h2>
      <form>
        {[
          { label: "Nombre", name: "Nombre", type: "text", value: nombre },
          { label: "Apellido", name: "Apellido", type: "text", value: apellido },
          { label: "Edad", name: "edad", type: "number", value: edad },
          { label: "Telefono", name: "Telefono", type: "text", value: telefono },
        ].map(({ label, name, type, value }) => (
          <div className="mb-3 w-75 mx-auto" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={type}
              name={name}
              className="form-control border-0 border-bottom bg-transparent text-light"
              onChange={handleChange}
              value={value}
            />
          </div>
        ))}
        {/* Spinner para seleccionar múltiples tutoriales */}
        <div className="mb-3 w-75 mx-auto">
          <label className="form-label">Seleccionar Tutorial(es)</label>
          <select
            className="form-control border-0 border-bottom bg-transparent text-light"
            multiple
            value={selectedTutorials}
            onChange={handleTutorialChange}
          >
            {tutoriales.map((tutorial) => (
              <option key={tutorial.id} value={tutorial.title} className='text-white'>{tutorial.title}</option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button type="submit" className="btn color3 text-white mt-5 px-4" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarContacto;
