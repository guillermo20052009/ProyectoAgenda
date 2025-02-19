import React, { useContext, useState } from 'react';
import './componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importa Bootstrap JS
import { SiAmazonluna } from 'react-icons/si'; // Icono del logo
import { Link, useNavigate } from 'react-router-dom';
import AgendaDataService from '../services/agenda.service';
import { MiContexto } from '../context/UserContext.jsx';

const Navbar = (props) => {
  const { userInfo } = useContext(MiContexto);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async () => {
    try {
      await AgendaDataService.delete(props.dni);
      alert('Contacto eliminado con éxito');
      props.eliminar(props.dni);
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      alert('Error al eliminar contacto');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg color1 text-white">
      <div className="container-fluid">
        {/* Botón de hamburguesa */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de la barra de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
            <li className="nav-item">
              <Link to="/Añadir" className="nav-link text-white">Añadir Contacto</Link>
            </li>
            <li className="nav-item">
              <Link to={"/contacts/" + props.dni} className="nav-link text-white">Editar Contacto</Link>
            </li>
            <li className="nav-item">
              <Link to="/Agenda" className="nav-link text-white" onClick={handleDelete}>Eliminar Contacto</Link>
            </li>
            <li className="nav-item">
              <Link to="/Tutoriales" className="nav-link text-white">Ver Tutoriales</Link>
            </li>
          </ul>
        </div>

        {/* Título centrado */}
        <Link to="/" className="text-white navbar-brand position-absolute start-50 translate-middle-x">
          Agenda <SiAmazonluna />
        </Link>

        {/* Elementos a la derecha */}
        <div className="d-flex align-items-center ms-auto">
          {/* Avatar con imagen y menú desplegable */}
          {userInfo && userInfo.name ? (
            <div className="dropdown position-relative">
              {/* Botón del usuario */}
              <button 
                className="d-flex align-items-center me-4 btn btn-outline-dark"
                onClick={toggleMenu} // Alterna la visibilidad del menú
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                <img 
                  src={userInfo.photoUrl} 
                  alt="Perfil" 
                  className="rounded-circle me-2"
                  style={{ width: 40, height: 40, objectFit: 'cover' }}
                />
                <p className="text-white m-0">{userInfo.name}</p>
              </button>

              {/* Menú desplegable */}
              {isOpen && (
                <ul 
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    minWidth: "220px",
      borderRadius: "8px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      backgroundColor: "rgba(255, 255, 255, 0.6)", // Fondo blanco con transparencia
      backdropFilter: "blur(10px)", // Efecto de desenfoque
      overflow: "hidden",
      padding: "10px",
      position: "absolute",
      right: 0,
      top: "100%",
      zIndex: 1000
                  }}
                >
                  <li>
                    <Link className="dropdown-item text-dark fw-semibold py-2" to="/Principal">
                      👤 Cerrar Sesión
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/Principal" className="text-white">
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
