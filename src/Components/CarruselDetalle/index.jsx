import React from 'react';
import { useDispatch } from 'react-redux';
import { openCloseModal } from '../../redux/actions/actions';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './styles.css';

function CarruselDetalle({imagenes}) {

    const [index, setIndex] = React.useState(0); //estado para guardar el index de la imagen actual
    const dispatch = useDispatch();

    //función atrás	
    const onClickAtras = () => {
        if(index === 0) return;
        setIndex(index - 1);
    };
    //funcion adelante
    const onClickAdelante = () => {
        if(index === imagenes?.length - 1){
            setIndex(0);
        }else{
            setIndex(index + 1);
        }
    }
    //función para abrir y cerrar el modal
    const onClickModal = () => {
        dispatch(openCloseModal());
    }


    return (
        <div className='cont-carrusel-detalle'>
            {/* botón atrás */}
            <button onClick={onClickAtras} className='btn-atras'>
                <ArrowCircleLeftIcon />
            </button>
            {/* imágenes */}
            {/* <div className='cont-imgs-detalle'> */}
                <img src={imagenes[index]} alt='' className='img-carrusel-detalle' onClick={()=>onClickModal()}/>
            {/* </div> */}
            {/* botón sgt */}
            <button onClick={onClickAdelante} className='btn-sgt'>
                <ArrowCircleRightIcon />
            </button>
        </div>
    )
}

export default CarruselDetalle