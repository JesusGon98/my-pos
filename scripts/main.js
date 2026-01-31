import {init as navegationinit} from './navigation.js';

////ejecutar esta funcion una vez ccargado el DOM
document.addEventListener('DOMContentLoaded', init);

function init(){
    console.log("Inicializando main.js");
    navegationinit();
}