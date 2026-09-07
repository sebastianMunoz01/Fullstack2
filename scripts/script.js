function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>Pawchi 2026.</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = '<nav class="nav-menu"><div class="dropdown"><button class="dropbtn">Menu</button><div class="dropdown-content"><a href="index.html">Inicio</a><a href="catalogo.html">Catalogo</a><a href="nosotros.html">Nosotros</a></div></div></nav><section><h1 class="prevent-select">Pawchi</h1></section><section><p class="prevent-select">Que pawchi te tocara?</span></p></section>';
}

inyectarHeader();
inyectarFooter();