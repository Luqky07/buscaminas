import { Casilla } from "./Casilla.js";
export class Tablero {
    size;
    casillas = [];
    bombs;

    /*
    El constructor de esta clase recibe el tamaño que tendrá el tablero en forma de array y el número
    de bombas. Mediante un doble bucle recorriendo el tamaño recibido se crea una matriz que contiene 
    objetos Casilla. Usando un contador y un bucle do while se colocaran bombas en casillas aleatorias
    comprobando primero que en esa casilla no hubiese una bomba ya, solo en caso de ser así se colocará 
    una bomba y aumentará el contador
    */
    constructor(size, bombs) {
        this.size = size;
        for (let row = 0; row < formatSize[0]; row++) {
            let arrayRow = [];
            for (let col = 0; col < formatSize[1]; col++) {
                let pos = row + "-" + col;
                arrayRow.push(new Casilla(pos));
            }
            casillas.push(arrayRow);
        }
        let contBomb = 0;
        do {
            let casilla = this.casillaRandom();
            if (!this.casillas[casilla[0]][casilla[1]].getBomb()) {
                this.casillas[casilla[0]][casilla[1]].setBomb(true);
                contBomb++;
            }
        } while (contBomb < bombs)
    }

    casillaRandom(){
        let row = Math.floor(Math.random() * size[0]);
        let col = Math.floor(Math.random() * size[1]);
        return [row, col];

    }

    cambiarBomb(oldPos) {
        if(this.casillas[oldPos[0]][oldPos[1]].getBomb()) {
            this.casillas[oldPos[0]][oldPos[1]].setBomb(false);
            let casilla = this.casillaRandom();
           this.casillas[casilla[0]][casilla[1]].setBomb(true);
        }
    }

    bandera(){

    }

    printTablero() {

    }
}