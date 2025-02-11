import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaShoppingCart, FaBell, FaUserCircle } from 'react-icons/fa'; // Para iconos

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Botón de hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces de la barra de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <a className="navbar-brand" href="#">Agenda</a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">Añadir Contacto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Editar contacto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Eliminar contacto</a>
            </li>
          </ul>
        </div>

        {/* Elementos a la derecha */}
        <div className="d-flex align-items-center">


          {/* Avatar */}
          <div className="dropdown">
            <a
            >
              <FaUserCircle className="rounded-circle" size={25} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
