/* revisa el largo del texto*/
function validarString(texto, minimo, maximo){
    let valor = texto.trim();
    if(valor.length < minimo){
        return false;
    }
    if(maximo !== undefined && valor.length > maximo){
        return false;
    }
    return true;
}

/* revisa un numero*/
function validarFloat(texto, minimo, maximo){
    if(texto.trim() === "" || isNaN(texto)){
        return false;
    }
    let numero = Number(texto);
    if(isFinite(numero) === false || numero < minimo){
        return false;
    }
    if(maximo !== undefined && numero > maximo){
        return false;
    }
    return true;
}

/* muestra el error debajo del campo */
function mostrarMensaje(campo, texto){
    let mensaje = document.getElementById("error-" + campo.id);
    if(mensaje !== null){
        mensaje.textContent = texto;
    }
    if(texto === ""){
        return true;
    }else{
        return false;
    }
}

/* busca el campo y revisa su texto */
function obtenerString(id, minimo, maximo, mensaje){
    let campo = document.getElementById(id);
    if(validarString(campo.value, minimo, maximo)){
        return mostrarMensaje(campo, "");
    }else{
        return mostrarMensaje(campo, mensaje);
    }
}

function validarCorreo(campo, obligatorio){
    let correo = campo.value.trim().toLowerCase();
    if(correo === "" && obligatorio === false){
        return mostrarMensaje(campo, "");
    }
    let partes = correo.split("@");
    if(correo.length > 100 || partes.length !== 2 || partes[0] === "" || /\s/.test(correo)){
        return mostrarMensaje(campo, "Escribe un correo valido de hasta 100 caracteres.");
    }
    if(correo.endsWith("@duoc.cl") || correo.endsWith("@profesor.duoc.cl") || correo.endsWith("@gmail.com")){
        return mostrarMensaje(campo, "");
    }else{
        return mostrarMensaje(campo, "Usa duoc.cl, profesor.duoc.cl o gmail.com.");
    }
}

/* la clave se cuenta sin quitar espacios */
function validarClave(campo){
    if(campo.value.length >= 4 && campo.value.length <= 10){
        return mostrarMensaje(campo, "");
    }else{
        return mostrarMensaje(campo, "La clave debe tener entre 4 y 10 caracteres.");
    }
}

/* calcula el digito verificador del run */
function runValido(run){
    if(/^[0-9]{6,8}[0-9Kk]$/.test(run) === false){
        return false;
    }
    let cuerpo = run.slice(0, -1);
    let suma = 0;
    let multiplo = 2;
    for(let i = cuerpo.length - 1; i >= 0; i--){
        suma = suma + Number(cuerpo[i]) * multiplo;
        multiplo = multiplo + 1;
        if(multiplo === 8){
            multiplo = 2;
        }
    }
    let resultado = 11 - (suma % 11);
    let digito = String(resultado);
    if(resultado === 11){
        digito = "0";
    }else if(resultado === 10){
        digito = "K";
    }
    return digito === run.slice(-1).toUpperCase();
}

/* llena el select con el arreglo de regiones */
function cargarRegiones(){
    let region = document.getElementById("region");
    if(region === null){
        return;
    }
    let opciones = '<option value="">Seleccione</option>';
    for(let i = 0; i < regiones.length; i++){
        opciones = opciones + '<option value="' + i + '">' + regiones[i].nombre + '</option>';
    }
    region.innerHTML = opciones;
    region.addEventListener("change", cargarComunas);
    cargarComunas();
}

/* cambia las comunas cuando se elige una region */
function cargarComunas(){
    let region = document.getElementById("region");
    let comuna = document.getElementById("comuna");
    if(region === null || comuna === null){
        return;
    }
    let opciones = '<option value="">Seleccione</option>';
    let numero = Number(region.value);
    if(region.value !== "" && regiones[numero] !== undefined){
        for(let i = 0; i < regiones[numero].comunas.length; i++){
            opciones = opciones + '<option>' + regiones[numero].comunas[i] + '</option>';
        }
    }
    comuna.innerHTML = opciones;
    comuna.value = "";
    mostrarMensaje(comuna, "");
}

/* revisa que la comuna pertenezca a la region */
function validarComuna(){
    let region = document.getElementById("region");
    let comuna = document.getElementById("comuna");
    let numero = Number(region.value);
    if(region.value === "" || regiones[numero] === undefined){
        mostrarMensaje(region, "Selecciona una region.");
        return false;
    }
    mostrarMensaje(region, "");
    for(let i = 0; i < regiones[numero].comunas.length; i++){
        if(comuna.value === regiones[numero].comunas[i]){
            return mostrarMensaje(comuna, "");
        }
    }
    return mostrarMensaje(comuna, "Selecciona una comuna.");
}

/* estos campos se repiten en registro y admin */
function validarUsuario(formulario){
    let valido = true;
    if(runValido(formulario.run.value.trim()) === false){
        mostrarMensaje(formulario.run, "Usa un RUN valido, de 7 a 9 caracteres, sin puntos ni guion.");
        valido = false;
    }else{
        mostrarMensaje(formulario.run, "");
    }
    if(obtenerString("nombre", 1, 50, "Escribe el nombre, maximo 50 caracteres.") === false){
        valido = false;
    }
    if(obtenerString("apellidos", 1, 100, "Escribe los apellidos, maximo 100 caracteres.") === false){
        valido = false;
    }
    if(validarCorreo(formulario.correo, true) === false){
        valido = false;
    }
    if(obtenerString("direccion", 1, 300, "Escribe la direccion, maximo 300 caracteres.") === false){
        valido = false;
    }
    if(validarComuna() === false){
        valido = false;
    }
    return valido;
}

/* revisa el login y luego compara la cuenta */
function enviarLogin(evento){
    evento.preventDefault();
    let formulario = document.getElementById("form-login");
    let resultado = document.getElementById("resultado-login");
    resultado.textContent = "";
    let correoCorrecto = validarCorreo(formulario.correo, true);
    let claveCorrecta = validarClave(formulario.clave);
    if(correoCorrecto && claveCorrecta){
        if(entrar(formulario.correo.value, formulario.clave.value) === false){
            resultado.textContent = "Correo o clave incorrectos.";
        }
    }
}

/* revisa el registro y guarda la cuenta */
function enviarRegistro(evento){
    evento.preventDefault();
    let formulario = document.getElementById("form-registro");
    let resultado = document.getElementById("resultado-registro");
    resultado.textContent = "";
    let usuarioCorrecto = validarUsuario(formulario);
    let claveCorrecta = validarClave(formulario.clave);
    if(usuarioCorrecto && claveCorrecta){
        if(guardarCuenta(formulario, "Cliente")){
            resultado.textContent = "Cuenta creada. Ya puedes ingresar.";
            formulario.reset();
            cargarComunas();
        }else{
            resultado.textContent = "Ese correo o RUN ya esta registrado.";
        }
    }
}

/* revisa contacto y guarda el mensaje en el navegador */
function enviarContacto(evento){
    evento.preventDefault();
    let formulario = document.getElementById("form-contacto");
    let resultado = document.getElementById("resultado-contacto");
    resultado.textContent = "";
    let nombreCorrecto = obtenerString("nombre", 1, 100, "Escribe el nombre, maximo 100 caracteres.");
    let correoCorrecto = validarCorreo(formulario.correo, false);
    let comentarioCorrecto = obtenerString("comentario", 1, 500, "Escribe un comentario, maximo 500 caracteres.");
    if(nombreCorrecto && correoCorrecto && comentarioCorrecto){
        let mensajes = leerDatos("pawchiSimpleMensajes", []);
        let mensaje = {
            nombre: formulario.nombre.value,
            correo: formulario.correo.value,
            comentario: formulario.comentario.value
        };
        mensajes.push(mensaje);
        localStorage.setItem("pawchiSimpleMensajes", JSON.stringify(mensajes));
        resultado.textContent = "Mensaje guardado en este navegador.";
        formulario.reset();
    }
}

/* avisa mientras se escribe */
function revisarEnVivo(evento){
    let campo = evento.target;
    if(campo.name === "correo"){
        validarCorreo(campo, evento.currentTarget.id !== "form-contacto");
    }else if(campo.name === "clave"){
        validarClave(campo);
    }else if(campo.name === "run" && runValido(campo.value.trim()) === false){
        mostrarMensaje(campo, "Revisa el RUN sin puntos ni guion.");
    }else if(campo.type === "number" && (Number(campo.value) < 0 || (campo.name !== "precio" && Number(campo.value) % 1 !== 0))){
        mostrarMensaje(campo, "Usa un numero no negativo. El stock debe ser entero.");
    }else if(campo.maxLength > 0 && campo.value.length >= campo.maxLength){
        mostrarMensaje(campo, "Llegaste al maximo de caracteres.");
    }else if(campo.minLength > 0 && campo.value.length < campo.minLength){
        mostrarMensaje(campo, "Usa al menos " + campo.minLength + " caracteres.");
    }else{
        mostrarMensaje(campo, "");
    }
}

/* conecta solo el formulario de esta pagina */
function iniciarValidaciones(){
    cargarRegiones();
    let login = document.getElementById("form-login");
    let registro = document.getElementById("form-registro");
    let contacto = document.getElementById("form-contacto");
    if(login !== null){
        login.addEventListener("submit", enviarLogin);
        login.addEventListener("input", revisarEnVivo);
    }
    if(registro !== null){
        registro.addEventListener("submit", enviarRegistro);
        registro.addEventListener("input", revisarEnVivo);
    }
    if(contacto !== null){
        contacto.addEventListener("submit", enviarContacto);
        contacto.addEventListener("input", revisarEnVivo);
    }
}

document.addEventListener("DOMContentLoaded", iniciarValidaciones);
