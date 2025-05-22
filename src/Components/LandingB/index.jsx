import React from 'react';
import './styles.css';

function LandingB() {

    const handleOnClickBTN = () => {
        window.open('https://api.whatsapp.com/send?phone=2235965720&text="Hola, me gustaría solicitar un turno"', '_blank');
    }

    return (
        <div className='cont-landing-B'>
            <div className='cont-texto-Y-img-landB'>
                <h2 className='titulo-landB'>SOBRE NOSOTROS</h2>
                <p className='texto-landB-titulo'>
                    "Recuperá tu cabello,  recuperá tu confianza"
                    En el instituto capilar GAM entendemos la importancia de tener tu cabello saludable y radiante. 
                    Somos expertos en la recuperación capilar dedicamos nuestro trabajo a mejorar la salud de  tu cabello y 
                    que vuelvas a verte bien frente a un espejo.
                </p>
                <p className='texto-landB'>. Tratamientos personalizados para todo tipo de problemática capilar.</p>
                <p className='texto-landB'>. Técnicas avanzadas para la recuperación del cabello.</p>
                <p className='texto-landB'>. Línea propia de productos de uso tópico desarrollados a base de activos vegetales sin ningún tipo de contraindicacion.</p>
                <p className='texto-landB'>. Asesoramiento   experto para encontrar el tratamiento adecuado.</p>
                <p className='texto-landB-titulo'><b>Nuestros objetivos:</b></p>
                <p className='texto-landB'>. Recuperar tu cabello.</p>
                <p className='texto-landB'>. Recuperar tu confianza y autoestima.</p>
                <p className='texto-landB'>. Ofrecerte un servicio personalizado y atento.</p>    
                <p className='texto-landB-titulo'><b>Porque elegirnos:</b></p>    
                <p className='texto-landB'>. Tenemos más de 20 años de experiencia en la recuperación capilar.</p>    
                <p className='texto-landB'>. Utilizamos lo mejores productos y técnicas de trabajo para lograr los mejores resultados.</p>    
                <p className='texto-landB'>. Estamos comprometidos con tu satisfacción y bienestar.</p>    
                <p className='texto-landB'>
                    Ven a visitarnos y descubre como podemos ayudarte a recuperar tu cabello y tu confianza. 
                    Instituto capilar GAM....la ciencia está de tu lado!!!
                </p>                
            </div>
            <div className='cont-card-turno'>
                <div className='cont-btn-turno'>
                    <button onClick={handleOnClickBTN} className='btn-turno-whtsApp'>Contactanos</button>
                </div>
            </div>
        </div>
    )
}

export default LandingB;
