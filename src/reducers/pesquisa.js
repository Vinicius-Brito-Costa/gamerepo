let pesquisaAtual = ''
export const pesquisa = (state = pesquisaAtual, action) => {
    switch(action.type){
        default:
            return state
        case 'PESQUISA':
            pesquisaAtual = action.payload;
            return pesquisaAtual;
    }
}
export default pesquisa;