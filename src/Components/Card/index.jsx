import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatMoney } from '../../utils';
import BotonFavorito from '../BotonFavorito';
import BotonAgregaalCarrito from '../BotonAgregaAlCarrito';
import './styles.css';

function Card({id, nombre, precio, imagenes, agotado, enPromo, porcentajeDescuento, stock}) {

    const [showDetail, setShowDetail] = React.useState(false); //estado para hover de la imgn - mostrando detalle

    return (
        <div className='cont-card'>
            {/* btn favorito */}
            <div className='cont-btn-fav-card'>
                <BotonFavorito id={id} />
            </div>
            {/* descuento */}
            {enPromo && <p className='descuento-pala'>-{porcentajeDescuento}%</p>}
            {/* carrusel de imagenes */}
            <NavLink to={`/detalleProd/${id}`} className='navLink-car'>
                <div
                    onMouseEnter={() => setShowDetail(true)}
                    onMouseLeave={() => setShowDetail(false)}
                >
                    {/* imagen */}
                    <div className='cont-carrusel-card'>
                        <img src={imagenes[0]} alt={nombre} className='img-card' />
                    </div>

                    {/* msj detalle si hay hover */}
                    <div className={`detail ${showDetail ? 'show' : ''}`}>
                        <p className='palabra-abre-detalle'>Detalle</p>
                    </div>
                </div>
            </NavLink>
            {
                stock === 0 && <p className='prod-agotado'>Agotado</p>
            }
            {/* data */}
            <div className='cont-info-card'>
                <p className='nombre-pala'>{nombre}</p>
                {/* precio */}
                <div className='cont-precio-desc'>
                    {
                        enPromo ?
                        (
                            <>
                                <p className='precio-pala-tachado'>${formatMoney(precio)}</p>
                                <p className='precio-pala-promo'>${formatMoney(precio - (precio * porcentajeDescuento / 100))}</p>
                            </>
                        ) :
                        (
                            <p className='precio-pala'>${formatMoney(precio)}</p>
                        )
                    }
                </div>
                {/* botón agrega al carrito */}
                <BotonAgregaalCarrito id={id} stock={stock}/>
            </div>
        </div>
    )
}

export default Card