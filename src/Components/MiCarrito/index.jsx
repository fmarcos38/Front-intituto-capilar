import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, getUsuarioById } from '../../Redux/Actions';
import { userData } from '../../localStorage';
import WarningIcon from '@mui/icons-material/Warning';
import CardProdMiCarrito from '../CardProdMiCarrito' 
import ResumenCompra from '../ResumenCompra';
import BotonVolver from '../BtnVolverAtrasCarrito/btnVolverAtrasCarrito';
import './styles.css';

function MiCarrito() {

    const cliente = userData();
    const carrito = useSelector(state => state.carrito);
    const dispatch = useDispatch();


    //función busca si hay productos sin stock
    const hayProdSinStock = () => {
        let hay = false;
        carrito?.productos?.map(p => {
            if(p.stock === 0){
                hay = true;
            }
            return null;
        });
        return hay;
    }
    //funcion onClick vuelvo a la página anterior
    const handleClickVolver = () => {
        window.history.back();
    }

    //efecto para iniciar la Pag desd la parte SUPERIOR
    useEffect(() => {
        window.scrollTo(0, 0); // Desplaza la página hacia la parte superior cuando el componente se monta
    }, []);

    useEffect(() => {
            if (cliente.id) {
                dispatch(getUsuarioById(cliente.id));
                dispatch(getCarrito(cliente.id));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [dispatch]);

    return (
        <div className='cont-miCarrito'>
            {/* titulo */}
            <div className='cont-titulo-miCarrito'>
                <p className='p-titulo-mi-carrito'>Mi Carrito</p>
            </div>
            {/* msj si hay prods SIN STOCK */}
            {
                hayProdSinStock() &&(
                    <div className='cont-msj-prod-sin-stock'>
                        <WarningIcon sx={{ fontSize: 40, color: 'red' }} />
                        <p className='p-msj-prod-sin-stock'>Hay productos sin stock en tu carrito, por favor quitalos !!</p>
                    </div>
                )
            }
            {/* muestro prods */}
            <div className='cont-miCarrito-fila-1'>
                <div className='cont-miCarrito-fila-1-col-1'>
                {
                    carrito?.productos?.map(p => (
                        <CardProdMiCarrito
                            key={p.id}
                            clienteId={carrito.usuario}
                            productoId={p.id}
                            nombre={p.nombre}
                            precio={p.precio}
                            imagen={p.imagen}
                            stock={p.stock}
                            enPromo={p.enPromo}
                            porcentajeDescuento={p.porcentajeDescuento}
                        />
                    ))
                }
                </div>

                {/* resumen de compra */}
                <div className='cont-miCarrito-fila-1-col-2-resumen'>
                    <ResumenCompra 
                        carrito={carrito}
                    />
                    {/* btns continuar y volver */}
                    <div className='cont-btns-continuar-volver'>
                        <button 
                            className='btn-volver-compra'
                            onClick={handleClickVolver} 
                        >
                            Seguir comprando
                        </button>
                        <a href='/formaEnvio' className='btn-continuar-compra'>Continuar</a>
                    </div>
                    <div className='cont-btn_atras'>
                        <BotonVolver />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MiCarrito