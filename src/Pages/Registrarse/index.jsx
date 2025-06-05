import React from 'react';
import Registrarse from '../../Components/Registrarse';

function RegistrarsePage() {
    return (
        <div className='page'>
            <h1>Registrarse</h1>
            <Registrarse operacion="registrarse" />
        </div>
    )
}

export default RegistrarsePage