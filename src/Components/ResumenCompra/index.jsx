import React from 'react';
import { formatMoney, sumaTotalCarrito } from '../../utils/index';
import './styles.css';

function ResumenCompra({carrito}) {

    return (
        <div className='cont-miCarrito-fila-1-col-2'>
            <div className='cont-resumen-compra'>
                <div className='cont-titulo-resumen-compra'>
                    <p className='p-titulo-resumen-compra'>RESUMEN DE COMPRA</p>
                </div>
                {/* lista prods */}
                <div className='cont-precios-resumen-compra'>
                    {
                        carrito?.productos?.map(p => (
                            <div className='cont-descripcion-resumen-compra'>
                                <img src={p.imagen} alt='' className='img-resumen-compra'/>
                                <p className='p-nombre-resumen-compra'>{p.nombre}</p>
                                <p className='p-precio-resumen-compra'>{p.cantidad}u</p>
                                <p className='p-precio-resumen-compra'>${formatMoney(p.precio)}</p>
                            </div>
                        ))
                    }
                </div>
                {/* total */}
                <div className='cont-total-resumen-compra'>
                    <p className='p-total-resumen-compra'>Total:</p>
                    <p className='p-total-resumen-compra'>${formatMoney(sumaTotalCarrito(carrito))}</p>
                </div>
            </div>
            
        </div>
    )
}

export default ResumenCompra