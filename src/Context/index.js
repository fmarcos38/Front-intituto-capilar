import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCarrito, getUsuarioById } from '../Redux/Actions';
//creo el contexto
export const AppContext = createContext();

//creo el provider
export const AppProvider = ({ children }) => {
    
    const [dataUser, setDataUser] = React.useState({}); //estado data user
    const [carritoModal, setCarritoModal] = React.useState(false); //estado modal carrito
    const [recuperaDatosModal, setRecuperaDatosModal] = React.useState(false); //estado modal recupera datos
    const dispatch = useDispatch();

    const onClickCarrito = () => {
        setCarritoModal(!carritoModal);
    };

    //efecto para verificar si hay usuario logueado
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('dataUser'));
        if(data){
            setDataUser(data);
        }
    }, []);
    //efecto para cargar en estado global usuario logueado, y traer su carrito
    useEffect(() => {
        if(dataUser?.user){
            dispatch(getUsuarioById(dataUser?.user?.id));
            dispatch(getCarrito(dataUser?.user?.id));
        }
    }, [dataUser, dataUser?.user?.id, dispatch]);

    return (
        <AppContext.Provider value={{
            dataUser,
            carritoModal,
            onClickCarrito,
            recuperaDatosModal,
            setRecuperaDatosModal,
        }}>
            {children}
        </AppContext.Provider>
    );
};

/*

id: "67b34591bd4463d630bec340",
        nombre: "marcos",
        apellido: "forastiere",
        dni: 29979518,
        email: "fmarcos_23@hotmail.com",
        telefono: {
            area: 2281,
            numero: 460124
        },
        direccion: {
            codigoPostal: 123,
            calle: "pepe",
            nunmero: 321
        },
        favoritos: [],
        isAdmin: true


*/