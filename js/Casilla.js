export class Casilla {
    pos;
    bomb = false;
    check = false;
    bandera = false;
    constructor(pos) {
        this.pos = pos;
    }
    getPos() {
        return this.pos;
    }
    getBomb() {
        return this.bomb;
    }
    setBomb(estado) {
        this.bomb = estado;
    }
    getCheck() {
        this.check = check;
    }
    setCheck() {
        this.check = true;
    }
    setBandera(estado) {
        this.bandera = estado;
    }
}