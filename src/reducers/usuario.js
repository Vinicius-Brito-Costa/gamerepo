let id_usuario = 1
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
export default usuario;