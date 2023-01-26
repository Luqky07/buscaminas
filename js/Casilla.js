export default class Casilla {
    #bomb;
    #check;
    #bandera;
    constructor() {
        this.bomb = false;
        this.check = false;
        this.bandera = false;
    }
    constructor(bomb, check, bandera) {
        this.bomb = bomb;
        this.check = check;
        this.bandera = bandera;
    }
    getBomb() {
        return this.bomb;
    }
    setBomb() {
        this.bomb = !this.bomb;
    }
    getCheck() {
        return this.check = check;
    }
    setCheck() {
        this.check = true;
    }
    getBandera() {
        return this.bandera;
    }
    setBandera() {
        this.bandera = this.bandera;
    }
}