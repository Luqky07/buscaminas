import { Tablero } from "./Tablero.js";
import { Tiempo } from "./Tiempo.js";
export class Partida {
    #dificult;
    #tablero;
    #tiempo;
    constructor(dificult) {
        this.dificult = dificult;
        let size = this.dificult.split(" ")[0];
        let bombas = this.dificult.split(" ")[1];
        this.tablero = new Tablero(size.split("x"));
        this.tiempo = new Tiempo();
    }

    /*
    Pinta el tablero dentro de la etiqueta con id = 'campo' y una vez creada la tabla genera los eventos 
    para dar funcionalidad a cada casilla.
    */
    printTablero() {
        let campo = document.getElementById("campo");
        campo.innerHTML = "";
        let size = this.tablero.getTableroLength();
        for (let row = 0; row < size[0]; row++) {
            let fila = document.createElement("tr");
            for (let col = 0; col < size[1]; col++) {
                let columna = document.createElement("td");
                columna.id = row + "-" + col;
                columna.className = "casilla";
                if (this.tablero.getCasilla([row, col]).getCheck()) columna.className = "vacio";
                else if (this.tablero.getCasilla([row, col]).getBandera()) columna.className += " flag";
                fila.appendChild(columna);
            }
            campo.appendChild(fila);
        }
        this.events();
    }

    events() {
        let size = this.tablero.getTableroLength();
        for (let row = 0; row < size[0]; row++) {
            for (let col = 0; col < size[1]; col++) {
                document.getElementById(row + "-" + col).addEventListener("click", (event) => {
                    let cont = this.tablero.comprobarAlrededor((event.target.id).split("-"));
                    this.printTablero();
                    if (cont > 0) {
                        let casilla = document.addEventListener(row + "-" + col);
                        let cantBombas = document.createTextNode(cont);
                        console.log(cont);
                        casilla.appendChild(cantBombas);
                        switch (cont) {
                            case 1:
                                casilla.className = "green";
                                break;
                            case 2:
                                casilla.className = "yellow";
                                break;
                            case 3:
                                casilla.className = "orange";
                                break;
                            default:
                                casilla.className = "red";
                        }
                    } else {
                        for(let newRow = -1; newRow == 1 ; newRow++) {
                            for(let newCol = -1; newCol == 1; newCol++) {
                                if(this.tablero.getCasilla([x,y]).getBomb()){
                                    
                                }
                            }
                        }
                    }
                });
                document.getElementById(row + "-" + col).addEventListener("contextmenu", (event) => {
                    let cords = (event.target.id).split("-")
                    this.tablero.getCasilla(cords).setBandera();
                    this.printTablero();
                });
            }
        }
    }
}