import React from 'react'
import { useDispatch } from 'react-redux';
import { eliminarDelCarrito, getCarrito } from '../../Redux/Actions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './styles.css';


function BotonEliminaProdCarrito(clienteId, productoId, ) {
    
    const dispatch = useDispatch();

    const onClickEliminarProdCarrito = () => {
        dispatch(eliminarDelCarrito(clienteId, productoId));
        dispatch(getCarrito(clienteId.clienteId));
    }

    return (
        <button className='btn-eliminar-prod-carrito' onClick={onClickEliminarProdCarrito}>
            <DeleteForeverIcon sx={{color: 'var(--color-azul)'}}/>
        </button>
    )
}

export default BotonEliminaProdCarrito