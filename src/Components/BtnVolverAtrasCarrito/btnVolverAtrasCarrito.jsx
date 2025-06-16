// src/components/BotonVolver.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const BotonVolver = () => {
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1); // vuelve a la página anterior
    };

    return (
        <button className="boton-volver" onClick={handleVolver}>
            Volver atrás
        </button>
    );
};

export default BotonVolver;
