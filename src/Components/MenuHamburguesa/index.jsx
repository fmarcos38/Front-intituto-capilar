//componente menú hamburguesa
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css';

function MenuHamburguesa({ usuario, isOpen, handleLogOut }) {
    
    const [menu, setMenu] = useState(false);
    const menuRef = useRef(null); // Referencia para el menú hamburguesa
    const menuItemsRef = useRef([]); // Referencia para los elementos del menú

    const toggleMenu = () => {
        setMenu(!menu);
    }

    // Cierra el menú hamburguesa al hacer clic o tocar fuera de él
    useEffect(() => {
        function handleClickOutside(event) {
            // Verificar si el clic o toque es fuera del menú
            if (
                menuRef.current && !menuRef.current.contains(event.target) && 
                !menuItemsRef.current.some(item => item.contains(event.target))
            ) {
                setMenu(false); // Cierra el menú si no es clic en el menú
            }
        }

        // Escuchar el evento pointerdown (compatible con mouse y táctil)
        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            // Limpiar el evento cuando el componente se desmonta
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, []);


    return (
        <div className='cont-menuHamburguesa'>
            <div 
                className={`cont-menuHamburguesa__btn ${menu ? 'open' : ''}`} 
                onClick={toggleMenu}
                ref={menuRef}
            >
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
                <div className='linea-menuHamburguesa'></div>
            </div>
            <div className={`cont-menuHamburguesa__menu ${menu ? 'open' : 'ocultar'}`}>
                {
                    isOpen && (
                        <ul className='ul-lista-pChica'>
                            {/* opc ADMIN */}
                            {
                                usuario?.isAdmin && (
                                    <>
                                        <li className='items-pChica'>
                                            <NavLink
                                                to='/admin/creaProd'
                                                className='link-navbar'
                                            /* ref={el => menuItemsRef.current[0] = el} */
                                            >
                                                Crea producto
                                            </NavLink>
                                        </li>
                                        <li className='items-pChica'>
                                            <NavLink
                                                to='/admin/listaProdsAdmin'
                                                className='link-navbar'
                                            /* ref={el => menuItemsRef.current[1] = el} */
                                            >
                                                Lista productos
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                            {/* productos */}
                            <li className='items-pChica'>
                                <NavLink
                                    to='/muestraPaletas'
                                    className='link-navbar'
                                /* ref={el => menuItemsRef.current[2] = el} */
                                >
                                    Paletas
                                </NavLink>
                            </li>
                            <li className='items-pChica'>
                                <NavLink
                                    to='/muestraPelotas'
                                    className='link-navbar'
                                /* ref={el => menuItemsRef.current[3] = el} */
                                >
                                    Pelotas
                                </NavLink>
                            </li>
                            <li className='items-pChica'>
                                <NavLink
                                    to='/muestraBolzos'
                                    className='link-navbar'
                                /* ref={el => menuItemsRef.current[4] = el} */
                                >
                                    Bolzos
                                </NavLink>
                            </li>
                            <li className='items-pChica'>
                                <NavLink
                                    to='/muestraZapatillas'
                                    className='link-navbar'
                                /* ref={el => menuItemsRef.current[5] = el} */
                                >
                                    Zapatillas
                                </NavLink>
                            </li>
                            {
                                usuario?.isAdmin === false && (
                                    <>
                                        {/* favoritos */}
                                        <li className='items-pChica'>
                                            <NavLink
                                                to='/favoritos'
                                                className='link-navbar'
                                            /* ref={el => menuItemsRef.current[6] = el} */
                                            >
                                                Tus Favoritos
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                            {/* login/logout */}
                            {
                                usuario?.nombre ? (
                                    <li className='items-pChica'>
                                        <button
                                            onClick={() => { handleLogOut() }}
                                            style={{ border: 'none', backgroundColor: 'transparent' }}
                                        /* ref={el => menuItemsRef.current[7] = el} */
                                        >
                                            <LogoutIcon sx={{ 'fontSize': '18px', 'color': 'white' }} />
                                        </button>
                                    </li>
                                ) : (
                                    <>
                                        <li className='items-pChica'>
                                            <NavLink
                                                to='/login'
                                                className='link-navbar'
                                            /* ref={el => menuItemsRef.current[8] = el} */
                                            >
                                                Login
                                            </NavLink>
                                        </li>
                                        {/* registrarse */}
                                        <li className='items-pChica'>
                                            <NavLink
                                                to='/registrarse'
                                                className='link-navbar'
                                            /* ref={el => menuItemsRef.current[9] = el} */
                                            >
                                                Registrarse
                                            </NavLink>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default MenuHamburguesa