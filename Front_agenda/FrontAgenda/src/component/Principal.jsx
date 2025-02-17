import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes.css"; // Importa el archivo CSS
import fondo from "./Fotos/image.jpg"; // Ruta relativa

function Principal() {
  return (
    <div
      className="vh-100 vw-100 d-flex justify-content-center align-items-center text-white"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        position: "fixed", // Fijar la imagen para que no haya scroll
        top: 0,
        left: 0,
      }}
    >
      <div className="bg-dark bg-opacity-50 p-5 rounded">
        <form className="d-flex flex-column">
          <h3 className="text-center text-white mb-4">Inicio de sesión</h3>

          {/* Input de usuario */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Nombre de usuario"
            />
          </div>

          {/* Input de contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
            />
          </div>

          {/* Botón de inicio de sesión */}
          <button type="submit" className="btn btn-primary mt-3">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Principal;
