//Elementos del DOM
const campo = document.getElementById("campo");
const form = document.getElementById("form");

//Funciones
function generarCampo(size) {
    campo.innerHTML = "";
    let tablero = "";
    for (let i = 0; i < size; i++) {
        tablero += "<tr>\n"
        for (let j = 0; j < size; j++) {
            tablero += "<td id='" + i + "-" + j + "' class='casilla'></td>\n"
        }
        tablero += "</tr>\n";
    }
    campo.innerHTML = tablero;
}

//Eventos
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let respuesta = e.target.size.value;
    let array = respuesta.split(" ");
    let size = array[0].split("x");
    generarCampo(size[0]);
})