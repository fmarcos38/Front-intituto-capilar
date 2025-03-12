import React, {useEffect, useState} from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './styles.css';

function CarruselTemporizador({imagenes}) {

    //estado para guardar el index de la imagen actual
    const [index, setIndex] = React.useState(0);
    const [imagesPerPage, setImagesPerPage] = useState(1);

    const onClickAtras = () => {
        setIndex((prevIndex) => (prevIndex === 0 ? imagenes.length - imagesPerPage : prevIndex - imagesPerPage));
    };

    const onClickAdelante = () => {
        setIndex((prevIndex) => (prevIndex + imagesPerPage >= imagenes.length ? 0 : prevIndex + imagesPerPage));
    };

    useEffect(() => {
        const updateImagesPerPage = () => {
            const width = window.innerWidth;
            if (width < 900) {
                setImagesPerPage(1);
            } else {
                setImagesPerPage(2);
            }
        };

        updateImagesPerPage(); // Inicializa el valor al cargar el componente
        window.addEventListener('resize', updateImagesPerPage); // Actualiza el valor al cambiar el tamaño de la ventana

        return () => {
            window.removeEventListener('resize', updateImagesPerPage); // Limpia el evento al desmontar el componente
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + imagesPerPage >= imagenes.length ? 0 : prevIndex + imagesPerPage));
        }, 5000);
        return () => clearInterval(interval);
    }, [imagenes.length, imagesPerPage]);

    const visibleImages = imagenes.slice(index, index + imagesPerPage);


    return (
        <div className='cont-carrusel'>
            {/* botón atrás */}
            <button onClick={onClickAtras} className='btn-atras'>
                <ArrowCircleLeftIcon sx={{'color':'white'}}/>
            </button>
            {/* imágenes */}
            <div className='cont-imgs'>
            {
                visibleImages.map((img, idx) => (
                    <img key={idx} src={img} alt='' className='img-carrusel' />
                ))
            }
            </div>
            {/* botón sgt */}
            <button onClick={onClickAdelante} className='btn-sgt'>
                <ArrowCircleRightIcon sx={{'color':'white'}}/>
            </button>
        </div>
    )
}

export default CarruselTemporizador