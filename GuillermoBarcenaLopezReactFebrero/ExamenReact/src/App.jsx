import { useState, useContext } from 'react'
import './App.css'
import './Components/ListaMonedas.jsx'
import ListaMonedas from './Components/ListaMonedas.jsx'
import { ProgressContext } from './Context/ProgressContext.jsx';
import BarraProgreso from './Components/BarraProgreso.jsx'
import { ProgressProvider } from './Context/ProgressContext.jsx'; // Importa el contexto

function App() {
  const [count, setCount] = useState(0)

  return (
    <ProgressProvider>
   
         <ListaMonedas></ListaMonedas>
      
     </ProgressProvider>
  )
}

export default App
