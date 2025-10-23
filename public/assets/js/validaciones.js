// validaciones.js - Expresiones regulares para validación
const validaciones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/
};

function validarCampo(campo, valor) {
    if (!validaciones[campo]) return true;
    return validaciones[campo].test(valor);
}

function validarFormulario(datos) {
    if (!datos.nombre) return "El nombre es obligatorio";
    if (!datos.email) return "El email es obligatorio";
    if (!datos.password) return "La contraseña es obligatoria";
    
    if (!validarCampo('nombre', datos.nombre)) return "Nombre debe tener 2-50 caracteres (solo letras)";
    if (!validarCampo('email', datos.email)) return "Ingrese un email válido";
    if (!validarCampo('password', datos.password)) return "Contraseña debe tener mínimo 6 caracteres";
    
    return null;
}