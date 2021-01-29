import React from 'react';
import Rotas from './rotas';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { procurarJogo, selecionarJogo } from './apiRAWG';
import { connect } from 'react-redux';
import { pesquisa } from './../actions/pesquisa';

const mapDispatchToProps = () =>{
    return {
        pesquisa
    }
}
const estados = (state) => {
    return {
        pesquisa_prop: state.pesquisa
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
            previewNome: ''
        }
        this.procurar = this.procurar.bind(this);
        this.selecionar = this.selecionar.bind(this);
        this.pesquisarAction = this.pesquisarAction.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.checarScroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.checarScroll)
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
    procurar(elemento){
        procurarJogo(elemento.target.value, this);
        this.setState({valorPesquisado: elemento.target.value});
    }
    pesquisarAction(){
        this.props.pesquisa(this.state.valorPesquisado)
    }
    selecionar(jogo){
        selecionarJogo(jogo, this);
    }
    render(){
        return(
            <Router>
                <nav className="position-fixed w-100 navbar navbar-expand-lg navbar-dark" id="cabecalho-fundo">
                    <Link className="navbar-brand px-0" as={Link} to='/'><img className="Logo py-2" src={require('../imagens/Netflix-Logo.png').default} alt=""/></Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/'>Início</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/fila'>Fila</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/completos'>Completos</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/bombando'>Bombando</Link>
                            </li>
                            <li className="nav-item ml-3">
                                <Link className="text-light nav-link cabecalho-links"as={Link} to='/lista'>Minha&nbsp;lista</Link>
                            </li>
                        </ul>
                        <div className="cabecalho-secao-pesquisa my-2 my-lg-0">
                            <input type="hidden" name='id_jogo' />
                            <input className="form-control  cabecalho-procura" id="cabecalho-barra-pesquisa" onChange={ this.procurar } placeholder="Nome do jogo" aria-label="Search"/>
                            <Link as={Link} to="/pesquisa" onClick={() => this.pesquisarAction()} ><button className="btn cabecalho-procura-botao" id="cabecalho-submit">Procurar</button></Link>
                            <div className="cabecalho-pesquisa-resultado">
                            {this.state.jogosEncontrados.map((valor, index) => {
                                if(valor){
                                    return <button onClick={() => this.selecionar(valor)}  key={index} className=" btn cabecalho-pesquisa-item" style={{display: 'block'}}>{valor.name} <span className="cabecalho-pesquisa-add">+</span></button>
                                }
                                else{ return null }
                            }
                            )}
                        </div>
                        </div>
                    </div>
                </nav>
                <Rotas />
            </Router>
        );
    }
}

export default connect (estados, mapDispatchToProps())(Componente);