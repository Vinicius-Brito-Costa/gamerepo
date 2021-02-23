import React from 'react';
import { connect } from 'react-redux';
import { SelecionarJogo, RemoverJogos } from './../actions/usuario';
import { scrollToTop } from './../javascript/funcoes';
import { Load } from './../actions/paginaPrincipal';
import { Link, withRouter } from 'react-router-dom';
import Cabecalho from '../componentes/cabecalhoBase';

const mapDispatchToProps = () => {
    return{
        SelecionarJogo,
        Load,
        RemoverJogos
    }
}
const estados = (state) => {
    return{
        jogosDoUsuario: state.listJogosUsuario,
        frontReload: state.frontReload
    }
}
class BoxJogo extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            id_jogo: this.props.jogo.id,
            descricao: this.props.jogo.description,
            favorito: false,
            categorias:this.props.jogo.genres,
            idade: this.props.jogo.esrb_rating != null ? this.props.jogo.esrb_rating.name : "none",
            faixa: 'L',
            cor_faixa: 'faixa_livre'
        }
        this.adicionarAoUsuario = this.adicionarAoUsuario.bind(this);
        this.removerDoUsuario = this.removerDoUsuario.bind(this);
        this.jogoSelecionado = this.jogoSelecionado.bind(this);
    }
    componentDidMount(){
        this._estaMontado = true;
        if(this._estaMontado){
            console.log(this.state.favorito)
            this.faixaEtariaCheck();
        }
    }
    componentWillUnmount(){
        this._estaMontado = false;
    }
    faixaEtariaCheck(){
        let idade = this.state.idade;
        if(idade === 'Everyone 10+'){
            this.setState({faixa: '12'});
            this.setState({cor_faixa: 'faixa_12'});
        }
        else if(idade === 'Teen'){
            this.setState({faixa: '14'});
            this.setState({cor_faixa: 'faixa_14'});
        }
        else if(idade === 'Mature'){
            this.setState({faixa: '16'});
            this.setState({cor_faixa: 'faixa_16'});
        }
        else if( idade === 'Adults Only'){
            this.setState({faixa: '18'});
            this.setState({cor_faixa: 'faixa_18'});
        }
        else if( idade === 'none'){
            this.setState({faixa: 'N'});
            this.setState({cor_faixa: 'faixa_none'});
        }
        else{
            this.setState({faixa: 'L'});
            this.setState({idade: 'L'});
            this.setState({cor_faixa: 'faixa_livre px-3'});
        }
    }

    async adicionarAoUsuario(){
        const cabecalho = Cabecalho();
        cabecalho.body = { id_jogo: this.props.jogo.id};
        let url = 'http://localhost:777/cadastroJogosUsuario';

        fetch(url, cabecalho)
        if(!this.props.frontReload){
            this.props.Load()
        }
        this.setState({favorito: !this.state.favorito})
    }
    async removerDoUsuario(){
        this.props.RemoverJogos(this.props.jogo.id)
        this.setState({favorito: !this.state.favorito})
    }
    jogoSelecionado(){
        this.props.SelecionarJogo(this.props.jogo)
        scrollToTop()
    }
    render(){
        return(
            <div id={'boxJogo-' + this.props.jogo.id} className={`game-card border-0 game-card-link mx-auto`}>
                    <img className="game-card-img" src={this.props.jogo.background_image != null ? this.props.jogo.background_image : 'https://i.ytimg.com/vi/mnMEfY1fORg/maxresdefault.jpg'} alt="" />
                    <div className="game-card-info">
                        <div className="game-card-info-conteudo">
                            <ul className="d-flex px-0 mx-0 game-card-categorias">
                                {this.state.categorias.map( (categoria, id) => 
                                    <li className="mx-2" key={id}><a href="/categoria" className="text-light" rel="noreferrer">{categoria['name'] }</a></li>
                                )}
                            </ul>
                            <h4 className="game-card-nome text-center font-weight-bold text-uppercase">{this.props.jogo.name}</h4>
                            <div className={`game-card-faixa font-weight-bold btn ${this.state.cor_faixa}`} onClick={this.props.Load}><span>{this.state.faixa}</span></div>
                            <Link as={Link} to='/jogo' onClick={() => this.jogoSelecionado()} className="btn game-card-jogar w-25 font-weight-bold"><span>INFO</span></Link>
                        </div>
                    </div>
                </div>
        );
    }
}
export default  connect(estados, mapDispatchToProps())(withRouter(BoxJogo));