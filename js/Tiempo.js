export class Tiempo {
    #minutos;
    #segundos;
    #intervalo;
    constructor() {
        this.minutos = 0;
        this.segundos = 0;
    }
    aumentarTiempo() {
        if (this.segundos++ == 60) {
            this.segundos = 0;
            this.minutos++;
        }
    }
    getTime(aumentar) {
        if(aumentar) this.aumentarTiempo();
        let res = "Tiempo ";
        if (this.minutos < 10) res += "0" + this.minutos;
        else res += this.minutos;
        res += ":";
        if (this.segundos < 10) res += "0" + this.segundos;
        else res += this.segundos;
        return res;
    }
}