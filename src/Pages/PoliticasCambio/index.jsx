import React from 'react'
import BotonWhastapp from '../../components/BotonWhastApp';
import './styles.css';

function PoliticasDeCambioPage() {
    return (
        <div className='page'>
            <div className='cont-politicas-cambio'>
                <div className='titulo-politicas-cambio'>
                    <h2 className='titulo-politicas'>
                        Políticas de Cambios, Garantías y Devoluciones
                    </h2>
                </div>
                <div className='texto-politicas-cambio'>
                    <p className='texto-politicas-cambio'>
                        Los productos cuentan con garantía del fabricante o importador por 60 días desde la fecha de compra, solo cuando se trate de una falla de material o fabricación. Bajo ningún motivo se aceptarán reclamos por daños o desperfectos ocasionados por golpes, maltrato o uso indebido.
                        Como iniciar el reclamo: El cliente deberá informar a traves de mail a info@acearticulosdeportivos.com.ar, o por whatsapp al 299-5495699 el desperfecto del producto, adjuntando fotos detalladas del mismo y factura de compra.
                        De esa forma se le brindarán los datos para despachar el producto al fabricante o importador correspondiente para su revisión. El cliente deberá abonar el envío, y si la garantía del fabricante o importador es aceptada, el cliente recibirá el reembolso del costo de envío abonado mas el envío sin cargo del nuevo producto de reposición.
                        El producto podrá ser reemplazado  por uno igual siempre y cuando se encuentre en stock. De lo contrario se emitirá una Nota de Crédito por el importe abonado, para ser aplicada a una nueva compra. No se realiza devolución de pago o reintegro de dinero.
                    </p>
                </div>
                <BotonWhastapp />
            </div>
        </div>
    )
}

export default PoliticasDeCambioPage