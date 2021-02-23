import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Index from './../paginas/paginaInicial';
import Pesquisa from './../paginas/pesquisa';
import Jogo from './../paginas/jogo';
import Dev from './../paginas/dev';
import LandingPage from './../paginas/landing';


class Rotas extends React.Component{
    render(){
        return(
            <Switch>
                <Route path={"/dev"} component={Dev} />
                <Route path={"/jogo"} component={Jogo} />
                <Route path={"/pesquisa"} component={Pesquisa} />
                <Route path={"/selecionados"} component={Index} />
                <Route path="/" component={LandingPage} />
            </Switch>
        );
    }
}

export default Rotas;