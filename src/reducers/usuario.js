let id_usuario = null
export const usuario = (state = id_usuario, action) =>{
    switch(action.type){
        default:
            return state
        case 'ID_USUARIO':
            let id_usuario = action.payload ? action.payload : 1
            return id_usuario;
    }
}
let lista = []
export const listJogosUsuario = (state = lista, action) => {
    switch(action.type){
        default:
            return state;
        case 'LISTA_DE_JOGOS_USUARIO':
            lista = action.payload;
            state = lista;
            return state;
    }
}
let jogoAtual = []
export const jogoSelecionado = (state = jogoAtual, action) => {
    switch(action.type){
        default:
            return state;
        case 'SELECIONAR_JOGO':
            jogoAtual = action.payload;
            return jogoAtual;
    }
}
let devAtual = []
export const devSelecionado = (state = devAtual, action) => {
    switch(action.type){
        default:
            return state;
        case 'SELECIONAR_DEV':
            devAtual = action.payload;
            return devAtual;
    }
}
let jogosRemovidos = []
export const JogosRemovidos = (state = jogosRemovidos, action) => {
    switch(action.type){
        default:
            return state;
        case 'JOGOS_REMOVIDOS':
            jogosRemovidos.push(action.payload);
            return jogosRemovidos;
        case 'RESET_JOGOS_REMOVIDOS':
            jogosRemovidos = [];
            return jogosRemovidos;
    }
}
let jogosAdicionados = []
export const JogosAdicionados = (state = jogosAdicionados, action) => {
    switch(action.type){
        default:
            return state;
        case 'JOGOS_ADICIONADOS':
            jogosAdicionados.push(action.payload);
            return jogosAdicionados;
        case 'RESET_JOGOS_ADICIONADOS':
            jogosAdicionados = [];
            return jogosAdicionados;
    }
}