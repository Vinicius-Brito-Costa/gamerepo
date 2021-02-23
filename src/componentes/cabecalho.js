import React from 'react';
import Rotas from './rotas';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { procurarJogo, selecionarJogo } from './apiRAWG';
import { connect } from 'react-redux';
import { pesquisa } from './../actions/pesquisa';
import { SelecionarJogo, Deslogar } from './../actions/usuario';

const estados = (state) =>{
    return {
        logado: state.logado
    }
}

const mapDispatchToProps = () =>{
    return {
        Deslogar,
        pesquisa,
        SelecionarJogo
    }
}

class Componente extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            posicaoScroll: window.pageYOffset,
            att: 0,
            valorPesquisado: '',
            jogosEncontrados: [],
            isLoading: false,
            previewId: 0,
            previewNome: '',
            resultadoDePesquisaAtivo: false
        }
        this.logoff = this.logoff.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.checarScroll);
        document.getElementById('cabecalho-barra-pesquisa').addEventListener('keyup', this.checarEnterPesquisa);
            document.getElementById('cabecalho-barra-pesquisa').addEventListener('focus', this.ativarResultadoPesquisa);
            document.addEventListener('click', this.desativarResultadoPesquisa);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.checarScroll);
        if(this.props.logado){
            document.getElementById('cabecalho-barra-pesquisa').removeEventListener('keyup', this.checarEnterPesquisa);
            document.getElementById('cabecalho-barra-pesquisa').removeEventListener('focus', this.ativarResultadoPesquisa);
            document.removeEventListener('click', this.desativarResultadoPesquisa);
        }
    }
    checarScroll = () => {
        let cabecalho = document.querySelector("#cabecalho-fundo")
        if(document.documentElement.scrollTop > 1 && cabecalho){
            document.querySelector("#cabecalho-fundo").setAttribute("id", "cabecalho-fundo-2");
        }
        else if(document.documentElement.scrollTop < 1 && !cabecalho){
            document.querySelector("#cabecalho-fundo-2").setAttribute("id", "cabecalho-fundo");
        }
        const scroll = document.body.scrollTop || document.documentElement.scrollTop
        
        const altura = document.documentElement.scrollHeight - document.documentElement.clientHeight
        
        const rolagem = scroll / altura
        
        this.setState({
            posicaoScroll: rolagem,
        })
    }
    checarEnterPesquisa = (evento) => {
        this.ativarResultadoPesquisa();
        if(evento.keyCode === 13){
            this.setState({jogosEncontrados: []})
            evento.preventDefault();
            this.clicarNoBotaoPesquisa();
        }
    }
    clicarNoBotaoPesquisa = () => {
        document.getElementById('pesquisar').click()
    }
    ativarResultadoPesquisa = () => {
        this.setState({resultadoDePesquisaAtivo: true});
    }
    desativarResultadoPesquisa = (evento) => {
    if(evento.target.classList !== undefined){
        let classe = evento.target.classList;
        if(!classe.contains('cabecalho-pesquisa-item') && !classe.contains('cabecalho-procura')){
            this.setState({resultadoDePesquisaAtivo: false});
        }
    }
    }
    procurar = () =>{
        procurarJogo(this.valorBusca(), this);
        this.setState({valorPesquisado: this.valorBusca()});
    }
    valorBusca = () =>{
        let elemento = document.getElementById('cabecalho-barra-pesquisa').value;
        return elemento
    }
    pesquisarAction = () =>{
        this.props.pesquisa(this.valorBusca())
    }
    irParaPaginaJogo = (jogo) => {
        selecionarJogo(jogo, this);
        this.pesquisarAction();
        this.props.SelecionarJogo(jogo)
    }
    selecionar = (jogo) =>{
        selecionarJogo(jogo, this);
        this.pesquisarAction();
        this.clicarNoBotaoPesquisa();
    }
    logoff(){
        this.props.Deslogar();
        window.location.href = '/';
    }
    render(){
        return(
            <Router>
                <nav className="position-fixed w-100 navbar navbar-expand-lg navbar-dark" id="cabecalho-fundo">
                    <Link className="navbar-brand px-0" as={Link} to='/'><img className="Logo py-2" src={require('../imagens/logo.png').default} alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className={`navbar-nav ${this.props.logado ? 'mr-auto' : 'ml-auto'}`}>
                            <li className="nav-item ml-3">
                            {this.props.logado ? 
                                <Link className="text-light nav-link cabecalho-links" as={Link} to='/'>Início</Link>
                                :<Link className="text-light cabecalho-links float-right btn-entrar" as={Link} to='/login'><span>Entrar</span></Link>}
                                
                            </li>
                            <li className="nav-item ml-3">
                                {this.props.logado ? 
                                <Link className="text-light nav-link cabecalho-links" as={Link} to='/minhaLista'>Minha&nbsp;lista</Link>
                                :''}
                            </li>
                        </ul>
                        <i className={(this.props.logado ? 'd-flex': 'd-none')} >
                        <div className="cabecalho-secao-pesquisa my-2 my-lg-0" id="cabecalho-secao-pesquisa">
                            <input type="hidden" name='id_jogo' />
                            <input className="form-control  cabecalho-procura" id="cabecalho-barra-pesquisa" autoComplete="off" onChange={ this.procurar } placeholder="Nome do jogo" aria-label="Search"/>
                            
                            {this.state.resultadoDePesquisaAtivo ? <div className="cabecalho-pesquisa-resultado" id="cabecalho-pesquisa-resultado">
                                {this.state.jogosEncontrados.map((valor, index) => {
                                        if(valor){
                                            return <Link as={Link} to="/jogo" onClick={() => this.irParaPaginaJogo(valor)}  key={index} className=" btn cabecalho-pesquisa-item" style={{display: 'block'}}>{valor.name} <span className="cabecalho-pesquisa-add">-&gt;</span></Link>
                                        }
                                        else{ return null }
                                    }
                                )}
                            </div> : <div className="cabecalho-pesquisa-resultado" id="cabecalho-pesquisa-resultado"></div>}
                        </div>
                        <Link className='my-auto' id="pesquisar" as={Link} to="/pesquisa" onClick={() => this.pesquisarAction()} ><button className="btn cabecalho-procura-botao" id="cabecalho-submit">Procurar</button></Link>
                        
                        </i>
                        
                        {window.location.pathname === '/minhaLista' ? <button className='btn ml-1 btn-danger btn-deslogar d-flex' onClick={this.logoff}>Deslogar</button> :''}
                    </div>
                </nav>
                <Rotas />
            </Router>
        );
    }
}

export default connect (estados, mapDispatchToProps())(Componente);