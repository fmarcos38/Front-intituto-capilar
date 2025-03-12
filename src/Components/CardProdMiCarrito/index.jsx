import React from 'react'
import { formatMoney } from '../../utils';
import Stock from '../Stock';
import BotonEliminaProdCarrito from '../BotoneliminaProdCarrito';
import './styles.css';


function CardProdMiCarrito({clienteId, productoId, nombre, precio, imagenes, stock, enPromo, porcentajeDescuento}) {
    
    return (
        <div className={stock === 0 ? 'cont-card-prod-mi-carrito-sin-stock' : 'cont-card-prod-mi-carrito'}>
            <div className='cont-img-card-prod-mi-carrito'>
                <img src={imagenes[0]} alt={nombre} className='img-card-prod-mi-carrito' />
            </div>
            <div className='cont-info-card-prod-mi-carrito'>
                <div className='cont-nombre-pala-prod-mi-carrito'>
                    <p className='nombre-pala-prod-mi-carrito'>{nombre}</p>
                </div>                
                <div className='cont-stock-pala-prod-mi-carrito'>
                    <Stock clienteId={clienteId} productoId={productoId} stock={stock} />
                </div>
                <div className='cont-precio-pala-prod-mi-carrito'>
                    {
                        enPromo ? (
                            <>
                                <p className='precio-pala-prod-mi-carrito-ahora'>${formatMoney((precio - (precio * porcentajeDescuento / 100)))}</p>
                            </>
                        ) : (
                            <p className='precio-pala-prod-mi-carrito'>${formatMoney(precio)}</p>
                        )
                    }
                </div>                
            </div>
            <div>
                <BotonEliminaProdCarrito clienteId={clienteId} productoId={productoId} />
            </div>
        </div>
    )
}

export default CardProdMiCarrito