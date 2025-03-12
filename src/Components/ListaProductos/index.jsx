import React from 'react'
import Card from '../Card';
import NoHayProds from '../NoHayProps';
import './styles.css';


function ListaProductos({productos}) {

    return (
        <div className='cont-lista-prods'>
            {
                productos.length > 0 ?
                productos?.map(p => (
                    <Card key={p.id} 
                        id={p.id}
                        nombre={p.nombre} 
                        precio={p.precio} 
                        imagenes={p.imagenes}
                        agotado={p.agotado}
                        enPromo={p.enPromo}
                        porcentajeDescuento={p.porcentajeDescuento}
                        stock={p.stock}
                    />
                )) : <NoHayProds />
            }
        </div>
    )
}

export default ListaProductos