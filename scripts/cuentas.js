/* lee un arreglo guardado */
function leerDatos(nombre, inicial){
    let texto = localStorage.getItem(nombre);
    if(texto === null){
        return inicial;
    }
    try{
        return JSON.parse(texto);
    }catch(error){
        return inicial;
    }
}

/* cuentas de prueba */
function obtenerUsuarios(){
    return leerDatos("pawchiSimpleUsuarios", [
        {run: "123456785", nombre: "Admin", apellidos: "Pawchi", correo: "admin@duoc.cl", clave: "1234", tipo: "Administrador"},
        {run: "111111111", nombre: "Vendedor", apellidos: "Pawchi", correo: "vendedor@duoc.cl", clave: "1234", tipo: "Vendedor"}
    ]);
}

/* guarda los datos del formulario */
function guardarCuenta(formulario, tipo){
    let usuarios = obtenerUsuarios();
    let correo = formulario.correo.value.trim().toLowerCase();
    let run = formulario.run.value.trim().toUpperCase();
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].correo === correo || usuarios[i].run === run){
            return false;
        }
    }
    usuarios.push({
        run: run,
        nombre: formulario.nombre.value.trim(),
        apellidos: formulario.apellidos.value.trim(),
        correo: correo,
        clave: formulario.clave.value,
        fecha: formulario.fecha.value,
        tipo: tipo,
        region: formulario.region.value,
        comuna: formulario.comuna.value,
        direccion: formulario.direccion.value.trim()
    });
    localStorage.setItem("pawchiSimpleUsuarios", JSON.stringify(usuarios));
    return true;
}

/* busca la cuenta que ingreso */
function usuarioActual(){
    let correo = sessionStorage.getItem("pawchiSimpleSesion");
    let usuarios = obtenerUsuarios();
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].correo === correo){
            return usuarios[i];
        }
    }
    return null;
}

/* compara correo y clave */
function entrar(correo, clave){
    let usuarios = obtenerUsuarios();
    for(let i = 0; i < usuarios.length; i++){
        if(usuarios[i].correo === correo.trim().toLowerCase() && usuarios[i].clave === clave){
            sessionStorage.setItem("pawchiSimpleSesion", usuarios[i].correo);
            if(usuarios[i].tipo === "Cliente"){
                location.href = "index.html";
            }else{
                location.href = "admin.html";
            }
            return true;
        }
    }
    return false;
}

/* cierra la cuenta actual */
function salir(){
    sessionStorage.removeItem("pawchiSimpleSesion");
    location.href = "login.html";
}