import { combineReducers } from 'redux';
import usuario from './usuario';
import { logarUsuario } from './usuario';
import { reload } from './pagina_principal';
import { pesquisa } from './pesquisa';
const reducers = combineReducers({
    id_usuario: usuario,
    front_page_reload: reload,
    pesquisa: pesquisa
})
export default reducers;