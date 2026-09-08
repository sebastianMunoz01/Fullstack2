/* Coloca el mismo encabezado y pie en todas las páginas. */
function insertarComponentes(){
    let encabezado = document.getElementById("encabezado");
    let pie = document.getElementById("pie");
    let contenido = "";

    // Barra superior con distribución a los extremos
    contenido = contenido + '<div class="barra" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">';
    contenido = contenido + '<a class="marca" href="index.html">🐾 Pawchi Blind Boxes</a>';
    contenido = contenido + '<a href="carrito.html">🛒 Carrito (<span id="contador-carrito">0</span>)</a>';
    contenido = contenido + "</div>";

    // Navegación limpia
    contenido = contenido + "<nav>";
    contenido = contenido + '<a href="index.html">Inicio</a> | ';
    contenido = contenido + '<a href="productos.html">Productos</a> | ';
    contenido = contenido + '<a href="nosotros.html">Nosotros</a> | ';
    contenido = contenido + '<a href="blog.html">Blog</a> | ';
    contenido = contenido + '<a href="contacto.html">Contacto</a>';
    contenido = contenido + "</nav>";

    if(encabezado !== null){
        encabezado.innerHTML = contenido;
    }

    if(pie !== null){
        pie.innerHTML = "<p>© 2026 Pawchi Blind Boxes - Proyecto académico DSY1104</p>";
    }
}

insertarComponentes();