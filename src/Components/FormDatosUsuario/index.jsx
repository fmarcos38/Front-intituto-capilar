import React from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import './styles.css';

function FormDatosUsuario({ 
  nombre, apellido, email, password, dni, area, numTel, calle, 
  numero, piso, depto, codigoPostal, provincia, localidad, 
  comentarios, errors, onClickVerContraseña, handleChange, handleSubmit, registrarse }) {

  return (
    <form onSubmit={handleSubmit} className='cont-form-datos-usuario'>      
        {/* nomb - ape- dni */}
        <div className='cont-form-datos-usuario-nomb-ape-dni'>
          <div className='cont-nomb'>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <label className='label'>Nombre</label>
              {errors.nombre && <p style={{ margin: '0 0 0 5px', fontSize: '10px', color: 'red' }}>{errors.nombre}</p>}
            </div>
            <input type="text" id="nombre" label="Nombre" value={nombre} onChange={handleChange} error={errors.nombre} className='input-form-usuario'/>
          </div>
          <div className='cont-ape'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Apellido</label>
              {errors.apellido && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.apellido}</p>}
            </div>
            <input type="text" id="apellido" label="Apellido" value={apellido} onChange={handleChange} error={errors.apellido} className='input-form-usuario'/>
          </div>
          <div className='cont-dni'>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <label className='label'>DNI</label>
              {errors.dni && <p style={{ margin: '0 0 0 5px', fontSize: '10px', color: 'red' }}>{errors.dni}</p>}
            </div>
            <input type="number" id="dni" label="DNI" value={dni} onChange={handleChange} error={errors.dni} className='input-form-usuario'/>
          </div>
        </div>
        {/* email - pass */}
        <div className='cont-form-datos-usuario-email-pass'>
              <div className='cont-email'>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <label className='label'>Email</label>
                  {errors.email && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.email}</p>}
                </div>
                <input type="email" id="email" label="Email" value={email} onChange={handleChange} className='input-form-usuario'/>
              </div>
        {
          registrarse && (
              <div className='cont-password'>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <label className='label'>Contraseña</label>
                  {errors.password && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.password}</p>}
                </div>
                <div className='cont-pass-viewPass'>
                  <input type="password" id='password' value={password} onChange={handleChange} error={errors.password} className='input-form-pass' />
                  <button type='button' className='btn-viewPass' onClick={onClickVerContraseña}>
                    <VisibilityIcon />
                  </button>
                </div>
              </div>
          )
        }
        </div>
        {/* telefono - datos de factuarión */}
        <div className='cont-form-datos-usuario-tel-area'>
          <div className='cont-area'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Num area</label>
              {errors.area && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.area}</p>}
            </div>
            <input type="number" id="area" label="Area" value={area} onChange={handleChange} error={errors.area} className='input-form-usuario'/>
          </div>
          <div className='cont-tel'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Num telefono</label>
              {errors.numTel && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.numTel}</p>}
            </div>
            <input type="number" id="numTel" label="Número de teléfono" value={numTel} onChange={handleChange} error={errors.numTel} className='input-form-usuario'/>
          </div>
        </div>
        {/* calle-num-piso-depto */}
        <div className='cont-form-datos-usuario-calle-num-piso-depto'>
          <div className='cont-calle'>
            <div style={{display: 'flex', flexDirection: 'row',justifyContent:'center', alignItems: 'center'}}>
              <label className='label'>Calle</label>
              {errors.calle && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.calle}</p>}
            </div>
            <input type="text" id="calle" label="Calle" value={calle} onChange={handleChange} error={errors.calle} className='input-form-usuario'/>
          </div>
          <div className='cont-numero'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>N°</label>
              {errors.numero && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.numero}</p>}
            </div>
            <input type="number" id="numero" label="Número" value={numero} onChange={handleChange} error={errors.numero} className='input-form-usuario'/>
          </div>
          <div className='cont-piso'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Piso</label>
              {errors.piso && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.piso}</p>}
            </div>
            <input type="number" id="piso" label="Piso" value={piso} onChange={handleChange} error={errors.piso} className='input-form-usuario'/>
          </div>
          <div className='cont-depto'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Depto</label>
              {errors.depto && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.depto}</p>}
            </div>
            <input type="text" id="depto" label="Depto" value={depto} onChange={handleChange} error={errors.depto} className='input-form-usuario'/>
          </div>
        </div>
        {/* provincia - localida - cod postal*/}
        <div className='cont-form-datos-usuario-prov-loc-cod-postal'>
          <div className='cont-cod-postal'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Código Postal</label>
              {errors.codigoPostal && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.codigoPostal}</p>}
            </div>
            <input type="number" id="codigoPostal" label="Código Postal" value={codigoPostal} onChange={handleChange} error={errors.codigoPostal} className='input-form-usuario' />
          </div>
          <div className='cont-prov'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Provincia</label>
              {errors.provincia && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.provincia}</p>}
            </div>
            <input type="text" id="provincia" label="Provincia" value={provincia} onChange={handleChange} error={errors.provincia} className='input-form-usuario' />
          </div>
          <div className='cont-localidad'>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <label className='label'>Localidad</label>
              {errors.localidad && <p style={{margin: '0 0 0 5px', fontSize:'10px', color:'red'}}>{errors.localidad}</p>}
            </div>
            <input type="text" id="localidad" label="Localidad" value={localidad} onChange={handleChange} error={errors.localidad} className='input-form-usuario' />
          </div>
        </div>
        {/* comentarios */}
        <div className='cont-textarea-contacto'>
          <label className='label'>Comentarios</label>
          <textarea id='comentarios' value={comentarios} onChange={handleChange} className="textarea-contacto" />
        </div>
      
      <button type='onSubmit' className='btn-continuar-compra'>
        {
          registrarse ? 'Registrarse' : 'Modificar datos de entrega'
        }
      </button>
    </form>
  )
}

export default FormDatosUsuario