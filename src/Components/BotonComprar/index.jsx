import React from 'react'
import { useDispatch } from 'react-redux';
import { agregarAlCarrito } from '../../redux/actions/actions';
import './styles.css'

function BotonComprar({dataUsuario, id}) {

    const dispatch = useDispatch();

    const onClickComprar = () => {
        const clienteId = dataUsuario._id;
        dispatch(agregarAlCarrito(clienteId, id, 1));
    }

    return (
        <button className='btn-comprar' onClick={onClickComprar}>
            Comprar
        </button>
    )
}

export default BotonComprar