import { useState, useContext } from 'react'
import './App.css'
import './Components/ListaProductos.jsx'
import ListaProductos from './Components/ListaProductos.jsx'
import NavBar from './Components/NavBar.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Añadir from './Components/Añadir.jsx'
import Editar from './Components/Editar.jsx'
import { ProgressContext } from './Context/ProgressContext.jsx';
import BarraProgreso from './Components/BarraProgreso.jsx'
import { ProgressProvider } from './Context/ProgressContext.jsx'; // Importa el contexto

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProgressProvider>
    <Router>
      <NavBar></NavBar>
      <Routes>
          <Route path="/añadir" element={<Añadir></Añadir>} />
          <Route path="/editar/:id" element={<Editar></Editar>} />
          <Route path="/productos" element={<ListaProductos></ListaProductos>} />
          <Route path="/" element={<ListaProductos></ListaProductos>} /> 
      </Routes>
      <BarraProgreso></BarraProgreso>
     </Router>
     </ProgressProvider>
  )
}

export default App
