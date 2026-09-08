/* coloca el mismo encabezado y pie en todas las paginas. */
function insertarComponentes(){
    let encabezado = document.getElementById("encabezado");
    let pie = document.getElementById("pie");
    let contenido = "";

    contenido = contenido + '<div class="barra">';
    contenido = contenido + '<a class="marca" href="index.html">🐾 Pawchi Blind Boxes</a>';
    contenido = contenido + '<a href="carrito.html">🛒 Carrito (<span id="contador-carrito">0</span>)</a>';
    contenido = contenido + "</div>";
    contenido = contenido + "<nav>";
    contenido = contenido + '<a href="index.html">Inicio</a>';
    contenido = contenido + '<a href="catalogo.html">Productos</a>';
    contenido = contenido + '<a href="nosotros.html">Nosotros</a>';
    contenido = contenido + '<a href="blog.html">Blog</a>';
    contenido = contenido + '<a href="contacto.html">Contacto</a>';
    contenido = contenido + '<a href="registro.html">Registro</a>';
    contenido = contenido + '<a href="login.html">Ingresar</a>';
    contenido = contenido + '<a id="acceso-admin" href="admin.html">Administracion</a>';
    contenido = contenido + '<button id="cerrar-sesion" onclick="salir()">Salir</button>';
    contenido = contenido + "</nav>";

    if(encabezado !== null){
        encabezado.innerHTML = contenido;
    }

    if(pie !== null){
        pie.innerHTML = "<p>© 2026 Pawchi Blind Boxes - Seccion 003V</p>";
    }
}

insertarComponentes();

/* muestra el acceso segun la cuenta */
let cuenta = usuarioActual();
if(cuenta === null){
    document.getElementById("cerrar-sesion").style.display = "none";
}
let accesoAdmin = document.getElementById("acceso-admin");
if(accesoAdmin !== null && (cuenta === null || cuenta.tipo === "Cliente")){
    accesoAdmin.style.display = "none";
}
/* muestra el texto sin convertirlo en etiquetas */
function textoSeguro(texto){
    let resultado = "";
    texto = String(texto);
    for(let i = 0; i < texto.length; i++){
        let letra = texto[i];
        if(letra === "&"){
            resultado = resultado + "&amp;";
        }else if(letra === "<"){
            resultado = resultado + "&lt;";
        }else if(letra === ">"){
            resultado = resultado + "&gt;";
        }else if(letra === '"'){
            resultado = resultado + "&quot;";
        }else if(letra === "'"){
            resultado = resultado + "&#39;";
        }else{
            resultado = resultado + letra;
        }
    }
    return resultado;
}