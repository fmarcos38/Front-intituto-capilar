import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import MenuHamburguesa from '../MenuHamburguesa';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import './styles.css';
import { AppContext } from '../../Context';

function NavbarInf({isOpen, handleLogOut, itemsCarrito=0, itemsFavoritos=0}) {

    const context = useContext(AppContext);
    const usuario = context.dataUser;
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
                <div className='col-1-navbarInf'>
                    <MenuHamburguesa  usuario={usuario} isOpen={isOpen} handleLogOut={handleLogOut}/>
                </div>

                <div className='col-2-logo-navbarInf'>
                    <NavLink to='/' className='navlink-navbarInf'>
                        {/* <img src={Logo} alt='Logo' className='logo-navbarInf' /> */}
                        <p>Tu Logo</p>
                    </NavLink>
                </div>

                <div className='col-2-navbarInf'>
                    <ul className='ul-navbarInf'>
                        <li data-translate>Tratamientos</li>
                        <li data-translate>Productos</li>
                        <li data-translate>Testimonios</li>
                        <li data-translate>Nosotros</li>
                        <li data-translate>Contacto</li>
                    </ul>
                </div>

                {/* regist, log, carrito, fav */}
            <div className='col-3-navbarInf'>
                <div className='cont-registrate'>
                    {
                        usuario?.nombre ? 
                            <ul className='ul-nav-med'>
                                <li 
                                    className='navbar-item-admin'
                                    onMouseEnter={handleMouseEnterCambiarPass}
                                    onMouseLeave={handleMouseLeaveCambiarPass}
                                >
                                    <p className='nombreUsuario'>{usuario.nombre}</p>
                                    {/* menú admin */}
                                    {
                                        muestraCambiarPass && (
                                            <ul className='dropdown-menu-usuario'>
                                                <li className='dropdown-item-admin'>
                                                    <NavLink to='/actualizarContraseña' className='link-navbar-usuario'>Cambiar contraseña</NavLink>
                                                </li>
                                            </ul>
                                        )
                                    }
                                </li>
                            </ul>
                        :
                        <NavLink to='/registrarse' className='link-navbar'>Registrate</NavLink>
                    }
                </div>
                {/* menú Admin */}
                {
                    usuario?.isAdmin && (
                            <ul className='ul-nav-med'>
                                <li
                                    className='navbar-item-admin'
                                    onMouseEnter={handleMouseEnterAdmin}
                                    onMouseLeave={handleMouseLeaveAdmin}
                                >
                                    Admin
                                    {/* menú admin */}
                                    {
                                        muestraMenuAdmin && (
                                            <ul className='dropdown-menu-admin'>
                                                <li className='dropdown-item-admin'>
                                                    <NavLink to='/admin/creaProd' className='link-navbar-admin'>Crea Producto</NavLink>
                                                </li>
                                                <li className='dropdown-item-admin'>
                                                    <NavLink to='/admin/listaProdsAdmin' className='link-navbar-admin'>Lista Producto</NavLink>
                                                </li>
                                            </ul>
                                        )
                                    }
                                </li>
                            </ul>
                    )
                }
                {/* regist/log */}
                <div className='cont-login'>
                    {
                        usuario?.nombre ? 
                        <button
                            onClick={() => { handleLogOut() }}
                            style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                        >
                            <LogoutIcon sx={{ 'fontSize': '30px' }} />
                        </button> :
                        <NavLink to='/login' className='link-navbar'>Iniciar sesión</NavLink>
                    }
                </div>
                {/* carrito/fav */}
                    {
                        usuario?.isAdmin === false && (
                            <div className='cont-carrito-fav'>
                                <div className='cont-carrito'>
                                    <p className='items-carrito'>{itemsCarrito}</p>
                                    <button type='button' onClick={handleOnClickCarrito} className='btn-carrito'>
                                        <ShoppingCartIcon sx={{ 'fontSize': '30px' }} />
                                    </button>
                                </div>
                                <div className='cont-favoritos'>
                                    <p className='items-fav'>{itemsFavoritos}</p>
                                    <NavLink to='/favoritos' className='link-navbar-inf'>
                                        <FavoriteIcon sx={{ 'fontSize': '30px' }} />
                                    </NavLink>
                                </div>
                            </div>
                        )
                    }
            </div>
            </div>
        </div>
    );
}

export default NavbarInf;
