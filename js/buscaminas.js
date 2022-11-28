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
    events(size);
}

function events(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let id = document.getElementById(i + "-" + j);
            id.addEventListener("click", () => {
                console.log(id.id);
                id.className = "vacio";
            })
        }
    }
}

//Eventos
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let respuesta = e.target.size.value;
    let array = respuesta.split(" ");
    let size = array[0].split("x");
    generarCampo(size[0]);
})