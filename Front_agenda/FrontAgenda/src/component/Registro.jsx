import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes.css"; // Importa el archivo CSS
import fondo from "./Fotos/image.jpg"; // Ruta relativa
import { Link, useNavigate } from "react-router-dom";
import { auth, generateUserDocument } from "../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Registro() {
  const [username, setUsername] = useState(""); // Guardar nombre de usuario
  const [password, setPassword] = useState("");
  const [URLPhoto, setURLPhoto] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Para redirigir después del registro

  const createUserWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      // Generar un email ficticio basado en el nombre de usuario
      const fakeEmail = `${username}@fakeemail.com`;

      // Crear usuario en Firebase (Firebase requiere un email)
      const { user } = await createUserWithEmailAndPassword(auth, fakeEmail, password);

      // Actualizar perfil del usuario con su nombre de usuario real
      await updateProfile(user, {
        displayName: username, // Guarda el nombre de usuario
        photoURL: URLPhoto || "https://via.placeholder.com/150", // Imagen por defecto
      });

      // Guardar usuario en Firestore
      await generateUserDocument(user, { username });

      // Redirigir a la página principal
      navigate("/Principal");
    } catch (error) {
      setError("Error al registrarse: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "username") setUsername(value);
    if (id === "password") setPassword(value);
    if (id === "Photo") setURLPhoto(value);
  };

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
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div className="bg-dark bg-opacity-50 p-5 rounded">
        <form className="d-flex flex-column" onSubmit={createUserWithEmailAndPasswordHandler}>
          <h3 className="text-center text-white mb-4">Registrarse</h3>

          {/* Input de nombre de usuario */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Nombre de usuario"
              onChange={handleChange}
              required
            />
          </div>

          {/* Input de foto */}
          <div className="mb-3">
            <label htmlFor="Photo" className="form-label text-white">
              Foto de perfil (opcional)
            </label>
            <input
              type="text"
              id="Photo"
              className="form-control"
              placeholder="URL de la foto"
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </div>

          {/* Muestra errores */}
          {error && <p className="text-danger text-center">{error}</p>}

          {/* Botón de registro */}
          <button type="submit" className="btn color4 btn-secondary mt-3 text-white">
            Registrarse
          </button>

          {/* Enlace a inicio de sesión */}
          <p className="text-center text-white mt-3">
            ¿Ya tienes cuenta? <Link to="/login" className="text-light">Inicia sesión aquí</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registro;
