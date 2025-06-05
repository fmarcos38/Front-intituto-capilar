import React, { useState, useEffect } from 'react';
import { userData } from '../../localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito } from '../../redux/actions/actions';
import axios from 'axios';
import MercadoPagoButton from '../MercadoPagoButton';
import ResumenCompra from '../ResumenCompra';
import './styles.css';

const Checkout =  () => {
    const cliente = userData();
    const carrito = useSelector((state) => state.carrito);
    const [preferenceId, setPreferenceId] = useState(''); console.log('preferenceId:', preferenceId);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCarrito(cliente?.user.id));        
    }, [cliente.user.id, dispatch]);

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

    useEffect(() => {
        const createPreference = async () => {
            try {
                const response = await axios.post('http://localhost:3002/mercadopago/crear-preferencia', {body});
                //console.log('response:', response);
                if (response.data.url) {
                    setPreferenceId(response.data.url);
                }
            } catch (error) {
                console.error('Error al crear la preferencia:', error);
            }
        };

        createPreference();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className='cont-miCarrito'>
            <div className='cont-checkout'>
                <h1>Realizar pago</h1>
                <ResumenCompra carrito={carrito} />
                {preferenceId && <MercadoPagoButton preferenceId={preferenceId} />}
            </div>
        </div>
    );
};

export default Checkout;