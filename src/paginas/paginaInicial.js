import React from 'react';
import BannerPrincipal from './../componentes/banner_principal';
import CardJogo from '../componentes/card_jogo';
import Carousel from 'react-elastic-carousel';
import { consts } from 'react-elastic-carousel';
import { pegarJogos } from './../componentes/apiRAWG';
import { connect } from 'react-redux';


const estados = (state) => {
    return {
        id_usuario: state.id_usuario,
        reload: state.front_page_reload
    }
}

class PaginaInicial extends React.Component{
    _estaMontado = false;
    constructor(props){
        super(props);
        this.state = {
            jogos: [],
            setas: true,
            banner_imagem: '',
            imagem_local: false,
            nome_jogo: '',
            descricao: ""
        }
        this.bannerPrincipal = this.bannerPrincipal.bind(this);
        this.pegarJogosDoUsuario = this.pegarJogosDoUsuario.bind(this);
        
    }
    componentDidMount(){
        this._estaMontado = true;
        if(this.props.reload && this.pegarJogosDoUsuario && this._estaMontado){
            console.log("Ta carregando");
            this.pegarJogosDoUsuario();
        }
    }
    async pegarJogosDoUsuario(){
        let dado = {
            id_usuario: this.props.id_usuario
        }
        const cabecalho = {
            method: "POST",
            body: JSON.stringify(dado),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        let resposta = await fetch(`http://localhost:777`, cabecalho);
        let dados = await resposta.json();
        
        let jogos = await pegarJogos(dados);
        if(jogos[0]){
            this.bannerPrincipal(jogos[0].background_image, false, jogos[0].description_raw, jogos[0].name);
        }
        this.setState({jogos: jogos});
        setInterval(() => {this.setState({load: 1});}, 100)
        
    }

    bannerPrincipal(imagem, local, descricao, nome){
        this.setState({
            nome_jogo: nome,
            banner_imagem: imagem,
            imagem_local: local,
            descricao: descricao
        })
    }
    setas({ type, onClick, isEdge}){
        let setaEsqOn = require('../imagens/carousel/setaEsqOn.svg').default;
        let setaEsqOff = require('../imagens/carousel/setaEsqOff.svg').default;
        let setaDirOn = require('../imagens/carousel/setaDirOn.svg').default;
        let setaDirOff = require('../imagens/carousel/setaDirOff.svg').default;
        const ponteiro = type === consts.PREV ? (isEdge ? setaEsqOff : setaEsqOn) : (isEdge ? setaDirOff : setaDirOn);
        return (
            <button type="button" onClick={onClick} disabled={isEdge} className="carousel-botao">
                <img src={ponteiro} alt=""/>
            </button>
        )
    }
    render(){
        const breakPoints = [
            {width: 1, itemsToShow: 1},
            {width: 668, itemsToShow: 2},
            {width: 900, itemsToShow: 3},
            {width: 1200, itemsToShow: 4}
        ]
        return this.state.load >= 1 ? (
            <main className="container-fluid px-0 text-light">
                <BannerPrincipal nome={this.state.nome_jogo} descricao={this.state.descricao} imagem={this.state.banner_imagem} imagem_local={this.state.imagem_local}/>
                <div className="paginas-inicio">
                    <h2>Minha Lista</h2>
                    <Carousel  breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} /*onChange={(currentItemObject) => this.bannerPrincipal(currentItemObject.item.children.props.imagem, false, currentItemObject.item.children.props.descricao)}*/ focusOnSelect={true}>
                        
                        {this.state.jogos.map((jogo, chave)=>
                            <div onClick={() => this.bannerPrincipal(jogo.background_image, false, jogo.description, jogo.name)} key={chave}><CardJogo id={jogo.id} nome={jogo.name} categorias={jogo.genres} idade={jogo.esrb_rating != null ? jogo.esrb_rating.name : "none"} imagem={jogo.background_image} descricao={jogo.description}/></div>
                        )}
                        
                    </Carousel>
                </div>

            </main>
        ): (<div>LOADING</div>);
    }
}
export default connect(estados)(PaginaInicial);