function mostrarCarrito() {
    const contenedorLista = document.getElementById("lista-productos");
    const textoTotal = document.getElementById("total-carrito");

    if (!contenedorLista) return;

    if (productoActual.cantidad > 0) {
        contenedorLista.innerHTML = `
            <div class="item-carrito">
                <p>Producto: ${productoActual.nombre}</p>
                <p>Precio: ${productoActual.precio}</p>
                <p>Cantidad: ${productoActual.cantidad}</p>
                <button type="button" id="btn-eliminar">Eliminar</button>
            </div>
        `;
        if (textoTotal) textoTotal.innerText = "$10.000";

        document.getElementById("btn-eliminar").addEventListener("click", vaciarCarrito);
    } else {
        contenedorLista.innerHTML = "<p>El carrito está vacío</p>";
        if (textoTotal) textoTotal.innerText = "$0";
    }
}

function vaciarCarrito() {
    productoActual.cantidad = 0;
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito();

    const botonVaciar = document.getElementById("btn-vaciar");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }
});