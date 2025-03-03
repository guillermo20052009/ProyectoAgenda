import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
          console.error('Error al obtener contacto:', e);
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
    event.preventDefault();

    // Validaciones antes de enviar
    if (!nombre || !apellido || !edad || !telefono) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!/^\d{9}$/.test(telefono)) {
      alert("El teléfono debe contener exactamente 9 dígitos.");
      return;
    }

    const contactData = {
      dni,
      name: nombre,
      apellido,
      edad,
      telefono,
      tutoriales: selectedTutorials
    };

    try {
      await AgendaDataService.update(dni, contactData);
      alert('Contacto actualizado con éxito');
      navigate('/Agenda');
    } catch (error) {
      console.error('Error al actualizar contacto:', error);
      alert('Error al actualizar contacto');
    }
  };

  return (
    <div className="container color1 text-light" style={{ fontFamily: 'Cursive' }}>
      <Navbar comp={"editar"} />
      <h2 className="mb-4 mt-5 text-center">Editar Contacto</h2>
      <form>
        {[{ label: "Nombre", name: "Nombre", type: "text", value: nombre },
          { label: "Apellido", name: "Apellido", type: "text", value: apellido },
          { label: "Edad", name: "edad", type: "number", value: edad },
          { label: "Telefono", name: "Telefono", type: "text", value: telefono }].map(({ label, name, type, value }) => (
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

        {/* Selector de tutoriales */}
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarContacto;
