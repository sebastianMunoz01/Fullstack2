/*muestra/limpia mensaje de error en un campo*/
function mostrarMensaje(campo, texto){
    let zonaError = document.getElementById("error-" + campo.id);

    if(zonaError !== null){
        zonaError.textContent = texto;
    }

    if(texto === ""){
        return true;
    }else{
        return false;
    }
}

/*comprueba que el correo cumpla con las reglas*/
function validarCorreo(campo, esObligatorio){
    let correo = campo.value.trim().toLowerCase();
    let dominioValido = false;

    if(correo === "" && esObligatorio === true){
        return mostrarMensaje(campo, "El correo es obligatorio");
    }
    if(correo.length > 100){
        return mostrarMensaje(campo, "El correo permite maximo 100 caracteres");
    }
    if(correo.endsWith("@duocuc.cl") || correo.endsWith("@gmail.com")){
        dominioValido = true;
    }
    if(correo !== "" && dominioValido === false){
        return mostrarMensaje(campo, "Usa @duocuc.cl o @gmail.com.");
    }
    return mostrarMensaje(campo, "");
}

/* carga regiones en el selector*/
function cargarRegiones(){
    let selectorRegion = document.getElementById("region");
    let opciones = '<option value="">Seleccione</option>';
    let i;

    if(selectorRegion === null){
        return;
    }

    for(i = 0; i < regiones.length; i++){
        opciones = opciones + '<option value="' + i + '">' + regiones[i].nombre + "</option>";
    }

    selectorRegion.innerHTML = opciones;
    selectorRegion.addEventListener("change", cargarComunas);
}

/*carga las comunas de la region seleccionada*/
function cargarComunas(){
    let selectorRegion = document.getElementById("region");
    let selectorComuna = document.getElementById("comuna");
    let opciones = '<option value="">Seleccione</option>';
    let numeroRegion;
    let i;

    if(selectorRegion === null || selectorComuna === null){
        return;
    }

    if(selectorRegion.value !== ""){
        numeroRegion = Number(selectorRegion.value);

        for(i = 0; i < regiones[numeroRegion].comunas.length; i++){
            opciones = opciones + "<option>" + regiones[numeroRegion].comunas[i] + "</option>";
        }
    }

    selectorComuna.innerHTML = opciones;
}

/* valida los campos por registro y admin*/
function validarUsuario(formulario){
    let valido = true;
    let run = formulario.run.value.trim();

    if(run === ""){
        mostrarMensaje(formulario.run, "El RUN es obligatorio");
        valido = false;
    }else if(run.length < 7 || run.length > 9 || runValido(run) === false){
        mostrarMensaje(formulario.run, "Escribe un RUN valido sin puntos ni guion");
        valido = false;
    }else{
        mostrarMensaje(formulario.run, "");
    }

    if(formulario.nombre.value.trim() === "" || formulario.nombre.value.length > 50){
        mostrarMensaje(formulario.nombre, "El nombre es obligatorio y permite maximo 50 caracteres");
        valido = false;
    }else{
        mostrarMensaje(formulario.nombre, "");
    }

    if(formulario.apellidos.value.trim() === "" || formulario.apellidos.value.length > 100){
        mostrarMensaje(formulario.apellidos, "Los apellidos son obligatorios y permiten maximo 100 caracteres");
        valido = false;
    }else{
        mostrarMensaje(formulario.apellidos, "");
    }

    if(validarCorreo(formulario.correo, true) === false){
        valido = false;
    }

    if(formulario.region.value === ""){
        mostrarMensaje(formulario.region, "Selecciona una region");
        valido = false;
    }else{
        mostrarMensaje(formulario.region, "");
    }

    if(formulario.comuna.value === ""){
        mostrarMensaje(formulario.comuna, "Selecciona una comuna");
        valido = false;
    }else{
        mostrarMensaje(formulario.comuna, "");
    }

    if(formulario.direccion.value.trim() === "" || formulario.direccion.value.length > 300){
        mostrarMensaje(formulario.direccion, "La direccion es obligatoria y permite maximo 300 caracteres");
        valido = false;
    }else{
        mostrarMensaje(formulario.direccion, "");
    }

    return valido;
}

/*valida y procesa formularios publicos*/
function enviarFormulario(evento){
    let formulario = evento.currentTarget;
    let valido = true;
    let resultado;

    evento.preventDefault();

    if(formulario.id === "form-login"){
        valido = validarCorreo(formulario.correo, true);

        if(formulario.clave.value.length < 4 || formulario.clave.value.length > 10){
            mostrarMensaje(formulario.clave, "La contraseña debe tener entre 4 y 10 caracteres");
            valido = false;
        }else{
            mostrarMensaje(formulario.clave, "");
        }
    }

    if(formulario.id === "form-contacto"){
        if(formulario.nombre.value.trim() === "" || formulario.nombre.value.length > 100){
            mostrarMensaje(formulario.nombre, "El nombre es obligatorio y permite maximo 100 caracteres");
            valido = false;
        }else{
            mostrarMensaje(formulario.nombre, "");
        }

        if(validarCorreo(formulario.correo, false) === false){
            valido = false;
        }

        if(formulario.comentario.value.trim() === "" || formulario.comentario.value.length > 500){
            mostrarMensaje(formulario.comentario, "El comentario es obligatorio y permite maximo 500 caracteres");
            valido = false;
        }else{
            mostrarMensaje(formulario.comentario, "");
        }
    }

    if(formulario.id === "form-registro"){
        valido = validarUsuario(formulario);
    }

    if(valido === true){
        resultado = formulario.getElementsByClassName("resultado")[0];
        resultado.textContent = "Datos enviados correctamente (demostracion)";
        resultado.className = "resultado exito";
        formulario.reset();
        cargarComunas();
    }
}

/*busca form y conecta con submit */
function prepararFormularios(){
    let formularioLogin = document.getElementById("form-login");
    let formularioRegistro = document.getElementById("form-registro");
    let formularioContacto = document.getElementById("form-contacto");

    if(formularioLogin !== null){
        formularioLogin.addEventListener("submit", enviarFormulario);
    }

    if(formularioRegistro !== null){
        formularioRegistro.addEventListener("submit", enviarFormulario);
    }

    if(formularioContacto !== null){
        formularioContacto.addEventListener("submit", enviarFormulario);
    }
}

/*inicia selectores y validaciones cuando carga la pagina*/
function iniciarValidaciones(){
    cargarRegiones();
    prepararFormularios();
}

document.addEventListener("DOMContentLoaded", iniciarValidaciones);
