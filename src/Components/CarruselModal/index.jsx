import React, { useState } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import './styles.css';

function CarruselModal({ imagenes }) {
    const [index, setIndex] = useState(0); 
    const [position, setPosition] = useState({ x: 0, y: 0 }); // Posición para mover la imagen
    const [isZoomed, setIsZoomed] = useState(false); // Estado para controlar el zoom

    const onClickAtras = () => {
        if (index === 0) return;
        setIndex(index - 1);
    };

    const onClickAdelante = () => {
        if (index === imagenes?.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const handleMouseMove = (e) => {
        if (!isZoomed) return;

        const rect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left; // Posición del mouse relativa al contenedor
        const offsetY = e.clientY - rect.top;

        const moveX = (offsetX / rect.width) * 100;
        const moveY = (offsetY / rect.height) * 100;

        setPosition({ x: moveX, y: moveY });
    };

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
        if (!isZoomed) {
            setPosition({ x: 50, y: 50 }); // Centrar la imagen al activar el zoom
        }
    };

    return (
        <div className="cont-carrusel-modal" >
            <button onClick={onClickAtras} className='btn-atras btn-modal'>
                <ArrowCircleLeftIcon />
            </button>
            <div className="img-wrapper">
                <img
                    src={imagenes[index]}
                    alt=""
                    className={`img-carrusel-modal ${isZoomed ? 'zoomed' : ''}`}
                    onMouseMove={handleMouseMove}
                    onClick={toggleZoom}
                    style={{
                        transformOrigin: `${position.x}% ${position.y}%`,
                    }}
                />
            </div>
            <button onClick={onClickAdelante} className='btn-sgt btn-modal'>
                <ArrowCircleRightIcon />
            </button>
        </div>
    );
}

export default CarruselModal;