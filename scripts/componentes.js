document.addEventListener("DOMContentLoaded", () => {
    // Renderiza el encabezado con el menú
    const encabezado = document.getElementById("encabezado");
    if (encabezado) {
        encabezado.innerHTML = `
            <h2>Pawchi Store</h2>
            <nav>
                <a href="index.html">Inicio</a> | 
                <a href="productos.html">Productos</a> | 
                <a href="blog.html">Blog</a> | 
                <a href="carrito.html">Carrito</a> | 
                <a href="contacto.html">Contacto</a>
            </nav>
        `;
    }

    // Renderiza el pie de página
    const pie = document.getElementById("pie");
    if (pie) {
        pie.innerHTML = `<p>Pawchi Blind Boxes - Todos los derechos reservados</p>`;
    }
});