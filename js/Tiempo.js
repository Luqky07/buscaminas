export default class Tiempo{
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
        if (this.segundos < 10) this.segundos = "0" + this.segundos;
        if (this.minutos < 10) reloj.minutos = "0" + this.minutos;
        let txt = document.createTextNode("Tiempo " + reloj.minutos + ":" + reloj.segundos);
        let p = document.createElement("p");
        p.appendChild(txt);
        return p;
    }
}