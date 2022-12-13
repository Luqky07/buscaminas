//Elementos del DOM
const campo = document.getElementById("campo");
const form = document.getElementById("form");
const win = document.getElementById("win");
const losse = document.getElementById("loose");
const cBanderas = document.getElementById("cBanderas");
const time = document.getElementById("time");
const info = document.getElementById("info");
const indexedDB = window.indexedDB;
const marcador = document.getElementById("marcador");
const bMarcdor = document.getElementById("bMarcador");
const footer = document.getElementById("footer");

let db;
let firstOpt = true;
let bombas = [];
let casillasRevisadas = [];
let globalSize = 0;
let banderas = 0;
let intervalo;
let reloj = {
    segundos: 0,
    minutos: 0,
    horas: 0
}
let dificultad;

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

function cronometro() {
    if (reloj.segundos++ == 60) {
        reloj.segundos = 0;
        if (reloj.minutos++ == 60) {
            reloj.minutos = 0;
            reloj.horas++;
        }
    }
    if (reloj.segundos < 10 != "00") reloj.segundos = "0" + Number(reloj.segundos);
    if (reloj.minutos < 10 != "00") reloj.minutos = "0" + Number(reloj.minutos);
    if (reloj.horas < 10 != "00") reloj.horas = "0" + Number(reloj.horas);
    if (reloj.horas != 0) time.innerHTML = "Tiempo " + reloj.horas + ":" + reloj.minutos + ":" + reloj.segundos;
    else time.innerHTML = "Tiempo " + reloj.minutos + ":" + reloj.segundos;
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
    cBanderas.innerHTML = banderas;
}

function comprobarCasilla(e) {
    if (firstOpt == true) {
        intervalo = setInterval(cronometro, 1000);
        firstOpt = false;
    }
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
        if (casillasRevisadas.length == (size * size) - bombas.length) {
            console.log(casillasRevisadas);
            generarFin("ganador");
        }
    }
}

function generarFin(estado) {
    clearInterval(intervalo);
    for (let fila = 0; fila < globalSize; fila++) {
        for (let columna = 0; columna < globalSize; columna++) {
            let id = document.getElementById(columna + "-" + fila);
            id.removeEventListener("click", comprobarCasilla);
            id.removeEventListener("contextmenu", ponerBandera);
        }
    }
    if (estado == "ganador") {
        win.className = "msg";
        if (reloj.horas != 0) win.children[1].innerHTML = time.innerHTML;
        else win.children[1].innerHTML = time.innerHTML;

    }
    else loose.className = "msg";
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

function reiniciarJuego() {
    losse.className = "invisible"
    win.className = "invisible";
    firstOpt = true;
    reloj.segundos = "00";
    reloj.minutos = "00";
    reloj.horas = "00";
    time.innerHTML = "Tiempo " + reloj.minutos + ":" + reloj.segundos;
    clearInterval(intervalo);
    info.removeAttribute("class");
    bombas = [];
    casillasRevisadas = [];
}

function addData(data) {
    let transaction = db.transaction([dificultad], "readwrite");
    let objectStore = transaction.objectStore(dificultad);
    let request = objectStore.add(data);
}

function readData() {
    let transaction = db.transaction([dificultad], "readonly");
    let objectStore = transaction.objectStore(dificultad);
    let request = objectStore.openCursor();
    let res = ""
    request.onsuccess = (e) => {
        let cursor = e.target.result;
        if (cursor) {
            res += "<li>" + cursor.value.name + " / " + cursor.value.time + "</li>";
            cursor.continue();
        }
        marcador.children[1].innerHTML = res;
    }
    marcador.className = "marcador";
}

if (indexedDB) {
    let request = indexedDB.open("playerList", 1)
    request.onupgradeneeded = () => {
        db = request.result;
        console.log("Database creada");
        let dificultades = ["8x8 5 minas", "16x16 10 minas", "8x8 10 minas", "16x16 20 minas", "8x8 20 minas", "16x16 40 minas"];
        for (d of dificultades) {
            db.createObjectStore(d, { autoIncrement: true });
        }
    }
    request.onsuccess = () => {
        db = request.result
        console.log("Database abierta");
        win.children[2].addEventListener("submit", (e) => {
            let data = {
                name: e.target.name.value,
                mode: dificultad,
                time: reloj.horas + ":" + reloj.minutos + ":" + reloj.segundos
            }
            addData(data);
            e.target.name.value = "";
            win.className = "invisible";
        });
    }
    request.onerror = (error) => {
        console.log("Error");
    }
}

//Eventos
form.addEventListener("submit", (e) => {
    reiniciarJuego();
    footer.className = "footer";
    e.preventDefault();
    dificultad = e.target.size.value;
    let array = dificultad.split(" ");
    let size = array[0].split("x");
    banderas = array[1];
    cBanderas.innerHTML = banderas;
    generarCampo(size[0], array[1]);
})

losse.children[0].addEventListener("click", () => { losse.className = "invisible" })
marcador.children[0].addEventListener("click", () => { marcador.className = "invisible" })

bMarcdor.addEventListener("click", readData);