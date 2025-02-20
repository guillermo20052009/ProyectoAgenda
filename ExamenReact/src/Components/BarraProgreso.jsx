
import { useContext } from 'react';
import { ProgressContext } from '../Context/ProgressContext.jsx'; // Importar el contexto

function BarraProgreso() {
  const { progress } = useContext(ProgressContext); // Usar el contexto
  return (
    <div className="progress mt-5 ancho">
    <div  
        className="progress-bar progress-bar-striped progress-bar-animated bg-primary " 
        role="progressbar" 
        style={{ width: `${progress * 20}%` }}
        aria-valuenow={progress} 
        aria-valuemin="0" 
        aria-valuemax="100"
    >
    </div>
</div>
  )
}

export default BarraProgreso