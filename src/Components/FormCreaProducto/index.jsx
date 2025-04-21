import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductoById, getProductoPorNombre } from '../../Redux/Actions';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Estilos de Quill
import './styles.css';

function FormCreaProducto({onSubmit, operacion}) {

    const {id} = useParams();
    const [nombre, setNombre] = React.useState(''); 
    const [precio, setPrecio] = React.useState(null);
    const [imagen, setImagen] = React.useState(null);
    const [vistaPrevia, setVistaPrevia] = React.useState(null);
    const [stock, setStock] = React.useState(1);
    const [enPromo, setEnPromo] = React.useState(false);
    const [descuento, setDescuento] = React.useState(0);
    const [agotado, setAgotado] = React.useState(false);
    const [descripcion, setDescripcion] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const existeProducto = useSelector((state) => state.existeProducto);
    const quillRef = React.useRef(null);
    const prod = useSelector((state) => state.producto);
    const [existeProd, setExisteProd] = React.useState(null); 
    const dispatch = useDispatch();

    const handleChangeNombre = (e) => {
        setNombre(e.target.value);
    };
    const handleChangePrecio = (e) => {
        setPrecio(e.target.value);
    };
    const handleChangeImagen = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagen(file);
            setVistaPrevia(URL.createObjectURL(file));
        }
    };
    const handleChangeStock = (e) => {
        setStock(e.target.value);
    };
    const handleChangePromo = (e) => {
        if(e.target.checked){
            setEnPromo(true);
        }else{
            setEnPromo(false);
        }
    };
    const handleChangeDescuento = (e) => {
        setDescuento(e.target.value);
    };
    const handleChangeAgotado = (e) => {
        if(e.target.checked){
            setAgotado(true);
        }else{
            setAgotado(false);
        }
    };
    //elimina imagen del array de imágenes
    const handleEliminaImg = (index) => {
        
    };
    //funcion validar datos
    const validarDatos = () => {
        let errores = {};
        if (!nombre) {
            errores.nombre = 'El nombre es obligatorio';
        }
        if (!precio) {
            errores.precio = 'El precio es obligatorio';
        }
        if(!stock){
            errores.stock = 'El stock es obligatorio';
        }
        //si hay errores
        if (Object.keys(errores).length > 0) {
            setErrors(errores);
            return false;
        }
        return true;
    };
    //funcion limpiar inputs
    const limpiarInputs = () => {
        document.querySelector('.form-crea-prod').reset(); // Limpia el formulario
        setNombre('');
        setPrecio('');
        setImagen(null);
        setVistaPrevia(null);
        setStock(1);
        setEnPromo(false);
        setDescuento(0);
        setAgotado(false);
        setDescripcion('');
        setErrors({});
    
        // Limpia el contenido del editor Quill
        if (quillRef.current && quillRef.current.__quillInstance) {
            quillRef.current.__quillInstance.root.innerHTML = '';
        }
    };
    
    //igualmente a pesar de que recibo del padre la función onsubmit, la vuelvo a definir acá
    const handleOnSubmit = (e) => { 
        e.preventDefault();
        if(operacion === 'editar'){
            const data = {
                id: prod._id,
                nombre,
                precio,
                descripcion,
                imagen,
                stock,
                enPromo,
                porcentajeDescuento: descuento,
                agotado,
            };
            onSubmit(data);
            //window.location.href = '/admin/listaProdsAdmin';
        }else{
            if (validarDatos()) { 
                const data = {
                    id: prod._id,
                    nombre,
                    precio,
                    descripcion,
                    imagen,
                    stock,
                    enPromo,
                    porcentajeDescuento: descuento,
                    agotado,
                };
                onSubmit(data);
                limpiarInputs();
            }
        }
    }
    
    //efecto para disparar la acción de traer el producto por id SI operación = editar
    useEffect(() => {
        if (operacion === 'editar') {
            dispatch(getProductoById(id));
        }
    }, [dispatch, id, operacion]);
    //efecto para iniciar los inputs en caso de editar
    useEffect(() => {
        if (operacion === 'editar' && prod) {
            setNombre(prod.nombre || '');
            setPrecio(prod.precio || '');
            setDescripcion(prod.descripcion || '');
            setStock(prod.stock || 1);
            setImagen(prod.imagen || '');
            setVistaPrevia(prod.imagen || '');
            setEnPromo(prod.enPromo || false);
            setDescuento(prod.porcentajeDescuento || 0);
            setAgotado(prod.agotado || false);

            // Inicializar el contenido del editor de Quill
            if (quillRef.current && quillRef.current.__quillInstance) {
                quillRef.current.__quillInstance.root.innerHTML = prod.descripcion || '';
            }
        }
    }, [prod, operacion]);
    //useEffect para inicializar el editor de texto
    useEffect(() => {
        if (quillRef.current && !quillRef.current.__quillInstance) {
            const quillInstance = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline'],
                        [{ 'size': ['small', false, 'large', 'huge'] }],
                        [{ 'align': [] }],
                        ['link', 'image'],
                    ],
                },
            });
    
            quillInstance.on('text-change', () => {
                setDescripcion(quillInstance.root.innerHTML);
            });
    
            quillRef.current.__quillInstance = quillInstance;
        }
    }, []);
    //efecto para traer prod por nombre SI existe
    useEffect(() => {
        if(operacion === 'crear' && nombre){
            dispatch(getProductoPorNombre(nombre));
            setExisteProd(existeProducto.msg);
        }
    }, [dispatch, existeProducto.msg, nombre, operacion]);


    return (
        <form onSubmit={handleOnSubmit} className='form-crea-prod'>
            {/* imagen */}
            <div className='cont-imagen'>
                <label className='label-prod'>Imagen</label>
                <input
                    type='file'
                    name='imagen'
                    accept="image/*"
                    onChange={handleChangeImagen}
                    className='input-crea-prod'
                />

                {errors.imagen && <p className='error'>{errors.imagen}</p>}
                {/* vista previa */}
                {vistaPrevia && (
                    <div className="cont-vista-previa">
                        <img src={vistaPrevia} alt="Vista previa" className="img-previa" />
                    </div>
                )}
            </div>
            {/* nombre */}
            <div className='cont-nombre'>
                <label className='label-prod'>Nombre producto</label>
                <input 
                    type='text' 
                    name='nombre'
                    value={nombre}
                    onChange={handleChangeNombre}
                    className='input-nombre-prod'
                />
                {errors.nombre && <p className='error'>{errors.nombre}</p>}
                {existeProd && <p className='error'>El producto ya existe</p>}
            </div>
            {/* precio - categoría - stock*/}
            <div className='cont-precio-cat-stock'>
                <div className='cont-precio-cat'>
                    <label className='label-prod'>Precio</label>
                    <input
                        type='text'
                        name='precio'
                        value={precio}
                        onChange={handleChangePrecio}
                        className='input-crea-precio'
                    />
                    {errors.precio && <p className='error'>{errors.precio}</p>}
                </div>
                <div className='cont-precio-cat'>
                    <label className='label-prod'>Stock</label>
                    <input
                        type='number'
                        min='1'
                        name='stock'
                        value={stock}
                        onChange={handleChangeStock}
                        className='input-crea-stock'
                    />
                    {errors.stock && <p className='error'>{errors.stock}</p>}
                </div>
            </div>
            {/* está en Promo */}
            <div className='cont-promo-desc'>
                <div className='cont-promo'>
                    <label className='label-prod'>¿Está en promoción?</label>
                    <input 
                        type='checkbox' 
                        name='enPromo'
                        value={enPromo}
                        checked={enPromo}
                        onChange={handleChangePromo}
                        className='check-crea-promo' 
                    />
                </div>
                <div className='cont-desc'>
                    <label className='label-prod'>Porcentaje del descuento:</label>
                    <input 
                        type='number'
                        name='descuento'
                        value={descuento}
                        onChange={handleChangeDescuento}
                        className='input-crea-desc' 
                    />
                </div>
            </div>
            {/* Agotado */}
            <div className='cont-promo-desc'>
                <div className='cont-promo'>
                    <label className='label-prod'>¿Está agotado?</label>
                    <input 
                        type='checkbox' 
                        name='agotado'
                        value={agotado}
                        checked={agotado}
                        onChange={handleChangeAgotado}
                        className='check-crea-promo' 
                    />
                </div>
            </div>
            {/* descripción */}
            <div className='cont-descripcion'>
                <label className='label-prod'>Descripción</label>
                {/* cont para texto editable */}
                <div ref={quillRef} className="input-crea-descrip"></div>
            </div>
            {/* botón crear/modificar */}
            <button type='submit' className='btn-crea-prod'>
                {
                    operacion === 'editar' ? 'Editar Producto' : 'Crear Producto'
                }
            </button>
        </form>
    )
}

export default FormCreaProducto