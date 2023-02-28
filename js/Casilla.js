export class Casilla {
    #bomb;
    #check;
    #bandera;
    constructor(bomb, check, bandera) {
        this.bomb = bomb;
        this.check = check;
        this.bandera = bandera;
    }
    casillaVacia() {
        return new Casilla(false, false, false);
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
}