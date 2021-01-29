import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import Index from './../paginas/paginaInicial';
import Fila from './../paginas/fila';
import CadastroJogos from './../paginas/cadastroJogos';
import Pesquisa from './../paginas/pesquisa';

export default class PaginaInical extends React.Component{
    render(){
        return(
            <Switch>
                <Route path="/pesquisa" component={Pesquisa} />
                <Route path="/cadastroJogos" component={CadastroJogos} />
                <Route path="/fila" component={Fila} />
                <Route path="/" component={Index} />
            </Switch>
        );
    }
}