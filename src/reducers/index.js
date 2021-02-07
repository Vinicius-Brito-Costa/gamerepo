import { combineReducers } from 'redux';
import { usuario, listJogosUsuario, jogoSelecionado } from './usuario';
import { reload } from './pagina_principal';
import { pesquisa } from './pesquisa';
const reducers = combineReducers({
    id_usuario: usuario,
    listJogosUsuario: listJogosUsuario,
    jogoSelecionado: jogoSelecionado,
    frontReload: reload,
    pesquisa: pesquisa
})
export default reducers;