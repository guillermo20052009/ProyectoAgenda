import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './BarraSuperior';
import AgendaDataService from '../services/agenda.service';
import TutorialDataService from '../services/tutorial.Service';
import './componentes.css';

function AñadirContacto() {
    const [dni, setDni] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [edad, setEdad] = useState('');
    const [telefono, setTelefono] = useState('');
    const [tutoriales, setTutoriales] = useState([]);
    const [selectedTutorials, setSelectedTutorials] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveTutorials();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "Dni") setDni(value);
        if (name === "Nombre") setNombre(value);
        if (name === "Apellido") setApellido(value);
        if (name === "edad") setEdad(value);
        if (name === "Telefono") setTelefono(value);
    };

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const contactData = {
            dni,
            name: nombre,
            apellido,
            edad,
            telefono,
            tutoriales: selectedTutorials
        };

        try {
            await AgendaDataService.create(contactData);
            alert('Contacto agregado con éxito');
            navigate('/Agenda');
        } catch (error) {
            console.error('Error al agregar contacto:', error);
            alert('Error al agregar contacto');
        }
    };

    return (
        <div className="container color1 text-light" style={{ fontFamily: 'Cursive' }}>
            <Navbar />
            <h2 className="mb-4 mt-5 text-center">Añadir Contacto</h2>
            <form>
                {[{ label: "Dni", name: "Dni", type: "text" },
                  { label: "Nombre", name: "Nombre", type: "text" },
                  { label: "Apellido", name: "Apellido", type: "tel" },
                  { label: "Edad", name: "edad", type: "number" },
                  { label: "Telefono", name: "Telefono", type: "text" }].map(({ label, name, type }) => (
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
                    <button type="submit" className="btn color3 px-4 text-white mt-5" onClick={handleSubmit}>
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AñadirContacto;
