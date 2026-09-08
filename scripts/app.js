/* funciones principales de la tienda*/

/* convierte un numero a clp*/
function formatoPrecio(valor){
    return "$" + valor;
}

/* recupera el carrito guardado en el navegador. */
function obtenerCarrito(){
    let guardado = leerDatos("pawchiSimpleCarrito", []);
    let carrito = [];
    for(let i = 0; i < guardado.length; i++){
        let producto = buscarProducto(guardado[i].id);
        if(producto !== null && producto.stock > 0 && guardado[i].cantidad > 0){
            let cantidad = guardado[i].cantidad;
            if(cantidad > producto.stock){
                cantidad = producto.stock;
            }
            let item = {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: cantidad
            };
            carrito.push(item);
        }
    }
    return carrito;
}

/* guarda el carrito y actualiza el contador. */
function guardarCarrito(carrito){
    localStorage.setItem("pawchiSimpleCarrito", JSON.stringify(carrito));
    actualizarContador();
}

/* suma todas las unidades que hay en el carrito. */
function actualizarContador(){
    let contador = document.getElementById("contador-carrito");
    let carrito = obtenerCarrito();
    let total = 0;
    let i;

    for(i = 0; i < carrito.length; i++){
        total = total + carrito[i].cantidad;
    }

    if(contador !== null){
        contador.textContent = total;
    }
}

/* busca un producto por su identificador. */
function buscarProducto(id){
    let productos = obtenerProductos();
    let i;

    for(i = 0; i < productos.length; i++){
        if(productos[i].id === id){
            return productos[i];
        }
    }

    return null;
}

/* anade una unidad de un producto al carrito. */
function agregarAlCarrito(id){
    let producto = buscarProducto(id);
    let carrito = obtenerCarrito();
    let encontrado = false;
    let i;

    if(producto === null){
        return;
    }
    if(producto.stock === 0){
        alert("No hay stock disponible.");
        return;
    }

    for(i = 0; i < carrito.length; i++){
        if(carrito[i].id === id){
            if(carrito[i].cantidad >= producto.stock){
                alert("No hay mas stock disponible.");
                return;
            }
            carrito[i].cantidad = carrito[i].cantidad + 1;
            encontrado = true;
        }
    }

    if(encontrado === false){
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert("Producto anadido al carrito.");
}

/* construye una tarjeta usando concatenacion de texto. */
function crearTarjetaProducto(producto){
    let tarjeta = "";

    tarjeta = tarjeta + '<article class="tarjeta">';
    tarjeta = tarjeta + '<a href="detalle.html?id=' + producto.id + '">';
    tarjeta = tarjeta + '<img src="' + textoSeguro(producto.imagen) + '" alt="Caja ' + textoSeguro(producto.nombre) + '">';
    tarjeta = tarjeta + "<h3>" + textoSeguro(producto.nombre) + "</h3>";
    tarjeta = tarjeta + "</a>";
    tarjeta = tarjeta + "<p>" + textoSeguro(producto.descripcion) + "</p>";
    tarjeta = tarjeta + '<p class="precio">' + formatoPrecio(producto.precio) + "</p>";
    tarjeta = tarjeta + '<button onclick="agregarAlCarrito(' + producto.id + ')">Anadir</button>';
    tarjeta = tarjeta + "</article>";

    return tarjeta;
}

/* recorre el arreglo y muestra los productos. */
function mostrarProductos(){
    let contenedor = document.getElementById("lista-productos");
    let productos = obtenerProductos();
    let contenido = "";
    let i;

    if(contenedor === null){
        return;
    }

    for(i = 0; i < productos.length; i++){
        contenido = contenido + crearTarjetaProducto(productos[i]);
    }

    contenedor.innerHTML = contenido;
}

/* obtiene el numero del producto escrito despues de ?id=*/
function obtenerIdDeLaDireccion(){
    let direccion = window.location.search;
    let partes;

    if(direccion === ""){
        return 1;
    }

    partes = direccion.split("=");
    return Number(partes[1]);
}

/* muestra el detalle del producto seleccionado. */
function mostrarDetalle(){
    let contenedor = document.getElementById("detalle-producto");
    let producto;
    let contenido = "";

    if(contenedor === null){
        return;
    }

    producto = buscarProducto(obtenerIdDeLaDireccion());

    if(producto === null){
        contenedor.innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    contenido = contenido + '<img src="' + textoSeguro(producto.imagen) + '" alt="Caja ' + textoSeguro(producto.nombre) + '">';
    contenido = contenido + "<div>";
    contenido = contenido + "<p>" + textoSeguro(producto.categoria) + "</p>";
    contenido = contenido + "<h1>" + textoSeguro(producto.nombre) + "</h1>";
    contenido = contenido + "<p>" + textoSeguro(producto.descripcion) + "</p>";
    contenido = contenido + "<p>Stock disponible: " + producto.stock + "</p>";
    contenido = contenido + '<p class="precio">' + formatoPrecio(producto.precio) + "</p>";
    contenido = contenido + '<button onclick="agregarAlCarrito(' + producto.id + ')">Anadir al carrito</button>';
    contenido = contenido + "</div>";
    contenedor.innerHTML = contenido;
}

/* dibuja las filas y calcula el total del carrito. */
function mostrarCarrito(){
    let cuerpo = document.getElementById("cuerpo-carrito");
    let totalVisible = document.getElementById("total-carrito");
    let carrito = obtenerCarrito();
    let contenido = "";
    let total = 0;
    let subtotal;
    let i;

    if(cuerpo === null){
        return;
    }

    if(carrito.length === 0){
        contenido = '<tr><td colspan="6">Tu carrito esta vacio.</td></tr>';
    }else{
        for(i = 0; i < carrito.length; i++){
            subtotal = carrito[i].precio * carrito[i].cantidad;
            total = total + subtotal;
            contenido = contenido + "<tr>";
            contenido = contenido + '<td><img class="miniatura" src="' + textoSeguro(carrito[i].imagen) + '" alt="' + textoSeguro(carrito[i].nombre) + '"></td>';
            contenido = contenido + "<td>" + textoSeguro(carrito[i].nombre) + "</td>";
            contenido = contenido + "<td>" + formatoPrecio(carrito[i].precio) + "</td>";
            contenido = contenido + '<td><button onclick="cambiarCantidad(' + carrito[i].id + ', -1)">-</button> ';
            contenido = contenido + carrito[i].cantidad;
            contenido = contenido + ' <button onclick="cambiarCantidad(' + carrito[i].id + ', 1)">+</button></td>';
            contenido = contenido + "<td>" + formatoPrecio(subtotal) + "</td>";
            contenido = contenido + '<td><button onclick="eliminarDelCarrito(' + carrito[i].id + ')">Quitar</button></td>';
            contenido = contenido + "</tr>";
        }
    }

    cuerpo.innerHTML = contenido;
    totalVisible.textContent = formatoPrecio(total);
}

/* cambia la cantidad y quita los productos que llegan a cero. */
function cambiarCantidad(id, cambio){
    let carrito = obtenerCarrito();
    let nuevoCarrito = [];
    let i;

    for(i = 0; i < carrito.length; i++){
        if(carrito[i].id === id){
            carrito[i].cantidad = carrito[i].cantidad + cambio;
            let producto = buscarProducto(id);
            if(carrito[i].cantidad > producto.stock){
                carrito[i].cantidad = producto.stock;
            }
        }

        if(carrito[i].cantidad > 0){
            nuevoCarrito.push(carrito[i]);
        }
    }

    guardarCarrito(nuevoCarrito);
    mostrarCarrito();
}

/* elimina completamente un producto. */
function eliminarDelCarrito(id){
    let carrito = obtenerCarrito();
    let nuevoCarrito = [];
    let i;

    for(i = 0; i < carrito.length; i++){
        if(carrito[i].id !== id){
            nuevoCarrito.push(carrito[i]);
        }
    }

    guardarCarrito(nuevoCarrito);
    mostrarCarrito();
}

/* vacia el carrito si la persona confirma. */
function vaciarCarrito(){
    if(confirm("¿Vaciar todo el carrito?") === true){
        guardarCarrito([]);
        mostrarCarrito();
    }
}

/* reproduce el video sin sonido */
function reproducirVideo(video){
    video.play().catch(function(){
        /* permite volver a intentar con un toque */
    });
}

/* revisa si el equipo usa mouse, para no interferir con el toque */
function reproducirConMouse(video){
    if(window.matchMedia("(hover: hover)").matches){
        reproducirVideo(video);
    }
}

/* permite usar el video en celular */
function alternarVideo(video){
    if(video.paused){
        reproducirVideo(video);
    }else{
        video.pause();
    }
}

/* detiene el video y vuelve al comienzo cuando sale el mouse. */
function detenerVideo(video){
    video.pause();
    video.currentTime = 0;
}

/* inicia solamente los elementos que existan en la pagina actual. */
function iniciarTienda(){
    actualizarContador();
    mostrarProductos();
    mostrarDetalle();
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", iniciarTienda);