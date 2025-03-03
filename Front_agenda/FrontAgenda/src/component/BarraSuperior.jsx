import React, { useContext, useState } from 'react';
import './componentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { SiAmazonluna } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import AgendaDataService from '../services/agenda.service';
import { ContactContext } from '../context/UserContext';

const Navbar = (props) => {
  const { userInfo, setUserInfo } = useContext(ContactContext);
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

  const handleLogout = () => {
    setUserInfo({ name: '', photoUrl: '' });
    localStorage.removeItem('userInfo');
    navigate('/Principal');
  };

  const showLeftMenu = props.comp !== "editar" && props.comp !== "tuto";
  const showFullMenu = userInfo.name === "prueba";

  return (
    <nav className="navbar navbar-expand-lg color1 text-white w-100 ms-0 px-0">
      <div className={`container-fluid d-flex align-items-center w-100 px-0 ${showLeftMenu ? '' : 'justify-content-center'}`}> 
        {/* Menú de la izquierda */}
        {showLeftMenu && (
          <div className="d-flex me-3">
            {showFullMenu ? (
              <ul className="navbar-nav mb-2 mb-lg-0">
                {props.progress < 5 && (
                  <li className="nav-item">
                    <Link to="/Añadir" className="nav-link text-white">Añadir Contacto</Link>
                  </li>
                )}
                {props.dni !== null && (
                  <>
                    <li className="nav-item">
                      <Link to={`/contacts/${props.dni}`} className="nav-link text-white">Editar Contacto</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Agenda" className="nav-link text-white" onClick={handleDelete}>Eliminar Contacto</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={`/tutoriales/${props.dni}`} className="nav-link text-white">Ver Tutoriales</Link>
                    </li>
                  </>
                )}
              </ul>
            ) : (
              <ul className="navbar-nav mb-2 mb-lg-0">
                {props.progress < 5 && props.dni !== null && (
                  <li className="nav-item">
                    <Link to={`/tutoriales/${props.dni}`} className="nav-link text-white">Ver Tutoriales</Link>
                  </li>
                )}
              </ul>
            )}
          </div>
        )}

        {/* Logo centrado solo si el menú izquierdo está presente */}
        <Link to="/Agenda" className={`text-white navbar-brand ${showLeftMenu ? 'mx-auto' : ''}`}>
          Agenda <SiAmazonluna />
        </Link>

        {/* Menú de la derecha */}
        <div className="d-flex align-items-center ms-auto">
          {userInfo && userInfo.name ? (
            <div className="dropdown position-relative">
              <button
                className="d-flex align-items-center me-4 btn btn-outline-dark"
                onClick={toggleMenu}
                style={{ backgroundColor: "transparent", border: "none", padding: "5px 10px", cursor: "pointer" }}
              >
                <img
                  src={userInfo.photoUrl}
                  alt="Perfil"
                  className="rounded-circle me-2"
                  style={{ width: 40, height: 40, objectFit: 'cover' }}
                />
                <p className="text-white m-0">{userInfo.name}</p>
              </button>
              {isOpen && (
                <ul
                  className="dropdown-menu dropdown-menu-end show"
                  style={{
                    minWidth: "220px",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(10px)",
                    overflow: "hidden",
                    padding: "10px",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 1000,
                  }}
                >
                  <li>
                    <button className="dropdown-item text-dark fw-semibold py-2" onClick={handleLogout}>
                      👤 Cerrar Sesión
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/Principal" className="text-white">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;