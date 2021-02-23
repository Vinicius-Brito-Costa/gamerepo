import { combineReducers } from 'redux';
import { listJogosUsuario, jogoSelecionado, devSelecionado, JogosAdicionados, JogosRemovidos, Logado } from './usuario';
import { reload } from './pagina_principal';
import { pesquisa } from './pesquisa';
const reducers = combineReducers({
    logado: Logado,
    listJogosUsuario: listJogosUsuario,
    jogoSelecionado: jogoSelecionado,
    devSelecionado: devSelecionado,
    frontReload: reload,
    pesquisa: pesquisa,
    jogosAdicionados: JogosAdicionados,
    jogosRemovidos: JogosRemovidos
})
export default reducers;