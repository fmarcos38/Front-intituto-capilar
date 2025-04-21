import React, { useContext } from 'react'
import {AppContext} from '../../Context';
import FormCreaProducto from '../../Components/FormCreaProducto';
import Swal from 'sweetalert2';
import './styles.css';


function CreaProducto() { 

    const context = useContext(AppContext);

    const onSubmit = async(data) => {        
        const formData = new FormData(); //creo el formData
        formData.append('data', JSON.stringify(data)); //agrego los datos del producto
        //agrego las imagenes
        data.imagenes.forEach((imagen) => {
            formData.append('imagenes', imagen);
        });
        
        try{
            const response = await fetch('http://localhost:3002/producto', {
                method: 'POST',
                body: formData,
            });
            if(response.ok){
                Swal.fire({
                    title: 'Producto creado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3f51b5',
                });
            }else{
                    Swal.fire({
                        title: 'Error al crear el producto',
                        icon: 'error',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#3f51b5',
                    });
            }
        }catch(error){
            console.error('Error al crear producto:', error);
        }
    }

    return context.dataUser &&
    (
        <div className='page cont-crea-prod-page'>
            <h1 className='title-crea-prod'>Crea un nuevo producto</h1>
            <FormCreaProducto onSubmit={onSubmit}/>
        </div>
    )
}

export default CreaProducto