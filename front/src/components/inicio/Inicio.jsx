import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Inicio.css'

const Inicio = () => {

  const [url, setUrl] = useState();
  
  const nro = Math.floor(Math.random() * 1000) + 1;
  async function mostrar() {
    const dataPokemon = await fetch("https://pokeapi.co/api/v2/pokemon/" + nro + "/").then((response) => response.json());
    setTimeout(() => {
      setUrl(dataPokemon.sprites.front_default);
    }, 10000);
  }
  mostrar();

  return (
    <div className='inicio bg-dark border-top border-light'  style={{ backgroundImage: `url("` + url + `")` }}>
      <div className='row'>
        <div className='col-2 p-0 width20'></div>
        <div className='col p-0 text-bg-dark'>
          <h1 className='pt-4 paddingB8 fw-semibold'> Proyecto Final </h1>
          <h3 className='paddingB8 fw-semibold'> Daniel Alfonso Benavides Diaz </h3>
          <h3 className='pb-2 fw-semibold'> Roberto Morales Ortega </h3>
          <h3 className='paddingB8 fw-semibold'> DESARROLLO WEB II - PRESENCIAL-36711 </h3>
          <h3 className='pb-2 fw-semibold'> Programa de Ingeniería de Sistemas </h3>
          <h3 className='pb-2 fw-semibold'> Departamento de Ciencias de la Computación y Electrónica </h3>
          <h3 className='pb-2 fw-semibold'> Corporación Universitaria de la Costa – Barranquilla-Atlántico </h3>
          <h3 className='fw-semibold'> 03/12/2022 </h3>
        </div>
        <div className='col-2 p-0 width20'></div>
      </div>
    </div>
  )
}

export default Inicio