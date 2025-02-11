import React, { useEffect } from 'react';

function DetalleUsuario({ data }) { 
  

  return (
    <>
      <p>DNI: {data?.dni}</p>
      <p>Nombre: {data?.name}</p>
      <p>Apellido: {data?.apellido}</p>
      <p>Edad: {data?.edad}</p>
      <p>Teléfono: {data?.telefono}</p>
    </>
  );
}

export default DetalleUsuario;
