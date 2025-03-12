import React, { useEffect, useState } from 'react';
import Card from '../Card';
import './styles.css';

function ListaOfertas({ productos }) {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleProducts, setVisibleProducts] = useState([]);
    const [productsPerPage, setProductsPerPage] = useState(productos.total < 3 ? productos.total : 3);

    const handlePrevClick = () => {
        // No hacer nada si ya estamos en el primer conjunto de productos
        if (currentIndex === 0) return;
        setCurrentIndex((prevIndex) => prevIndex - productsPerPage);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + productsPerPage >= productos.prodsNormalizados.length ? 0 : prevIndex + productsPerPage
        );
    };

    useEffect(() => {
        const updateProductsPerPage = () => {
            const width = window.innerWidth;
            if (width < 700) {
                setProductsPerPage(1);
            } else if (width < 1122) {
                setProductsPerPage(2);
            } else {
                setProductsPerPage(3);
            }
        };

        updateProductsPerPage();
        window.addEventListener('resize', updateProductsPerPage);

        return () => {
            window.removeEventListener('resize', updateProductsPerPage);
        };
    }, []);

    useEffect(() => {
        setVisibleProducts(productos.prodsNormalizados?.slice(currentIndex, currentIndex + productsPerPage));
    }, [currentIndex, productsPerPage, productos]);

    return (
        <div className="lista-ofertas-container">
            <button className="arrow-button" onClick={handlePrevClick} disabled={currentIndex === 0}>←</button>
            <div className="lista-ofertas">
                {visibleProducts?.map((producto, index) => (
                    <Card
                        key={index}
                        id={producto.id}
                        nombre={producto.nombre}
                        precio={producto.precio}
                        imagenes={producto.imagenes}
                        agotado={producto.agotado}
                        enPromo={producto.enPromo}
                        porcentajeDescuento={producto.porcentajeDescuento}
                        stock={producto.stock}
                    />
                ))}
            </div>
            <button className="arrow-button" onClick={handleNextClick}>→</button>
        </div>
    );
}

export default ListaOfertas;
