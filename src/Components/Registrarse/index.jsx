import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modificaUsuario, registrarse } from '../../Redux/Actions';
import Swal from 'sweetalert2';
import LoginGoogle from '../LoginGoogle';
import FormDatosUsuario from '../FormDatosUsuario';
import './styles.css';

function Registrarse({ operacion }) {

    const [idUser, setIdUser] = useState(''); //para mandar al back, en caso de modificar
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [area, setArea] = useState('');
    const [numTel, setNumTel] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [depto, setDepto] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [comentarios, setComentarios] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    //obtengo los datos del user SI es q ya está logueado; para pre carga de la vista modificar
    const userLog = useSelector(state => state.dataUsuario);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setErrors((prev) => ({ ...prev, [id]: null }));
        switch (id) {
            case 'nombre':
                setNombre(value);
                break;
            case 'apellido':
                setApellido(value);
                break;
            case 'dni':
                setDni(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'area':
                setArea(value);
                break;
            case 'numTel':
                setNumTel(value);
                break;
            case 'calle':
                setCalle(value);
                break;
            case 'numero':
                setNumero(value);
                break;
            case 'piso':
                setPiso(value);
                break;
            case 'depto':
                setDepto(value);
                break;
            case 'codigoPostal':
                setCodigoPostal(value);
                break;
            case 'provincia':
                setProvincia(value);
                break;
            case 'localidad':
                setLocalidad(value);
                break;
            case 'comentarios':
                setComentarios(value);
                break;
            default:
                break;
        }
    };
    //funcion para ver la password
    const onClickVerContraseña = () => {
        const inputContraseña = document.querySelector('#password');
        if (inputContraseña.type === 'password') { //le cambio el tipo de input
            inputContraseña.type = 'text';
        } else {
            inputContraseña.type = 'password';
        }
    }
    const validar = () => {
        let campos = {};
        if (operacion === 'modificar') {
            campos = {
                nombre,
                apellido,
                dni,
                email,
                area,
                numTel,
                calle,
                numero,
                codigoPostal,
                provincia,
                localidad,
            }
        }else{
            campos = {
                nombre,
                apellido,
                dni,
                email,
                password,
                area,
                numTel,
                calle,
                numero,
                codigoPostal,
                provincia,
                localidad,
            }
        }

        const nuevosErrores = Object.entries(campos).reduce((acc, [key, value]) => {
            if (!value || String(value).trim() === '') {
                acc[key] = ` es requerido.`;
            }
            return acc;
        }, {});

        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };
    //limpio los campos
    const limpiarCampos = () => {
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setPassword('');
        setNumTel();
        setArea();
        setCalle('');
        setNumero('');
        setPiso('');
        setDepto('');
        setCodigoPostal('');
        setProvincia('');
        setLocalidad('');
        setComentarios('');
        setErrors({});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            const data = ({
                nombre,
                apellido,
                dni,
                email,
                password,
                telefono: { area, numero: numTel },
                direccion: {
                    calle,
                    numero,
                    piso,
                    depto,
                    codigoPostal,
                    provincia,
                    localidad,
                },
                comentarios,
            });
            if (operacion === 'modificar') {
                dispatch(modificaUsuario(idUser, data))
                    .then((response) => {
                        if (response?.msg === 'success') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Modificado correctamente',
                                timer: 1500,
                            });
                            limpiarCampos();
                            window.location.href = '/home';
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
            } else {
                dispatch(registrarse(data))
                    .then((response) => {
                        if (response?.msg === 'success') {
                            Swal.fire({
                                icon: 'success',
                                title: 'Registrado correctamente',
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
    };

    /* efecto para cargar deatos del usuario para MODIFICAR */
    useEffect(() => {
        if (operacion === 'modificar') {
            setIdUser(userLog.id);
            setNombre(userLog.nombre);
            setApellido(userLog.apellido);
            setDni(userLog.dni);
            setEmail(userLog.email);
            setNumTel(userLog.telefono.numero);
            setArea(userLog.telefono.area);
            setCalle(userLog.direccion.calle);
            setNumero(userLog.direccion.numero);
            setPiso(userLog.direccion.piso);
            setDepto(userLog.direccion.depto);
            setCodigoPostal(userLog.direccion.codigoPostal);
            setProvincia(userLog.direccion.provincia);
            setLocalidad(userLog.direccion.localidad);
        }
}, [operacion, userLog?.apellido, userLog?.direccion.calle, userLog?.direccion.codigoPostal, userLog?.direccion.depto, userLog?.direccion.localidad, userLog?.direccion.numero, userLog?.direccion.piso, userLog?.direccion.provincia, userLog?.dni, userLog?.email, userLog?.id, userLog?.nombre, userLog?.telefono.area, userLog?.telefono.numero]);

    return (
        <div className='cont-registrarse'>
            <FormDatosUsuario
                nombre={nombre}
                apellido={apellido}
                dni={dni}
                email={email}
                password={password}
                area={area}
                numTel={numTel}
                calle={calle}
                numero={numero}
                piso={piso}
                depto={depto}
                codigoPostal={codigoPostal}
                provincia={provincia}
                localidad={localidad}
                comentarios={comentarios}
                errors={errors}
                onClickVerContraseña={onClickVerContraseña}
                limpiarCampos={limpiarCampos}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                registrarse={true}
                operacion={operacion}
            />
            {
                operacion !== 'modificar' &&
                <div className='cont-btn-registrarse'>
                    <LoginGoogle />
                </div>
            }
        </div>
    )
}

export default Registrarse