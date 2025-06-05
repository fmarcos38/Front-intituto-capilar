import React, { useEffect } from 'react';
import './styles.css'

function LandingA() {

    return (
        <div className='cont-land-A'>
            <div className='cont-texto-1'>
                <p className='p1-texto-2'>Gam</p>
                <p className='p1-texto-1'>INSTITUTO CAPILAR</p>
                <p className='p3-texto-1'>La ciencia está de tu lado</p>
            </div>
            <div className='cont-texto-2'>                
                <p className='p2-texto-2'>Tu belleza, al alcance de nuestras manos</p>
            </div>
            {/* flecha que señala hacia abajo compuesta por dos palitos blancos con movimiento hacia arriba y abjo */}
            <div className='cont-flecha'>
                <div className='flecha'>
                    <div className='linea linea1'></div>
                    <div className='linea linea2'></div>
                </div>
            </div>
        </div>
    )
}

export default LandingA