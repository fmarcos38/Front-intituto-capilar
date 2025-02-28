import React from 'react';
import img1 from '../../Images/mujerPelo3.webp';
import './styles.css'

function LandingA() {
    return (
        <div className='cont-land-A'>
            <div className='cont-img-land-A'>
                <img src={img1} alt='mujerP4' className='img-land-A' />
            </div>
            <div className='cont-texto-1'>
                <p className='p1-texto-1'>INSTITUTO CAPILAR</p>
                <p className='p2-texto-1'>Gam</p>
                <p className='p3-texto-1'>La ciencia está de tu lado</p>
            </div>
        </div>
    )
}

export default LandingA