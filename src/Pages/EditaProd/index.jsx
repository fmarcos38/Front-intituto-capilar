import React, {useContext} from 'react'
import FormCreaProducto from '../../Components/FormCreaProducto';
import { AppContext } from '../../Context';
import Swal from 'sweetalert2';

function EditaProd() {
    const context = useContext(AppContext);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));

        // Si existe imagen, la agregamos 
        if (data.imagen) {
            formData.append('imagen', data.imagen);
        }
        
        try {
            const response = await fetch(`http://localhost:3003/producto/edita/${data.id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                Swal.fire({
                    title: 'Producto modif con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3f51b5',
                });
                //redirijo a la lista de propiedades
                window.location.href = '/listarProds';
            } else {
                Swal.fire({
                    title: 'Error al modif la propiedad',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3f51b5',
                });
            }
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    }

    return context.dataUser && (
        <div className='page'>
            <h1>Editar Producto</h1>
            <FormCreaProducto onSubmit={onSubmit} operacion={'editar'} />
        </div>
    )
}

export default EditaProd