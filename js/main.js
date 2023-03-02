import { Partida } from "./Partida.js";
window.addEventListener("load" , () => {
    let partida;
    const form = document.getElementById("form");
    
    form.addEventListener("submit", (e) => {
        try{
            partida.finIntervalo();
        }catch(e){}
        e.preventDefault();
        if(e.target.size.value == "Personalizado") {
            let rows = Number(e.target.row.value);
            let cols = Number(e.target.col.value);
            let bombs = Number(e.target.numBombas.value);
            if((rows*cols)>bombs) {
                partida = new Partida(rows + "x" + cols + " " + bombs);
                partida.printTablero();
            } else alert("Demasiadas bombas para un tablero tan pequeño");
        }
        else {
            partida = new Partida(e.target.size.value);
            partida.printTablero();
        }
    })

    form.addEventListener("change", (e) => {
        let pers = document.getElementById("pers");
        if(e.target.value == "Personalizado" ){
            pers.innerHTML += "<label for='row'>Número de filas</label><input type='number' name='row' required><br>";
            pers.innerHTML += "<label for='col'>Número de colúmnas</label><input type='number' name='col' required><br>";
            pers.innerHTML += "<label for='numBombas'>Número de bombas</label><input type='number' name='numBombas' required>";
        } else if (e.target.localName != "input"){
            try{
                while(pers.firstChild){
                    pers.removeChild(pers.lastChild)
                }
            }
            catch(e){}
        }

    })
})