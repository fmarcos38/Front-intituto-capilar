import React, { useContext } from 'react';
import { AppContext } from '../../Context';
//import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MenuHamburguesa from '../MenuHamburguesa';
import Logo from '../../Images/LOGO.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css';


function NavbarInf({isOpen, setIsOpen, handleLogOut, itemsCarrito=0, itemsFavoritos=0}) {

    const context = useContext(AppContext);
    const usuario = context.dataUser;
    //const usuario = useSelector(state => state.dataUsuario); //usuario logueado 
    const [muestraCambiarPass, setMuestraCambiarPass] = React.useState(false); //menu cambiar contraseña
    const [muestraMenuAdmin, setMuestraMenuAdmin] = React.useState(false); //menu admin

    const handleOnClickCarrito = () => {
        context.onClickCarrito();
    }
    //función para posar sobre el menú admin y mostrarlo
    const handleMouseEnterCambiarPass = () => {
        setMuestraCambiarPass(true);
    };
    //función para sacar el mouse del menú admin y ocultarlo
    const handleMouseLeaveCambiarPass = () => {
        setMuestraCambiarPass(false);
    };
    //función para posar sobre el menú admin y mostrarlo
    const handleMouseEnterAdmin = () => {
        setMuestraMenuAdmin(true);
    };
    //función para sacar el mouse del menú admin y ocultarlo
    const handleMouseLeaveAdmin = () => {
        setMuestraMenuAdmin(false);
    };

    return (
        <div className='cont-navbarInf'>
            <div className='sub-cont-navbarInf'>
                {/* menú hamburg */}
                <div className='col-1-navbarInf'>
                    <MenuHamburguesa  
                        usuario={usuario} 
                        isOpen={isOpen} 
                        setIsOpen={setIsOpen}
                        handleLogOut={handleLogOut}
                    />
                </div>
                {/* logo */}
                <div className='col-2-logo-navbarInf'>
                    <NavLink to='/' className='navlink-navbarInf'>
                        <img src={Logo} alt='Logo' className='logo-navbarInf' />
                    </NavLink>
                </div>
                {/* items barra */}
                <div className='col-2-navbarInf'>
                    <ul className='ul-navbar-Inf'>
                        <NavLink to={'/tratamientos'} className={'link-barra'}>
                            <li className='item-nav'>Tratamientos</li>
                        </NavLink>
                        <NavLink to={'/productos'} className={'link-barra'}>
                            <li className='item-nav'>Productos</li>
                        </NavLink>
                        <NavLink to={'/nosotros'} className={'link-barra'}>
                            <li className='item-nav'>Nosotros</li>
                        </NavLink>
                        <NavLink to={'/contacto'} className={'link-barra'}>
                            <li className='item-nav'>Contacto</li>
                        </NavLink>
                    </ul>
                </div>

                {/* regist, log, carrito, fav, logout */}
                <div className='col-3-navbarInf'>
                    {
                        !usuario?.user?.nombre ?
                            <div className='cont-opc-userNoLog'>
                                {/* Login */}
                                <NavLink to='/login' className='link-navbar'>
                                        <p className='p-login-navbar'>Login</p>
                                    </NavLink>
                            </div>
                            :
                            <div className='cont-opc-userLog'>
                                {/* Nombre user */}
                                <div className='cont-NombreUser'>
                                    {
                                        <ul className='ul-nav-med'>
                                        <li
                                            className='navbar-item-admin'
                                            onMouseEnter={handleMouseEnterCambiarPass}
                                            onMouseLeave={handleMouseLeaveCambiarPass}
                                        >
                                            <p className='nombreUsuario'>{usuario?.user?.nombre}</p>
                                            {/* menú admin */}
                                            {
                                                muestraCambiarPass && (
                                                    <ul className='dropdown-menu-admin'>
                                                        <li className='dropdown-item-admin'>
                                                            <NavLink to='/modificarDatosUsuario' className='link-navbar-usuario'>Cambiar contraseña</NavLink>
                                                        </li>
                                                    </ul>
                                                )
                                            }
                                        </li>
                                    </ul>
                                    }
                                </div>
                                {/* carrito/fav */}
                                <div className='cont-carrito-fav'>
                                    {
                                        !usuario?.user?.isAdmin &&
                                        <>
                                            <div className='cont-carrito'>
                                                <p className='items-carrito'>{itemsCarrito}</p>
                                                <button type='button' onClick={handleOnClickCarrito} className='btn-carrito'>
                                                    <ShoppingCartIcon sx={{ 'fontSize': '30px' }} />
                                                </button>
                                            </div>
                                            <div className='cont-favoritos'>
                                                <p className='items-fav'>{itemsFavoritos}</p>
                                                <NavLink to='/favoritos' className='link-navbar-inf'>
                                                    <FavoriteIcon sx={{ 'fontSize': '30px', color: 'black' }} />
                                                </NavLink>
                                            </div>
                                        </>
                                    }
                                </div>
                                {/*Menú Admin */}
                                <div className='cont-menuAdmin'>
                                    {
                                        usuario?.user?.isAdmin &&
                                        <>
                                            <ul className='ul-nav-med'>
                                                <li
                                                    className='navbar-item-admin'
                                                    onMouseEnter={handleMouseEnterAdmin}
                                                    onMouseLeave={handleMouseLeaveAdmin}
                                                >
                                                    <p className='nombreUsuario'>Admin</p>
                                                    {/* menú admin */}
                                                    {
                                                        muestraMenuAdmin && (
                                                            <ul className='dropdown-menu-admin'>
                                                                <li className='dropdown-item-admin'>
                                                                    <NavLink to='/creaProd' className='link-navbar-usuario'>Crear producto</NavLink>
                                                                </li>
                                                                <li className='dropdown-item-admin'>
                                                                    <NavLink to='/listarProds' className='link-navbar-usuario'>Listar productos</NavLink>
                                                                </li>
                                                            </ul>
                                                        )
                                                    }
                                                </li>
                                            </ul>
                                        </>
                                    }
                                </div>
                                {/* LogOut */}
                                <div className='cont-LogOut'>
                                    <button
                                        onClick={() => { handleLogOut() }}
                                        style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                                    >
                                        <LogoutIcon sx={{ 'fontSize': '20px' }} />
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default NavbarInf;