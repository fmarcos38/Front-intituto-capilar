import React from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './estilos.css';


function BotonEliminaProp({handleOnClick}) {

    return (
        <button className='boton-elimina-prop' onClick={handleOnClick}>
            <DeleteForeverIcon />
        </button>
    )
}

export default BotonEliminaProp