import React, { useState } from 'react';
import { ContactProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Principal from './component/Principal';
import Agenda from './component/Agenda';
import Registro from './component/Registro';
import AñadirContacto from './component/AñadirContacto';
import EditarContacto from './component/EditarContacto';
import Tutoriales from './component/Tutoriales';

function App() {
 

  return (
    <ContactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Principal" />} />
          <Route path="/Principal" element={<Principal />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/Agenda" element={<Agenda />} />
          <Route path="/Añadir" element={<AñadirContacto />} />
          <Route path="/tutoriales/:dni" element={<Tutoriales></Tutoriales>} />
          <Route path="contacts/:dni" element={<EditarContacto />} />
        </Routes>
      </Router>
    </ContactProvider>
  );
}

export default App;
