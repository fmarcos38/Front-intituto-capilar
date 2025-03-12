import React from 'react'
import { formatMoney } from '../../utils';
import Stock from '../Stock';
import BotonEliminaProdCarrito from '../BotoneliminaProdCarrito';
import './styles.css';


function CardProdCarrito({clienteId, productoId, nombre, precio, imagenes, stock, enPromo, porcentajeDescuento}) {
    
    return (
        <div className='cont-card-prod-carrito'>
            <div className='cont-img-card-prod-carrito'>
                <img src={imagenes[0]} alt={nombre} className='img-card-prod-carrito' />
            </div>
            <div className='cont-info-card-prod-carrito'>
                <p className='nombre-pala-prod-carrito'>{nombre}</p>
                {
                    enPromo ? (
                        <div className='cont-info-precio-prod-carrito'>
                            <p className='precio-prod-carrito-en-promo'>${formatMoney(precio - (precio * porcentajeDescuento / 100))}</p>
                        </div>
                    ) : (
                        <p className='precio-prod-carrito'>${formatMoney(precio)}</p>
                    )
                }
                <div className='cont-stock-card-prod-carrito'>
                    <Stock clienteId={clienteId} productoId={productoId} stock={stock} />
                </div>
            </div>
            <div className='cont-btn-elimina-prod-carrito'>
                <BotonEliminaProdCarrito clienteId={clienteId} productoId={productoId} />
            </div>
        </div>
    )
}

export default CardProdCarrito