import React, { useState, useEffect } from 'react';
import { logOut} from '../../localStorage';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import NavbarSup from '../NavbarSup';
import NavbarInf from '../NavbarInf';
import './styles.css';

function Navbar() {
    //const usuarioLog = userData(); //usuario loguedo
    //const usuario = useSelector(state => state.dataUsuario); //usuario logueado
    // eslint-disable-next-line no-unused-vars
    const [isOpen, setIsOpen] = React.useState(false); //menu hamburguesa  
    const [scrolled, setScrolled] = useState(false); //estado para cambiar el color de la navbar al hacer scroll
    const carrito = useSelector(state => state.carrito); //carrito para obtener cantidad de productos
    const favoritos = useSelector(state => state.favoritos); //favoritos para obtener cantidad de productos  
    

    //logout
    const handleLogOut = () => {
        Swal.fire({
            title: "Salir?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut();
            }
            //redirijo a home
            window.location.href = '/';
        });
    };

    //efecto para cambiar el color de la navbar al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 500) { // Solo aplica el efecto en pantallas mayores a 500px
                if (window.scrollY > 500) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }
            } else {
                setScrolled(false); // En pantallas menores a 500px, mantiene la navbar fija
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <NavbarSup />
            <NavbarInf
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleLogOut={handleLogOut}
                itemsCarrito={carrito.productos?.length}
                itemsFavoritos={favoritos?.length}
            />
        </nav>
    );
}

export default Navbar;