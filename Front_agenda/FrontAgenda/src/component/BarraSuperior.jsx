import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Importa el JavaScript de Bootstrap
import { FaShoppingCart, FaBell, FaUserCircle } from 'react-icons/fa'; // Para iconos
import { SiAmazonluna } from 'react-icons/si'; // Para iconos
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/Añadir" className='nav-link'>Añadir Contacto</Link>
            </li>
            <li className="nav-item">
            <Link to="/Editar" className='nav-link'>Editar Contacto</Link>
            </li>
            <li className="nav-item">
            <Link to="/Eliminar" className='nav-link'>Eliminar Contacto</Link>
            </li>
            <li>
            <Link to="/Tutoriales" className='nav-link'>Ver Tutoriales</Link>
            </li>
          </ul>
        </div>

        {/* Título centrado */}
        <Link to="/" className='navbar-brand position-absolute start-50 translate-middle-x'>Agenda <SiAmazonluna ></SiAmazonluna></Link>

        {/* Elementos a la derecha */}
        <div className="d-flex align-items-center ms-auto">
          {/* Avatar */}
          <div className="dropdown">
            <a>
              <FaUserCircle className="rounded-circle" size={25} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;