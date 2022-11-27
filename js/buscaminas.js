//Elementos del DOM
const campo = document.getElementById("campo");
const form = document.getElementById("form");

//Funciones
function generarCampo(num){
    campo.innerHTML = "";
    let tablero = "";
    for(let i = 0; i < num; i++){
        tablero += "<tr>\n"
        for(let j = 0; j < num; j++){
            tablero += "<td id='" + i + "" + j +"'>Hola</td>\n"
        }
        tablero += "</tr>\n";
    }
    campo.innerHTML = tablero;
    
}

//Eventos
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let respuesta = e.target.size.value;
    let array = respuesta.split(" ");
    let size = array[0].split("x");
    generarCampo(size[0]);
})