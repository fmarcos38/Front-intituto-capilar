import React, { useEffect } from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const MercadoPagoButton = ({ preferenceId }) => {

    useEffect(() => {
        // Inicializa MercadoPago con tu public key
        initMercadoPago('TEST-b7c7dd1e-2408-4b7e-9a91-4b3892fe99b4');
    }, []);

    return (
        <Wallet initialization={{ preferenceId }} />        
    );
};

export default MercadoPagoButton;