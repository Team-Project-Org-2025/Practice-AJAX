// validaciones.js - Expresiones regulares para validación
const validaciones = {
    nombre: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    apellido: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{6,}$/,
    cedula: /^[0-9]{7,8}$/
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

/**
 * Valida el formulario de clientes
 * @param {Object} datos - Datos del formulario
 * @param {boolean} isEdit - Si es true, es una edición (cedula es opcional)
 * @returns {string|null} - Mensaje de error o null si es válido
 */
function validarFormularioClientes(datos, isEdit = false) {
    if (!datos.nombre) return "El nombre es obligatorio";
    if (!datos.apellido) return "El apellido es obligatorio";

    // Solo validar cédula si no es edición o si se proporcionó
    if (!isEdit || (datos.cedula && datos.cedula.trim() !== "")) {
        if (!datos.cedula) return "La cédula es obligatoria";
        if (!validarCampo('cedula', datos.cedula)) return "Cédula debe tener 7-8 números";
    }

    if (!validarCampo('nombre', datos.nombre)) return "Nombre debe tener 2-50 caracteres (solo letras)";
    if (!validarCampo('apellido', datos.apellido)) return "Apellido debe tener 2-50 caracteres (solo letras)";

    return null;
}

/**
 * Valida una cédula venezolana
 * @param {string} cedula - Cédula a validar
 * @returns {boolean} - True si es válida
 */
function validarCedula(cedula) {
    return validaciones.cedula.test(cedula);
}