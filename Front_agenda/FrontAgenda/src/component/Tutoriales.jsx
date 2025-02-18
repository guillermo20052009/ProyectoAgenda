import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes.css"; // Archivo para estilos adicionales
import Navbar from "./BarraSuperior";
import TutorialDataService from "../services/tutorial.Service";
import yes from "./Fotos/check.png";
import no from "./Fotos/not.png";  
import { useParams, useNavigate } from 'react-router-dom';

function Tutoriales() {
  const { dni } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container p-4 vh-100 color1">
        <h2 className="text-center text-white mb-4">Lista de Tutoriales</h2>
        <div className="list-group">
        {tutorials
  .filter(tutorial => tutorial.dniCliente == dni) // Filtra los tutoriales por dniCliente
  .map((tutorial, index) => (
    <div key={tutorial.id} className="mb-3">
      <button
        className={`list-group-item list-group-item-action text-white fw-bold color2 ${
          openIndex === index ? "bg-secondary" : ""
        }`}
        onClick={() => toggleItem(index)}
      >
        {tutorial.title}
      </button>
      {openIndex === index && (
        <div className="p-3 mt-2 rounded color3 fade-in">
          <p>{tutorial.description}</p>
          <p>
            Publicado:{" "}
            {tutorial.published ? (
              <img
                src={yes}
                alt="Publicado"
                style={{ width: "20px", height: "20px" }}
              />
            ) : (
              <img
                src={no}
                alt="No publicado"
                style={{ width: "20px", height: "20px" }}
              />
            )}
          </p>
        </div>
      )}
    </div>
  ))}
        </div>
      </div>
    </>
  );
}

export default Tutoriales;
