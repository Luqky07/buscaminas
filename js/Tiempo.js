export class Tiempo{
    #minutos;
    #segundos;
    #intervalo;
    constructor() {
        this.minutos = 0;
        this.segundos = 0;
    }
    startTime() {
        this.intervalo = setInterval(this.aumentarTiempo, 1000);
    }
    stopTime() {
        clearInterval(this.intervalo);
    }
    #aumentarTiempo() {
        if (this.segundos++ == 60) {
            this.segundos = 0;
            this.minutos++;
        }
    }
    getTime(){
        let res = "Tiempo ";
        if (this.segundos < 10) res += "0" + this.segundos;
        else res += this.segundos + ":";
        if (this.minutos < 10) res += "0" + this.minutos;
        else res += this.minutos;
        let txt = document.createTextNode("Tiempo " + reloj.minutos + ":" + reloj.segundos);
        let p = document.createElement("p");
        p.appendChild(txt);
        return p;
    }
}