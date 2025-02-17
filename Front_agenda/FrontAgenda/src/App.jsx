import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import './App.css';
import Agenda from './component/Agenda'; // Importa el componente Agenda
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import AñadirContacto from './component/AñadirContacto';
import Navbar from './component/BarraSuperior';
import EditarContacto from './component/EditarContacto';
import Principal from './component/Principal';
function App() {

  return(
    <Router>

      
      <Routes>
    {/* Componente que define qué componente se renderiza para cada ruta.*/}
    <Route path="/" element={<Navigate to={"/Agenda"} ></Navigate>} />
    <Route path="/Principal" element={<Principal></Principal>} />
    <Route path="/Agenda" element={<Agenda></Agenda>} />
    <Route path="/Añadir" element={<AñadirContacto></AñadirContacto>} />
    <Route path="contacts/:dni" element={<EditarContacto></EditarContacto>} />
    <Route path="/Tutoriales" element={<h1>Tutoriales</h1>} />
    </Routes>
  </Router>
   
  );
}

export default App;
