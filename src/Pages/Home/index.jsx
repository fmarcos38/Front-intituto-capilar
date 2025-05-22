import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductos, getProductosEnOferta, getCarrito } from '../../Redux/Actions';
import { AppContext } from '../../Context';
import LandingA from '../../Components/LandingA';
import LandingB from '../../Components/LandingB';
import CarritoCompras from '../../Components/CarritoCompras';
import ListaOfertas from '../../Components/ListaOfertas';
import ListaProductos from '../../Components/ListaProductos';
import Paginacion from '../../Components/Paginacion';
import './styles.css';


function Home() {

  const productos = useSelector((state) => state.productos);
  const totalProductos = useSelector((state) => state.totProds);
  const productosEnOferta = useSelector(state => state.enPromo); //productos en oferta
  const dispatch = useDispatch();
  const context = useContext(AppContext);
  const data = context.dataUser;
  //paginación
  const [paginaActual, setPaginaActual] = React.useState(1);
  const prooductosPorPagina = 12;
  const limit = prooductosPorPagina;
  const offset = (paginaActual - 1) * prooductosPorPagina;


  //efecto para iniciar la pagina desde la parte SUPERIOR
  useEffect(() => {
    // Desplaza la página hacia la parte superior cuando el componente se monta
    window.scrollTo(0, 0);
  }, []); // El array vacío asegura que se ejecute solo al montar el componente

  //efecto para traer los productos en oferta
  useEffect(() => {
    dispatch(getProductosEnOferta());
  }, [dispatch]);

  //efecto para traer los productos
  useEffect(() => {
    dispatch(getProductos(limit, offset,));
  }, [dispatch, limit,offset]);

  //efecto para traer carrito del usuario SI hay usuario logueado
  useEffect(() => {
    if (data?.user?.nombre) {
      dispatch(getCarrito(data?.user?.id));
    }
  }, [data?.user?.id, data?.user?.nombre, dispatch]);


  return (
    <div className='cont-home'>
      {/* land A */}
      <div className='cont-home-land-A'>
        <LandingA />
      </div>
      {/* land B */}
      <div className='cont-home-land-B'>
        <LandingB />
      </div>

      {/* menj envio... */}
      <div className='cont-msj-envio'>
        <h1 className='msj-envio'>
          ENVIOS A TODO EL PAÍS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ENVIOS A TODO EL PAÍS
        </h1>
      </div>

      {/* titulo ofertas y Lista prods en oferta*/}
      <div className='cont-ofertas-home'>
        <h2 className='titulo-ofertas'>APROVECHA NUESTRAS OFERTAS</h2>
        <div className='cont-lista-ofertas'>
          <ListaOfertas productos={productosEnOferta}/>
        </div>
      </div>
      
      {/* lista prods */}
      <div className='lista-productos-home'>
        <div className='cont-titulo-lista-prods'>
          <h2>Nuestros Productos</h2>
        </div>
        {/* lista productos */}
        <div className='cont-filtros-lista-prods'>
            <ListaProductos productos={productos} />
            {/* paginación */}
            <Paginacion              
              paginaActual={paginaActual}
              onChangePagina={setPaginaActual}
              totalProductos={totalProductos}
              prooductosPorPagina={prooductosPorPagina}
            />
        </div>
      </div>

      {/* Carrito de Comrpas - modal */}
      <div className={context.carritoModal === true ? 'modal-carrito-compras-open left-slide' : ''}>
          <CarritoCompras />
        </div>
    </div>
  )
}

export default Home