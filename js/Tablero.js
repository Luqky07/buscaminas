import { Casilla } from "./Casilla.js";
export class Tablero {
    casillas;   //Array con la información de las casillas
    bombs;  //Cantidad de bombas

    /*
    El constructor de esta clase recibe el tamaño que tendrá el tablero en forma de array y el número
    de bombas. Mediante un doble bucle recorriendo el tamaño recibido se crea una matriz que contiene 
    objetos Casilla. Usando un contador y un bucle do while se colocaran bombas en casillas aleatorias
    comprobando primero que en esa casilla no hubiese una bomba ya, solo en caso de ser así se colocará 
    una bomba y aumentará el contador
    */
    constructor(size, bombs) {
        let tab = []
        for (let row = 0; row < size[0]; row++) {
            let arrayRow = [];
            for (let col = 0; col < size[1]; col++) {
                let pos = row + "-" + col;
                arrayRow.push(new Casilla(pos));
            }
            tab.push(arrayRow);
        }
        this.casillas = tab;
        let contBomb = 0;
        do {
            let casilla = this.casillaRandom();
            if (!this.casillas[casilla[0]][casilla[1]].getBomb()) {
                this.casillas[casilla[0]][casilla[1]].setBomb(true);
                contBomb++;
            }
        } while (contBomb < bombs)
    }

    //Devuelve un array con las coordenadas y las filas de una casilla aleatoria
    casillaRandom() {
        let row = Math.floor(Math.random() * this.casillas.length);
        let col = Math.floor(Math.random() * this.casillas[0].length);
        return [row, col];

    }

    /*
    Recibe un array con las coordenadas y en caso de que haya bomba la mueve a otra 
    posición.
    */
    cambiarBomb(oldPos) {
        if (this.casillas[oldPos[0]][oldPos[1]].getBomb()) {
            this.casillas[oldPos[0]][oldPos[1]].setBomb(false);
            let casilla = this.casillaRandom();
            this.casillas[casilla[0]][casilla[1]].setBomb(true);
        }
    }

    bandera(e) {
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
    Pinta el tablero dentro de la etiqueta con id = 'campo' y una vez creada la tabla
    genera los eventos de cada casilla
    */
    printTablero() {
        let campo = document.getElementById("campo");
        for (let row = 0; row < this.casillas.length; row++) {
            let fila = document.createElement("tr");
            for (let col = 0; col < this.casillas[0].length; col++) {
                let columna = document.createElement("td");
                columna.id = row + "-" + col;
                columna.className = "casilla";
                if (this.casillas[row][col].getCheck()) columna.className = "vacio";
                else if (this.casilla[row][col].getBandera()) columna.className += " flag";
                fila.appendChild(columna);
            }
            campo.appendChild(fila);
        }
        for (let row = 0; row < this.casillas.length; row++) {
            for (let col = 0; col < this.casillas[0].length; col++) {
                let id = document.getElementById(row + "-" + col);
                if (!this.casillas[row][col].getCheck()) {
                    id.addEventListener("click", comprobarCasilla);
                    id.addEventListener("contextmenu", this.bandera);
                }
            }
        }
    }
}