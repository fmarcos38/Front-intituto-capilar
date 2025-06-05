import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCarrito, getUsuarioById, modificaUsuario } from '../../Redux/Actions';
import { userData } from '../../localStorage';
import ResumenCompra from '../ResumenCompra';
import FormDatosUsuario from '../FormDatosUsuario';
import Swal from 'sweetalert2';
import './styles.css';

function InformacionContacto() {

    const clienteLog= userData();
    const cliente = useSelector(state => state.dataUsuario);
    const carrito = useSelector(state => state.carrito);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
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

    //funcion onClick vuelvo a la página anterior
    const handleClickVolver = () => {
        window.history.back();
    }

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
            case 'departamento':
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

    const validar = () => {
        const campos = {
            nombre,
            apellido,
            dni,
            email,
            area,
            numTel,
            calle,
            numero,
            piso,
            depto,
            codigoPostal,
            provincia,
            localidad,
        };

        const nuevosErrores = Object.entries(campos).reduce((acc, [key, value]) => {
            if (!value || value.trim() === '') {
                acc[key] = `El campo ${key} es requerido.`;
            }
            return acc;
        }, {});
        setErrors(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            const data = ({
                nombre,
                apellido,
                dni,
                email,
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
            }); console.log("data:",data);
            dispatch(modificaUsuario(cliente.id, data))
            .then((resp) => {
                if(resp.msg === 'success'){
                    Swal.fire({
                        icon: 'success',
                        title: 'Datos actualizados',
                        text: 'Tus datos han sido actualizados con éxito',
                        confirmButtonText: 'Aceptar',
                    });
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `${resp.msg}`,
                        confirmButtonText: 'Aceptar',
                    });
                }
            });
        }
    };
    
    //me traigo el cliente y su carrito
    useEffect(() => {
        if(clienteLog?.user){
            dispatch(getUsuarioById(clienteLog.user.id));
            dispatch(getCarrito(clienteLog.user.id));
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(() => {
        if (cliente?.nombre) {
            setNombre(cliente.nombre || '');
            setApellido(cliente.apellido || '');
            setDni(cliente.dni || '');
            setEmail(cliente.email || '');
            setArea(cliente.telefono?.area || '');
            setNumTel(cliente.telefono?.numero || '');
            setCalle(cliente.direccion?.calle || '');
            setNumero(cliente.direccion?.numero || '');
            setPiso(cliente.direccion?.piso || '');
            setDepto(cliente.direccion?.depto || '');
            setCodigoPostal(cliente.direccion?.codigoPostal || '');
            setProvincia(cliente.direccion?.provincia || '');
            setLocalidad(cliente.direccion?.localidad || '');
            setComentarios(cliente.comentarios || '');
        }
    }, [cliente]);

    return (
        <div className='cont-miCarrito'>
            <div className="cont-envio-producto">
                <div className='cont-envio-producto-col-1 modoColumna'>
                    <p className="p-texto">Completa los siguientes campos para que podamos contactarte</p>
                    <FormDatosUsuario
                        nombre={nombre}
                        apellido={apellido}
                        dni={dni}
                        email={email}
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
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        registrarse={false}
                    />
                </div>

                <div className='cont-envio-producto-col-2 modoColumna'>
                    <ResumenCompra carrito={carrito} />
                    {/* btns continuar y volver */}
                    <div className='cont-btns-continuar-volver'>
                        <button type='button' onClick={handleClickVolver} className='btn-volver-compra'>Seguir comprando</button>
                        <a href='/checkout' className='btn-continuar-compra'>Continuar</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InformacionContacto