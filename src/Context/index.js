import React, { createContext, useEffect } from 'react';
//creo el contexto
export const AppContext = createContext();

//creo el provider
export const AppProvider = ({ children }) => {
    
    const [dataUser, setDataUser] = React.useState({}); //estado data user
    const [carritoModal, setCarritoModal] = React.useState(false); //estado modal carrito
    const [recuperaDatosModal, setRecuperaDatosModal] = React.useState(false); //estado modal recupera datos
    
    const marcas = ['Nox', 'Bullpadel', 'Wilson', 'Head',]; //arreglo de marcas
    const categorias = ['Paletas', 'Pelotas', 'Zapatillas', 'Bolsos']; //arreglo de categorías

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
    
    return (
        <AppContext.Provider value={{
            dataUser,
            marcas,
            categorias,
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