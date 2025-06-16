import React, { useState, useEffect } from 'react';
import { userData } from '../../localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, getUsuarioById } from '../../Redux/Actions';
import axios from 'axios';
import MercadoPagoButton from '../MercadoPagoButton';
import ResumenCompra from '../ResumenCompra';
import './styles.css';

const Checkout =  () => {
    const userLog = userData(); //tomo la data del estado global
    const cliente = useSelector((state) => state.dataUsuario);
    const carrito = useSelector((state) => state.carrito);
    const [preferenceId, setPreferenceId] = useState(''); //console.log('preferenceId:', preferenceId);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{
        dispatch(getUsuarioById(userLog?.user?.id));
        dispatch(getCarrito(userLog?.user?.id));
    },[dispatch, userLog?.user?.id]);
    
    //le mando al back la info del carrito y del cliente para MP
    useEffect(() => {
    const datosCompletos =
        carrito?.productos?.length > 0 &&
        cliente?.nombre &&
        cliente?.email &&
        cliente?.direccion?.calle &&
        cliente?.direccion?.numero &&
        cliente?.direccion?.codigoPostal;

    const createPreference = async () => {
        if (!datosCompletos) return;

        const items = carrito.productos.map(item => ({
            title: item.nombre,
            quantity: item.cantidad,
            unit_price: item.precio,
        }));

        const payer = {
            name: cliente.nombre,
            surname: cliente.apellido,
            email: cliente.email,
            phone: cliente.telefono,
            address: {
                zip_code: cliente.direccion.codigoPostal,
                street_name: cliente.direccion.calle,
                street_number: cliente.direccion.numero
            }
        };

        try {
            const response = await axios.post('http://localhost:3003/mercadopago/crear-preferencia', {
                body: { items, payer }
            });
            if (response.data.url) {
                setPreferenceId(response.data.url);
            }
        } catch (error) {
            console.error('Error al crear la preferencia:', error);
        }
    };

    createPreference();
}, [carrito, cliente]);



    return (
        <div className='cont-miCarrito'>
            <div className='cont-checkout'>
                <h1>Realizar pago</h1>
                <ResumenCompra carrito={carrito} />
                {
                    preferenceId && 
                    <MercadoPagoButton preferenceId={preferenceId} />
                }
            </div>
        </div>
    );
};

export default Checkout;

/*
ejem de info para el back
let body = {
        items: [
            {
                title: "Producto Ejemplo",
                quantity: 1,
                unit_price: 1000.50,
            }
        ],
        payer: {
            name: "Juan",
            surname: "Perez",
            email: "juan.perez@example.com",
            phone: {
                area_code: 11,
                number: 987654321
            },
            address: {
                zip_code: 1406,
                street_name: "Av. 9 de Julio",
                street_number: 1150
            }
        }
    };

*/