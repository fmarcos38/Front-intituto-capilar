import React from 'react'
import imgNoHayProds from '../../Images/noHayProds.jpg';
import './estilos.css';


function NoHayProds() {
    return (
        <div className='cont-noHayProps'>
            <img src={imgNoHayProds} alt='not found' className='img-noHayProps' />
            <h1 className='titulo-noHayProds'>No hay productos para dicha búsqueda !!</h1>
        </div>
    )
}

export default NoHayProds;

/*



*/

