import React, { useContext } from 'react';
import { AppContext } from '../../Context';
import { useDispatch } from 'react-redux';
import { agregarAlCarrito } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import './styles.css';

function BotonAgregaalCarrito({id, stock, precio, enPromo, porcentajeDescuento}) { 

    const context = useContext(AppContext);
    const usuario = context.dataUser;
    //const dataUsuario = useSelector(state => state.dataUsuario);
    const dispatch = useDispatch();

    const onClickAgregarAlCarrito = () => {
        /* si el cliente no está log */
        if(!usuario?.user?.id){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Debes estar logueado para agregar productos al carrito',
            });
            //redirijo a login
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else if (stock === 0){
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'No hay stock disponible de este producto',
            });
        } else if (usuario?.user?.carrito?.length > 0){
            const buscaProd = usuario?.user?.carrito?.find(prod => prod.productoId === id);
            if(buscaProd){
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Este producto ya se encuentra en tu carrito',
                });
            }
        }else {
            const cantidad = 1;
            const clienteId = usuario.user?.id;
            if(enPromo){
                precio = precio - (precio * porcentajeDescuento / 100);
            }
            dispatch(agregarAlCarrito(clienteId, id, cantidad, precio));
            Swal.fire({
                icon: 'success',
                title: 'Producto agregado al carrito',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <button
            /* disabled={stock === 0} */
            className='btn-agrega-carrito'
            onClick={() => { onClickAgregarAlCarrito() }}
        >
            Agregar al carrito
        </button>
    )
}

export default BotonAgregaalCarrito