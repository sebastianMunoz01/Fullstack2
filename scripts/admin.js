/*para guardar datos durante la visita*/ 
let productosAdmin = obtenerProductos();
let usuariosAdmin = [
    {
        run: "11111111-1",
        nombre: "juan perez",
        correo: "juan.p@duocuc.cl",
        tipo: "Administrador"
    }
];

/*mostrar productos en la tabla*/
function mostrarProductosAdmin(){
    let tabla = document.getElementById("tabla-productos-admin");
    let filas = "";
    let i;

    for(i = 0; i < productosAdmin.length; i++){
        filas = filas + "<tr>";
        filas = filas + "<td>" + productosAdmin[i].codigo + "</td>";
        filas = filas + "<td>" + productosAdmin[i].nombre + "</td>";
        filas = filas + "<td>" + formatoPrecio(productosAdmin[i].precio) + "</td>";
        filas = filas + "<td>" + productosAdmin[i].stock + "</td>";
        filas = filas + "</tr>";
    }

    tabla.innerHTML = filas;
}

/*muestra los usuarios en tabla*/
function mostrarUsuariosAdmin(){
    let tabla = document.getElementById("tabla-usuarios-admin");
    let filas = "";
    let i;

    for(i = 0; i < usuariosAdmin.length; i++){
        filas = filas + "<tr>";
        filas = filas + "<td>" + usuariosAdmin[i].run + "</td>";
        filas = filas + "<td>" + usuariosAdmin[i].nombre + "</td>";
        filas = filas + "<td>" + usuariosAdmin[i].correo + "</td>";
        filas = filas + "<td>" + usuariosAdmin[i].tipo + "</td>";
        filas = filas + "</tr>";
    }

    tabla.innerHTML = filas;
}

/*revisa solamente las reglas del producto*/
function validarProducto(formulario){
    let valido = true;

    if(formulario.codigo.value.trim().length < 3){
        mostrarMensaje(formulario.codigo, "El codigo necesita minimo 3 caracteres");
        valido = false;
    }else{
        mostrarMensaje(formulario.codigo, "");
    }

    if(formulario.nombre.value.trim() === ""){
        mostrarMensaje(formulario.nombre, "El nombre es obligatorio");
        valido = false;
    }else{
        mostrarMensaje(formulario.nombre, "");
    }

    if(formulario.precio.value === "" || Number(formulario.precio.value) < 0){
        mostrarMensaje(formulario.precio, "Ingresa un precio igual o mayor que 0");
        valido = false;
    }else{
        mostrarMensaje(formulario.precio, "");
    }

    if(formulario.stock.value === "" || Number(formulario.stock.value) < 0){
        mostrarMensaje(formulario.stock, "Ingresa un stock igual o mayor que 0");
        valido = false;
    }else{
        mostrarMensaje(formulario.stock, "");
    }

    if(formulario.categoria.value === ""){
        mostrarMensaje(formulario.categoria, "Selecciona una categoria");
        valido = false;
    }else{
        mostrarMensaje(formulario.categoria, "");
    }

    return valido;
}

/*agrega un producto al arreglo y actualiza tabla*/
function guardarProducto(evento){
    let formulario = document.getElementById("form-producto");
    let productoNuevo;

    evento.preventDefault();

    if(validarProducto(formulario)){
        productoNuevo = {
            id: productosAdmin.length + 1,
            codigo: formulario.codigo.value,
            nombre: formulario.nombre.value,
            descripcion: formulario.descripcion.value,
            precio: Number(formulario.precio.value),
            stock: Number(formulario.stock.value),
            stockCritico: formulario.stockCritico.value,
            categoria: formulario.categoria.value,
            imagen: "img/blindbox-everyday-chaos.png"
        };

        productosAdmin.push(productoNuevo);
        mostrarProductosAdmin();
        document.getElementById("resultado-producto").textContent = "Producto guardado";
        formulario.reset();
    }
}

/*agrega un usuario al arreglo y actualiza tabla*/
function guardarUsuario(evento){
    let formulario = document.getElementById("form-usuario");
    let usuarioNuevo;

    evento.preventDefault();

    if(validarUsuario(formulario)){
        usuarioNuevo = {
            run: formulario.run.value,
            nombre: formulario.nombre.value + " " + formulario.apellidos.value,
            correo: formulario.correo.value,
            tipo: formulario.tipo.value
        };

        usuariosAdmin.push(usuarioNuevo);
        mostrarUsuariosAdmin();
        document.getElementById("resultado-usuario").textContent = "Usuario guardado";
        formulario.reset();
        cargarComunas();
    }
}

/*inicia tablas y formularios*/
function iniciarAdministrador(){
    mostrarProductosAdmin();
    mostrarUsuariosAdmin();
    document.getElementById("form-producto").addEventListener("submit", guardarProducto);
    document.getElementById("form-usuario").addEventListener("submit", guardarUsuario);
}

document.addEventListener("DOMContentLoaded", iniciarAdministrador);

