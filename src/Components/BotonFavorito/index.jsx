import React, { useEffect, useState } from 'react'
import { getFavoritos, eliminaFavorito, agregaFavorito,  } from '../../Redux/Actions';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './styles.css';

function BotonFavorito({id}) {

    const [esFavorito, setEsFavorito] = useState(false); //estado para saber si el producto es favorito
    const usuario = useSelector(state => state.dataUsuario); 
    const favoritos = useSelector(state => state.favoritos);
    const dispatch = useDispatch();

    // Manejar el cambio de estado de favorito
    const handleOnClickFavorito = async () => {
        try {
            if(esFavorito) { 
                dispatch(eliminaFavorito(usuario._id, id));
                setEsFavorito(!esFavorito);
                return;
            }else{
                dispatch(agregaFavorito(usuario._id, id));
                setEsFavorito(!esFavorito);
            }
        } catch (error) {
            console.error("Error al cambiar estado de favorito:", error);
        }
    };
    

    // Cargar favoritos al montar el componente
    useEffect(() => {
        const obtenerFavoritos = async () => {
            if (usuario?._id) {
                const usuarioId = usuario._id;
                try {
                    dispatch(getFavoritos(usuarioId)); 
                    setEsFavorito(favoritos.some(fav => fav.id === id));
                } catch (error) {
                    console.error("Error al obtener favoritos:", error);
                }
            }
        };
    
        obtenerFavoritos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usuario, id, dispatch]);


    return (
        <button
            onClick={handleOnClickFavorito}
            className='btn-fav'>
            <FavoriteIcon 
                style={{ color: esFavorito ? 'red' : 'black' }} 
            />
        </button>
    );
}

export default BotonFavorito;
