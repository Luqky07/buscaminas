export class Casilla {
    #bomb;
    #check;
    #bandera;
    #cantBomb;
    constructor(bomb, check, bandera, cantBomb) {
        this.bomb = bomb;
        this.check = check;
        this.bandera = bandera;
        this.cantBomb = cantBomb;
    }
    casillaVacia() {
        return new Casilla(false, false, false, null);
    }
    getBomb() {
        return this.bomb;
    }
    setBomb() {
        this.bomb = !this.bomb;
    }
    getCheck() {
        return this.check;
    }
    setCheck() {
        this.check = true;
    }
    getBandera() {
        return this.bandera;
    }
    setBandera() {
        this.bandera = !this.bandera;
    }
    getCantBomb() {
        return this.cantBomb;
    }
    setCantBomb(cantBomb) {
        this.cantBomb = cantBomb;
    }
}