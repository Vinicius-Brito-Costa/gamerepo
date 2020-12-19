import React from 'react';
import BannerPrincipal from './../componentes/banner_principal';
import CardJogo from '../componentes/card_jogo';
import Carousel from 'react-elastic-carousel';
import { consts } from 'react-elastic-carousel';

export default class PaginaInical extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            setas: true,
            banner_imagem: 'nier.jpg',
            descricao: "Olá"
        }
        this.bannerPrincipal = this.bannerPrincipal.bind(this);
    }

    bannerPrincipal(imagem, descricao){
        this.setState({
            banner_imagem: imagem,
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
            {width: 1000, itemsToShow: 3},
            {width: 1300, itemsToShow: 4}
        ]
        
        return(
            <main className="container-fluid px-0 text-light">
                <BannerPrincipal descricao={this.state.descricao} imagem={this.state.banner_imagem}/>
                <div className="paginas-inicio">
                    <h2>Minha Lista</h2>
                    <Carousel breakPoints={breakPoints} renderArrow={this.setas} enableTilt={false} showArrows={this.state.setas} onResize={(currentBreakPoint) => currentBreakPoint.width <= 1000 ? this.setState({setas: false}) : this.setState({setas: true})} disableArrowsOnEnd={true} onChange={(currentItemObject) => this.bannerPrincipal(currentItemObject.item.children.props.imagem, currentItemObject.item.children.props.descricao)} focusOnSelect={true}>
                        <div onClick={() => this.bannerPrincipal('nier.jpg','')}><CardJogo id="" nome="Nier: Automata" categorias={["Futurista", "Distopia", "TPS", "JRPG"]} idade="18" imagem="nier.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('transistor.jpg', "")}><CardJogo id="" nome="TRANSISTOR" categorias={["Futurista", "Distopia", "Isometrico", "RPG"]} idade="18" imagem="transistor.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('re3r.jpg', "")}><CardJogo id="" nome="RESIDENT EVIL 3 REMAKE" categorias={["Terror", "Zumbi", "TPS"]} idade="18"  imagem="re3r.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('castlevania.jpg', "")}><CardJogo id="" nome="CASTLEVANIA SYMPHONY OF THE NIGHT" categorias={["Gotico", "2D", "Ação", "JRPG"]} idade="12"  imagem="castlevania.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('sekiro.jpg', "")}><CardJogo id="" nome="SEKIRO" categorias={["Oriental", "Ação", "Soulslike", "RPG"]} idade="18"  imagem="sekiro.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('tekken7.jpg', "")}><CardJogo id="" nome="TEKKEN 7" categorias={["1 vs 1", "Luta"]} idade="16"  imagem="tekken7.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('doom.jpg', "")}><CardJogo id="" nome="DOOM ETERNAL" categorias={["Futurista", "Distopia", "FPS", "Inferno"]} idade="18" imagem="doom.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('cyberpunk_1_4K.jpg', "")}><CardJogo id="" nome="CYBERPUNK 2077" categorias={["Futurista", "Distopia", "FPS", "RPG"]} idade="18"  imagem="cyberpunk_1_4K.jpg" descricao=""/></div>
                        <div onClick={() => this.bannerPrincipal('sor.jpg', "")}><CardJogo id="" nome="STREETS OF RAGE" categorias={["Beat'em up", "2D", 'Clássicos']} idade="0"  imagem="sor.jpg" descricao=""/></div>
                    </Carousel>
                </div>

            </main>
        );
    }
}