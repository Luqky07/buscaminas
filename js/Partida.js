import { Tablero } from "./Tablero";
import { Tiempo } from "./Tiempo";
export class Partida{
    difcult;
    tablero;
    tiempo;
    constructor(dificult) {
        this.difcult = dificult;
        size = this.dificult.split(" ")[0];
        bombas = this.dificult.split(" ")[1];
        this.tablero = new Tablero(size.split("x"));
        this.tiempo = new Tiempo;
    }

    /*
    Pinta el tablero dentro de la etiqueta con id = 'campo' y una vez creada la tabla genera los eventos 
    para dar funcionalidad a cada casilla.
    */
    printTablero() {
        let campo = document.getElementById("campo");
        for (let row = 0; row < this.casillas.length; row++) {
            let fila = document.createElement("tr");
            for (let col = 0; col < this.casillas[0].length; col++) {
                let columna = document.createElement("td");
                columna.id = row + "-" + col;
                columna.className = "casilla";
                if (this.casillas[row][col].getCheck()) columna.className = "vacio";
                else if (this.casilla[row][col].getBandera()) columna.className += " flag";
                fila.appendChild(columna);
            }
            campo.appendChild(fila);
        }
    }
}