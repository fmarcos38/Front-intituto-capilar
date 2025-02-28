import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsuarioByDNI, modificaUsuario } from '../../Redux/Actions';
import FormDatosUsuario from '../FormDatosUsuario';
import Swal from 'sweetalert2';
import './styles.css';

function RecuperarDatosUsuario() {
    const usuario = useSelector((state) => state.dataUsuario);
    const [dniUsuario, setDniUsuario] = React.useState('');
    //estados datos usuario
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(null);
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    //función quito los errores
    const quitarError = (e) => {
        const newError = { ...error };
        delete newError[e.target.name];
        setError(newError);
    }

    const onChangeDniUsuario = (e) => {
        setDniUsuario(e.target.value);
        //quito error
        quitarError(e);
    }
    //btn enviar dni usuario a buscar    
    const handleRecuperaDatos = (e) => {
        e.preventDefault();
        if (!dniUsuario) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa el campo DNI',
            });
        } else {
            dispatch(getUsuarioByDNI(dniUsuario));
        }
    }
    //onChange info del usuario
    const onChangeNombre = (e) => {
        setNombre(e.target.value);
        quitarError(e);
    }
    const onChangeApellido = (e) => {
        setApellido(e.target.value);
        quitarError(e);
    }
    const onChangeDni = (e) => {
        setDni(e.target.value);
        quitarError(e);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        quitarError(e);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
        quitarError(e);
    }
    const onChangeTelefono = (e) => {
        setTelefono(e.target.value);
        quitarError(e);
    }
    const onChangeDireccion = (e) => {
        setDireccion(e.target.value);
        quitarError(e);
    }
    //funcion para ver la password
    const onClickVerContraseña = () => {
        const inputContraseña = document.querySelector('.input-password');
        if (inputContraseña.type === 'password') { //le cambio el tipo de input
            inputContraseña.type = 'text';
        } else {
            inputContraseña.type = 'password';
        }
    }
    //valida errores
    const validar = () => {
        const newError = {};

        if(!dniUsuario) {
            newError.dniUsuario = 'El campo DNI es obligatorio';
        }
        if (!nombre) {
            newError.nombre = 'El campo nombre es obligatorio';
        }
        if (!apellido) {
            newError.apellido = 'El campo apellido es obligatorio';
        }
        if (!dni) {
            newError.dni = 'El campo dni es obligatorio';
        }
        if (!email) {
            newError.email = 'El campo email es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newError.email = 'El email no es válido';
        }
        if (!password) {
            newError.password = 'El campo password es obligatorio';
        }
        if (!telefono) {
            newError.telefono = 'El campo telefono es obligatorio';
        }
        if (!direccion) {
            newError.direccion = 'El campo direccion es obligatorio';
        }
        //actualizo el estado local de errors
        setError(newError);

        //si el objeto newError esta vacio, retorna false
        if (Object.keys(newError).length) return true;
        return false;
    }
    //limpio los campos
    const limpiarCampos = () => {
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setPassword('');
        setTelefono('');
        setDireccion('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validar() || !password){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa los campos correctamente',
            });
        } else {
            const data = {
                nombre,
                apellido,
                dni,
                email,
                password,
                telefono,
                direccion,
                isAdmin: false
            };
            dispatch(modificaUsuario(usuario?._id, data))
                .then((response) => {
                    if (response?.msg === 'success') {
                        Swal.fire({
                            icon: 'success',
                            title: 'Datos actualizados !!',
                            timer: 1500,
                        });
                        limpiarCampos();
                        window.location.href = '/login';
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: response?.data?.msg || 'Error desconocido',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
                .catch((error) => {
                    console.error("Error del servidor:", error.response?.data || error.message);
                    Swal.fire({
                        icon: 'error',
                        title: error.response?.data?.msg || 'Error al conectar con el servidor',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                });
        }
    }

    //efecto carga los datos del usuario SI es que lo encuentra
    React.useEffect(() => {
        if (usuario) {
            setNombre(usuario?.nombre);
            setApellido(usuario?.apellido);
            setDni(usuario?.dni);
            setEmail(usuario?.email);
            setPassword(usuario?.password);
            setTelefono(usuario?.telefono);
            setDireccion(usuario?.direccion);
            // Borra los mensajes de error correspondientes
            setError((prevError) => {
                const newError = { ...prevError };
                delete newError.nombre;
                delete newError.apellido;
                delete newError.dni;
                delete newError.email;
                delete newError.password;
                delete newError.telefono;
                delete newError.direccion;
                return newError;
            });
        }
    }, [usuario]);


    return (
        <div className='cont-recup-datos'>
            {/* carga dni a buscar */}
            <div className='form-modalRecupera'>
                <h2>Recupera tus datos</h2>                
                <div className="modalRecuperaDatos__input">
                    <label>Ingresa tu DNI</label>
                    <input
                        type="number"
                        name='dniUsuario'
                        value={dniUsuario}
                        onChange={onChangeDniUsuario}
                        className='input-nombre'
                    />
                </div>
                <button type='button' onClick={handleRecuperaDatos} className='modalRecuperaDatos__btn'>Enviar</button>
            </div>

            {/* formulario */}
            <form onSubmit={handleSubmit} className='cont-registrarse'>
                <FormDatosUsuario
                    nombre={nombre}
                    apellido={apellido}
                    dni={dni}
                    email={email}
                    password={password}
                    telefono={telefono}
                    direccion={direccion}
                    onChangeNombre={onChangeNombre}
                    onChangeApellido={onChangeApellido}
                    onChangeDni={onChangeDni}
                    onChangeEmail={onChangeEmail}
                    onChangePassword={onChangePassword}
                    onChangeTelefono={onChangeTelefono}
                    onChangeDireccion={onChangeDireccion}
                    error={error}
                    onClickVerContraseña={onClickVerContraseña}
                />
                <div className='cont-btn-registrarse'>
                    <button type="submit" className='btn-registrarse'>Modificar datos</button>
                </div>
            </form>
        </div>
    )
}

export default RecuperarDatosUsuario