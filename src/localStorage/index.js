//obtengo data del user
const userData = () => {
    const data = localStorage.getItem('dataUser');
    if(data){
        return JSON.parse(data);
    }else{
        return null;
    }
};

//logout
const logOut = () => {
    localStorage.removeItem('dataUser');
    window.location.href = '/';
};

//exporto funciones
export {
    userData,
    logOut
};