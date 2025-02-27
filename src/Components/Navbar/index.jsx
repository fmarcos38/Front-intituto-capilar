import React, { useState, useEffect } from 'react';
import NavbarSup from '../NavbarSup';
import NavbarInf from '../NavbarInf';
import './styles.css';

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    //efecto para cambiar el color de la navbar al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 500) { // Solo aplica el efecto en pantallas mayores a 500px
                if (window.scrollY > 1400) {
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
            <NavbarInf />
        </nav>
    );
}

export default Navbar;
