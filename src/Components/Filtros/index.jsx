import React, { useContext } from 'react';
import { AppContext } from '../../Context';
import FiltroRangoPrecio from '../FiltroRangoPrecio';
import './styles.css';

function Filtros({
    marca,
    setMarca,
    categoria,
    setCategoria,
    enPromo,
    setPromo,
    precioMin,
    setPrecioMin,
    precioMax,
    setPrecioMax,
    setPaginaActual,
    sinCategoria
}) {

    
    const context = useContext(AppContext);

    const handleChangeMarca = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setMarca(value);
        } else {
            setMarca('');
        }
    }
    const handleChangeCategoria = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setCategoria(value);
        } else {
            setCategoria('');
        }
    }
    const handleChangePromo = (e) => {
        const { checked } = e.target;
        if (checked) {
            setPromo(true);
        } else {
            setPromo(false);
        }
    }

    return (
        <div className='cont-filtros'>
            {/* titulo */}
            <div className='cont-titulo-filtros'>
                <h2 className='titulo-filtro'>Filtros</h2>
            </div>
            {/* por marca */}
            <div className='cont-filtro-marca'>
                <p className='titulo-filtro-marcas'>Marcas</p>
                <div className='cont-map-marca'>
                {
                    context.marcas.map((m) => (
                        <div key={m} className='cont-check-Y-label-marca'>
                            <input 
                                type="checkbox" 
                                id={marca}
                                value={m}
                                onChange={handleChangeMarca}
                                checked={marca === m} 
                                className='check-marca'
                            />
                            <label className='label-check-marca'>{m}</label>
                        </div>
                    ))
                }
                </div>
            </div>
            {/* por categoría */}
            <div className={sinCategoria ? 'displeyOFF' : 'cont-filtro-categoria'}>
                <h2 className='titulo-filtro'>Categoría</h2>
                <div className='cont-map-marca'>
                {
                    context.categorias.map((c) => (
                        <div key={c} className='cont-check-Y-label-categoria'>
                            <input 
                                type="checkbox" 
                                id={categoria} 
                                value={c}
                                onChange={handleChangeCategoria} 
                                checked={categoria === c}
                                className='check-categoria'
                            />
                            <label  className='label-check-categoria'>{c}</label>
                        </div>
                    ))
                }
                </div>
            </div>
            {/* en Promo */}
            <div className='cont-filtro-en-promo'>
                <h2 className='titulo-filtro'>En promoción</h2>
                <div className='cont-check-Y-label-promo'>
                    <input 
                        type="checkbox" 
                        id='promo'
                        value={enPromo}
                        onChange={handleChangePromo}
                        className='check-categoria'
                    />
                    <label className='label-check-categoria'>Ofertas</label>
                </div>
            </div>
            {/* por rango precio */}
            <div className='cont-filtro-rango-precio'>
                <h2 className='titulo-filtro-rango-precio'>Rango de precio</h2>
                <FiltroRangoPrecio 
                    precioMin={precioMin} 
                    setPrecioMin={setPrecioMin} 
                    precioMax={precioMax} 
                    setPrecioMax={setPrecioMax} 
                    setCurrentPage={setPaginaActual}
                />
            </div>

        </div>
    )
}

export default Filtros