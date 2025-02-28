// Login.js
import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../Redux/Actions";


const Login = () => {
    
    const dispatch = useDispatch();

    const handleSuccess = async (credentialResponse) => {
        const { credential } = credentialResponse;
        dispatch(loginGoogle(credential)); 
    };

    const handleFailure = () => {
        console.error("Google Login failed");
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div className="flex items-center justify-center h-screen">
                <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
