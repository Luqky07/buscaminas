import { Casilla } from "./Casilla.js";
export class Tablero {
    #casillas;  //Array con la información de las casillas
    #bombs;     //Cantidad de bombas
    #banderas;  //Cantidad de banderas
    /*
    El constructor de esta clase recibe el tamaño que tendrá el tablero en forma de array y el número
    de bombas. Mediante un doble bucle recorriendo el tamaño recibido se crea una matriz que contiene 
    objetos Casilla. Usando un contador y un bucle do while se colocaran bombas en casillas aleatorias
    comprobando primero que en esa casilla no hubiese una bomba ya, solo en caso de ser así se colocará 
    una bomba y aumentará el contador.
    */
    constructor(size, bombs, banderas) {
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
                this.casillas[casilla[0]][casilla[1]].setBomb();
                contBomb++;
            }
        } while (contBomb < bombs)
        this.bombs = bombs;
        this.banderas = banderas;
    }

    //Getter de un objeto casilla
    getCasilla(cords) {
        return this.casillas[cords[0]][cords[1]];
    }

    //Getter de un array con longitud del tablero
    getTableroLength() {
        return [this.casillas.length, this.casillas[0].length];
    }

    //Getter con la cantidad de bombas
    getBombs() {
        return this.bombs;
    }

    //Getter con la cantidad de banderas puestas
    getBanderas() {
        return this.banderas;
    }

    //Sumar las banderas puestas
    sumarBandera() {
        this.banderas++;
    }

    //Restar las banderas puestas
    restarBandera() {
        this.banderas--;
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
            this.casillas[oldPos[0]][oldPos[1]].setBomb();
            let valid = false
            do {
                let casilla = this.casillaRandom();
                if (!this.casillas[casilla[0]][casilla[1]].getBomb()) {
                    this.casillas[casilla[0]][casilla[1]].setBomb();
                    valid = true;
                }
            } while (!valid)
        }
    }

    comprobarAlrededor(cords) {
        let casilla = this.casillas[cords[0]][cords[1]];
        if (!casilla.getBandera()) {
            if (casilla.getBomb()) {
                if (this.if_firstTry()) {
                    this.cambiarBomb(cords);
                    this.comprobarAlrededor(cords);
                }
                else {
                    for (let row = 0; row < this.casillas.length; row++) {
                        for (let col = 0; col < this.casillas[row].length; col++) {
                            if (this.casillas[row][col].getBomb()) this.casillas[row][col].setCheck();
                        }
                    }
                }
            }
            else {
                casilla.setCheck();
                let cont = 0;
                for (let row = 1; row >= -1; row--) {
                    for (let col = 1; col >= -1; col--) {
                        let x = cords[0] - row;
                        let y = cords[1] - col;
                        try {
                            if (this.casillas[x][y].getBomb()) cont++;
                        } catch (e) { }
                    }
                }
                if (cont > 0) casilla.setCantBomb(cont);
                else {
                    for (let newRow = -1; newRow <= 1; newRow++) {
                        for (let newCol = -1; newCol <= 1; newCol++) {
                            let newCords = [(Number(cords[0]) + newRow), (Number(cords[1]) + newCol)];
                            try {
                                if (!this.casillas[newCords[0]][newCords[1]].getCheck()) this.comprobarAlrededor(newCords);
                            } catch (e) { }
                        }
                    }
                }
            }
        }
    }

    /*
    Función para comprobar que la partida ha terminado, primero comprueba que no haya
    victoria y luego comprueba que no exista una casilla que contenga una bomba y que haya
    sido revisada
    */
    is_finish() {
        for (let row = 0; row < this.casillas.length; row++) {
            for (let col = 0; col < this.casillas[row].length; col++) {
                if (this.casillas[row][col].getBomb() && this.casillas[row][col].getCheck()) {
                    return true;
                }
            }
        }
        return this.is_win();
    }

    /*
    Recorre todas las casillas buscando una casilla que no contenga una bomba y no haya
    sido revisada, en caso de no encontrarla devuelve "true" y si encuentra una casilla
    que reuna esos requisistos devuelve "false" y termina el bucle
    */
    is_win() {
        for (let row = 0; row < this.casillas.length; row++) {
            for (let col = 0; col < this.casillas[row].length; col++) {
                if (!this.casillas[row][col].getBomb() && !this.casillas[row][col].getCheck()) {
                    return false;
                }
            }
        }
        return true
    }

    if_firstTry() {
        let firstTry = true;
        for (let row = 0; row < this.casillas.length; row++) {
            for (let col = 0; col < this.casillas[row].length; col++) {
                if (this.casillas[row][col].getCheck()) firstTry = false;
            }
        }
        return firstTry;
    }
}