import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import { Logar } from './../actions/usuario';
import Index from './../paginas/paginaInicial';
import Fila from './../paginas/fila';
import CadastroJogos from './../paginas/cadastroJogos';
import Pesquisa from './../paginas/pesquisa';
import Jogo from './../paginas/jogo';
import Dev from './../paginas/dev';
import MinhaLista from './../paginas/minhaLista';
import Login from './../paginas/login';
import Cadastro from './../paginas/cadastro';
import LandingPage from './../paginas/landing';

import { connect } from 'react-redux';
import Cabecalho from './cabecalhoBase';
const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        listJogosUsuario: state.listJogosUsuario,
    }
}

const funcoes = () => {
    return {
        Logar
    }
}

class Rotas extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            logado: false
        }
        this.checkLogado = this.checkLogado.bind(this);
        this.roteadorComponente = this.roteadorComponente.bind(this);
        this.roteadorRota = this.roteadorRota.bind(this);
    }
    componentDidMount(){
        this.checkLogado()
    }
    async checkLogado(){
        let resultado = await fetch('https://rest-api-gameflix.herokuapp.com', Cabecalho());
        if(resultado.status === 401){
            this.setState({logado: false});
        }
        else{

            this.setState({logado: true});
            this.props.Logar();
        }
    }
    roteadorRota(rota){
        if(!this.state.logado && rota !== '/login' && rota !== '/cadastro'){
            return '/login';
        }
        else if(this.state.logado && (rota === '/cadastro' || rota === '/login')){
            return '/'
        }
        return rota;
    }
    roteadorComponente(comp){
        if(!this.state.logado && comp !== Login && comp !== Cadastro && comp !== LandingPage){
            return Login;
        }
        else if(this.state.logado && ((comp === Cadastro || comp === Login) || comp === LandingPage)){
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
                <Route path="/" component={this.roteadorComponente(LandingPage)} />
            </Switch>
        );
    }
}

export default connect(estados, funcoes())(Rotas);