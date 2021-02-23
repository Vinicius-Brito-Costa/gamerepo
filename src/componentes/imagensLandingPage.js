import Mega from './../imagens/listaJogosMega.jpg';
import Snes from './../imagens/listaJogosSnes.jpg';
import Psx from './../imagens/listaJogosPsx.jpg';


const lista = [Mega, Snes, Psx];
let img = lista[Math.floor(Math.random() * (lista.length - 0) + 0)];
export default function Imagens(){
    
    return img
}