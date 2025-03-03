import { useState } from 'react';

function BarraProgreso(props) {
  const progressColor = props.progress < 5 ? 'bg-success' : 'bg-danger';

  return (
    <div className="progress mt-5 mb-5">
      <div  
        className={`progress-bar progress-bar-striped progress-bar-animated ${progressColor}`} 
        role="progressbar" 
        style={{ width: `${props.progress*20}%` }}
        aria-valuenow={props.progress*20} 
        aria-valuemin="0" 
        aria-valuemax="100"
      >
        {props.progress < 100 ? `${props.progress*20}%` : "100%"}
      </div>
    </div>
  );
}

export default BarraProgreso;
