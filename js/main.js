import { Partida } from "./Partida.js";
window.addEventListener("load" , () => {
    let partida;
    const form = document.getElementById("form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //console.log(e);
        console.log(e.target.size.value)
        partida = new Partida(e.target.size.value);
        partida.printTablero();
    })
})