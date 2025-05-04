import React from 'react'
import Registrarse from '../../Components/Registrarse';
import './styles.css';

function ModificaDatosUsuario() {
    return (
        <div className='page'>
            <h1 className='titulo-modificar'>Modificar datos personales</h1>
            <Registrarse operacion={'modificar'} />
        </div>
    )
}

export default ModificaDatosUsuario