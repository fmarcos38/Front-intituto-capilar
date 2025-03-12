
//funcion transforma números a num dinero
function formatMoney(amount) {
    if (amount == null) {
        return '0.00'; // Valor por defecto si amount es null o undefined
    }
    return amount.toLocaleString('de-DE'/* , { minimumFractionDigits: 2, maximumFractionDigits: 2 } */);
}

//funcion pasa a fecha de argentina
function formatDate(date) {
    if (date == null) {
        return '00/00/0000'; // Valor por defecto si date es null o undefined
    }
    
    // Separar el año, mes y día de la cadena
    const [year, month, day] = date.split('-');
    
    // Formatear manualmente la fecha en formato DD/MM/YYYY
    return `${day}/${month}/${year}`;
}

//función suma total del carrito
const sumaTotalCarrito = (carritoCliente) => {
    let tot = 0;
    carritoCliente?.productos?.map(p => {
        if(p.enPromo){
            return tot += (p.precio - (p.precio * p.porcentajeDescuento / 100));
        } else {
            return tot += p.precio;
        }
    });
    return tot;
}

export {
    formatMoney,
    formatDate,
    sumaTotalCarrito
}