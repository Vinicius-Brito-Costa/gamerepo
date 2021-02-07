export const MudarIdUsuario = (valor) => {
    return {
        type: 'ID_USUARIO',
        payload: valor
    }
}
export const AtualizarListaJogos = (valor) => {
    return {
        type: 'LISTA_DE_JOGOS_USUARIO',
        payload: valor
    }
}
export const SelecionarJogo = (valor) => {
    return {
        type: 'SELECIONAR_JOGO',
        payload: valor
    }
}