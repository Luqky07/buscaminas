import { Casilla } from "./Casilla.js";
export class Tablero {
    #casillas;   //Array con la información de las casillas
    #bombs;  //Cantidad de bombas

    /*
    El constructor de esta clase recibe el tamaño que tendrá el tablero en forma de array y el número
    de bombas. Mediante un doble bucle recorriendo el tamaño recibido se crea una matriz que contiene 
    objetos Casilla. Usando un contador y un bucle do while se colocaran bombas en casillas aleatorias
    comprobando primero que en esa casilla no hubiese una bomba ya, solo en caso de ser así se colocará 
    una bomba y aumentará el contador.
    */
    constructor(size, bombs) {
        let tab = []
        for (let row = 0; row < size[0]; row++) {
            let arrayRow = [];
            for (let col = 0; col < size[1]; col++) {
                let casillaVacia = new Casilla();
                arrayRow.push(casillaVacia.casillaVacia());
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

    getCasilla(cords) {
        return this.casillas[cords[0]][cords[1]];
    }

    getTableroLength() {
        return [this.casillas.length, this.casillas[0].length];
    }

    //Devuelve un array con las coordenadas y las filas de una casilla aleatoria
    casillaRandom() {
        let row = Math.floor(Math.random() * this.casillas.length);
        let col = Math.floor(Math.random() * this.casillas[0].length);
        return [row, col];

    }

    /*
    Recibe un array con las coordenadas y en caso de que haya bomba la mueve a otra posición.
    */
    cambiarBomb(oldPos) {
        if (this.casillas[oldPos[0]][oldPos[1]].getBomb()) {
            this.casillas[oldPos[0]][oldPos[1]].setBomb(false);
            let casilla = this.casillaRandom();
            this.casillas[casilla[0]][casilla[1]].setBomb(true);
        }
    }

    comprobarAlrededor(cords) {
        console.log(cords);
        let casilla = this.casillas[cords[0]][cords[1]]
        if (!casilla.getBandera()) {
            casilla.setCheck();
            let cont = 0;
            for (let row = 1; row >= -1; row--) {
                for (let col = 1; col >= -1; col--) {
                    let x = cords[0] - row;
                    let y = cords[1] - col;
                    try{
                        console.log(this.casillas[x][y])
                        if (this.casillas[x][y].getBomb()) cont++;
                    } catch(e) {
                        
                    }
                }
            }
            return cont;
        }
    }
}