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


//Variables globlales
let db;
let firstOpt = true;
let bombas = [];
let casillasRevisadas = [];
let size = 0;
let banderas = 0;
let intervalo;
let reloj = {
    segundos: 0,
    minutos: 0
}
let dificultad;

//Funciones

/*
    Usando la variable global "size",que es un array, para crear un tablero, primero crear las filas con un
    bucle for hasta llegar al primer elemento de "size", dentro de este bucle declaro un elemento "tr" y para 
    las columnas otro bucle for hasta llegar al segundo elemento de "size", dentro de este bucle declaro un
    elemento "td" al que le modifico la "id" en función de las variables del bucle for y le doy la clase 
    "casilla", por último en este bloque al elemento "tr" le añado el nuevo elemento "td" con .appendChild(),
    al terminar de recorrer las columnas a "campo", que es una constante que contiene el elemento "table" donde 
    quiero generar el tablero, y le añado el elemento "td", una vez terminado de crear el tablero llamado a 2 
    funciones más, una para generar las bombas y otrar para crear los eventos de las casillas.
*/
function generarCampo(bombs) {
    for (let i = 0; i < size[0]; i++) {
        let fila = document.createElement("tr");
        for (let j = 0; j < size[1]; j++) {
            let columna = document.createElement("td");
            columna.id = i + "-" + j;
            columna.className = "casilla";
            fila.appendChild(columna);
        }
        campo.appendChild(fila);
    }
    generarBombas(bombs);
    events();
}

/*
    Esta función sirve para iniciar los eventos que permiten interactuar con las casillas, haciendo uso de la 
    variable global "size" hago un doble bucle for que primero recorre las filas con el primer elemento de "size" 
    y luego recorre las columnas con el segundo elemento de "size" creo un elemento de html haciendo uso de los 
    contadores  de ambos for que coincide con las id de las casillas de la tabla y creo dos eventos por cada 
    casilla, un evento para detectar el click izquierdo y otro para detectar el click derecho.
*/
function events() {
    for (let i = 0; i < size[0]; i++) {
        for (let j = 0; j < size[1]; j++) {
            let id = document.getElementById(i + "-" + j);
            id.addEventListener("click", comprobarCasilla);
            id.addEventListener("contextmenu", ponerBandera);
        }
    }
}

/*
    Esta función sirve para modificar un objeto declarado global que contien el tiempo que ha pasado desde
    que se ha hecho el primer click para poder ejecutarse al hacer el primer click se activa un intervalo que
    hace que la función se ejecute cada segundo, primero suma 1 segundo y comprueba si el valor es 60, en caso
    de que sea true reinicia los segundos a 0 y suma 1 a minutos. Para mejorar la vista con dos condiciones
    hago que si los valores de segundos y minutos son menor de 10 añade un 0 para tener siempre un formato de
    dos digitos. Por último esa función crea un text node y reemplaza el que hay en el html por el que ha creado.
*/
function cronometro() {
    if (reloj.segundos++ == 60) {
        reloj.segundos = 0;
        reloj.minutos++;
    }
    if (reloj.segundos < 10) reloj.segundos = "0" + Number(reloj.segundos);
    if (reloj.minutos < 10) reloj.minutos = "0" + Number(reloj.minutos);
    let txt = document.createTextNode("Tiempo " + reloj.minutos + ":" + reloj.segundos)
    time.replaceChild(txt, time.firstChild);
}

/*
    Es la función que se ejecuta al hacer click derecho, trabajando con el evento que envia contextMenu podemos
    identificar el elemento que ha ejecutado el evento y acceder a su id, en caso de que no tenga bandera y  
    si hay banderas disponibles resta 1 a 1 variable global que es el número de banderas que depende de la 
    cantidad de bombas y ademas añade una clase al elemento, que se relaciona con css, en caso de que ya tenga 
    banderas, suma 1 al contador de banderas y le quita clase al elemento de html. Por último crea un textNode 
    que contiene el número de banderas disponibles e intercambia el hijo que tenía por el que ha creado nuevo.
*/
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
    let banderasTxt = document.createTextNode(banderas);
    cBanderas.replaceChild(banderasTxt, cBanderas.firstChild);
}

/*
    Esta es la función que se ejecuta cuando hacemos click izquierdo en una casilla, al igual que las banderas
    recibe el valor de la id mediante el evento que se ejecuta, y siempre que la casilla no contenga la clase 
    flag que representa que hay bandera lo primero que hace es modificar la clase de la casilla, además en
    caso de que esa casilla este contenida dentro del array global bombas que contiene las coordenas de todas
    las bombas puede o en caso de que sea el primer intento cambiar la bomba que habia colocado por otra 
    y llamar a la función que comprueba cuantas bombas hay alrededor o en caso de no sea el primer click recorre
    todo el array de bombas y muestra donde estaban colocadas, además llama a la función que termina el juego.
*/
function comprobarCasilla(e) {
    let id = document.getElementById(e.target.id);
    if (!id.classList.contains("flag")) {
        id.className = "vacio";
        if (bombas.includes(id.id)) {
            if (firstOpt == true) {
                for (i in bombas) {
                    if (bombas[i] == id.id) {
                        bombas.splice(i, 1);
                    }
                }
                generarBombas(1);
                comprobarAlrededor(id);
            }
            else {
                for (b of bombas) {
                    let bomba = document.getElementById(b)
                    bomba.className += " bomb";
                }
                generarFin("perdedor");
            }
        } else {
            comprobarAlrededor(id);
        }
    }
    if (firstOpt == true) {
        intervalo = setInterval(cronometro, 1000);
        firstOpt = false;
    }
}

/*
    Esta función permite comprobar el número de bombas que hay en el 3x3 alrededor de la casilla objetivo.
    Al llamar a la función comprobamos que la casilla no sea una bandera, también guardamos la casilla en un 
    array que contiene todas las casillas revisadas. En caso de encontrar bombas con un contador almaceno el 
    número de bombas y a la casilla le asigno una clase en función del número de bombas que hay alredor y tambíen
    imprimo en esa casilla el número. En caso de que no encuentra bombas alrededor vuelve a llamar a la función 
    desde las casillas que hay alrededor recursivamente en el caso de que esas casillas estén dentro del area del 
    tablero y no se encuentren en el array de casillas revisadas. Empleando el número de casillas que se han 
    revisado comprueba si se han revisado todas las casillas que no sean bombas y si es así termina el juego.
    Por último desactiva los eventos de click y contextualmenu para que esa casilla no se pueda pulsar.
*/
function comprobarAlrededor(element) {
    if (!element.classList.contains("flag")) {
        casillasRevisadas.push(element.id);
        let cords = element.id.split("-");
        let cont = 0;
        for (let i = 1; i >= -1; i--) {
            for (let j = 1; j >= -1; j--) {
                let x = cords[0] - i;
                let y = cords[1] - j;
                if (x >= 0 && x < size[1] && y >= 0 || y < size[0]) {
                    if (bombas.includes((x + "-" + y))) cont++;
                }
            }
        }
        if (cont > 0) {
            let cantBombas = document.createTextNode(cont);
            console.log(cont);
            element.appendChild(cantBombas);
            switch (cont) {
                case 1:
                    element.className = "green";
                    break;
                case 2:
                    element.className = "yellow";
                    break;
                case 3:
                    element.className = "orange";
                    break;
                default:
                    element.className = "red";
            }
        }
        if (cont == 0) {
            element.className = "vacio";
            let newElement = document.getElementById((Number(cords[0]) - 1) + "-" + cords[1]);
            if ((Number(cords[0]) - 1) >= 0 && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById(cords[0] + "-" + (Number(cords[1]) - 1));
            if ((Number(cords[1]) - 1) >= 0 && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById(cords[0] + "-" + (Number(cords[1]) + 1));
            if ((Number(cords[1]) + 1) < size[0] && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById((Number(cords[0]) + 1) + "-" + cords[1]);
            if ((Number(cords[0]) + 1) < size[0] && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById((Number(cords[0]) - 1) + "-" + (Number(cords[1]) - 1));
            if ((Number(cords[0]) - 1) >= 0 && (Number(cords[1]) - 1) >= 0 && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById((Number(cords[0]) - 1) + "-" + (Number(cords[1]) + 1));
            if ((Number(cords[0]) - 1) >= 0 && (Number(cords[1]) + 1) < size[1] && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById((Number(cords[0]) + 1) + "-" + (Number(cords[1]) - 1));
            if ((Number(cords[0]) + 1) < size[0] && (Number(cords[1]) - 1) >= 0 && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);

            newElement = document.getElementById((Number(cords[0]) + 1) + "-" + (Number(cords[1]) + 1));
            if ((Number(cords[0]) + 1) < size[0] && (Number(cords[1]) + 1) < size[1] && !casillasRevisadas.includes(newElement.id)) comprobarAlrededor(newElement);
        }
        if (casillasRevisadas.length == (size[0] * size[1]) - bombas.length) {
            generarFin("ganador");
        }
        element.removeEventListener("click", comprobarCasilla);
        element.removeEventListener("contextmenu", ponerBandera);
    }
}
/*
    Está función se llama en caso de que se termine la partida, limpia el intervalo para que el tiempo
    deje de contar y recorre todas las casillas desactivando los eventos de click y contextmenu para que no se
    puedan pulsar las casillas una vez terminada la partida. Dependiendo de como se ha terminado la partida, si se
    han marcado todas las casillas que no son bombas o se ha pulsado una bomba se mostrará un mensaje u otro.
*/
function generarFin(estado) {
    clearInterval(intervalo);
    for (let fila = 0; fila < size[0]; fila++) {
        for (let columna = 0; columna < size[1]; columna++) {
            let id = document.getElementById(columna + "-" + fila);
            id.removeEventListener("click", comprobarCasilla);
            id.removeEventListener("contextmenu", ponerBandera);
        }
    }
    if (estado == "ganador") {
        win.className = "msg";
        win.children[1].innerHTML = time.innerHTML;

    } else loose.className = "msg";
}

/*
    Recibe el número de bombas que tiene que imprimir. Con un bucle do while() coloca las bombas en sitios 
    aleatorios dentro del tablero, y comprueba que en la casilla que quiere poner la bomba no haya una bomba ya
    guardando las bombas que coloca en un array y aumenta el contador. 
*/
function generarBombas(bombs) {
    let contBomb = 0;
    do {
        let fila = Math.floor(Math.random() * size[0]);
        let columna = Math.floor(Math.random() * size[1]);
        if (!bombas.includes(fila + "-" + columna)) {
            bombas.push(fila + "-" + columna);
            contBomb++;
        }
    } while (contBomb < bombs)
}

/*
    Reinicio todas las variables para poder iniciar una nueva partida, borro el tablero, escondo los mensajes,
    vuelvo a activar que el siguiente click será el primero, reinicio el temporizador y limpio le intervalo.
    Activo la ventana con la información del tablero y por último reinicio los arrays que contienen las casillas
    revisadas y la posición de las bombas colodas.
*/
function reiniciarJuego() {
    while (campo.firstChild) {
        campo.removeChild(campo.firstChild);
    }
    losse.className = "invisible"
    win.className = "invisible";
    firstOpt = true;
    reloj.segundos = "00";
    reloj.minutos = "00";
    while (time.firstChild) {
        time.removeChild(time.firstChild);
    }
    let txt = document.createTextNode("Tiempo " + reloj.minutos + ":" + reloj.segundos)
    time.appendChild(txt);
    clearInterval(intervalo);
    info.removeAttribute("class");
    bombas = [];
    casillasRevisadas = [];
}

//Esta función permite añadir datos a indexedDB
function addData(data) {
    let transaction = db.transaction([dificultad], "readwrite");
    let objectStore = transaction.objectStore(dificultad);
    let request = objectStore.add(data);
}

//Esta función recoge todos los datos de indexedDB dependiendo de la dificultad y los muestra en pantalla.
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

//Crea la base de datos o entra en ella si ya la ha creado
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
                time: reloj.minutos + ":" + reloj.segundos
            }
            addData(data);
            e.target.name.value = "";
            win.className = "invisible";
            return false;
        },
            false);
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
    size = array[0].split("x");
    banderas = array[1];
    cBanderas.innerHTML = banderas;
    generarCampo(array[1]);
    return false;
},
    false)

losse.children[0].addEventListener("click", () => { losse.className = "invisible" })
marcador.children[0].addEventListener("click", () => { marcador.className = "invisible" })

bMarcdor.addEventListener("click", readData);