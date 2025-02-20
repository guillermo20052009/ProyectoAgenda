import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProgressContext } from '../Context/ProgressContext.jsx';

function NavBar() {
    const { progress } = useContext(ProgressContext);

    return (
        <nav className="navbar navbar-expand-lg bg-white fixed-top">
            <div className="container-fluid">
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

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* Mostrar el link solo si el progreso es menor a 5 */}
                        {progress < 5 && (
                            <li className="nav-item">
                                <Link to="/añadir" className="nav-link text-dark">
                                    Añadir
                                </Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link to="/" className="nav-link text-dark">
                                Lista Productos
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
