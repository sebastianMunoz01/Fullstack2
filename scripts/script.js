function inyectarFooter(){
    document.getElementById("footer").innerHTML = "<p>mafiosos unidos spa</p>";
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = '<section><h1 class="prevent-select">Pawchi</h1></section><section><a href="#inicio">inicio</a><a href="#informacion">informacion</a><a href="#contacto">contacto</a></section><section><p class="prevent-select">pone tu sueldo, lo vas duplicar <span>🤑</span></p></section>';
}

inyectarHeader();
inyectarFooter();