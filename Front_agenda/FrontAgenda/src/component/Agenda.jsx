import React, { useState, useEffect } from 'react';
import AgendaDataService from '../services/agenda.service';
import Navbar from './BarraSuperior';
import './componentes.css';

function Agenda() {
  const [agenda, setAgenda] = useState([]);
  const [selectedDni, setSelectedDni] = useState(null);
  const [contactoSeleccionado, setContactoSeleccionado] = useState(null);

  useEffect(() => {
    retrieveContacts();
  }, []);

  const retrieveContacts = () => {
    AgendaDataService.getAll()
      .then(response => {
        setAgenda(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClick = (dni) => {
    setSelectedDni(dni);
  
    // Llamada a la API para obtener detalles del contacto seleccionado
    AgendaDataService.get(dni)
      .then(response => {
        setContactoSeleccionado(response.data); // Guardamos los detalles del contacto
      })
      .catch(error => {
        console.error('Error obteniendo detalles del contacto:', error);
      });
  };
  

  const cards = agenda.map((contacto, index) => (
    <div className="col-md-3 my-3" key={index}>
      <div 
        className={`card ${selectedDni === contacto.dni ? 'color4' : 'color2'} text-white`}
        onClick={() => handleClick(contacto.dni)}
      >
        <div className="card-body">
          <h5 className="card-title text-center">Contacto {index + 1}</h5>
          <p className="card-text">
            DNI: {contacto.dni} <br /></p>
            <p className='card-text'>
            Nombre: {contacto.name} {contacto.apellido}
          </p>
  
          {selectedDni === contacto.dni && contactoSeleccionado && (
  <div className="contact-details">
    <p>Teléfono: {contactoSeleccionado.telefono}</p>
    <p>Email: {contactoSeleccionado.edad}</p>
  </div>
)}
        </div>
      </div>
    </div>
  ));
  

  return (
    <div className="container color1 text-white min-vh-100" style={{ fontFamily: 'Cursive' }}>
      <Navbar dni={selectedDni} />
      <div className="row justify-content-center">
        {cards}
      </div>
    </div>
  );
}

export default Agenda;
