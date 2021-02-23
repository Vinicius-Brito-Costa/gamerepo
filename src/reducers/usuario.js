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