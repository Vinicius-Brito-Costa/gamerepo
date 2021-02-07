import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import Index from './../paginas/paginaInicial';
import Fila from './../paginas/fila';
import CadastroJogos from './../paginas/cadastroJogos';
import Pesquisa from './../paginas/pesquisa';
import Jogo from './../paginas/jogo';
import Login from './../paginas/login';
import { connect } from 'react-redux';

const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario,
    }
}


class Rotas extends React.Component{
    roteadorRota(rota){
        if(this.props.id_usuario == 0){
            return '/';
        }
        return rota;
    }
    roteadorComponente(comp){
        if(this.props.id_usuario == 0){
            return Login;
        }
        return comp;
    }
    render(){
        return(
            <Switch>
                <Route path={this.roteadorRota("/jogo")} component={this.roteadorComponente(Jogo)} />
                <Route path={this.roteadorRota("/pesquisa")} component={this.roteadorComponente(Pesquisa)} />
                <Route path={this.roteadorRota("/cadastroJogos")} component={this.roteadorComponente(CadastroJogos)} />
                <Route path={this.roteadorRota("/fila")} component={this.roteadorComponente(Fila)} />
                <Route path="/" component={Index} />
            </Switch>
        );
    }
}

export default connect(estados)(Rotas);