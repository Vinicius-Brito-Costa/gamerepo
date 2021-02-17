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
import Dev from './../paginas/dev';
import MinhaLista from './../paginas/minhaLista';
import Login from './../paginas/login';
import Cadastro from './../paginas/cadastro';
import { connect } from 'react-redux';

const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario,
    }
}


class Rotas extends React.Component{
    constructor(props){
        super(props);
        this.roteadorComponente = this.roteadorComponente.bind(this);
        this.roteadorRota = this.roteadorRota.bind(this);
    }
    roteadorRota(rota){
        if(this.props.id_usuario === null && rota !== '/login' && rota !== '/cadastro'){
            return '/login';
        }
        else if(this.props.id_usuario !== null && (rota === '/cadastro' || rota === '/login')){
            console.log(this.props.id_usuario)
            console.log(rota)
            return '/'
        }
        return rota;
    }
    roteadorComponente(comp){
        console.log(this.props.id_usuario)
        if(this.props.id_usuario === null && comp !== Login && comp !== Cadastro){
            return Login;
        }
        else if(this.props.id_usuario !== null && (comp === Cadastro || comp === Login)){
            return Index
        }
        return comp;
    }
    render(){
        return(
            <Switch>
                <Route path={"/cadastro"} component={this.roteadorComponente(Cadastro)} />
                <Route path={"/login"} component={this.roteadorComponente(Login)} />
                <Route path={"/minhaLista"} component={this.roteadorComponente(MinhaLista)} />
                <Route path={"/dev"} component={this.roteadorComponente(Dev)} />
                <Route path={"/jogo"} component={this.roteadorComponente(Jogo)} />
                <Route path={"/pesquisa"} component={this.roteadorComponente(Pesquisa)} />
                <Route path={"/cadastroJogos"} component={this.roteadorComponente(CadastroJogos)} />
                <Route path={"/fila"} component={this.roteadorComponente(Fila)} />
                <Route path="/" component={this.roteadorComponente(Index)} />
            </Switch>
        );
    }
}

export default connect(estados)(Rotas);