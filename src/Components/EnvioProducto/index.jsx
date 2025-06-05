import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, getUsuarioById } from '../../Redux/Actions';
import { userData } from '../../localStorage';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
//import imgCorreoArg from '../../imagenes/delivery_correoargentino.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ResumenCompra from '../ResumenCompra';
import MopedIcon from '@mui/icons-material/Moped';
import './styles.css';

function EnvioProducto() {
    const cliente = userData(); 
    const carrito = useSelector(state => state.carrito);
    const dispatch = useDispatch();

    const handleClickVolver = () => {
        window.location.href = '/';
    };

    //trae usuario y su carrito
    useEffect(() => {
        if (cliente?.user.id) {
            dispatch(getUsuarioById(cliente?.user.id));
            dispatch(getCarrito(cliente?.user.id));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <div className="cont-miCarrito">
            <div className="cont-envio-producto">
                <div className="cont-envio-producto-col-1">
                    <div className="como-te-entregamos-la-compra">
                        <div className="como-te-entregamos-la-compra-fila-1">
                            <p className="p-texto">¿COMO TE ENTREGAMOS LA COMPRA?</p>
                        </div>
                        
                        <div className="cont-result-busqueda-codigo-postal-f1">
                            <div className="cont-envio-producto-fila-4-f1-col-1">
                                <LocalShippingIcon className="icono-transporte" />
                                <div className="cont-p-despacho-Y-tranporte">
                                    <p className="p-despacho">Despacho a todo el país</p>
                                    <p className="p-transporte">Transporte a convenir</p>
                                </div>
                            </div>
                            <div className="cont-envio-producto-fila-4-f1-col-2">
                                <input type="radio" className="radio" />
                            </div>
                        </div>

                        <div className="cont-result-busqueda-codigo-postal-f2">
                            <div className="cont-envio-producto-fila-4-f1-col-1">
                                <MopedIcon className="icono-transporte" />
                                <div className="cont-p-despacho-Y-tranporte">
                                    <p className="p-despacho">A Domicilio </p>
                                    <p className="p-transporte">Solo Mar del Plata </p>
                                </div>
                            </div>
                            <div className="cont-envio-producto-fila-4-f1-col-2">
                                <input type="radio" className="radio" />
                            </div>
                        </div>

                        <div className="cont-result-busqueda-codigo-postal-f3">
                            <div className="cont-envio-producto-fila-4-f1-col-1">
                                <LocationOnIcon className="icono-transporte" />
                                <div className="cont-p-despacho-Y-tranporte">
                                    <p className="p-despacho">Retiro personalmente</p>
                                    <p className="p-transporte">Av Idpendencia 2121</p>
                                    <p className="p-transporte" style={{ color: 'green' }}>Gratis</p>
                                </div>
                            </div>
                            <div className="cont-envio-producto-fila-4-f1-col-2">
                                <input type="radio" className="radio" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cont-envio-producto-col-2">
                    <ResumenCompra carrito={carrito} />
                    <div className="cont-btns-continuar-volver">
                        <button onClick={handleClickVolver} className="btn-volver-compra">Seguir comprando</button>
                        {/* <a href="/comoPagar" className="btn-continuar-compra">Continuar</a> */}
                        <a href="/infoContacto" className="btn-continuar-compra">Continuar</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnvioProducto;
