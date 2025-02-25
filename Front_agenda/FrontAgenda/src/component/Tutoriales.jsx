import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes.css";
import Navbar from "./BarraSuperior";
import TutorialDataService from "../services/tutorial.Service";
import yes from "./Fotos/check.png";
import no from "./Fotos/not.png";  
import { useParams, useNavigate } from 'react-router-dom';
import AgendaDataService from '../services/agenda.service';

function Tutoriales() {
  const { dni } = useParams();
  const [openIndex, setOpenIndex] = useState(null);
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  useEffect(() => {
    if (tutorials.length > 0) {
      retrieve(dni);
    }
  }, [tutorials]); // Ejecuta retrieve(dni) solo cuando tutorials está listo

  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then((response) => {
        setTutorials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieve = (id) => {
    AgendaDataService.get(id)
      .then((response) => {
        if (!response.data || !response.data.tutoriales) {
          console.log("No hay tutoriales en la agenda");
          return;
        }

        const tutorialesAgenda = response.data.tutoriales; // Lista de títulos de tutoriales
        console.log("Tutoriales en la agenda:", tutorialesAgenda);

        const filtered = tutorials.filter(tutorial => 
          tutorialesAgenda.includes(tutorial.title)
        );

        console.log("Tutoriales filtrados:", filtered);
        setFilteredTutorials(filtered);
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
      <Navbar />
      <div className="container p-4 vh-100 color1">
        <h2 className="text-center text-white mb-4">Lista de Tutoriales</h2>
        <div className="list-group">
          {filteredTutorials
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
