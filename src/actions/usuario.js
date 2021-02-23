export const Logar = () => {
    return {
        type: 'LOGAR'
    }
}
export const Deslogar = () =>{
    return {
        type: 'DESLOGAR'
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
export const SelecionarDev = (valor) => {
    return {
        type: 'SELECIONAR_DEV',
        payload: valor
    }
}
export const AdicionarJogos = (valor) => {
    return {
        type: 'JOGOS_ADICIONADOS',
        payload: valor
    }
}
export const RemoverJogos = (valor) => {
    return {
        type: 'JOGOS_REMOVIDOS',
        payload: valor
    }
}
export const ResetAdicionarJogos = () => {
    return {
        type: 'RESET_JOGOS_ADICIONADOS',
    }
}
export const ResetRemoverJogos = () => {
    return {
        type: 'RESET_JOGOS_REMOVIDOS',
    }
}