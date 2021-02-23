import { combineReducers } from 'redux';
import { jogoSelecionado, devSelecionado } from './usuario';
import { reload } from './pagina_principal';
import { pesquisa } from './pesquisa';
const reducers = combineReducers({
    jogoSelecionado: jogoSelecionado,
    devSelecionado: devSelecionado,
    frontReload: reload,
    pesquisa: pesquisa
})
export default reducers;