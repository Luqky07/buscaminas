//Elementos del DOM
const campo = document.getElementById("campo");
const form = document.getElementById("form");
const fin = document.getElementById("terminado");
const cBanderas = document.getElementById("resultados");

let bombas = [];
let casillasRevisadas = [];
let globalSize = 0;
let banderas = 0;

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
    globalSize = size;
    generarBombas(size, bombs);
    events(size);
    console.log(bombas);
}

function events(size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let id = document.getElementById(i + "-" + j);
            id.addEventListener("click", comprobarCasilla);
            id.addEventListener("contextmenu", ponerBandera);
        }
    }
}

function ponerBandera(e) {
    let id = document.getElementById(e.target.id);
    if (id.classList[1] == "flag") {
        id.className = id.classList[0];
        banderas++;
    } else {
        if (banderas > 0) {
            id.className += " flag";
            banderas--;
        }
    }
    cBanderas.children[1].innerHTML = banderas;
}

function comprobarCasilla(e) {
    let id = document.getElementById(e.target.id);
    if (!id.classList.contains("flag")) {
        id.className = "vacio";
        if (bombas.includes(id.id)) {
            for (let b = 0; b < bombas.length; b++) {
                let bomba = document.getElementById(bombas[b])
                bomba.className = "vacio bomb";
            }
            generarFin("perdedor");
        } else {
            comprobarAlrededor(id.id, globalSize);
        }
    }
}

function comprobarAlrededor(id, size) {
    let idCasilla = document.getElementById(id);
    if (!idCasilla.classList.contains("flag")) {
        casillasRevisadas.push(id);
        let cords = id.split("-");
        let cont = 0;
        for (let i = 1; i >= -1; i--) {
            for (let j = 1; j >= -1; j--) {
                let x = cords[0] - i;
                let y = cords[1] - j;
                if (x >= 0 && x < size && y >= 0 || y < size) {
                    if (bombas.includes((x + "-" + y))) {
                        cont++;
                    }
                }
            }
        }
        if (cont > 0) {
            document.getElementById(id).innerHTML = cont;
            switch (cont) {
                case 1:
                    document.getElementById(id).className = "green";
                    break;
                case 2:
                    document.getElementById(id).className = "yellow";
                    break;
                case 3:
                    document.getElementById(id).className = "orange";
                    break;
                default:
                    document.getElementById(id).className = "red";
            }
        }
        if (cont == 0) {
            document.getElementById(id).className = "vacio";
            let newCords = (Number(cords[0]) - 1) + "-" + cords[1];
            if ((Number(cords[0]) - 1) >= 0 && !casillasRevisadas.includes(newCords)) comprobarAlrededor(newCords, size);

            newCords = (Number(cords[0]) + 1) + "-" + cords[1];
            if ((Number(cords[0]) + 1) < size && !casillasRevisadas.includes(newCords)) comprobarAlrededor(newCords, size);

            newCords = cords[0] + "-" + (Number(cords[1]) - 1);
            if ((Number(cords[1]) - 1) >= 0 && !casillasRevisadas.includes(newCords)) comprobarAlrededor(newCords, size);

            newCords = cords[0] + "-" + (Number(cords[1]) + 1);
            if ((Number(cords[1]) + 1) < size && !casillasRevisadas.includes(newCords)) comprobarAlrededor(newCords, size);
        }
        if (casillasRevisadas.length == (size * size) - bombas.length){
            console.log(casillasRevisadas);
            generarFin("ganador");
        }
    }
}

function generarFin(estado) {
    for (let fila = 0; fila < globalSize; fila++) {
        for (let columna = 0; columna < globalSize; columna++) {
            let id = document.getElementById(columna + "-" + fila);
            id.removeEventListener("click", comprobarCasilla);
            id.removeEventListener("contextmenu", ponerBandera);
        }
    }
    if (estado == "ganador") fin.innerHTML = "Felicidades te has pasado el juego.";
    else fin.innerHTML = "Ni Carlos juega tan mal como tú."
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
    cBanderas.removeAttribute("class");
    fin.innerHTML = "";
    bombas = [];
    casillasRevisadas = [];
    e.preventDefault();
    let respuesta = e.target.size.value;
    let array = respuesta.split(" ");
    let size = array[0].split("x");
    banderas = array[1];
    cBanderas.children[1].innerHTML = banderas;
    generarCampo(size[0], array[1]);
})