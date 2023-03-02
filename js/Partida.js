import { Tablero } from "./Tablero.js";
import { Tiempo } from "./Tiempo.js";
export class Partida {
    #dificult;  //Dificultad de la partida
    #tablero;   //Objeto tablero
    #tiempo;    //Objeto tiempo
    #firstTry;  //Varaible para reconocer el primer click
    #finish;    //Variable para saber si la partida ha terminado
    #intervalo; //Intervalo para actualizar el cronómetro

    //Contructor de la clase
    constructor(dificult) {
        this.dificult = dificult;
        let size = this.dificult.split(" ")[0];
        let bombas = this.dificult.split(" ")[1];
        this.tablero = new Tablero(size.split("x"), bombas, 0);
        this.tiempo = new Tiempo();
        this.firstTry = true;
        this.finish = false;
        this.intervalo = null;
    }

    setFirstTry(){
        this.firstTry = !this.firstTry;
    }

    //Función para cancelar el intervalo y que el tiempo cronómetro deje de contar
    finIntervalo() {
        try{
            clearInterval(this.intervalo);
        }catch(e){}
    }

    /*
    Pinta el tablero dentro de la etiqueta con id = 'campo' y una vez creada la tabla genera los eventos 
    para dar funcionalidad a cada casilla.
    */
    printTablero() {
        //this.whereBombs()
        document.getElementById("time").textContent = this.tiempo.getTime(false);
        document.getElementById("info").removeAttribute("class");
        this.printBanderas();
        let campo = document.getElementById("campo");
        campo.innerHTML = "";
        let size = this.tablero.getTableroLength();
        for (let row = 0; row < size[0]; row++) {
            let fila = document.createElement("tr");
            for (let col = 0; col < size[1]; col++) {
                let columna = document.createElement("td");
                columna.id = row + "-" + col;
                let cant = this.tablero.getCasilla([row, col]).getCantBomb();
                if (cant != null) {
                    switch (cant) {
                        case 1:
                            columna.className = "green";
                            break;
                        case 2:
                            columna.className = "yellow";
                            break;
                        case 3:
                            columna.className = "orange";
                            break;
                        default:
                            columna.className = "red";
                    }
                    let cantBombas = document.createTextNode(cant);
                    columna.appendChild(cantBombas);
                }
                else {
                    columna.className = "casilla";
                    if (this.tablero.getCasilla([row, col]).getCheck()) columna.className = "vacio";
                    else if (this.tablero.getCasilla([row, col]).getBandera()) columna.className += " flag";
                }
                if (this.tablero.getCasilla([row, col]).getCheck() && this.tablero.getCasilla([row, col]).getBomb()) columna.className = "vacio bomb";
                fila.appendChild(columna);
            }
            campo.appendChild(fila);
        }
        if (!this.finish) this.events();
    }

    events() {
        let size = this.tablero.getTableroLength();
        for (let row = 0; row < size[0]; row++) {
            for (let col = 0; col < size[1]; col++) {
                let celda = document.getElementById(row + "-" + col);
                if (!this.tablero.getCasilla([row, col]).getCheck()) {
                    celda.addEventListener("click", (event) => {
                        let cords = (event.target.id).split("-");
                        this.tablero.comprobarAlrededor(cords);
                        this.finish = this.tablero.is_finish();
                        this.printTablero();
                        if(this.firstTry) {
                            this.setFirstTry();
                            this.intervalo = setInterval(() => {
                                document.getElementById("time").textContent = this.tiempo.getTime(true);
                            }, 1000);
                        }
                        if (this.finish) {
                            this.finIntervalo();
                            if (this.tablero.is_win()) alert("Has ganado");
                            else alert("Has perdido");
                        }
                    });
                    celda.addEventListener("contextmenu", (event) => {
                        let cords = (event.target.id).split("-");
                        if (this.tablero.getCasilla(cords).getBandera()) {
                            this.tablero.restarBandera();
                            this.tablero.getCasilla(cords).setBandera();
                        }
                        else if (this.tablero.getBanderas() < this.tablero.getBombs()) {
                            this.tablero.sumarBandera();
                            this.tablero.getCasilla(cords).setBandera();
                        }

                        this.printTablero();
                    });
                }
            }
        }
    }

    whereBombs() {
        let tableroLength = this.tablero.getTableroLength();
        let bombs = [];
        for (let row = 0; row < tableroLength[0]; row++) {
            for (let col = 0; col < tableroLength[1]; col++) {
                if (this.tablero.getCasilla([row, col]).getBomb()) bombs.push(row + "-" + col);
            }
        }
        console.log(bombs);
    }

    printBanderas() {
        document.getElementById("cBanderas").textContent = " = " + (this.tablero.getBombs() - this.tablero.getBanderas() );
    }
}