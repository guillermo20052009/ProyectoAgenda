import React, { useState, useEffect } from 'react';
import DetalleUsuario from './DetalleUsuario';
import AgendaDataService from '../services/agenda.service';
import Navbar from './BarraSuperior';

function Agenda() {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    
    AgendaDataService.getAll()
      .then(response => {
        setAgenda(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const cards = Array.from({ length: agenda.length }, (_, index) => (
    <div className="col-md-3 my-4" key={index}>
      <div className="card">
        <div className="card-body bg-secondary text-white">
          <h5 className="card-title text-center">Contacto {index + 1}</h5>
          <p className="card-text">
            <DetalleUsuario data={agenda[index]} />
          </p>
        </div>
      </div>
    </div>
  ));

return (
    <div className="container bg-dark text-white min-vh-100">
        <Navbar />
        <div className="row justify-content-center">
            {cards}
        </div>
    </div>
);
}

export default Agenda;
