import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritos } from '../../Redux/Actions';
import ListaProductos from '../../Components/ListaProductos';
import './styles.css';


function FavoritosPage() {

    const usuario = useSelector((state) => state.usuario);
    const favoritos = useSelector((state) => state.favoritos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (usuario) {
            dispatch(getFavoritos(usuario.id));
        }
    }, [dispatch, usuario]);

    return (
        <div className='page'>
            <h1>Tus Favoritos</h1>
            {
                favoritos.length === 0 ? 
                <p>No tienes productos en favoritos</p> :
                /* filtros y prods */
                    <div className='cont-filtros-prods-fav'>
                        <div className='cont-filtros-fav'>
                            filtros
                        </div>
                        <div className='cont-fav'>
                            <ListaProductos productos={favoritos} />
                        </div>
                    </div>
            }
        </div>
    )
}

export default FavoritosPage