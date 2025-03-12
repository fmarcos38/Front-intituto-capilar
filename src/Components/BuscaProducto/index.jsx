//componente para buscar productos
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import './styles.css';

function BuscaProducto() {
    const [busqueda, setBusqueda] = useState('');

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    }
    const onClickBuscar = () => {
        setBusqueda('');
        /* if(!busqueda){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes ingresar un producto a buscar!',
            });
        }else{
            dispatch(getProductosPorPalabra(busqueda));
        } */
    };


    return (
        <div className='cont-busca-producto'>
            <input
                type='text'
                placeholder='Buscar productos...'
                value={busqueda}
                onChange={handleChange}
                className='input-busca'
            />
            {/* <button className='btn-buscaProducto' onClick={onClickBuscar}>
                <SearchIcon sx={{ 'fontSize': '20px', 'cursor': 'pointer' }} />
            </button> */}
            <NavLink to={`/busca/productos/${busqueda}`}>
                <button className='btn-buscaProducto' onClick={onClickBuscar}>
                    <SearchIcon sx={{ 'fontSize': '20px', 'cursor': 'pointer' }} />
                </button>
            </NavLink>
        </div>
    )
}

export default BuscaProducto;