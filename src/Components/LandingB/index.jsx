import React from 'react';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './styles.css';

function LandingB() {

    const handleOnClickBTN = () => {
        window.open('https://api.whatsapp.com/send?phone=2235965720&text="Hola, me gustaría solicitar un turno"', '_blank');
    }

    return (
        <div className='cont-landing-B'>
            <div className='cont-titulo-landB'>
                <h2 className='titulo-landB'>SOBRE NOSOTROS</h2>
            </div>
            <div className='cont-texto-Y-img-landB'>
                <p className='texto-landB'>
                    El Gam ofrecemos soluciones personalizadas para hombres y mujeres que buscan mejorar la salud y apariencia de su cabello.
                    Contamos con un equipo de profesionales expertos en tratamientos capilares avanzados, contamos con tecnología de última generación y productos de alta calidad.
                    Tenemos nuestra linea propia de productos capilares, formulados con ingredientes naturales y libres de parabenos y sulfatos.
                    Brindan un enfoque integral que abarca desde la prevención hasta la recuperación capilar.
                    Ofrecemos seguimiento continuo para asegurar resultados duraderos.
                    El Instituto se destaca por su compromiso con la satisfacción del cliente y su enfoque ético y profesional.
                </p>
            </div>
            <div className='cont-card-turno'>
                <div className='card-turno'>
                    <div className='cont-icono-turno'>
                        <PermContactCalendarIcon sx={{fontSize:'50px'}}/>
                    </div>
                    <div className='cont-titulo-turno'>
                        <h3 className='titulo-turno'>Solicitá tu turno</h3>
                    </div>
                    <div className='cont-texto-turno'>
                        <p className='p-turno-card'>
                            Contactanos para coordinar un turno en el horario de tu preferencia.
                        </p>
                    </div>
                    <div className='cont-btn-turno'>
                        <button onClick={handleOnClickBTN} className='btn-turno-whtsApp'>Contactanos</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingB