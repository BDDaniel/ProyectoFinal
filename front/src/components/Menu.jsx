import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Inicio from './inicio/Inicio';
import Areas from './areas/Areas';
import Profesores from './profesores/Profesores';
import Asignaturas from './asignaturas/Asignaturas';

const Menu = () => {

    const [estadoInicio, setEstadoInicio] = useState(true);
    const [estadoAreas, setEstadoAreas] = useState(false);
    const [estadoProfesores, setEstadoProfesores] = useState(false);
    const [estadoAsignaturas, setEstadoAsignaturas] = useState(false);

    function cambiarEstado(id) {
        switch (id) {
            case 1:
                setEstadoInicio(true);
                setEstadoAreas(false);
                setEstadoProfesores(false);
                setEstadoAsignaturas(false);
                break;
            case 2:
                setEstadoInicio(false);
                setEstadoAreas(true);
                setEstadoProfesores(false);
                setEstadoAsignaturas(false);
                break;
            case 3:
                setEstadoInicio(false);
                setEstadoAreas(false);
                setEstadoProfesores(true);
                setEstadoAsignaturas(false);
                break;
            case 4:
                setEstadoInicio(false);
                setEstadoAreas(false);
                setEstadoProfesores(false);
                setEstadoAsignaturas(true);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div>
                        <button className='navbar-brand bg-dark border-0 text-bg-dark' onClick={() => cambiarEstado(1)}>Inicio</button>
                        <button className='navbar-brand bg-dark border-0 text-bg-dark' onClick={() => cambiarEstado(2)}>Areas</button>
                        <button className='navbar-brand bg-dark border-0 text-bg-dark' onClick={() => cambiarEstado(3)}>Profesores</button>
                        <button className='navbar-brand bg-dark border-0 text-bg-dark' onClick={() => cambiarEstado(4)}>Asignaturas</button>
                    </div>
                </div>
            </nav>
            {estadoInicio ? (
                <Inicio></Inicio>
            ) : (
                ""
            )}
            {estadoAreas ? (
                <Areas></Areas>
            ) : (
                ""
            )}
            {estadoProfesores ? (
                <Profesores></Profesores>
            ) : (
                ""
            )}
            {estadoAsignaturas ? (
                <Asignaturas></Asignaturas>
            ) : (
                ""
            )}
        </div>
    )
}

export default Menu