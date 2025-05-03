import axios from "axios";
import { URL } from "../../Urls";
import { 
    LOADING, GET_PRODUCTOS, GET_PRODUCTO_BY_ID, RESET_PRODUCTO, GET_PRODS_RANGO_PRECIO, 
    OPEN_CLOSE_MODAL, LOGIN, GET_FAVORITOS, GET_USER, RESET_USER, GET_PRODUTOS_OFERTA,
    GET_CARRITO, GET_PRODUCTO_POR_NOMBRE, GET_USER_BY_DNI,
} from "./actionsTypes";

//-------usuario-----------------------------s
//-------login-----------------------------
//login clasico
export const login = (data) => {
    return async function(dispatch) {
        const resp = await axios.post(`${URL}/auth/login`, data); 
        localStorage.setItem('dataUser', JSON.stringify(resp.data));
        dispatch({type: LOGIN, payload: resp.data});
    }
}

export const resetLogin = () => {
    return {
        type: 'RESET_LOGIN',
    }
}

//login google
export const loginGoogle = (credential) => {
    return async function(dispatch) {
        try {
            const resp = await axios.post(`${URL}/auth/login/google`, { tokenId: credential });
            //guardo data en localstorage
            localStorage.setItem('dataUser', JSON.stringify(resp.data));
            dispatch({type: LOGIN, payload: resp.data});
        } catch (error) {
            console.error("Error logging in", error.response?.data || error.message);
        }
    }
}

//-------registrarse-------
export const registrarse = (data) => {
    return async function() { 
        const resp = await axios.post(`${URL}/registrarse`, data);
        return resp.data;
    }
}
//confirma email
export const confirmarEmail = (email) => {
    return async function() { 
        await axios.get(`${URL}/usuario/confirmar?email=${email}`);
    }
}
//-----usuario--------------------
//trae usuario por id
export const getUsuarioById = (id) => {
    return async function(dispatch) {  
        const resp = await axios.get(`${URL}/usuario/${id}`); 
        //localStorage.setItem('dataUser', JSON.stringify(resp.data));
        dispatch({type: GET_USER, payload: resp.data});
    }
}

//trae usuario por DNI
export const getUsuarioByDNI = (dni) => { 
    return async function(dispatch){
        const resp = await axios.get(`${URL}/usuario/dni/${dni}`);
        dispatch({type: GET_USER_BY_DNI, payload: resp.data});
        return resp.data;
    }
}

//reset usuario
export const resetUsuario = () => {
    return {
        type: RESET_USER,
    }
}

//modifica usuario
export const modificaUsuario = (id, data) => { console.log('id', id);
    return async function() { console.log('data', data);
        const resp = await axios.put(`${URL}/usuario/modifica/${id}`, data);
        return resp.data;
    }
}

//modifica contraseña
export const modificaContraseña = (id, password) => { 
    return async function(dispatch) {
        const resp = await axios.put(`${URL}/usuario/modificaPass/${id}`, {password});
        console.log('resp.data', resp.data);
        dispatch({type: 'MODIFICA_CONTRASEÑA', payload: resp.data}); 
    }
}
//-----------------favoritos---------------------
export const getFavoritos = (id) => {
    return async function(dispatch) { 
        const resp = await axios.get(`${URL}/usuario/favoritos/${id}`);
        dispatch({type: GET_FAVORITOS, payload: resp.data});
    }
}

//agrega favorito
export const agregaFavorito = (id, idProd) => { 
    return async function() { 
        await axios.put(`${URL}/usuario/favorito/agregar/${id}`, {idProd});
    }
}

//elimina favorito
export const eliminaFavorito = (id, idProd) => {
    return async function() { 
        await axios.put(`${URL}/usuario/favorito/eliminar/${id}`, {idProd});
    }
}

//-----------------carrito----------------------
//trae carrito
export const getCarrito = (id) => { 
    return async function(dispatch) { 
        const resp = await axios.get(`${URL}/carrito/${id}`);
        dispatch({type: GET_CARRITO, payload: resp.data});
    }
}
//agrega al carrito
export const agregarAlCarrito = (clienteId, productoId, cantidad) => {
    return async function(dispatch) { 
        await axios.put(`${URL}/carrito/agregar/${clienteId}`, {productoId, cantidad});
        // Después de agregar, obtener el carrito actualizado
        const resp = await axios.get(`${URL}/carrito/${clienteId}`);
        dispatch({ type: GET_CARRITO, payload: resp.data });
    }
}

//elimina del carrito
export const eliminarDelCarrito = (clienteId) => { 
    return async function(dispatch) {
        const clienteData = {clienteId: clienteId.clienteId, productoId: clienteId.productoId};
        await axios.delete(`${URL}/carrito/eliminar/${clienteData.clienteId}`, { data: { productoId: clienteData.productoId } });
        // Después de eliminar, obtener el carrito actualizado
        const resp = await axios.get(`${URL}/carrito/${clienteData.clienteId}`);
        dispatch({ type: GET_CARRITO, payload: resp.data });
    }
};


//-------producto-----------------------------
//trae productos
export const getProductos = (limit, offset, categoria, marca, enPromo, palabra, precioMin, precioMax) => {
    return async function(dispatch) { 
        dispatch({type: LOADING});

        //construimos los parametros dinamicamente
        let queryParams = `?limit=${limit}&offset=${offset}`;

        //por categoria
        if(categoria) {
            queryParams += `&categoria=${categoria}`;
        }
        //por marca
        if(marca) {
            queryParams += `&marca=${marca}`;
        }
        //enPromo
        if(enPromo) {
            queryParams += `&enPromo=${enPromo}`;
        }
        //por palabra
        if(palabra) {
            queryParams += `&palabra=${palabra}`;
        }
        //precioMin
        if(precioMin) {
            queryParams += `&precioMin=${precioMin}`;
        }
        //precioMax
        if(precioMax) {
            queryParams += `&precioMax=${precioMax}`;
        }
        try {
            const resp = await axios.get(`${URL}/producto${queryParams}`);
            dispatch({type: GET_PRODUCTOS, payload: resp.data});
        } catch (error) {
            console.error('Error fetching properties:', error);
            // se pueden manejar el error aquí si lo necesitas
        }
    }
}

//trae productos en oferta
export const getProductosEnOferta = () => {
    return async function(dispatch) { 
        const resp = await axios.get(`${URL}/producto?&enPromo=${true}`);
        dispatch({type: GET_PRODUTOS_OFERTA, payload: resp.data});
    }
}

//trae productos +- $30.000 al prod seleccionado
export const getProductosRangoPrecio = (limit, offset, precioBase, precioTope) => {
    return async function(dispatch) { 
        dispatch({type: LOADING});
        const resp = await axios.get(`${URL}/producto/rangoPrecio?limit=${limit}&offset=${offset}&precioMin=${precioBase}&precioMax=${precioTope}`);
        dispatch({type: GET_PRODS_RANGO_PRECIO, payload: resp.data});
    }
}

//trae por ID
export const getProductoById = (id) => {
    return async function(dispatch) {
        const resp = await axios.get(`${URL}/producto/${id}`); 
        dispatch({type: GET_PRODUCTO_BY_ID, payload: resp.data});
    }
}

//trae por nombre
export const getProductoPorNombre = (nombre) => {
    return async function(dispatch) {
        const resp = await axios.get(`${URL}/producto/busca?nombre=${nombre}`); 
        dispatch({type: GET_PRODUCTO_POR_NOMBRE, payload: resp.data});
    }
}

//reset producto
export const resetProducto = () => {
    return {
        type: RESET_PRODUCTO,
    }
}

//elimina producto
export const deleteProducto = (id) => {
    return async function(dispatch){
        await axios.delete(`${URL}/producto/${id}`);
        dispatch({type: 'DELETE_PRODUCTO', payload: id});
        //actualizo la lista de productos
        dispatch(getProductos());
    }
}

//------MODAL IMGs GRANDES---------------------
//abre y cierra el modal
export const openCloseModal = () => { 
    return {
        type: OPEN_CLOSE_MODAL,
    }
}
