import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PagoExitoso = () => {
    const [params] = useSearchParams();

    useEffect(() => {
        const verificarPago = async () => {
            const paymentId = params.get('payment_id');

            if (paymentId) {
                try {
                    // Verificás si fue aprobado
                    const response = await axios.get(`http://localhost:3003/api/verificar-pago/${paymentId}`);

                    if (response.data.estado === 'approved') {
                        // ✅ Lógica: descontar stock, vaciar carrito, etc.
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        verificarPago();
    }, [params]);

    return (
        <div>
            <h1>Gracias por tu compra</h1>
            <p>Estamos procesando tu pedido.</p>
        </div>
    );
};

export default PagoExitoso;
