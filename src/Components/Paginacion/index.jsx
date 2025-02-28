import React from 'react';
import './estilos.css';

function Paginacion({ paginaActual, onChangePagina, totalProductos, prooductosPorPagina }) {
//console.log("propsXpag:", propiedadesPorPagina)
    // Calcular el número total de páginas basado en el total de propiedades y propiedades por página
    const totalPaginas = Math.ceil(totalProductos / prooductosPorPagina);

    const handlePrevPage = () => {
        if (paginaActual > 1) {
            onChangePagina(paginaActual - 1); // Cambiamos a la página anterior
        }
    };

    const handleNextPage = () => {
        if (paginaActual < totalPaginas) {
            onChangePagina(paginaActual + 1); // Cambiamos a la siguiente página
        }
    };

    return (
        <div className="paginacion-container">
            <button
                className="paginacion-button"
                onClick={handlePrevPage}
                disabled={paginaActual === 1}
            >
                Anterior
            </button>

            <span className="paginacion-info">
                Página {paginaActual} de {totalPaginas}
            </span>

            <button
                className="paginacion-button"
                onClick={handleNextPage}
                disabled={paginaActual === totalPaginas}
            >
                Siguiente
            </button>
        </div>
    );
}

export default Paginacion;
