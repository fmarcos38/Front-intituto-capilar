import React from 'react'
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProducto } from '../../redux/actions/actions';
import BotonEliminaProp from '../BotonEliminaProd';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import './styles.css';

function ListaProductosAdmin({productos}) {

    const dispatch = useDispatch();
    
    const handleOnClick = (_id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, elimina!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProducto(_id)); //en la propia accion dispara la q trae los prod, así se actualiza la lista
                Swal.fire(
                    'Eliminado!',
                    'El prod ha sido eliminado.',
                    'success'
                );
            }
        });
    };

    return (
        <div className='cont-lista-paletas'>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>                        
                        <th>Eliminar</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos?.map(p => (
                            <tr key={p.id}>
                                <td><img src={p.imagenes[0]} alt={p.nombre} className='img-tabla-prod'/></td>
                                <td>{p.nombre}</td>
                                <td>{p.precio}</td>                                
                                <td>
                                    <BotonEliminaProp handleOnClick={() => handleOnClick(p.id)} />
                                </td>
                                <td>
                                    <NavLink to={`/admin/editaProd/${p.id}`}>
                                        <button>
                                            <EditIcon />
                                        </button>
                                    </NavLink>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListaProductosAdmin