import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentes.css";
import fondo from "./Fotos/image.jpg";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { MiContexto } from '../context/UserContext.jsx'; // Importa el contexto

function Principal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Acceder al contexto
  const { setUserInfo } = useContext(MiContexto); // Obtener la función para actualizar el contexto

  // Función para manejar el inicio de sesión
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("El usuario no existe.");
        return;
      }

      // Obtener los datos del usuario desde Firestore (nombre y foto)
      const userDoc = querySnapshot.docs[0]; // Tomamos el primer usuario encontrado
      const userData = userDoc.data(); // Obtener los datos del documento
      const userName = userData.displayName;
      const userPhotoUrl = userData.photoURL; // Asegúrate de que estos campos estén en Firestore

      // Actualizamos el contexto con los datos del usuario
  
      setUserInfo({
        name: userName,
        photoUrl: userPhotoUrl
      });

      // Autenticación con Firebase
      const fakeEmail = `${username}@fakeemail.com`;
      await signInWithEmailAndPassword(auth, fakeEmail, password);

      // Redirigir a la página de contactos
      navigate("/Agenda");
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
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
        <form className="d-flex flex-column" onSubmit={handleLogin}>
          <h3 className="text-center text-white mb-4">Inicio de sesión</h3>

          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <button type="submit" className="btn color4 btn-secondary mt-3 text-white">
            Iniciar sesión
          </button>

          <p className="text-center text-white mt-3">
            ¿No tienes cuenta? <a href="/Registro" className="text-light">Regístrate aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Principal;
