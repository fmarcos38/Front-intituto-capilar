import React from 'react';
import LoginClasico from '../../Components/LoginClasico';
import LoginGoogle from '../../Components/LoginGoogle';
import './styles.css';

function LoginPage() {

    return (
        <div className='cont-login-page page'>
            <div className='cont-login-clasico-page'>
                <LoginClasico />
            </div>
            
            <div className='cont-login-google-page'>
                <LoginGoogle />
            </div>
        </div>
    )
}

export default LoginPage