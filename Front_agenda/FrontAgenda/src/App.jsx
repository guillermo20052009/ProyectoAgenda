import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import './App.css';
import Agenda from './component/Agenda'; // Importa el componente Agenda
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AñadirContacto from './component/AñadirContacto';
import Navbar from './component/BarraSuperior';
function App() {

  return(
    <Router>

      
      <Routes>
    {/* Componente que define qué componente se renderiza para cada ruta.*/}
    <Route path="/" element={<Agenda></Agenda>} />
    <Route path="/Añadir" element={<AñadirContacto></AñadirContacto>} />
    <Route path="/Editar" element={<h1>Editar</h1>} />
    <Route path="/Eliminar" element={<h1>Eliminar</h1>} />
    <Route path="/Tutoriales" element={<h1>Tutoriales</h1>} />
    </Routes>
  </Router>
   
  );
}

export default App;
