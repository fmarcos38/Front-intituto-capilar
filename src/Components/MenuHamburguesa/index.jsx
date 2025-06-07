import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css';

function MenuHamburguesa({ usuario, isOpen, setIsOpen, handleLogOut }) {
    const menuRef = useRef(null);

    // Cierra el menú hamburguesa al hacer clic fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, [setIsOpen]);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className='cont-menuHamburguesa'>
            <div 
                className={`cont-menuHamburguesa__btn ${isOpen ? 'open' : ''}`} 
                onClick={toggleMenu}
                ref={menuRef}
            >
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
            </div>

            <div className={`cont-menuHamburguesa__menu ${isOpen ? 'open' : 'ocultar'}`}>
                {isOpen && (
                    <ul className='ul-lista-pChica'>
                        {/* ADMIN */}
                        {usuario?.isAdmin && (
                            <>
                                <li className='items-pChica'>
                                    <NavLink to='/admin/creaProd' className='link-navbar'>
                                        Crea producto
                                    </NavLink>
                                </li>
                                <li className='items-pChica'>
                                    <NavLink to='/admin/listaProdsAdmin' className='link-navbar'>
                                        Lista productos
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Productos */}
                        <li className='items-pChica'>
                            <NavLink to='/muestraPaletas' className='link-navbar'>
                                Paletas
                            </NavLink>
                        </li>
                        <li className='items-pChica'>
                            <NavLink to='/muestraPelotas' className='link-navbar'>
                                Pelotas
                            </NavLink>
                        </li>
                        <li className='items-pChica'>
                            <NavLink to='/muestraBolzos' className='link-navbar'>
                                Bolzos
                            </NavLink>
                        </li>
                        <li className='items-pChica'>
                            <NavLink to='/muestraZapatillas' className='link-navbar'>
                                Zapatillas
                            </NavLink>
                        </li>

                        {/* Favoritos para usuarios NO admin */}
                        {!usuario?.isAdmin && usuario?.nombre && (
                            <li className='items-pChica'>
                                <NavLink to='/favoritos' className='link-navbar'>
                                    Tus Favoritos
                                </NavLink>
                            </li>
                        )}

                        {/* Login / Logout */}
                        {usuario?.nombre ? (
                            <li className='items-pChica'>
                                <button
                                    onClick={handleLogOut}
                                    style={{ border: 'none', backgroundColor: 'transparent' }}
                                >
                                    <LogoutIcon sx={{ fontSize: '18px', color: 'white' }} />
                                </button>
                            </li>
                        ) : (
                            <>
                                <li className='items-pChica'>
                                    <NavLink to='/login' className='link-navbar'>
                                        Login
                                    </NavLink>
                                </li>
                                <li className='items-pChica'>
                                    <NavLink to='/registrarse' className='link-navbar'>
                                        Registrarse
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MenuHamburguesa;
