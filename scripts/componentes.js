/*function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Pawchi 2026.</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = '<nav class="nav-menu"><div class="dropdown"><button class="dropbtn">Menu</button><div class="dropdown-content"><a href="index.html">Inicio</a><a href="catalogo.html">Catalogo</a><a href="nosotros.html">Nosotros</a></div></div></nav><section><h1 class="prevent-select">Pawchi</h1></section><section><p class="prevent-select">Que pawchi te tocara?</span></p></section>';
}

inyectarHeader();
inyectarFooter();
*/
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
    contenido = contenido + '<a href="productos.html">Productos</a>';
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
        pie.innerHTML = "<p>© 2026 Pawchi Blind Boxes - Proyecto academico DSY1104</p>";
    }
}

insertarComponentes();