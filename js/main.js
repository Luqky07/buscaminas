import { Partida } from "./Partida";
window.onload(() => {
    let partida;
    const form = document.getElementById("form");

    form.addEventListener("sumbit", (e) => {
        e.preventDefault();
        console.log(e);
        partida = new Partida(e.target.size.value);
        partida.printTablero();
    })
})