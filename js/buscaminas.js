//Elementos del DOM
const campo = document.getElementById("campo");
const form = document.getElementById("form");

let bombas = [];

//Funciones
function generarCampo(size, bombs) {
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
    generarBombas(size, bombs);
    events(size);
    console.log(bombas);
}

function events(num) {
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            let id = document.getElementById(i + "-" + j);
            id.addEventListener("click", () => {
                id.className = "vacio";
                if (bombas.includes(id.id)) {
                    for (let b = 0; b < bombas.length; b++) {
                        let bomba = document.getElementById(bombas[b])
                        bomba.innerHTML = "<i class='fa-solid fa-bomb'></i>";
                        bomba.className = "vacio";
                    }
                }
            })
        }
    }
}

function generarBombas(size, bombs) {
    let contBomb = 0;
    do {
        let fila = Math.floor(Math.random() * size);
        let columna = Math.floor(Math.random() * size);
        if (!bombas.includes(fila + "-" + columna)) {
            bombas.push(fila + "-" + columna);
            contBomb++;
        }
    } while (contBomb < bombs)
}

//Eventos
form.addEventListener("submit", (e) => {
    bombas = [];
    e.preventDefault();
    let respuesta = e.target.size.value;
    let array = respuesta.split(" ");
    let size = array[0].split("x");
    generarCampo(size[0], array[1]);
})