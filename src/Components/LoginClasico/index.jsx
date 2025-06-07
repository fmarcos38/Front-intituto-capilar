import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, resetLogin } from '../../Redux/Actions';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Swal from 'sweetalert2';
import './styles.css';



function LoginClasico() {

    const usuarioLog = useSelector(state => state.dataUsuario); //datos del usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    //valida errores
    const validate = () => {
        let validationErrors = {};       
        
        if (!email) {
            validationErrors.email = 'El email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            validationErrors.email = 'El email no es válido';
        }
        if (!password) {
            validationErrors.password = 'La contraseña es obligatoria';
        } else if (password.length < 6) {
            validationErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        setErrors(validationErrors);
        return Object.keys(validationErrors).length > 0 ? true : false;
    };
    //funcion para ver la contraseña
    const onClickVerContraseña = () => {
        const inputContraseña = document.getElementById('password');
        if(inputContraseña.type === 'password') { //le cambio el tipo de input
            inputContraseña.type = 'text';
        }else {
            inputContraseña.type = 'password';
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (validate === true) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa los campos correctamente',
            });
        } else {
            const data = {
                email,
                password
            };
            dispatch(login(data));
        }
    };
    // Función para manejar la tecla Enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevenir el comportamiento predeterminado
        }
    };

    //efecto para disparar msj de error q viene del back
    useEffect(() => {
        if(usuarioLog?.message === 'ok'){
            //volver a la pagina anterior
            window.history.back();
        }
        if(usuarioLog?.message === 'Email incorrecto'){
            Swal.fire({
                text: 'Email incorrecto',
                icon: 'error'
            });
            dispatch(resetLogin());
        }
        if(usuarioLog?.message === 'Contraseña incorrecta'){
            Swal.fire({
                text: 'Contraseña incorrecta',
                icon: 'error'
            });
            dispatch(resetLogin());
        }
    },[dispatch, usuarioLog?.message]);


    return (
        <div className="login-container">
            <h2 className="login-title">Iniciar Sesión</h2>
            <form onSubmit={handleLogin} onKeyDown={handleKeyDown} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className='cont-inputPass-Y-btnVer'>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={errors.email ? 'input-error' : 'input-pass'}
                        />
                        <EmailIcon className='icon-email' />
                    </div>
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className='cont-inputPass-Y-btnVer'>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={errors.password ? 'input-error' : 'input-pass'}
                        />
                        <button
                            type='button'
                            className='btn-viewPass-login'
                            onClick={() => { onClickVerContraseña() }}
                        >
                            <VisibilityIcon />
                        </button>
                    </div>
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            <p className='p-login'>¿Olvidaste tu contraseña o email?</p>
            <button type='button' className="register-button-login" onClick={() => window.location.href = '/recuperarDatosUsuario'}>
                Recuperar contraseña
            </button>
            <p className='p-login'>Si no estás registrado/a</p>
            <button type='button' className="register-button-login" onClick={() => window.location.href = '/registrarse'}>
                Registrate
            </button>
        </div>
    );
}

export default LoginClasico;