import { combineReducers } from 'redux';
import { usuario, listJogosUsuario, jogoSelecionado, devSelecionado, JogosAdicionados, JogosRemovidos } from './usuario';
import { reload } from './pagina_principal';
import { pesquisa } from './pesquisa';
const reducers = combineReducers({
    id_usuario: usuario,
    listJogosUsuario: listJogosUsuario,
    jogoSelecionado: jogoSelecionado,
    devSelecionado: devSelecionado,
    frontReload: reload,
    pesquisa: pesquisa,
    jogosAdicionados: JogosAdicionados,
    jogosRemovidos: JogosRemovidos
})
export default reducers;