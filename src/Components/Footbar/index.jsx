import React from 'react';
import Logo from '../../Images/LOGO.png';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import './styles.css';

function Footbar() {
  return (
    <div className='cont-footbar'>
      {/* div para linea sup e inf*/}
      <div className='lineaSup'>
        <div className='cont-info'>
          {/* logo */}
          <div className='cont-col-1'>
            <img src={Logo} alt='not found' className='logo-foot' />
          </div>

          <div className='cont-col-2'>
            <h2 className='h2-info'>Información</h2>
            <a href='/comoComprar' className='enlaces-info-foot'>¿Cómo comprar?</a>
            <a href='/comoPagar' className='enlaces-info-foot'>¿Cómo pagar?</a>
            <a href='/comoMeLlega' className='enlaces-info-foot'>¿Cómo me llega?</a>
          </div>

          <div className='cont-col-3'>
            <h2 className='h2-info'>Contacto</h2>
            <div className='cont-item-email'>
              <WhatsAppIcon />
              <InstagramIcon />
            </div>
            <div className='cont-item-email'>
              <EmailIcon />
              <p className='p-info'> pp@pp.com</p>
            </div>
            <div className='cont-item-email'>
              <RoomIcon />
              <p className='p-info'>adadada 888</p>
            </div>
          </div>
        </div>
      </div>
      {/* texto inferior */}
      <div className='cont-texto-inf'>
          <p className='texto-inf-foot'>
            Vení a visitarnos y descubre como podemos ayudarte a recuperar tu cabello y tu confianza, la consulta es sin cargo !!!
          </p>
      </div>
    </div>
  )
}

export default Footbar