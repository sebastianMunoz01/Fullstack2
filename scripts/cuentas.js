/*datos del panel*/
let productosAdmin = obtenerProductos();
let editando = -1;

/*revisa el acceso*/
function esAdministrador(){
    let usuario = usuarioActual();
    return usuario !== null && usuario.tipo === "Administrador";
}

/*lista los productos*/
function mostrarProductosAdmin(){
    let filas = "";
    for(let i = 0; i < productosAdmin.length; i++){
        let producto = productosAdmin[i];
        filas += "<tr><td>" + textoSeguro(producto.codigo) + "</td>";
        filas += "<td>" + textoSeguro(producto.nombre) + "</td>";
        filas += "<td>" + formatoPrecio(producto.precio) + "</td><td>" + producto.stock;
        if(producto.stockCritico !== null && producto.stock <= producto.stockCritico){
            filas += " - Stock bajo";
        }
        filas += '</td><td><a href="detalle.html?id=' + producto.id + '">Ver</a>';
        if(esAdministrador()){
            filas += ' <button onclick="editarProducto(' + i + ')">Editar</button>';
            filas += ' <button onclick="eliminarProducto(' + i + ')">Eliminar</button>';
        }
        filas += "</td></tr>";
    }
    document.getElementById("tabla-productos-admin").innerHTML = filas;
}

/*lista los usuarios*/
function mostrarUsuariosAdmin(){
    let usuarios = obtenerUsuarios();
    let filas = "";
    for(let i = 0; i < usuarios.length; i++){
        filas += "<tr><td>" + textoSeguro(usuarios[i].run) + "</td>";
        filas += "<td>" + textoSeguro(usuarios[i].nombre + " " + usuarios[i].apellidos) + "</td>";
        filas += "<td>" + textoSeguro(usuarios[i].correo) + "</td><td>" + textoSeguro(usuarios[i].tipo) + "</td></tr>";
    }
    document.getElementById("tabla-usuarios-admin").innerHTML = filas;
}

/*valida texto*/
function validarTexto(campo, minimo, maximo){
    if(validarString(campo.value, minimo, maximo) === false){
        return mostrarMensaje(campo, "Revisa el largo del campo.");
    }
    return mostrarMensaje(campo, "");
}

/*valida un numero*/
function validarNumero(campo, entero, opcional){
    if(campo.value === "" && opcional){
        return mostrarMensaje(campo, "");
    }
    let numero = Number(campo.value);
    if(validarFloat(campo.value, 0) === false){
        return mostrarMensaje(campo, "Ingresa un numero igual o mayor que 0.");
    }
    if(entero && numero % 1 !== 0){
        return mostrarMensaje(campo, "Usa un numero entero.");
    }
    return mostrarMensaje(campo, "");
}

/*revisa el producto*/
function validarProducto(formulario){
    let valido = true;
    if(validarTexto(formulario.codigo, 3) === false){
        valido = false;
    }
    if(validarTexto(formulario.nombre, 1, 100) === false){
        valido = false;
    }
    if(validarTexto(formulario.descripcion, 0, 500) === false){
        valido = false;
    }
    if(validarNumero(formulario.precio, false, false) === false){
        valido = false;
    }
    if(validarNumero(formulario.stock, true, false) === false){
        valido = false;
    }
    if(validarNumero(formulario.stockCritico, true, true) === false){
        valido = false;
    }
    if(validarTexto(formulario.categoria, 1, 100) === false){
        valido = false;
    }
    for(let i = 0; i < productosAdmin.length; i++){
        if(i !== editando && productosAdmin[i].codigo === formulario.codigo.value.trim()){
            mostrarMensaje(formulario.codigo, "Ese codigo ya existe.");
            valido = false;
        }
    }
    return valido;
}

/*carga el producto en el mismo formulario*/
function editarProducto(indice){
    if(esAdministrador() === false){
        return;
    }
    editando = indice;
    let formulario = document.getElementById("form-producto");
    let producto = productosAdmin[indice];
    formulario.codigo.value = producto.codigo;
    formulario.nombre.value = producto.nombre;
    formulario.descripcion.value = producto.descripcion;
    formulario.precio.value = producto.precio;
    formulario.stock.value = producto.stock;
    formulario.stockCritico.value = producto.stockCritico;
    if(producto.stockCritico === null){
        formulario.stockCritico.value = "";
    }
    formulario.categoria.value = producto.categoria;
    formulario.imagen.value = producto.imagen;
    document.getElementById("titulo-producto").textContent = "Editar producto";
    formulario.codigo.focus();
}

/*vuelve al registro nuevo*/
function cancelarEdicion(){
    editando = -1;
    document.getElementById("titulo-producto").textContent = "Registrar producto";
}

/*guarda el producto*/
function guardarProducto(evento){
    evento.preventDefault();
    let formulario = document.getElementById("form-producto");
    if(esAdministrador() === false || validarProducto(formulario) === false){
        return;
    }
    let id = 1;
    for(let i = 0; i < productosAdmin.length; i++){
        if(productosAdmin[i].id >= id){
            id = productosAdmin[i].id + 1;
        }
    }
    if(editando !== -1){
        id = productosAdmin[editando].id;
    }
    let critico = null;
    if(formulario.stockCritico.value !== ""){
        critico = Number(formulario.stockCritico.value);
    }
    let producto = {
        id: id,
        codigo: formulario.codigo.value.trim(),
        nombre: formulario.nombre.value.trim(),
        descripcion: formulario.descripcion.value.trim(),
        precio: Number(formulario.precio.value),
        stock: Number(formulario.stock.value),
        stockCritico: critico,
        categoria: formulario.categoria.value,
        imagen: formulario.imagen.value
    };
    if(editando === -1){
        productosAdmin.push(producto);
    }else{
        productosAdmin[editando] = producto;
    }
    localStorage.setItem("pawchiSimpleProductos", JSON.stringify(productosAdmin));
    mostrarProductosAdmin();
    formulario.reset();
    cancelarEdicion();
    document.getElementById("resultado-producto").textContent = "Producto guardado.";
}

/*guarda la cuenta*/
function guardarUsuario(evento){
    evento.preventDefault();
    let formulario = document.getElementById("form-usuario");
    let valido = validarUsuario(formulario);
    if(validarClave(formulario.clave) === false){
        valido = false;
    }
    if(esAdministrador() === false || valido === false){
        return;
    }
    if(guardarCuenta(formulario, formulario.tipo.value) === false){
        document.getElementById("resultado-usuario").textContent = "Correo o RUN repetido.";
        return;
    }
    mostrarUsuariosAdmin();
    formulario.reset();
    cargarComunas();
    document.getElementById("resultado-usuario").textContent = "Usuario guardado.";
}

/*inicia el panel*/
function iniciarAdministrador(){
    let usuario = usuarioActual();
    if(usuario === null || usuario.tipo === "Cliente"){
        document.getElementById("aviso-acceso").textContent = "Ingresa con una cuenta de administrador o vendedor.";
        return;
    }
    document.getElementById("panel-admin").hidden = false;
    mostrarProductosAdmin();
    mostrarOrdenes();
    if(usuario.tipo === "Vendedor"){
        document.getElementById("usuarios-admin").hidden = true;
        document.getElementById("menu-usuarios").hidden = true;
        document.getElementById("form-producto").hidden = true;
        document.getElementById("titulo-producto").hidden = true;
        return;
    }
    mostrarUsuariosAdmin();
    document.getElementById("form-producto").addEventListener("submit", guardarProducto);
    document.getElementById("form-producto").addEventListener("input", revisarEnVivo);
    document.getElementById("form-usuario").addEventListener("submit", guardarUsuario);
    document.getElementById("form-usuario").addEventListener("input", revisarEnVivo);
}

document.addEventListener("DOMContentLoaded", iniciarAdministrador);

/*elimina solo el producto elegido*/
function eliminarProducto(indice){
    if(esAdministrador() === false || confirm("Eliminar este producto?") === false){
        return;
    }
    productosAdmin.splice(indice, 1);
    localStorage.setItem("pawchiSimpleProductos", JSON.stringify(productosAdmin));
    document.getElementById("form-producto").reset();
    cancelarEdicion();
    mostrarProductosAdmin();
}

/*orden de ejemplo no es una compra real*/
let ordenes = [
    {numero: 1, cliente: "Cliente de ejemplo", producto: "Everyday Chaos", cantidad: 2, precio: 9990}
];

/*lista las ordenes para administrador y vendedor*/
function mostrarOrdenes(){
    let usuario = usuarioActual();
    if(usuario === null || usuario.tipo === "Cliente"){
        return;
    }
    let contenido = "";
    for(let i = 0; i < ordenes.length; i++){
        contenido += "<tr><td>" + ordenes[i].numero + "</td><td>" + textoSeguro(ordenes[i].cliente) + "</td>";
        contenido += "<td>" + formatoPrecio(ordenes[i].cantidad * ordenes[i].precio) + "</td>";
        contenido += '<td><button onclick="verOrden(' + i + ')">Ver detalle</button></td></tr>';
    }
    document.getElementById("tabla-ordenes").innerHTML = contenido;
}

/*muestra el detalle en la misma pagina*/
function verOrden(indice){
    let usuario = usuarioActual();
    if(usuario === null || usuario.tipo === "Cliente"){
        return;
    }
    let orden = ordenes[indice];
    document.getElementById("detalle-orden").textContent = "Orden " + orden.numero + ": " + orden.producto +
        ". Cantidad: " + orden.cantidad + ". Precio por unidad: " + formatoPrecio(orden.precio) +
        ". Total: " + formatoPrecio(orden.cantidad * orden.precio) + ". Datos de ejemplo.";
}